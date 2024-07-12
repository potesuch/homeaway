from django.contrib import admin

from .models import Property, Category


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    """
    Административная панель для управления объектами недвижимости.
    """
    list_display = (
        'id',
        'title',
        'description',
        'price_per_night',
        'category',
        'host',
        'created_at'
    )
    list_display_links = ('id', 'title')
    list_filter = ('price_per_night', 'category')
    search_fields = ('id', 'title', 'description', 'category','host')
    ordering = ('-created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Административная панель для управления категориями. 
    """
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('id', 'name')
