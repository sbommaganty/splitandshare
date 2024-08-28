from django.urls import path
from . import views

urlpatterns = [
    # path('settle_up/', views.settle_up_list, name='settle_up_list'),
    # path('settle_up/<int:pk>/', views.settle_up_detail, name='settle_up_detail'),
    path('create_expense/', views.create_expense, name='create_expense'),
    path('list_expenses/', views.list_expenses, name='list_expenses'),
    path('delete_expenses/', views.delete_expenses_by_description, name='delete_expenses'),
    path('get_ind_data/', views.get_ind_data, name='get_ind_data'),
    path('get_ind_data2/', views.get_ind_data2, name='get_ind_data2'),
]
