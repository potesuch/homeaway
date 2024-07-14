# Generated by Django 4.2.14 on 2024-07-14 14:56

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0004_category_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True),
        ),
    ]