from rest_framework import serializers
from .models import TimeMap

class TimeMapSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeMap
        fields = ('id', 'name', 'data',)
