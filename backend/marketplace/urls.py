from rest_framework.routers import DefaultRouter
from .views import SessionViewSet, BookingViewSet

router = DefaultRouter()
router.register("sessions", SessionViewSet)
router.register("bookings", BookingViewSet)

urlpatterns = router.urls
