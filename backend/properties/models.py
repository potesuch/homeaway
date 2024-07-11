import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price_per_night = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    category = models.CharField(max_length=255)
    image = models.ImageField(upload_to='uploads/properties')
    host = models.ForeignKey(
        User, related_name='properties', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Favorite(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='in_favorite'
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='favorited'
    )
