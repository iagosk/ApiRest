from django.db import models

# Create your models here.
class User(models.Model):
    fullName = models.CharField(max_length=100)
    age = models.IntegerField()
    nameUser = models.CharField(100)
    password = models.CharField(100)

def __str__(self):
    return self.name