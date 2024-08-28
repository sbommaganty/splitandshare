from rest_framework import serializers
# from .models import User, Group, UserGroup

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'password']

# class GroupSerializer(serializers.ModelSerializer):
#     members = UserSerializer(many=True, read_only=True)  # Optional: Include member details in Group serialization

#     class Meta:
#         model = Group
#         fields = ['id', 'group_name', 'members']

# class UserGroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserGroup
#         fields = ['id', 'user', 'group']
# users/serializers.py

# class UserSerializer(serializers.Serializer):
#     id = serializers.IntegerField(required=False)  # Make the id field optional
#     username = serializers.CharField(max_length=255, required=False)
#     email = serializers.EmailField()
#     password = serializers.CharField(max_length=128)

# # users/serializers.py

from rest_framework import serializers
from .models import User, Group

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    username = serializers.CharField(max_length=50, required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(max_length=100, required=False)

class GroupSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True, required=False)
    groupID = serializers.CharField(max_length=255, allow_blank=True, required=False)
    name = serializers.CharField(max_length=100, required=False)
    type = serializers.CharField(max_length=255, allow_blank=True, required=False)
    users = UserSerializer(many=True, required=False)
    
    def create(self, validated_data):
        users_data = validated_data.pop('users', [])
        group = Group(**validated_data)
        print("check group", group)
        return group

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        return instance
