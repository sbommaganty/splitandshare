from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

 
router = routers.DefaultRouter()

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # Include app URLs under 'api/' path

 ]


    
