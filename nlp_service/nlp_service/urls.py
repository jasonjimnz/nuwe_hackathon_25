"""
URL configuration for nlp_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from core import views as core_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('parse', core_views.ParseView.as_view(), name='parse'),
    path('api_parse', core_views.BotParseView.as_view(), name='bot_parse'),
    path('api/login', core_views.BackendLogin.as_view(), name='api_login'),
    path('api/check_token', core_views.CheckToken.as_view(), name='api_check_token'),
    path('api/messages/received', core_views.GetMyMessagesView.as_view(), name='api_received_messages'),
    path('api/messages/send', core_views.SendMessageView.as_view(), name='api_send_message'),
    path('front/chat/<int:user_id>', core_views.ChatView.as_view(), name='chat'),
    path('front/login', core_views.LoginView.as_view(), name='front_login'),
    path('front/users', core_views.ListUsersViews.as_view(), name='front_users')
]
