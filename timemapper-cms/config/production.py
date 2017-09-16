from configurations import values
from .common import Common


class Production(Common):

    DEBUG = values.BooleanValue(True)
    for config in Common.TEMPLATES:
        config['OPTIONS']['debug'] = DEBUG

    ALLOWED_HOSTS = ["*"]

    INSTALLED_APPS = Common.INSTALLED_APPS
    INSTALLED_APPS += ("gunicorn", )

    # Mail
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 1025
    EMAIL_BACKEND = values.Value('django.core.mail.backends.console.EmailBackend')

