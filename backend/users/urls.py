from rest_framework.routers import DefaultRouter
from .views import UserAdminViewSet, UserCustomerViewSet
from django.urls import path, include

router = DefaultRouter()
# Listagem de usuários sem permissão para modificações.
router.register(r'users-list', UserAdminViewSet, basename='user-list')
router.register(r'user-dashboard', UserCustomerViewSet, basename='user-dashboard')

urlpatterns = [
    path('dashboard/', include(router.urls)),
    path('user-admin/', include(router.urls)),
]