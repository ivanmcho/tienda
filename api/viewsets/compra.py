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
from api.models import Producto, Empresa, Compra
from django.contrib.auth.models import User
from api.serializers import CompraSerializer, CompraRegistroSerializer

from django.db import transaction
from copy import deepcopy


class CompraViewset(viewsets.ModelViewSet):
    queryset = Compra.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CompraSerializer,
        else:
            return CompraSerializer

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
                serializer = CompraSerializer(data=request.data)
                print("imprimiendo", data)
                if(serializer.is_valid()):
                    producto = None
                    print("es valido")
                    idProducto = data.get('id')
                    producto = Producto.objects.get(pk=idProducto)
                
                    print(producto)
                    cantidad = int(data.get('cantidad'))
                    precio=float(data.get('precio'))
                    comprador = request.user.id
                    compradorF=User.objects.get(
                        pk=comprador)
                    total = cantidad*precio
                    print("Producto: ", producto)
                    print("cantidad: ", cantidad)
                    print("total: ", total)
                    print("comprador: ", compradorF)


                    compra = Compra.objects.create(
                        producto=producto,
                        cantidad=cantidad,
                        total=total,
                        comprador=compradorF,

                    )
                    print("holassdf")
                    completaCompleto = CompraSerializer(compra)
                    # RegistroBitacora.crearEmpresa(request.user, serializer.data)
                    return Response(completaCompleto.data, status=status.HTTP_201_CREATED)
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

    @action(methods=["get"], detail=False)
    def productosVendedor(self, request, *args, **kwargs):
        # id = request.GET["id"
        vendedor = request.user.id
        productos = Producto.objects.filter(vendedor=vendedor)
        page = self.paginate_queryset(productos)
        if page is not None:
            serializer = ProductoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductoSerializer(productos, many=True)
        # RegistroBitacora.crearEmpresa(request.user, serializer.data)
        return Response({"results": serializer.data}, status=status.HTTP_201_CREATED)

    @action(methods=["get"], detail=False)
    def tienda(self, request, *args, **kwargs):
        # id = request.GET["id"
        vendedor = request.user.id
        productos = Producto.objects.exclude(vendedor=vendedor)
        page = self.paginate_queryset(productos)
        if page is not None:
            serializer = ProductoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductoSerializer(productos, many=True)
        # RegistroBitacora.crearEmpresa(request.user, serializer.data)
        return Response({"results": serializer.data}, status=status.HTTP_201_CREATED)

    
