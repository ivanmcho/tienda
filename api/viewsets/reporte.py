import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters
from rest_framework.viewsets import GenericViewSet
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status, filters, viewsets
from api.models import Producto, Empresa, Compra
from django.contrib.auth.models import User
from api.serializers import ProductoSerializer, ProductoRegistroSerializer, UserReportSerializer

from django.db import transaction
from django.db.models import Q, Count, Avg, Sum 
from copy import deepcopy

class ReporteView(GenericViewSet):
    queryset = User.objects.all()
    @action(methods=["get"], detail=False)
    def reportePrincipal(self, request, *args, **kwargs):
        try:
            #Total de ventas por producto
            vendedor = request.user.id
            productos = Producto.objects.filter(vendedor=vendedor)
            total_producto = User.objects.annotate(total_venta=Sum("producto_user__compra_producto__total"))
            total_producto = total_producto.filter(pk=vendedor)

            #Total venta
            total_venta = 0
            queryset = Compra.objects.aggregate(total_Sum=Sum('total'))
            if queryset is None:
                total_venta = queryset['total']

            #Promedio de precios manejados
            promedio_product = 0.00
            queryset = Producto.objects.filter(vendedor= vendedor).aggregate(promedioProducto = Avg('precio'))
            if queryset is None:
                promedio_product = queryset['promedioProducto']
            
            data = {
                'total_producto': UserReportSerializer(total_producto).data,
                'total_venta': total_venta,
                'promedio_product': promedio_product,
            }

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)