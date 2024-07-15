from datetime import datetime as dt

from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer

from properties.models import Property, Category, Reservation

User = get_user_model()


class CustomUserSerializer(UserSerializer):

    class Meta:
        model = User
        fields = ('id', 'name', 'avatar')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name', 'image')


class PropertyListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ('id', 'title', 'price_per_night', 'image')


class PropertySerializer(serializers.ModelSerializer):
    host = CustomUserSerializer(read_only=True)
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


class ReservationListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ('id', 'date_in', 'date_out')


class ReservationSerializer(serializers.ModelSerializer):
    nights = serializers.SerializerMethodField()

    class Meta:
        model = Reservation
        fields = (
            'id',
            'property',
            'user',
            'guests',
            'date_in',
            'date_out',
            'nights',
            'total_price',
            'created_at'
        )
        read_only_fields = ('property', 'user', 'total_price')

    def get_nights(self, obj):
        return (obj.date_out - obj.date_in).days

    def create(self, validated_data):
        date_in = validated_data.get('date_in')
        date_out = validated_data.get('date_out')
        nights = (date_out - date_in).days
        property = validated_data.get('property')
        total_price = property.price_per_night * nights
        reservation = Reservation.objects.create(
            nights=nights, total_price=total_price, **validated_data
        )
        return reservation

    def validate(self, data):
        now = dt.now().date()
        if data['date_in'] < now or data['date_in'] > data['date_out']:
            raise serializers.ValidationError('Select the correct dates')
        return data
