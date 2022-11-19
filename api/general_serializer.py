from rest_framework import serializers

from link.models import *
from impa.models import *

class DepartamentoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Departamento
        fields ='__all__' 

class MunnicipioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Municipio
        fields ='__all__' 

 