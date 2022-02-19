from api.serializers import ProductoSerializer


from api.views import *

def producto(request):
    id_tipo_envio = ProductoDetalle.filter.id
    return {'producto':id_tipo_envio}