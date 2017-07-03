from rest_framework import viewsets, mixins
from .models import TimeMap
from .serializers import TimeMapSerializer


# Create your views here.
class TimeMapViewSet(mixins.UpdateModelMixin,
                     mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.ListModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    """
    Allows for Creating, Destroying, and Listing, Creating, and Getting
    TimeMaps
    """

    queryset = TimeMap.objects.all()
    serializer_class = TimeMapSerializer
