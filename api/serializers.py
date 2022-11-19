from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from api.general_serializer import *

from link.models import *
<<<<<<< HEAD
from impa.models import *

=======
>>>>>>> 9cc37fec992af651cec4f2a352743cc414d2984e

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

<<<<<<< HEAD
class ImpGuiasSerializer(serializers.ModelSerializer):
    numini = serializers.StringRelatedField()
    numfin = serializers.StringRelatedField()
    class Meta:
        model= ImpGuias
        fields ='__all__'
=======
    
>>>>>>> 9cc37fec992af651cec4f2a352743cc414d2984e
