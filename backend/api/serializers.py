from rest_framework import serializers

from properties.models import Property


class ShortPropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ('id', 'title', 'price_per_night', 'image')
