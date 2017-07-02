from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = "home.html"

class MapView(TemplateView):
    template_name = "map.html"

class AboutView(TemplateView):
    template_name = "about.html"
