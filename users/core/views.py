# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import User, Group, UserGroup
# from .serializers import UserSerializer, GroupSerializer, UserGroupSerializer
# users/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SessionLocal, User
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password
from sqlalchemy.orm import Session
from .models import SessionLocal, User, Group
from .serializers import GroupSerializer, UserSerializer


@api_view(['POST'])
def create_group(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        group_data = serializer.validated_data
        db = SessionLocal()
        try:
            group = Group(groupID=group_data['groupID'], name=group_data['name'], type=group_data.get('type'))
            db.add(group)
            db.commit()
            db.refresh(group)
            return Response(group.to_dict(), status=status.HTTP_201_CREATED)
        except Exception as e:
            db.rollback()
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        finally:
            db.close()
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_group_name(request):
    # Fetch the group from the database using the provided groupID
    print("check up name", request.data)
    db = SessionLocal()
    try:
        groupID = request.data.get('groupID')
        type = request.data.get('type')
        group = db.query(Group).filter(Group.groupID == groupID).first()
        if group is None:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        # Extract the new name from the request data
        new_name = request.data.get('name')
        if not new_name:
            return Response({'error': 'Name field is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the group name
        group.name = new_name
        group.type = type
        print("grp ch", group)
        db.commit()
        db.refresh(group)
        return Response(group.to_dict(), status=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()

@api_view(['POST'])
def add_members_to_group(request):
    username = request.data.get('username')
    group_id = request.data.get('GroupID')
    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    db = SessionLocal()
    try:
        group = db.query(Group).filter(Group.groupID == group_id).first()
        if not group:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if user not in group.users:
            group.users.append(user)
        
        db.commit()
        return Response("Successfully added members to the group", status=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()

@api_view(['PATCH'])
def update_member_to_group(request):
    username = request.data.get('username')
    action = request.data.get('action')  # "add" or "remove"
    group_id = request.data.get('GroupID')

    if action not in ['add', 'remove']:
        return Response({'error': 'Invalid action. Use "add" or "remove".'}, status=status.HTTP_400_BAD_REQUEST)
    
    db = SessionLocal()
    try:
        # Find the group by ID
        group = db.query(Group).filter(Group.groupID == group_id).first()
        print(group)
        if not group:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        # Find the user by username
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if action == 'add':
            if user not in group.users:
                group.users.append(user)
                db.commit()
                return Response("member in the group is updated", status=status.HTTP_200_OK)
            return Response({'message': 'User is already a member of the group'}, status=status.HTTP_400_BAD_REQUEST)
        
        if action == 'remove':
            if user in group.users:
                group.users.remove(user)
                db.commit()
                return Response('member removed', status=status.HTTP_200_OK)
            return Response({'message': 'User is not a member of the group'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        db.rollback()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    finally:
        db.close()    

@api_view(['DELETE'])
def delete_group(request):
    # Fetch the group from the database using the provided groupID
    db = SessionLocal()
    group_id = request.data.get('groupID')
    try:
        group = db.query(Group).filter(Group.groupID == group_id).first()
        if group is None:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        # Delete the group
        db.delete(group)
        db.commit()
        return Response({'Group deleted successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()




@api_view(['GET'])
def list_groups(request):
    db = SessionLocal()
    try:
        groups = db.query(Group).all()
        grps = [group.to_dict() for group in groups]
        return Response(grps, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()

###
@api_view(['POST'])
def sign_up(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        db = SessionLocal()
        try:
            user = User(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            db.add(user)
              # Calling the to_dict method here                
            db.commit()
            users = db.query(User).all()
            user_dicts = [user.to_dict() for user in users]
            return Response(user_dicts, status=status.HTTP_200_OK)
        except Exception as e:
            db.rollback()
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        finally:
            db.close()
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_users(request):
    db = SessionLocal()
    try:
        users = db.query(User).all()
        user_dicts = [user.to_dict() for user in users]
        print("user_dicts", user_dicts)  # Calling the to_dict method here
        return Response(user_dicts, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    finally:
        db.close()

@api_view(['POST'])
def sign_in(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        db = SessionLocal()
        try:
            user = db.query(User).filter(User.email == email).first()
            if user:
                users = db.query(User).all()
                user_dicts = [user.to_dict() for user in users]  # Calling the to_dict method here
                return Response(user_dicts, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        finally:
            db.close()
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def get_all_user_groups_by_email(request):
    email = request.data.get('email')
    db = SessionLocal()
    try:
        groups = db.query(Group).join(Group.users).filter(User.email == email).all()
        grp_dicts = [group.to_dict() for group in groups]  # Calling the to_dict method here
        for group in grp_dicts:
         group['users'] = [user['username'] for user in group['users']]
        # print(grp_dicts)  
        return Response(grp_dicts, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    finally:
        db.close()

@api_view(['POST'])
def get_user_details_by_email(request):
    email = request.data.get('email')
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            user_dict = user.to_dict()  # Assuming you have a to_dict method in your User model
            return Response(user_dict, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        db.close()
