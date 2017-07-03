from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from users.views import UserViewSet
from timemapper.views import TimeMapViewSet
from sites.views import HomeView, MapView, AboutView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'timemap', TimeMapViewSet)

print(settings.STATIC_ROOT, settings.STATIC_URL)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^django-rq/', include('django_rq.urls')),
    url(r'^api/v1/', include('authentication.urls')),
    url(r'^api/v1/', include(router.urls)),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    url(r'^$', HomeView.as_view()),
    url(r'^about/$', AboutView.as_view()),
    url(r'^map/$', MapView.as_view()),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
