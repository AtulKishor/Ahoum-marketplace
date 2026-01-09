from django.db import models

# Create your models here.
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Session(models.Model):
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sessions"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Booking(models.Model):
    BOOKED = "BOOKED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

    STATUS_CHOICES = [
        (BOOKED, "Booked"),
        (COMPLETED, "Completed"),
        (CANCELLED, "Cancelled"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default=BOOKED
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "session")

    def __str__(self):
        return f"{self.user} → {self.session}"
