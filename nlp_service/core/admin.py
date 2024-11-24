from django.contrib import admin

from .models import WordToken, UserToken, Pathology

# Register your models here.


admin.site.register(WordToken)
admin.site.register(UserToken)
admin.site.register(Pathology)