from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

# Conversas
class Conversation(models.Model):
    is_group = models.BooleanField(default=False)
    name = models.CharField(max_length=100, blank=True, null=True)
    photo = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name if self.name else f"chat {self.id}"
    

class ConversationParticipant(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        related_name="participantes",
        on_delete=models.CASCADE
    )

    user = models.ForeignKey(
        User,
        related_name="conversations",
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ('conversation', 'user')
    
    def __str__(self):
        return f"{self.user} in {self.conversation}"
    

class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        related_name="messages",
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User,
        related_name="sent_messages",
        on_delete=models.CASCADE
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"MEssage {self.id} from {self.sender}"
    

class Contact(models.Model):
    user = models.ForeignKey(
        User,
        related_name="my_contacts",
        on_delete=models.CASCADE    
    )
    contact = models.ForeignKey(
        User,
        related_name="in_contacts",
        on_delete=models.CASCADE    
    )

    class Meta:
        unique_together = ('user', 'contact')

    def __str__(self):
        return f"{self.user} -> {self.contact}"