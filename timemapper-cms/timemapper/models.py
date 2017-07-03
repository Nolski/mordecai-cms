from django.db import models
from django.contrib.postgres.fields.jsonb import JSONField

# Create your models here.
class TimeMap(models.Model):
    name = models.CharField(max_length=255, blank=True, default='')
    data = JSONField()

    class Meta:
        db_table = 'timemap'
