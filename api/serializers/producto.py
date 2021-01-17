from rest_framework import serializers
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    idEmpresa = serializers.SerializerMethodField("getEmpresa")
    #empresa = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'
        depth = 1

    def getEmpresa(self, obj):
        if(obj.idEmpresa is not None):
            return {'value': obj.idEmpresa.id, 'label': obj.idEmpresa.nombre}
        return None


class ProductoRegistroSerializer(serializers.ModelSerializer):
       class Meta:
        model = Producto
        fields = (
                'nombre',
                'idEmpresa',
                'precio',
                'vendedor',

            )