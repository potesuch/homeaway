from typing import Iterable
import uuid

from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin,
                                        UserManager)
from django.db import models


class CustomUserManager(UserManager):
    """
    Пользовательский менеджер пользователей для управления созданием пользователей и суперпользователей.
    Наследуется от UserManager.
    """

    def _create_user(self, name, email, password, **extra_fields):
        """
        Создает и сохраняет пользователя с указанным именем, email и паролем.

        Args:
            name (str): Имя пользователя.
            email (str): Email пользователя.
            password (str): Пароль пользователя.
            **extra_fields: Дополнительные поля для пользователя.

        Raises:
            ValueError: Если email не указан.

        Returns:
            user: Созданный пользователь.
        """
        if not email:
            raise ValueError('User must have email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        """
        Создает обычного пользователя с указанными именем, email и паролем.

        Args:
            name (str, optional): Имя пользователя.
            email (str, optional): Email пользователя.
            password (str, optional): Пароль пользователя.
            **extra_fields: Дополнительные поля для пользователя.

        Returns:
            user: Созданный пользователь.
        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)

    def create_superuser(
        self, name=None, email=None, password=None, **extra_fields
    ):
        """
        Создает суперпользователя с указанными именем, email и паролем.

        Args:
            name (str, optional): Имя пользователя.
            email (str, optional): Email пользователя.
            password (str, optional): Пароль пользователя.
            **extra_fields: Дополнительные поля для пользователя.

        Returns:
            user: Созданный суперпользователь.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Модель пользователя, наследующаяся от AbstractBaseUser и PermissionsMixin.

    Attributes:
        id (UUIDField): Уникальный идентификатор пользователя.
        email (EmailField): Уникальный email пользователя.
        name (CharField): Имя пользователя.
        avatar (ImageField): Аватар пользователя.
        is_active (BooleanField): Активен ли пользователь.
        is_superuser (BooleanField): Является ли пользователь суперпользователем.
        is_staff (BooleanField): Является ли пользователь сотрудником.
        date_joined (DateTimeField): Дата регистрации пользователя.
        last_login (DateTimeField): Дата последнего входа пользователя.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to='uploads/avatars')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name',]

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = f'User_{self.id}'
        super().save(*args, **kwargs)
