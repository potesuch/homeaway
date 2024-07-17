import uuid

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Conversation(models.Model):
    """
    Модель, представляющая диалог между пользователями.

    Attributes:
        id (UUIDField): Уникальный идентификатор диалога.
        users (ManyToManyField): Пользователи, участвующие в диалоге.
        created_at (DateTimeField): Время создания диалога.
        modified_at (DateTimeField): Время последнего изменения диалога.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    users = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class ConversationMessage(models.Model):
    """
    Модель, представляющая сообщение в диалоге.

    Атрибуты:
        id (UUIDField): Уникальный идентификатор сообщения.
        conversation (ForeignKey): Диалог, к которому относится сообщение.
        body (TextField): Текст сообщения.
        sent_to (ForeignKey): Пользователь, которому отправлено сообщение.
        sent_from (ForeignKey): Пользователь, отправивший сообщение.
        created_at (DateTimeField): Время отправки сообщения.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    conversation = models.ForeignKey(
        Conversation, related_name='messages', on_delete=models.CASCADE
    )
    body = models.TextField()
    sent_to = models.ForeignKey(
        User, related_name='received_messages', on_delete=models.CASCADE
    )
    sent_from = models.ForeignKey(
        User, related_name='sent_messages', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
