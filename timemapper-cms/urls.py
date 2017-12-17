from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views

from rest_framework.routers import DefaultRouter

from users.views import UserViewSet
from timemapper.views import TimeMapViewSet
from sites.views import HomeView, MapView, AboutView, CMSView, RebellionView, ArmyLifeView, JewishLifeView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'timemap', TimeMapViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('authentication.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='logout'),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    url(r'^$', HomeView.as_view()),
    url(r'^about/$', AboutView.as_view()),
    url(r'^about/boxer-rebellion/?$', RebellionView.as_view()),
    url(r'^about/army-life/?$', ArmyLifeView.as_view()),
    url(r'^about/jewish-life/?$', JewishLifeView.as_view()),
    url(r'^map/$', MapView.as_view()),
    url(r'^cms/$', CMSView.as_view()),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
