from rest_framework import viewsets
from rest_framework import permissions

from .serializers import ShortPropertySerializer, PropertySerializer
from properties.models import Property


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (permissions.AllowAny,)

    def get_serializer_class(self):
        if self.action == 'list':
            return ShortPropertySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)
