"""
URL configuration for identity_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from identity.views import *
from identity_service import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from identity.views import UserImageViewSet
from django.urls import include

router = DefaultRouter()
router.register(r'UserImages', UserImageViewSet)

urlpatterns = [
    path('user-list', UserList.as_view(), name='user-list'),
    path('info/<str:user_name>', UserDetail.as_view(), name='info'),
    path('name/<str:email>', UserName.as_view(), name='name'),
    path('user-update/<str:user_name>', UpdateUserView.as_view(), name='user-update'),
    path('admin/', admin.site.urls),
    path('auth', AuthenticateToken.as_view(), name='auth'),
    path('register', RegisterUserView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('reset-code/<str:email>', ResetCodeView.as_view(), name='reset-code'),
    path('password-reset/<str:email>', PasswordResetView.as_view(), name='password-reset'),
    path('change-password/<str:email>', ChangePasswordView.as_view(), name='change-password'),
    path('conversations/create', CreateConversationView.as_view(), name='create-conversation'),
    path('conversations', ConversationListView.as_view(), name='conversation-list'),
    path('conversations/messages/<int:conversation_id>', MessageHistoryView.as_view(), name='message-history'),
    path('conversations/send_message/<int:conversation_id>', SendMessageView.as_view(), name='send-message'),
    path('conversations/mark_read/<int:conversation_id>', MarkMessagesAsReadView.as_view(), name='mark-messages-read'),
    path('rating/<str:user_name>', UpdateRatingView.as_view(), name='rating'),
    path('get-rating/<str:email>', GetRatingView.as_view(), name='rating'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)