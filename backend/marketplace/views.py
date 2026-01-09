# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Session, Booking
from .serializers import SessionSerializer, BookingSerializer
from .permissions import IsCreator


class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsCreator()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Booking.objects.all()

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        session_id = request.data.get("session")

        if Booking.objects.filter(
            user=request.user,
            session_id=session_id
        ).exists():
            return Response(
                {"error": "Already booked"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
