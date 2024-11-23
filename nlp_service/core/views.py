import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


class ParseView(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = json.loads(self.request.body.decode('utf-8'))

        tokens = settings.LANGUAGE_MODELS['es'](data['text'])

        return JsonResponse(
            {
                "tokens": tokens.to_json(),
                "text": data['text']
            }
        )
