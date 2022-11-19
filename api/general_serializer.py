from rest_framework import serializers

from link.models import *
<<<<<<< HEAD
from impa.models import *
=======
>>>>>>> 9cc37fec992af651cec4f2a352743cc414d2984e

class DepartamentoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Departamento
        fields ='__all__' 

class MunnicipioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Municipio
<<<<<<< HEAD
        fields ='__all__' 

 
=======
        fields ='__all__' 
>>>>>>> 9cc37fec992af651cec4f2a352743cc414d2984e
