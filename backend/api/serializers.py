from rest_framework import serializers

from properties.models import Property


class ShortPropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ('id', 'title', 'price_per_night', 'image')


class PropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'description',
            'bedrooms',
            'bathrooms',
            'guests',
            'price_per_night',
            'image'
        )
