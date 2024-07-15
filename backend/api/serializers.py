from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer

from properties.models import Property, Category

User = get_user_model()


class CustomUserSerializer(UserSerializer):

    class Meta:
        model = User
        fields = ('id', 'name', 'avatar')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name', 'image')


class ShortPropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ('id', 'title', 'price_per_night', 'image')


class PropertySerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        write_only=True,
        required=True
    )

    class Meta:
        model = Property
        fields = (
            'id',
            'host',
            'title',
            'description',
            'bedrooms',
            'bathrooms',
            'guests',
            'price_per_night',
            'category',
            'image'
        )
        read_only_fields = ('host',)
