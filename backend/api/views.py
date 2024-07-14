from rest_framework import viewsets

from .serializers import (ShortPropertySerializer, PropertySerializer,
                          CategorySerializer)
from .permissions import IsAuthorOrStuffOrReadOnly
from properties.models import Property, Category


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsAuthorOrStuffOrReadOnly,)

    def get_serializer_class(self):
        if self.action == 'list':
            return ShortPropertySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
