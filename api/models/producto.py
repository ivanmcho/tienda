from django.db import models
from django.contrib.auth.models import User
from api.models.empresa import Empresa


class Producto(models.Model):
    nombre = models.CharField(max_length=200, null=True)
    idEmpresa = models.ForeignKey(Empresa, related_name="Empresa",blank=True, null=True ,on_delete=models.deletion.CASCADE)
    descripcion= models.TextField(max_length=255, null=True, blank=True )
    precio = models.DecimalField(max_digits=7, decimal_places=2)
    vendedor = models.ForeignKey(User, related_name="producto_user", null=True ,on_delete=models.deletion.CASCADE)
    comprador = models.ForeignKey(User, related_name="Comprador",blank=True, null=True ,on_delete=models.deletion.CASCADE)
    nombreComprador = models.CharField(max_length=200, null=True, blank=True)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
