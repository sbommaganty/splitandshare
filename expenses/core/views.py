from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sqlalchemy.orm import Session
from .models import SessionLocal, Expense
from .serializer import ExpenseSerializer
import pandas as pd
import numpy as np

@api_view(['POST'])
def create_expense(request):
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        expense_data = serializer.validated_data
        db = SessionLocal()
        try:
            users = request.data.get('users', [])
            user = request.data.get('user', {})
            # print("expense", request.data.get('user', {}))

            for user_name in users:
                expense = Expense(
                    expenseID=expense_data['expenseID'],
                    group_id=expense_data['group_id'],
                    payer_name=expense_data['payer_name'],
                    payee_name= user_name,  # End of loop processing each user ID
                    expenseType = expense_data['expenseType'],
                    activeType = expense_data['activeType'],
                    price=expense_data['price'],
                    amount=expense_data['amount'],
                    description=expense_data['description'],
                    is_settled=expense_data['is_settled']
                )
                db.add(expense)

            db.commit()  # Commit after the loop ends
            return Response("Expenses are created successfully", status=status.HTTP_201_CREATED)
        except Exception as e:
            db.rollback()
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        finally:
            db.close()
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_expenses_by_description(request):
    # Extract description from request data
    description = request.data.get('expenseID')
    
    if not description:
        # Return error response if description is not provided
        return Response({'error': 'Description is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    db = SessionLocal()
    try:
        # Query to find expenses with the given description
        expenses_to_delete = db.query(Expense).filter(Expense.expenseID == description).all()
        print(expenses_to_delete)
        if not expenses_to_delete:
            # Return not found response if no expenses are found
            return Response({'message': 'No expenses found with the given description'}, status=status.HTTP_404_NOT_FOUND)
        
        # Delete the found expenses
        for expense in expenses_to_delete:
            db.delete(expense)
        
        db.commit()  # Commit the transaction to persist changes
        return Response({'message': 'Expenses deleted successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()  # Rollback if any error occurs
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()  # Ensure the session is closed

@api_view(['GET'])
def list_expenses(request):
    db = SessionLocal()
    try:
        expenses = db.query(Expense).all()
        exp_dicts = [expense.to_dict() for expense in expenses] 
        return Response(exp_dicts, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()

@api_view(['POST'])
def get_ind_data(request):
    db = SessionLocal()
    try:
        group_id = request.data.get('group_id')
        username = request.data.get('username')
        user_data = request.data.get('user_data')
        print("data check", user_data)
        expenses = db.query(Expense).all()
        if expenses:
            exp_dicts = [expense.to_dict() for expense in expenses] 
            print("exp_dicts group_id", exp_dicts, group_id)
            filtered_data = list(filter(lambda entry: entry["group_id"] == group_id, exp_dicts))
            if filtered_data:
                    print("filtered_data", filtered_data)
                    trans_data = transform_expenses(filtered_data, user_data, group_id)
                    print("data 2", trans_data)
                    total_b = calculate(trans_data, username)
                    print(total_b)
                    return Response(total_b, status=status.HTTP_200_OK)
            else:
                Response([], status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()

def transform_expenses(data, user_data, group_id):
  
    print("trans check", data)
    transformed_expenses = []

    for index, expense_item in enumerate(data):
        # Find other expense records that share the same expenseID and group_id
        related_expenses = [item for item in data if item["expenseID"] == expense_item["expenseID"] and item["group_id"] == group_id]
        print("related_expenses", related_expenses)
        # Check if related_expenses is not empty
        if related_expenses:
            # Extract the common fields from the first related expense
            first_expense = related_expenses[0]

            # Build the expense object
            expense = {
                "activeType": first_expense["activeType"],
                "expensePrice": first_expense["price"],
                "expenseAmount": first_expense["amount"],
                "expenseName": first_expense["description"],
                "expenseType": first_expense["expenseType"],
                "group_ID": group_id,
                "id": first_expense["expenseID"],
                "members": {},
                "paidBy": {
                    "id": index + 1,  # Assign a unique ID or manage as per your logic
                    "name": first_expense["payer_name"]
                },
                "peoples": [item["payee_name"] for item in related_expenses],
                "settleUp": first_expense["is_settled"]
            }

            for person in user_data:
                if person["name"] in expense["peoples"]:
                    expense["members"][person["id"]] = True

            # Sort the members by key
            expense["members"] = dict(sorted(expense["members"].items()))

            # Add the transformed expense to the array
            transformed_expenses.append(expense)

    # Filter unique expenses
    unique_expenses = []
    seen_ids = set()
    for expense in transformed_expenses:
        if expense["id"] not in seen_ids:
            unique_expenses.append(expense)
            seen_ids.add(expense["id"])

    return unique_expenses


def calculate(expenses, user_name):
    # Step 1: Create a DataFrame from the expenses data
    data = []
    for expense in expenses:
        total_amount = expense["expensePrice"]
        members = expense["peoples"]
        paid_by = expense["paidBy"]["name"]
        share = total_amount / len(members)

        for member in members:
            if member != paid_by:  # Only add if the member is not the one who paid
                data.append([member, paid_by, share])

    df = pd.DataFrame(data, columns=["Owes", "Owed By", "Amount"])

    # Step 2: Calculate the total amount owed by each user
    result = df.groupby(["Owes", "Owed By"]).sum().reset_index()

    # Step 3: Adjust the result to account for mutual debts
    final_result = pd.DataFrame()
    processed_pairs = set()

    for i, row in result.iterrows():
        pair = tuple(sorted([row["Owes"], row["Owed By"]]))
        
        if pair in processed_pairs:
            continue

        reverse_row = result[(result["Owes"] == row["Owed By"]) & (result["Owed By"] == row["Owes"])]

        if not reverse_row.empty:
            amount_diff = row["Amount"] - reverse_row["Amount"].values[0]

            if amount_diff > 0:
                new_row = pd.DataFrame([{"Owes": row["Owes"], "Owed By": row["Owed By"], "Amount": amount_diff}])
                final_result = pd.concat([final_result, new_row], ignore_index=True)
            elif amount_diff < 0:
                new_row = pd.DataFrame([{"Owes": row["Owed By"], "Owed By": row["Owes"], "Amount": -amount_diff}])
                final_result = pd.concat([final_result, new_row], ignore_index=True)
        else:
            final_result = pd.concat([final_result, pd.DataFrame([row])], ignore_index=True)

        processed_pairs.add(pair)

    # Step 4: Display the output for a specific user
    owes = final_result[final_result["Owes"] == user_name]
    is_owed_by = final_result[final_result["Owed By"] == user_name]

    output = []

    for _, row in owes.iterrows():
        output.append({
            "name": row["Owed By"],
            "status": "You owe",
            "amount": round(row["Amount"], 2)
        })

    for _, row in is_owed_by.iterrows():
        output.append({
            "name": row["Owes"],
            "status": "You are owed",
            "amount": round(row["Amount"], 2)
        })

    return output


@api_view(['POST'])
def get_ind_data2(request):
    db = SessionLocal()
    try:
        group_id = request.data.get('group_id')
        # name = request.data.get('name')
        user_data = request.data.get('user_data')
        username = request.data.get('username')
        print("data check", user_data)
        expenses = db.query(Expense).all()
        if expenses:
            exp_dicts = [expense.to_dict() for expense in expenses] 
            print("exp_dicts group_id", exp_dicts, group_id )
            filtered_data = list(filter(lambda entry: entry["group_id"] == group_id, exp_dicts))
            if filtered_data:
                print("filtered_data", filtered_data)
                trans_data = transform_expenses2(filtered_data, user_data, group_id)
                print("data 2", trans_data)
                total_b = calculate2(trans_data, username)
                print("total_b2", total_b)
                return Response(total_b, status=status.HTTP_200_OK)
            else:  
             Response([], status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)       
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()

def transform_expenses2(data, user_data, group_id):
    print("trans check", data)
    transformed_expenses = []

    for index, expense_item in enumerate(data):
        print("nbv")
        # Find other expense records that share the same expenseID and group_id
        related_expenses = [item for item in data if item["expenseID"] == expense_item["expenseID"] and item["group_id"] == group_id]
        print("related_expenses", related_expenses)
        # Check if related_expenses is not empty
        if related_expenses:
            # Extract the common fields from the first related expense
            first_expense = related_expenses[0]

            # Build the expense object
            expense = {
                "activeType": first_expense["activeType"],
                "expensePrice": first_expense["price"],
                "expenseAmount": first_expense["amount"],
                "expenseName": first_expense["description"],
                "expenseType": first_expense["expenseType"],
                "group_ID": group_id,
                "id": first_expense["expenseID"],
                "members": {},
                "paidBy": {
                    "id": index + 1,  # Assign a unique ID or manage as per your logic
                    "name": first_expense["payer_name"]
                },
                "peoples": [item["payee_name"] for item in related_expenses],
                "settleUp": first_expense["is_settled"]
            }

            for person in user_data:
                if person["name"] in expense["peoples"]:
                    expense["members"][person["id"]] = True

            # Sort the members by key
            expense["members"] = dict(sorted(expense["members"].items()))

            # Add the transformed expense to the array
            transformed_expenses.append(expense)

    # Filter unique expenses
    unique_expenses = []
    seen_ids = set()
    for expense in transformed_expenses:
        if expense["id"] not in seen_ids:
            unique_expenses.append(expense)
            seen_ids.add(expense["id"])

    return unique_expenses



def calculate2(expenses, user_name):
    # Step 1: Create a DataFrame from the expenses data
    data = []
    for expense in expenses:
        total_amount = expense["expensePrice"]
        members = expense["peoples"]
        paid_by = expense["paidBy"]["name"]
        share = total_amount / len(members)

        for member in members:
            if member != paid_by:  # Only add if the member is not the one who paid
                data.append([member, paid_by, share])

    df = pd.DataFrame(data, columns=["Owes", "Owed By", "Amount"])

    # Step 2: Calculate the total amount owed by each user
    result = df.groupby(["Owes", "Owed By"]).sum().reset_index()

    # Step 3: Adjust the result to account for mutual debts
    final_result = pd.DataFrame()
    processed_pairs = set()

    for i, row in result.iterrows():
        pair = tuple(sorted([row["Owes"], row["Owed By"]]))
        
        if pair in processed_pairs:
            continue

        reverse_row = result[(result["Owes"] == row["Owed By"]) & (result["Owed By"] == row["Owes"])]

        if not reverse_row.empty:
            amount_diff = row["Amount"] - reverse_row["Amount"].values[0]

            if amount_diff > 0:
                new_row = pd.DataFrame([{"Owes": row["Owes"], "Owed By": row["Owed By"], "Amount": amount_diff}])
                final_result = pd.concat([final_result, new_row], ignore_index=True)
            elif amount_diff < 0:
                new_row = pd.DataFrame([{"Owes": row["Owed By"], "Owed By": row["Owes"], "Amount": -amount_diff}])
                final_result = pd.concat([final_result, new_row], ignore_index=True)
        else:
            final_result = pd.concat([final_result, pd.DataFrame([row])], ignore_index=True)

        processed_pairs.add(pair)

    # Step 4: Calculate the total amount owed by the user
    total_amount_owed_by_user = final_result[final_result["Owes"] == user_name]["Amount"].sum()

    # Step 5: Calculate the total amount owed to the user
    total_amount_owed_to_user = final_result[final_result["Owed By"] == user_name]["Amount"].sum()

    # Step 6: Calculate the total amount spent by the group
    total_group_spent = sum(expense["expensePrice"] for expense in expenses)

    # Step 7: Display the output for the specific user
    owes = final_result[final_result["Owes"] == user_name]
    is_owed_by = final_result[final_result["Owed By"] == user_name]

    output = []

    for _, row in owes.iterrows():
        output.append({
            "name": row["Owed By"],
            "status": "You owe",
            "amount": round(row["Amount"], 2)
        })

    for _, row in is_owed_by.iterrows():
        output.append({
            "name": row["Owes"],
            "status": "You are owed",
            "amount": round(row["Amount"], 2)
        })

    return {
        "total_amount_owed_by_user": round(total_amount_owed_by_user, 2),
        "total_amount_owed_to_user": round(total_amount_owed_to_user, 2),
        "total_group_spent": round(total_group_spent, 2),
        # "details": output
    }



# def calculate2(data, group_id, username):
#     # Filter data for the specified group
#     print("username", username)
#     group_data = [expense for expense in data if expense['group_ID'] == group_id]

#     # Convert the data to a DataFrame
#     df = pd.DataFrame(group_data)

#     # Calculate the number of members involved in each expense
#     df['num_members'] = df['members'].apply(lambda x: sum(x.values()))

#     # Calculate the share each person owes for each expense
#     df['share'] = df['expensePrice'] / df['num_members']

#     # Initialize dictionaries to track payments and debts
#     payments = {}
#     debts = {}

#     # Calculate total payments and debts for each person
#     for index, row in df.iterrows():
#         paid_by = row['paidBy']['name']
#         peoples = row['peoples']
#         share = row['share']

#         # Track payments made by the person who paid
#         if paid_by not in payments:
#             payments[paid_by] = 0
#         payments[paid_by] += row['expensePrice']

#         # Track debts owed by each person in the expense
#         for person in peoples:
#             if person not in debts:
#                 debts[person] = 0
#             debts[person] += share

#     # Calculate net balance for each person
#     net_balance = {person: payments.get(person, 0) - debts.get(person, 0) for person in set(list(payments.keys()) + list(debts.keys()))}

#     # Calculate total group expense
#     total_group_expense = df['expensePrice'].sum()

#     # Find the specific user's balance
#     user_balance = net_balance.get(username, 0)
#     user_status = "owes" if user_balance < 0 else "is owed"
#     user_amount = abs(user_balance)

#     # Calculate how much the user owes and is owed
#     user_owes = debts.get(username, 0)
#     user_is_owed = payments.get(username, 0)

#     # Output results
#     return {
#         "total_group_expense": total_group_expense,
#         "user": {
#             "name": username,
#             "status": user_status,
#             "amountOwed": user_amount,
#             "owes": user_owes,
#             "is_owed": user_is_owed
#         }
#     }

# def calculate2(data, group_id, username):
#     print("data in cal2", data, username)
#     owes = 0
#     owed = 0
    
#     for expense in data:
#         total_amount = expense['expensePrice']
#         num_members = len(expense['members'])
#         amount_per_person = total_amount / num_members
        
#         if username in expense['peoples']:
#             # If the user is one of the members sharing the expense
#             if expense['paidBy']['name'] != username:
#                 # User owes this amount
#                 owes += amount_per_person
#             else:
#                 # User paid, so they are owed this amount from others
#                 owed += (amount_per_person * (num_members - 1))
#             total_spending = sum(expense['expensePrice'] for expense in data)
#     return {
#         "owes": round(owes, 2),
#         "owed": round(owed, 2),
#         "total_spending": round(total_spending, 2)
#     }



