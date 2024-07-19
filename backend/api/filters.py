from django.db.models import Q
from django_filters import rest_framework as filters

from properties.models import Property, Category


class PropertyFilter(filters.FilterSet):
    is_favorite = filters.BooleanFilter(method='is_favorite_filter')
    check_in = filters.DateFilter(method='reservation_filter')
    check_out = filters.DateFilter(method='reservation_filter')
    category = filters.ModelChoiceFilter(
        queryset=Category.objects.all(), to_field_name='name'
    )
    guests = filters.NumberFilter(field_name='guests', lookup_expr='gte')
    bedrooms = filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')
    bathrooms = filters.NumberFilter(field_name='bathrooms', lookup_expr='gte')

    class Meta:
        model = Property
        fields = (
            'host',
            'country',
            'check_in',
            'check_out',
            'guests',
            'bedrooms',
            'bathrooms',
            'category'
        )

    def is_favorite_filter(self, queryset, name, value):
        if value and self.request.user.is_authenticated:
            return queryset.filter(in_favorite__user=self.request.user)
        return queryset

    def reservation_filter(self, queryset, name, value):
        check_in = self.data.get('check_in')
        check_out = self.data.get('check_out')

        if check_in is not None and check_out is not None:
            queryset = queryset.exclude(
                Q(reservations__date_in__lt=check_out)
                & Q(reservations__date_out__gt=check_in)
            )
        elif check_in is not None:
            queryset = queryset.exclude(
                Q(reservations__date_in__lte=check_in)
                & Q(reservations__date_out__gt=check_in)
            )
        elif check_out is not None:
            queryset = queryset.exclude(
                Q(reservations__date_in__lt=check_out)
                & Q(reservations__date_out__gt=check_out)
            )
        return queryset
