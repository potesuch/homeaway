from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from djoser.views import UserViewSet

from .serializers import (PropertyListSerializer, PropertySerializer,
                          CategorySerializer, ReservationListSerializer,
                          ReservationSerializer, ConversationSerializer,
                          ConversationMessageSerializer)
from .permissions import IsAuthorOrStuffOrReadOnly
from .filters import PropertyFilter
from properties.models import Property, Category, Favorite
from chat.models import Conversation

User = get_user_model()


class CustomUserViewSet(UserViewSet):

    def get_permissions(self):
        if self.action == 'me':
            self.permission_classes = (permissions.IsAuthenticated,)
        return super().get_permissions()

    @action(
        methods=['GET'],
        detail=False,
        permission_classes=(permissions.IsAuthenticated,),
        url_path='me/reservations'
    )
    def reservation_list(self, request):
        reservations = request.user.reservations.all()
        serializer = ReservationListSerializer(
            reservations, many=True, context={'request': request}
        )
        return Response(serializer.data, status=200)

    @action(
        methods=['GET'],
        detail=False,
        permission_classes=(permissions.IsAuthenticated,),
        url_path='me/conversations'
    )
    def conversation_list(self, request):
        conversations = request.user.conversations.all()
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=200)

    @action(
        methods=['POST'],
        detail=True,
        permission_classes=(permissions.IsAuthenticated,),
        url_path='start_conversation'
    )
    def conversation_create(self, request, id=None):
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
            raise exceptions.NotFound
        conversation = Conversation.objects.filter(
            users=request.user.id
        ).filter(users=user.id)
        if conversation.count() == 0:
            conversation = Conversation.objects.create()
            conversation.users.add(request.user.id, user.id)
        return Response({'id': conversation.id}, status=200)


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.prefetch_related('in_favorite')
    serializer_class = PropertySerializer
    permission_classes = (IsAuthorOrStuffOrReadOnly,)
    filterset_class = PropertyFilter

    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    @action(
        detail=True,
        methods=['POST'],
        permission_classes=(permissions.IsAuthenticated,),
        url_path='book'
    )
    def book_property(self, request, pk=None):
        try:
            property = Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise exceptions.NotFound
        user = request.user
        serializer = ReservationSerializer(
            data=request.data, context={'property': property}
        )
        if serializer.is_valid():
            serializer.save(
                user=user,
                property=property
            )
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(
        detail=True,
        methods=['GET'],
        permission_classes=(permissions.AllowAny,),
        url_path='reservations'
    )
    def property_reservations(self, request, pk=None):
        try:
            property = Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise exceptions.NotFound
        reservations = property.reservations.all()
        serializer = ReservationListSerializer(
            reservations, many=True, context={'request': request}
        )
        return Response(serializer.data, status=200)

    @action(
        detail=True,
        methods=['POST'],
    )
    def toggle_favorite(self, request, pk=None):
        try:
            property = Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise exceptions.NotFound
        favorite, created = Favorite.objects.get_or_create(
            property=property, user=request.user
        )
        if not created:
            favorite.delete()
            return Response({'is_favorite': False}, status=200)
        return Response({'is_favorite': True}, status=200)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)


class ConversationViewSet(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, pk=None):
        try:
            conversation = request.user.conversations.get(pk=pk)
        except Conversation.DoesNotExist:
            raise exceptions.NotFound
        conversation_serializer = ConversationSerializer(conversation)
        messages_serializer = ConversationMessageSerializer(
            conversation.messages.all(), many=True
        )
        return Response({
            **conversation_serializer.data,
            'messages': messages_serializer.data
        }, status=200)
