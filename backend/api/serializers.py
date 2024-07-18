from datetime import datetime as dt

from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer

from properties.models import Property, Category, Reservation
from chat.models import Conversation, ConversationMessage

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
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = ('id', 'title', 'price_per_night', 'image', 'is_favorite')

    def get_is_favorite(self, obj):
        is_favorite = False
        user = self.context.get('request').user
        if user.is_authenticated and obj.in_favorite.filter(user=user):
            is_favorite = True
        return is_favorite


class PropertySerializer(PropertyListSerializer):
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
            'country',
            'country_code',
            'image',
            'is_favorite'
        )


class ReservationListSerializer(serializers.ModelSerializer):
    property = PropertyListSerializer()

    class Meta:
        model = Reservation
        fields = (
            'id', 'property', 'date_in', 'date_out', 'nights', 'total_price'
        )
        read_only_fields = ('property', 'nights', 'total_price')


class ReservationSerializer(serializers.ModelSerializer):

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
        read_only_fields = ('property', 'user', 'property', 'total_price', 'nights')

    def create(self, validated_data):
        date_in = validated_data.get('date_in')
        date_out = validated_data.get('date_out')
        nights = (date_out - date_in).days
        property = validated_data.get('property')
        fee = ((property.price_per_night * nights) / 100) * 5
        total_price = property.price_per_night * nights + fee
        reservation = Reservation.objects.create(
            nights=nights, total_price=total_price, **validated_data
        )
        return reservation

    def validate(self, data):
        now = dt.now().date()
        date_in = data['date_in']
        date_out = data['date_out']
        if date_in < now or date_in >= date_out:
            raise serializers.ValidationError('Select the correct dates')
        property = self.context.get('property')
        reservations = Reservation.objects.filter(property=property.id)
        for reservation in reservations:
            if (
                date_in < reservation.date_out
                and date_out > reservation.date_in
            ):
                raise serializers.ValidationError(
                    'This dates are already booked'
                )
        return data

    def validate_guests(self, value):
        property = self.context.get('property')
        if value > property.guests:
            raise serializers.ValidationError(
                'Number of guests is not correct'
            )
        return value


class ConversationSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at')


class ConversationMessageSerializer(serializers.ModelSerializer):
    sent_to = UserSerializer(read_only=True)
    sent_from = UserSerializer(read_only=True)

    class Meta:
        model = ConversationMessage
        fields = ('id', 'body', 'sent_to', 'sent_from', 'created_at')
