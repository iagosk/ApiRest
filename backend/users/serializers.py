from rest_framework import serializers
from .models import User

class UserReadSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'nameUser','fullName', 'age', 'is_admin', 'password']

class UserWriteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['nameUser', 'fullName', 'age', 'password']
        