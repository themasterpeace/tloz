from dataclasses import field
from pyexpat import model
from rest_framework import serializers

from link.models import *

class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model= Clientes
        fields = '__all__'
        
        
