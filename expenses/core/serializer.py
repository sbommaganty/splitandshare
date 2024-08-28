# from rest_framework import serializers
# from .models import SettleUp

# class SettleUpSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SettleUp
#         fields = '__all__'


from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.Serializer):
    settlement_id = serializers.IntegerField(required=False)
    expenseID = serializers.CharField(max_length=100, required=False)
    group_id = serializers.CharField(max_length=100, required=False)
    payer_name = serializers.CharField(max_length=100, required=False)
    payee_name = serializers.CharField(max_length=100, required=False)
    expenseType = serializers.CharField(max_length=1000, required=False)
    activeType = serializers.IntegerField(required=False)
    price = serializers.FloatField(required=False)
    amount = serializers.FloatField(required=False)
    description = serializers.CharField(max_length=100, required=False)
    is_settled = serializers.CharField(required=False)


class BalanceSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(required=False)  # Specify length for VARCHAR
    status = serializers.CharField(required=False)
    amountOwned = serializers.IntegerField(required=False)    
