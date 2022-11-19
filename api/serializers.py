from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from api.general_serializer import *

from link.models import *
from impa.models import *


class ClienteSerializer(serializers.ModelSerializer):
    municipio = serializers.StringRelatedField()
    depto = serializers.StringRelatedField()
    class Meta:
        model= Clientes
        fields ='__all__' 

        
class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model= Tarifario
        fields = '__all__'     

class ImpGuiasSerializer(serializers.ModelSerializer):
    numini = serializers.StringRelatedField()
    numfin = serializers.StringRelatedField()
    class Meta:
        model= ImpGuias
        fields ='__all__'