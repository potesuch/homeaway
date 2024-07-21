from datetime import datetime as dt

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers
from djoser.serializers import UserSerializer

from properties.models import Property, Category, Reservation
from chat.models import Conversation, ConversationMessage

User = get_user_model()


class CustomUserSerializer(UserSerializer):
    """
    Сериализатор для пользователя.
    """
    current_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    re_new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'avatar',
            'email',
            'current_password',
            'new_password',
            're_new_password'
        )

    def validate(self, attrs):
        user = self.instance
        current_password = attrs.get('current_password')
        new_password = attrs.get('new_password')
        re_new_password = attrs.get('re_new_password')
        if current_password or new_password or re_new_password:
            if not current_password:
                raise serializers.ValidationError(
                    {"current_password": "This field is required."}
                )
            if not user.check_password(current_password):
                raise serializers.ValidationError(
                    {"current_password": "Current password is incorrect."}
                )
            if not new_password:
                raise serializers.ValidationError(
                    {"new_password": "This field is required."}
                )
            if not re_new_password:
                raise serializers.ValidationError(
                    {"re_new_password": "This field is required."}
                )
            if new_password != re_new_password:
                raise serializers.ValidationError(
                    {"re_new_password": "New passwords do not match."}
                )
        return super().validate(attrs)

    def validate_new_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def update(self, instance, validated_data):
        new_password = None
        re_new_password = None
        if 'current_password' in validated_data:
            validated_data.pop('current_password')
        if 'new_password' in validated_data:
            new_password = validated_data.pop('new_password')
        if 're_new_password' in validated_data:
            re_new_password = validated_data.pop('re_new_password')
        instance = super().update(instance, validated_data)
        if new_password is not None and re_new_password is not None:
            instance.set_password(new_password)
            instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    """
    Сериализатор для категории.
    """    

    class Meta:
        model = Category
        fields = ('id', 'name', 'image')


class PropertyListSerializer(serializers.ModelSerializer):
    """
    Сериализатор для списка объектов недвижимости.
    """
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
    """
    Сериализатор для объекта недвижимости.
    """
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
    """
    Сериализатор для списка бронирований.
    """
    property = PropertyListSerializer()

    class Meta:
        model = Reservation
        fields = (
            'id', 'property', 'date_in', 'date_out', 'nights', 'total_price'
        )
        read_only_fields = ('property', 'nights', 'total_price')


class ReservationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для бронирования.
    """

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
    """
    Сериализатор для диалога.
    """
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at')


class ConversationMessageSerializer(serializers.ModelSerializer):
    """
    Сериализатор для сообщения в диалоге.
    """
    sent_to = UserSerializer(read_only=True)
    sent_from = UserSerializer(read_only=True)

    class Meta:
        model = ConversationMessage
        fields = ('id', 'body', 'sent_to', 'sent_from', 'created_at')
