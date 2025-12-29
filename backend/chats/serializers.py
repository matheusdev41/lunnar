from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.username", read_only=True)

    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'sender_name',
            'content',
            'created_at',
        ]
        read_only_fields = ["sender"]

class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = [
            'id',
            'name',
            'photo',
            'is_group',
            'last_message',
        ]

    def get_last_message(self, obj):
        last = obj.messages.last()
        if last:
            return {
                "content": last.content,
                "created_at": last.created_at
            }
        return None