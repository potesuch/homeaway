from rest_framework import viewsets, permissions, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from djoser.views import UserViewSet

from .serializers import (PropertyListSerializer, PropertySerializer,
                          CategorySerializer, ReservationListSerializer,
                          ReservationSerializer)
from .permissions import IsAuthorOrStuffOrReadOnly
from properties.models import Property, Category, Favorite


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
    def reservation_list(self, request, *args, **kwargs):
        reservations = request.user.reservations.all()
        serializer = ReservationListSerializer(
            reservations, many=True, context={'request': request}
        )
        return Response(serializer.data, status=200)


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsAuthorOrStuffOrReadOnly,)
    filterset_fields = ('host',)

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
    def book_property(self, request, *args, **kwargs):
        try:
            property = Property.objects.get(id=kwargs.get('pk'))
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
    def property_reservations(self, request, *args, **kwargs):
        try:
            property = Property.objects.get(id=kwargs.get('pk'))
        except Property.DoesNotExist:
            raise exceptions.NotFound
        reservations = property.reservations.all()
        serializer = ReservationListSerializer(reservations, many=True)
        return Response(serializer.data, status=200)

    @action(
        detail=True,
        methods=['POST'],
    )
    def toggle_favorite(self, request, *args, **kwargs):
        try:
            property = Property.objects.get(id=kwargs.get('pk'))
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
