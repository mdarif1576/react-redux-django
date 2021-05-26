from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from user_blog_api import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user_blog_api/register/', views.UserRegister.as_view()),
    path('user_blog_api/getuser/<int:pk>/', views.UserDetail.as_view()),
    path('user_blog_api/getuserblogs/<int:pk>/', views.UserBlogDetail.as_view()),
    # path('api-auth/', include('rest_framework.urls')),
    path('user_blog_api/', views.BlogList.as_view()),
    path('user_blog_api/<int:pk>/', views.BlogDetail.as_view()),
    path('user_blog_api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user_blog_api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)   