from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User

# Create your models here.

class Blog(models.Model):
    blog_heading = models.CharField(max_length=50)
    blog_content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.blog_heading+'-'+str(self.user_id)


    


