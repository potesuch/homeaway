import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Category(models.Model):
    """
    Модель категории, представляющая категорию объектов недвижимости.

    Attributes:
        id (UUIDField): Уникальный идентификатор категории.
        name (CharField): Название категории.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=20)
    image = models.ImageField(upload_to='uploads/categories')

    def __str__(self):
        return self.name


class Property(models.Model):
    """
    Модель недвижимости, представляющая собой объект для аренды.

    Attributes:
        id (UUIDField): Уникальный идентификатор объекта недвижимости.
        title (CharField): Название объекта недвижимости.
        description (TextField): Описание объекта недвижимости.
        price_per_night (IntegerField): Цена за ночь.
        bedrooms (IntegerField): Количество спален.
        bathrooms (IntegerField): Количество ванных комнат.
        country (CharField): Страна расположения объекта.
        country_code (CharField): Код страны.
        category (ForeignKey): Категория объекта недвижимости
        image (ImageField): Изображение объекта недвижимости.
        host (ForeignKey): Владелец (хост) объекта, связанный с моделью пользователя.
        created_at (DateTimeField): Дата и время создания записи.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price_per_night = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    guests = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    category = models.ForeignKey(
        Category,
        related_name='properties',
        null=True,
        on_delete=models.SET_NULL
    )
    image = models.ImageField(upload_to='uploads/properties')
    host = models.ForeignKey(
        User, related_name='properties', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Favorite(models.Model):
    """
    Модель избранного, представляющая связь между пользователем и объектом недвижимости, который пользователь добавил в избранное.

    Attributes:
        id (UUIDField): Уникальный идентификатор записи избранного.
        property (ForeignKey): Связь с моделью Property, указывающая на избранный объект недвижимости.
        user (ForeignKey): Связь с моделью User, указывающая на пользователя, добавившего объект в избранное.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='in_favorite'
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='favorited'
    )
