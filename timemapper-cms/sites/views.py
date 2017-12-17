from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

class HomeView(TemplateView):
    template_name = "home.html"


class MapView(TemplateView):
    template_name = 'map.html'


class AboutView(TemplateView):
    template_name = 'about.html'


class RebellionView(TemplateView):
    template_name = 'boxer.html'


class ArmyLifeView(TemplateView):
    template_name = 'army-life.html'


class JewishLifeView(TemplateView):
    template_name = 'jewish-life.html'


class CMSView(LoginRequiredMixin, TemplateView):
    template_name = 'cms.html'
    login_url = '/login/'
    redirect_field_name = 'redirect_to'
