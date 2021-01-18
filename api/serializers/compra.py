from rest_framework import serializers
from api.models import Producto, Compra

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'
        depth = 1

class CompraRegistroSerializer(serializers.ModelSerializer):
       class Meta:
        model = Compra
        fields = '__all__'