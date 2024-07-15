from django.contrib import admin

from .models import Property, Category, Reservation


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


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    """
    Административная панель для управления бронированиями.
    """
    list_display = (
        'id', 'property', 'user', 'date_in', 'date_out', 'total_price'
    )
    list_filter = ('date_in', 'date_out', 'total_price')
    search_fields = ('id', 'property', 'user')
    ordering = ('-created_at',)
