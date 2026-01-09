from django.contrib import admin

# Register your models here.
from .models import Session, Booking

admin.site.register(Session)
admin.site.register(Booking)
