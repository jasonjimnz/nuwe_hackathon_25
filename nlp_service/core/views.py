import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from .graph import add_user_word_token


# Create your views here.


class ParseView(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
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
