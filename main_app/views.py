from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PokemonSerializer
from .models import Pokemon

# Create your views here.

#* /api/ root testing route
def api_root(request):
  return HttpResponse('<h1>You get to the root of API, everything works</h1>')

#* /api/pokemon_favs GET and POST route
@api_view(['GET', 'POST'])
def api_pokemon_favs(request):
  if (request.method == 'GET'):
    favs = Pokemon.objects.all()
    serializer = PokemonSerializer(favs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK )
  elif (request.method == 'POST'):
    serializer = PokemonSerializer(data=request.data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  # return HttpResponse('<p>Get your favorite pokemons </p>')

#* /api/pokemon_favs/<str: name> DELETE route
@api_view(['DELETE'])
def api_pokemon_favs_name(request, name):
  if (request.method == 'DELETE'):
    pokemon = Pokemon.objects.get(name=name)
    pokemon.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  return HttpResponse(f'<p>Oops, you can only delete {name} here</p>')