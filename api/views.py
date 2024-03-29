from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import *
from link.models import *

from django.db.models import Q
# Create your views here.

class Clientelist(APIView):
    def get(self, request):
        clie = Clientes.objects.all()
        data = ClienteSerializer(clie, many=True).data
        return Response(data)

class ClienteDetalle(APIView):
    def get(self,request, codigo_cliente):
        clie = get_object_or_404(Clientes,codigo_cliente=codigo_cliente)
        data = ClienteSerializer(clie).data
        return Response(data)

class Productolist(APIView):
    def get(self, request):
        prod = Tarifario.objects.all()
        data = ProductoSerializer(prod, many=True).data
        return Response(data)

class ProductoDetalle(APIView):
    def get(self,request, pk):
        prod = get_object_or_404(Tarifario,pk=pk)
        data = ProductoSerializer(prod).data        
        
        return Response(data)