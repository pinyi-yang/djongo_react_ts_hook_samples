from django.urls import path
from . import views

urlpatterns = [
  path('', views.api_root, name='api_root'),
  path('pokemon_favs/', views.api_pokemon_favs, name='favs'),
  path('pokemon_favs/<str:name>/', views.api_pokemon_favs_name, name='pokemon'),
]

