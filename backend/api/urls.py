from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import PropertyViewSet, CategoryViewSet

app_name = 'api'

router = DefaultRouter()

router.register('properties', PropertyViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
