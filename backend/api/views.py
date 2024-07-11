from rest_framework import viewsets
from rest_framework import permissions

from .serializers import ShortPropertySerializer
from properties.models import Property


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = ShortPropertySerializer
    permission_classes = (permissions.AllowAny,)
