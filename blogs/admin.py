from django.contrib import admin
from .models import Blog


class BlogAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Blog, BlogAdmin)