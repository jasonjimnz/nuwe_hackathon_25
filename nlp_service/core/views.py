import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from .graph import add_user_word_token
from .models import WordToken


# Create your views here.


class ParseView(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        headers = self.request.headers.get('Authorization')
        if not headers:
            return JsonResponse({
                'msg': 'Missing Authorization token'
            }, status=400)
        if headers.replace('Bearer ', '') not in settings.VALID_API_TOKENS:
            return JsonResponse({
                'msg': 'Unauthorized token'
            }, status=401)
        data = json.loads(self.request.body.decode('utf-8'))

        tokens = settings.LANGUAGE_MODELS['es'](data['text'])
        for token in tokens:
            if token.pos_ in ['ADJ', 'VERB', 'PROPN']:
                add_user_word_token(
                    user_id="",
                    word=token.text,
                    text=data['text'],
                    lemma=token.lemma_
                )
        return JsonResponse(
            {
                "tokens": tokens.to_json(),
                "text": data['text']
            }
        )


class BotParseView(ParseView):
    def post(self, request, *args, **kwargs):
        data = json.loads(self.request.body.decode('utf-8'))

        tokens = settings.LANGUAGE_MODELS['es'](data['text'])
        words = []
        for token in tokens:
            if token.pos_ in ['ADJ', 'VERB', 'PROPN']:
                add_user_word_token(
                    user_id="",
                    word=token.text,
                    text=data['text'],
                    lemma=token.lemma_
                )
                word = WordToken(lemma=token.lemma_, word=token.text)
                word.save()
                words.append(word.get_json())
        return JsonResponse(
            {
                "tokens": words,
                "text": data['text']
            }
        )