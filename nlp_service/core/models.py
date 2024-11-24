import datetime
import json
import uuid
from typing import Any, Dict

from django.db import models
from django.utils import timezone


class ModelJsonSerializer(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.datetime, datetime.date, timezone)):
            return obj.isoformat()


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    alive = models.BooleanField(default=True)


    def get_json(self) -> Dict[str, Any]:
        return {
            'id': self.id.hex,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    class Meta:
        abstract = True


class WordToken(BaseModel):
    word = models.CharField(max_length=256)
    lemma = models.CharField(max_length=256)
    definition = models.TextField(null=True, blank=True)

    def get_json(self) -> Dict[str, Any]:
        return {
            **super().get_json(),
            'word': self.word,
            'lemma': self.lemma,
            'definition': self.lemma
        }

    class Meta:
        verbose_name = 'Word token'
        verbose_name_plural = 'Word tokens'
        unique_together = ('word', 'lemma')


class UserToken(BaseModel):
    user_id = models.CharField(max_length=1024)
    word_token = models.ForeignKey(WordToken, related_name='user_tokens', on_delete=models.CASCADE)

    def get_json(self) -> Dict[str, Any]:
        return {
            **super().get_json(),
            'user_id': self.user_id,
            'word_token': self.word_token.get_json()
        }

    class Meta:
        verbose_name = 'User token'
        verbose_name_plural = 'User tokens'


class Pathology(BaseModel):
    name = models.CharField(max_length=512)
    description = models.TextField(null=True, blank=True)
    score = models.IntegerField(
        default=0
    )
    def get_json(self) -> Dict[str, Any]:
        return {
            **super().get_json(),
            'name': self.name,
            'description': self.description,
            'score': self.score
        }


    class Meta:
        verbose_name = 'Pathology'
        verbose_name_plural = 'Pathologies'
