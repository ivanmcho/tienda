import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import Empresa
from api.serializers import EmpresaSerializer, EmpresaRegistroSerializer

from django.db import transaction
from copy import deepcopy

class EmpresaViewset(viewsets.ModelViewSet):
    queryset = Empresa.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EmpresaSerializer
        else:
            return EmpresaRegistroSerializer

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
                serializer = EmpresaRegistroSerializer(data=request.data)
                if(serializer.is_valid()):                
                    empresa = Empresa.objects.create(
                        nombre = data.get('nombre'),
                    )                    
                    serializer = EmpresaRegistroSerializer(empresa)
                    # RegistroBitacora.crearEmpresa(request.user, serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)        
                else:
                    Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
    def update(self, request, *args, **kwargs):        
        try:
            instancia = self.get_object()
            anterior = deepcopy(instancia)
            json_anterior = EmpresaRegistroSerializer(anterior)
			

            #print("instancia: ", instancia.__dict__)
            data = request.data
            serializer = EmpresaRegistroSerializer(data=request.data)
            if(serializer.is_valid()):
                instancia.nombre = data.get('nombre')                
         
                instancia.save()

                
                return Response(serializer.data, status=status.HTTP_201_CREATED)        
            else:
                Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)