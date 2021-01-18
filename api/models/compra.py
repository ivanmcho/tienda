from django.db import models
from django.contrib.auth.models import User
from api.models import Empresa, Producto


class Compra(models.Model):
    producto = models.ForeignKey(Producto, related_name="compra_producto", on_delete=models.deletion.CASCADE)
    cantidad = models.IntegerField(default=0) 
    total = models.DecimalField(max_digits=7, decimal_places=2)

    comprador = models.ForeignKey(User, related_name="compra_user",blank=True, null=True ,on_delete=models.deletion.CASCADE)
    nombreComprador = models.CharField(max_length=200, null=True, blank=True)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.producto

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
