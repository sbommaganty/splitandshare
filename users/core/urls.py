from django.urls import path
from . import views

urlpatterns = [
    # User URLs
    # path('users/', views.user_list, name='user-list'),
    # path('users/<int:pk>/', views.user_detail, name='user-detail'),

    # #sign_in & sign_up
    # path('userin/', views.sign_in, name='sign-in'),
    path('userup/', views.sign_up, name='sign-up'),
    path('getallusers/', views.get_all_users, name='get_all_users'),
    path('userin/', views.sign_in, name='sign_in'),
    path('create_group/', views.create_group, name='create_group'),
    path('add_members/', views.add_members_to_group, name='add_members_to_group'),
    path('list_groups/', views.list_groups, name='list_groups'),
    path('update_member/', views.update_member_to_group, name='update_member'),
    path('update_group_name/', views.update_group_name, name='update_group_name'),
    path('delete_group/', views.delete_group, name='delete_group'),
    path('get_all_user_groups_by_email/', views.get_all_user_groups_by_email, name='get_all_user_groups_by_email'),
    path('get_user_details_by_email/', views.get_user_details_by_email, name='get_user_details_by_email'),

    # # Group URLs
    # path('groups/', views.group_list, name='group-list'),
    # path('groups/<int:pk>/', views.group_detail, name='group-detail'),

    # UserGroup URLs
    # path('usergroups/', views.usergroup_list, name='usergroup-list'),
    # path('usergroups/<int:pk>/', views.usergroup_detail, name='usergroup-detail'),
]
