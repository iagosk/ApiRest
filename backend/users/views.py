from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import User
from .serializers import UserReadSerializer, UserWriteSerializer

# # Registro de usuários.
# class UserRegisterView(generics.CreateAPIView):
#     # Adição da permissão de classe autenticada na view.
#     # permission_classes = [IsAuthenticated]

#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# View para listagem de  usuários *Ação permitida apenas para usuários Admin.
class UserAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserReadSerializer
        return UserWriteSerializer

# View para dashboard de usuário *Ação permitida para todos os usuários autenticados.
class UserCustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserReadSerializer
        return UserWriteSerializer