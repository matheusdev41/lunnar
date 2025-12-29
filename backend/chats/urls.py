from django.urls import path
from .views import ChatListView, MessageListCreateView

urlpatterns = [
    path('chats/', ChatListView.as_view()),
    path('chats/<int:chat_id>/messages/', MessageListCreateView.as_view()),
]