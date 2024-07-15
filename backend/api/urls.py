from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import PropertyViewSet, CategoryViewSet, CustomUserViewSet

app_name = 'api'

router = DefaultRouter()

router.register('properties', PropertyViewSet)
router.register('categories', CategoryViewSet)
router.register('auth/users', CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.jwt')),
]
