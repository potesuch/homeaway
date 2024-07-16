from django_filters import rest_framework as filters

from properties.models import Property


class PropertyFilter(filters.FilterSet):
    is_favorite = filters.BooleanFilter(method='is_favorite_filter')

    class Meta:
        model = Property
        fields = ('host',)

    def is_favorite_filter(self, queryset, name, value):
        if value and self.request.user.is_authenticated:
            return queryset.filter(in_favorite__user=self.request.user)
        return queryset
