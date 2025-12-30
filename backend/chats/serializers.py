from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.username", read_only=True)
    is_me = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'sender_name',
            'content',
            'created_at',
            'is_me',
        ]
        read_only_fields = ["sender"]
        
    def get_is_me(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.sender == request.user
        return False   

        

class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()

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
    
    def get_photo(self, obj):
         request = self.context.get("request")
         if obj.photo and request:
              return request.build_absolute_uri(obj.photo.url)
         return None