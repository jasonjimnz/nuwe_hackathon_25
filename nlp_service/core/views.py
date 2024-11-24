import json
from typing import Any, Dict

import requests
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

from .graph import add_user_word_token
from .models import WordToken


# Create your views here.


class ParseView(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

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
                try:
                    word = WordToken.objects.get(lemma=token.lemma_, word=token.text)
                except WordToken.DoesNotExist:
                    word = WordToken(lemma=token.lemma_, word=token.text)
                    word.save()
                words.append(word.get_json())
        return JsonResponse(
            {
                "tokens": words,
                "text": data['text']
            }
        )



class BackendLogin(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = json.loads(self.request.body.decode('utf-8'))
        call = requests.post(
            f"{settings.BACKEND_SERVICE_URL}/api/auth/sign-in",
            data={
                'Email': data['email'],
                'Password': data['password']
            }
        )
        access_token = call.json()["access_token"]
        user_data = requests.get(
            f"{settings.BACKEND_SERVICE_URL}/api/user/getUserDetail",
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
        )

        self.request.session.__setitem__('access_token', access_token)

        return JsonResponse(
            {
                "token": access_token,
                "user_data": user_data.json()
            }
        )


class BaseApiView(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def check_token(self):
        access_token = self.request.headers.get('Authorization')
        user_data = requests.get(
            f"{settings.BACKEND_SERVICE_URL}/api/user/getUserDetail",
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'{access_token}'
            }
        )
        return user_data


class CheckToken(BaseApiView):

    def get(self, request, *args, **kwargs):
        user_data = self.check_token()
        if user_data.status_code == 401:
            return JsonResponse(
                user_data.json,
                status=401
            )
        return JsonResponse(
            user_data.json()
        )


# TODO: Listado mensajes
class MessagesList(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

# TODO: Listado pacientes por médico
class PatientList(View):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class GetMyMessagesView(BaseApiView):
    def get(self, request, *args, **kwargs):
        user_data = self.check_token()
        if user_data.status_code == 401:
            return JsonResponse(
                user_data.json,
                status=401
            )
        user = user_data.json()
        sent_messages = requests.get(
            f'{settings.BACKEND_SERVICE_URL}/api/messages/sent/{user["id"]}',
            headers={
                'Content-Type': 'application/json',
                'Authorization': self.request.headers.get('Authorization')
            }
        )

        # received_messages = requests.get(f'{settings.BACKEND_SERVICE_URL}/api/messages/received/{user["id"]}')
        # consultation_messages = requests.get(f'{settings.BACKEND_SERVICE_URL}/api/messages/consultation/{user["id"]}')
        messages= sent_messages.json()
        return JsonResponse(messages, safe=False)


class SendMessageView(BaseApiView):
    def post(self, request, *args, **kwargs):
        data = json.loads(self.request.body.decode('utf-8'))
        user_data = self.check_token()
        if user_data.status_code == 401:
            return JsonResponse(
                user_data.json,
                status=401
            )
        user = user_data.json()

        send_message = requests.post(
            f'{settings.BACKEND_SERVICE_URL}/api/messages',
            json={
                "content": str(data['content']),
                "senderId": int(user['id']),
                "receiverId": int(data['receiverId']),
                "consultationId": int(data.get('consultationId', '1'))
            },
            headers={
                'Content-Type': 'application/json',
                'Authorization': self.request.headers.get('Authorization')
            }
        )

        return JsonResponse(send_message.json(), safe=False)


class LoginView(TemplateView):
    template_name = 'login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

    def post(self, request, *args, **kwargs):
        data = self.request.POST
        call = requests.post(
            f"{settings.BACKEND_SERVICE_URL}/api/auth/sign-in",
            data={
                'Email': data['email'],
                'Password': data['password']
            }
        )
        access_token = call.json()["access_token"]
        user_data = requests.get(
            f"{settings.BACKEND_SERVICE_URL}/api/user/getUserDetail",
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
        )

        self.request.session.__setitem__('access_token', access_token)
        self.request.session.__setitem__('user_data', user_data.json())

        return redirect(reverse('chat'))


class ChatView(TemplateView):
    template_name = 'chat.html'


    def get_messages(self, access_token: str, user_data: Dict[str, Any]):
        messages = []
        r = requests.get(
            f"{settings.BACKEND_SERVICE_URL}/api/messages/received/{user_data['id']}",
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
        )

        r2 = requests.get(
            f"{settings.BACKEND_SERVICE_URL}/api/messages/sent/{user_data['id']}",
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
        )
        messages.extend(r.json())
        messages.extend(r2.json())
        return messages

    def post(self, request, *args, **kwargs):
        data = self.request.POST
        r = requests.post(
            f"{settings.BACKEND_SERVICE_URL}/api/messages",
            json={
                "content": data['text'],
                "senderId": int(self.request.session.get('user_data')['id']),
                "receiverId": int(self.kwargs.get('user_id')),
                "consultationId": int('1')
            },
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.request.session.get("access_token")}'
            }
        )

        return redirect(reverse('chat', kwargs={'user_id': self.kwargs.get('user_id')}))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['access_token'] = self.request.session.get('access_token')
        context['user_data'] = self.request.session.get('user_data')
        context['messages'] = self.get_messages(context['access_token'], context['user_data'])
        context['chat_to'] = self.kwargs.get('user_id')
        return context


class ListUsersViews(TemplateView):
    template_name = 'users.html'

    def get_users(self):
        user_data = []
        valid_user_ids = [1,2,3]
        for v in valid_user_ids:
            if v != self.request.session.get('user_data')['id']:
                r = requests.get(
                    f'{settings.BACKEND_SERVICE_URL}/api/user/id/{v}',
                    headers={
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {self.request.session.get("access_token")}'
                    }
                )
                if r.status_code == 200:
                    user_data.append(r.json())
        return user_data

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['users'] = self.get_users()
        return context