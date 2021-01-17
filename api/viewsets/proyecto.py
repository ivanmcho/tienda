import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status, filters, viewsets
from api.models import Producto, Empresa
from api.serializers import ProductoSerializer, ProductoRegistroSerializer

from django.db import transaction
from copy import deepcopy


class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoSerializer
        else:
            return ProductoSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                serializer = ProductoSerializer(data=request.data)
                print("imprimiendo", data)
                if(serializer.is_valid()):
                    empresa = None
                    print("es valido")
                    if(data.get('idEmpresa').get('__isNew__')):
                        empresa = Empresa.objects.create(
                            nombre=data.get('idEmpresa').get('label')
                        )
                    else:
                        idEmpresa = data.get('idEmpresa').get('value')
                        empresa = Empresa.objects.get(pk=idEmpresa)
                    
                    precio = data.get('precio')
                    vendedor = request.user
                    print(precio, vendedor.id,"hola")

                    proyecto = Producto.objects.create(
                        idEmpresa=empresa,
                        nombre=data.get('nombre'),
                        precio=precio,
                        vendedor=vendedor,

                    )
                    print("holassdf")
                    proyectoCompleto = ProductoSerializer(proyecto)
                    # RegistroBitacora.crearEmpresa(request.user, serializer.data)
                    return Response(proyectoCompleto.data, status=status.HTTP_201_CREATED)
                else:
                    Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def proyectosClientes(self, request, *args, **kwargs):
        # id = request.GET["id"
        cliente = request.user
        asignaciones = cliente.asignacion_usuarios.all()
        lista = []
        for asignacion in asignaciones:
            lista.append({
                "id": asignacion.idProyecto.id,
                "nombre": asignacion.idProyecto.nombre,
            })

        return Response({"results": lista},
                        status=status.HTTP_200_OK)

    @action(methods=["get"], detail=True)
    def proyectosCliente(self, request, *args, **kwargs):
        # id = request.GET["id"]
        idCliente = request.data
        id = idCliente.get("id")
        print("Este es el id ", id)
        # print("peticion", id)
        cliente = User.objects.get(pk=id)
        # print("clienteObvtenido", cliente)
        asignaciones = cliente.asignacion_usuarios.all()
        lista = []
        for asignacion in asignaciones:
            lista.append({
                "id": asignacion.idProyecto.id,
                "nombre": asignacion.idProyecto.nombre,
            })

        return Response({"results": lista},
                        status=status.HTTP_200_OK)

    
