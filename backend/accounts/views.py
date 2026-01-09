from django.shortcuts import render

# Create your views here.
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import User

class GoogleOAuthView(APIView):
    def post(self, request):
        token = request.data.get("access_token")

        if not token:
            return Response(
                {"error": "Access token required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify token with Google
        google_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {token}"}
        )

        if google_response.status_code != 200:
            return Response(
                {"error": "Invalid Google token"},
                status=status.HTTP_400_BAD_REQUEST
            )

        data = google_response.json()

        email = data.get("email")
        name = data.get("name", "")
        avatar = data.get("picture", "")

        if not email:
            return Response(
                {"error": "Email not available"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = User.objects.get_or_create(
            username=email,
            defaults={
                "email": email,
                "first_name": name,
                "avatar": avatar,
            }
        )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role,
                "avatar": user.avatar,
            }
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "avatar": user.avatar,
        })
