from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


class ChatListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        conversations = Conversation.objects.filter(
            participantes__user_id=request.user.id
        ).distinct()


        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)
    
class MessageListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_id):
        conversation = get_object_or_404(
            Conversation,
            id=chat_id,
            participantes__user=request.user
        )

        messages = conversation.messages.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    def post(self, request, chat_id):
        conversation = get_object_or_404(
            Conversation,
            id=chat_id,
            participantes__user=request.user
        )

        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                sender=request.user,
                conversation=conversation
            )
            return Response(serializer.data, status=201)
        return Response(serializer.errors,status=400)