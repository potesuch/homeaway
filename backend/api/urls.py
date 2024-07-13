from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import PropertyViewSet

app_name = 'api'

router = DefaultRouter()

router.register('properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
