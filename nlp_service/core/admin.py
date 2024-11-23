from django.contrib import admin

from .models import WordToken, UserToken

# Register your models here.


admin.site.register(WordToken)
admin.site.register(UserToken)
