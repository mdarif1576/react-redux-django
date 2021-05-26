from django.contrib import admin
from .models import Blog

# Register your models here.


# from django.apps import apps



# my custom registration
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['id', 'blog_heading', 'blog_content', 'created_at','user_id']