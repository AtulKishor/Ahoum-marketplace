from rest_framework import serializers
from .models import Session, Booking


class SessionSerializer(serializers.ModelSerializer):
    creator_email = serializers.EmailField(
        source="creator.email",
        read_only=True
    )

    class Meta:
        model = Session
        fields = [
            "id",
            "title",
            "description",
            "date",
            "price",
            "creator_email",
        ]


class BookingSerializer(serializers.ModelSerializer):
    session_title = serializers.CharField(
        source="session.title",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "session",
            "session_title",
            "status",
            "created_at",
        ]
        read_only_fields = ["status"]
