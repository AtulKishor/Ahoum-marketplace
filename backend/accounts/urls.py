from django.urls import path
from .views import GoogleOAuthView, MeView

urlpatterns = [
    path("google/", GoogleOAuthView.as_view()),
    path("me/", MeView.as_view()),
]
