# # # # Initial expenses
# # # expenses = [
# # #     {"name": "nopi", "amount_owed_by_princy": 50.0, "total_amount_owed": 100.0, "paid_by": "Swamynathan Bommaganty", "who_owes": ["Princy", "ramprasad"]},
# # #     {"name": "nion", "amount_owed_by_princy": 50.0, "total_amount_owed": 100.0, "paid_by": "Swamynathan Bommaganty", "who_owes": ["Princy", "ramprasad"]},
# # #     {"name": "nopi", "amount_owed_by_princy": 50.0, "total_amount_owed": 50.0, "paid_by": "ramprasad", "who_owes": ["Princy"]},
# # #     {"name": "nopi", "amount_owed_by_princy": 25.0, "total_amount_owed": 50.0, "paid_by": "ramprasad", "who_owes": ["Princy", "Swamynathan Bommaganty"]},
# # #     {"name": "settleUp", "amount_owed_to_princy": 75.0, "total_amount_owed": 75.0, "paid_by": "princy", "who_owes": ["ramprasad"]}
# # # ]

# # # # Calculate total amount Princy owes
# # # total_owed_by_princy = sum(expense["amount_owed_by_princy"] for expense in expenses if "amount_owed_by_princy" in expense)

# # # # Calculate updated total amount Princy owes after considering the settleUp expense
# # # settle_up_amount = next(expense["amount_owed_to_princy"] for expense in expenses if expense["name"] == "settleUp")
# # # updated_total_owed_by_princy = total_owed_by_princy - settle_up_amount

# # # print(f"Total amount Princy owes after payment: ${updated_total_owed_by_princy:.2f}")
# # # Given data
# # expenses = [
# #     {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'p8crkiooud', 'members': {2: True, 3: True}, 'paidBy': {'id': 1, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 'settleUp': 'false'},
# #     {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nion', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'i55qvnfkbw', 'members': {2: True, 3: True}, 'paidBy': {'id': 3, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 'settleUp': 'false'},
# #     {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'mlad16l5j1', 'members': {3: True}, 'paidBy': {'id': 5, 'name': 'ramprasad'}, 'peoples': ['princy'], 'settleUp': 'false'},
# #     {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 25.0, 'expenseName': 'nopi', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'a10qox94go', 'members': {1: True, 3: True}, 'paidBy': {'id': 6, 'name': 'ramprasad'}, 'peoples': ['Swamynathan Bommaganty', 'princy'], 'settleUp': 'false'},
# #     {'activeType': -1, 'expensePrice': 75.0, 'expenseAmount': 75.0, 'expenseName': 'settleUp', 'expenseType': 'settleUp', 'group_ID': 'h2dz1l0nsbu', 'id': 'y8ig0ikuvuq', 'members': {2: True}, 'paidBy': {'id': 8, 'name': 'princy'}, 'peoples': ['ramprasad'], 'settleUp': 'false'},
# #     {'activeType': -1, 'expensePrice': 75.0, 'expenseAmount': 75.0, 'expenseName': 'nbv', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'o8ig0ikuvuh', 'members': {1: True}, 'paidBy': {'id': 8, 'name': 'princy'}, 'peoples': ['Swamynathan Bommaganty'], 'settleUp': 'false'}

# # ]

# # # Calculate total amount Princy owes
# # total_owed_by_princy = sum(expense['expenseAmount'] for expense in expenses if 'princy' in expense['peoples'] and expense['settleUp'] == 'false')

# # # Calculate the settleUp amount
# # settle_up_amount = sum(expense['expenseAmount'] for expense in expenses if expense['expenseName'] == 'settleUp' and expense['paidBy']['name'] == 'princy')

# # # Calculate updated total amount Princy owes after considering the settleUp expense
# # updated_total_owed_by_princy = total_owed_by_princy - settle_up_amount

# # print(f"Total amount Princy owes after payment: ${updated_total_owed_by_princy:.2f}")


# import pandas as pd

# def calculate(expenses, user_name):
#     # Step 1: Create a DataFrame from the expenses data
#     data = []
#     for expense in expenses:
#         total_amount = expense["expensePrice"]
#         members = expense["peoples"]
#         paid_by = expense["paidBy"]["name"]
#         share = total_amount / len(members)

#         for member in members:
#             if member != paid_by:  # Only add if the member is not the one who paid
#                 data.append([member, paid_by, share])

#     df = pd.DataFrame(data, columns=["Owes", "Owed By", "Amount"])

#     # Step 2: Calculate the total amount owed by each user
#     result = df.groupby(["Owes", "Owed By"]).sum().reset_index()

#     # Step 3: Adjust the result to account for mutual debts
#     final_result = pd.DataFrame()
#     processed_pairs = set()

#     for i, row in result.iterrows():
#         pair = tuple(sorted([row["Owes"], row["Owed By"]]))
        
#         if pair in processed_pairs:
#             continue

#         reverse_row = result[(result["Owes"] == row["Owed By"]) & (result["Owed By"] == row["Owes"])]

#         if not reverse_row.empty:
#             amount_diff = row["Amount"] - reverse_row["Amount"].values[0]

#             if amount_diff > 0:
#                 new_row = pd.DataFrame([{"Owes": row["Owes"], "Owed By": row["Owed By"], "Amount": amount_diff}])
#                 final_result = pd.concat([final_result, new_row], ignore_index=True)
#             elif amount_diff < 0:
#                 new_row = pd.DataFrame([{"Owes": row["Owed By"], "Owed By": row["Owes"], "Amount": -amount_diff}])
#                 final_result = pd.concat([final_result, new_row], ignore_index=True)
#         else:
#             final_result = pd.concat([final_result, pd.DataFrame([row])], ignore_index=True)

#         processed_pairs.add(pair)

#     # Step 4: Calculate the total amount owed by the user
#     total_amount_owed_by_user = final_result[final_result["Owes"] == user_name]["Amount"].sum()

#     # Step 5: Display the output for the specific user
#     owes = final_result[final_result["Owes"] == user_name]
#     is_owed_by = final_result[final_result["Owed By"] == user_name]

#     output = []

#     for _, row in owes.iterrows():
#         output.append({
#             "name": row["Owed By"],
#             "status": "You owe",
#             "amount": round(row["Amount"], 2)
#         })

#     for _, row in is_owed_by.iterrows():
#         output.append({
#             "name": row["Owes"],
#             "status": "You are owed",
#             "amount": round(row["Amount"], 2)
#         })

#     return {
#         "total_amount_owed_by_user": round(total_amount_owed_by_user, 2),
#         # "details": output
#     }

# # Example usage:
# expenses = [
#     {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 
#      'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'p8crkiooud', 'members': {2: True, 3: True},
#      'paidBy': {'id': 1, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 'settleUp': 'false'},
#     {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nion', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 
#      'id': 'i55qvnfkbw', 'members': {2: True, 3: True}, 'paidBy': {'id': 3, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 
#      'settleUp': 'false'},
#     {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 'expenseType': 'Grocery',
#      'group_ID': 'h2dz1l0nsbu', 'id': 'mlad16l5j1', 'members': {3: True}, 'paidBy': {'id': 5, 'name': 'ramprasad'}, 
#      'peoples': ['princy'], 'settleUp': 'false'},
#     {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 25.0,
#      'expenseName': 'nopi', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'a10qox94go', 
#      'members': {1: True, 3: True}, 'paidBy': {'id': 6, 'name': 'ramprasad'},
#      'peoples': ['Swamynathan Bommaganty', 'princy'], 'settleUp': 'false'},
#     {'activeType': -1, 'expensePrice': 75.0, 'expenseAmount': 75.0, 'expenseName': 'settleUp', 'expenseType': 'settleUp',
#      'group_ID': 'h2dz1l0nsbu', 'id': 'y8ig0ikuvuq', 'members': {2: True}, 'paidBy': {'id': 8, 'name': 'princy'},
#      'peoples': ['ramprasad'], 'settleUp': 'false'},
#      {'activeType': -1, 'expensePrice': 75.0, 'expenseAmount': 75.0, 'expenseName': 'settleUp', 'expenseType': 'settleUp',
#      'group_ID': 'h2dz1l0nsbu', 'id': 'y8ig0ikuvuq', 'members': {1: True}, 'paidBy': {'id': 8, 'name': 'princy'},
#      'peoples': ['Swamynathan Bommaganty'], 'settleUp': 'false'}
# ]

# user_name = 'princy'
# result = calculate(expenses, user_name)
# print(result)


# import pandas as pd

# def calculate(expenses, user_name):
#     # Step 1: Create a DataFrame from the expenses data
#     data = []
#     for expense in expenses:
#         total_amount = expense["expensePrice"]
#         members = expense["peoples"]
#         paid_by = expense["paidBy"]["name"]
#         share = total_amount / len(members)

#         for member in members:
#             if member != paid_by:  # Only add if the member is not the one who paid
#                 data.append([member, paid_by, share])

#     df = pd.DataFrame(data, columns=["Owes", "Owed By", "Amount"])

#     # Step 2: Calculate the total amount owed by each user
#     result = df.groupby(["Owes", "Owed By"]).sum().reset_index()

#     # Step 3: Adjust the result to account for mutual debts
#     final_result = pd.DataFrame()
#     processed_pairs = set()

#     for i, row in result.iterrows():
#         pair = tuple(sorted([row["Owes"], row["Owed By"]]))
        
#         if pair in processed_pairs:
#             continue

#         reverse_row = result[(result["Owes"] == row["Owed By"]) & (result["Owed By"] == row["Owes"])]

#         if not reverse_row.empty:
#             amount_diff = row["Amount"] - reverse_row["Amount"].values[0]

#             if amount_diff > 0:
#                 new_row = pd.DataFrame([{"Owes": row["Owes"], "Owed By": row["Owed By"], "Amount": amount_diff}])
#                 final_result = pd.concat([final_result, new_row], ignore_index=True)
#             elif amount_diff < 0:
#                 new_row = pd.DataFrame([{"Owes": row["Owed By"], "Owed By": row["Owes"], "Amount": -amount_diff}])
#                 final_result = pd.concat([final_result, new_row], ignore_index=True)
#         else:
#             final_result = pd.concat([final_result, pd.DataFrame([row])], ignore_index=True)

#         processed_pairs.add(pair)

#     # Step 4: Calculate the total amount owed by the user
#     total_amount_owed_by_user = final_result[final_result["Owes"] == user_name]["Amount"].sum()

#     # Step 5: Calculate the total amount owed to the user
#     total_amount_owed_to_user = final_result[final_result["Owed By"] == user_name]["Amount"].sum()

#     # Step 6: Display the output for the specific user
#     owes = final_result[final_result["Owes"] == user_name]
#     is_owed_by = final_result[final_result["Owed By"] == user_name]

#     output = []

#     for _, row in owes.iterrows():
#         output.append({
#             "name": row["Owed By"],
#             "status": "You owe",
#             "amount": round(row["Amount"], 2)
#         })

#     for _, row in is_owed_by.iterrows():
#         output.append({
#             "name": row["Owes"],
#             "status": "You are owed",
#             "amount": round(row["Amount"], 2)
#         })

#     return {
#         "total_amount_owed_by_user": round(total_amount_owed_by_user, 2),
#         "total_amount_owed_to_user": round(total_amount_owed_to_user, 2),
#         "details": output
#     }

# # Example usage:
# expenses = [
#     {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 
#      'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'p8crkiooud', 'members': {2: True, 3: True},
#      'paidBy': {'id': 1, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 'settleUp': 'false'},
#     {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nion', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 
#      'id': 'i55qvnfkbw', 'members': {2: True, 3: True}, 'paidBy': {'id': 3, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 
#      'settleUp': 'false'},
#     {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 'expenseType': 'Grocery',
#      'group_ID': 'h2dz1l0nsbu', 'id': 'mlad16l5j1', 'members': {3: True}, 'paidBy': {'id': 5, 'name': 'ramprasad'}, 
#      'peoples': ['princy'], 'settleUp': 'false'},
#     {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 25.0,
#      'expenseName': 'nopi', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'a10qox94go', 
#      'members': {1: True, 3: True}, 'paidBy': {'id': 6, 'name': 'ramprasad'},
#      'peoples': ['Swamynathan Bommaganty', 'princy'], 'settleUp': 'false'},
#     {'activeType': -1, 'expensePrice': 75.0, 'expenseAmount': 75.0, 'expenseName': 'settleUp', 'expenseType': 'settleUp',
#      'group_ID': 'h2dz1l0nsbu', 'id': 'y8ig0ikuvuq', 'members': {2: True}, 'paidBy': {'id': 8, 'name': 'princy'},
#      'peoples': ['ramprasad'], 'settleUp': 'false'}
# ]

# user_name = 'princy'
# result = calculate(expenses, user_name)
# print(result)



import pandas as pd

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
        "details": output
    }

# Example usage:
expenses = [
    {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 
     'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'p8crkiooud', 'members': {2: True, 3: True},
     'paidBy': {'id': 1, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 'settleUp': 'false'},
    {'activeType': 2, 'expensePrice': 100.0, 'expenseAmount': 50.0, 'expenseName': 'nion', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 
     'id': 'i55qvnfkbw', 'members': {2: True, 3: True}, 'paidBy': {'id': 3, 'name': 'Swamynathan Bommaganty'}, 'peoples': ['ramprasad', 'princy'], 
     'settleUp': 'false'},
    {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 50.0, 'expenseName': 'nopi', 'expenseType': 'Grocery',
     'group_ID': 'h2dz1l0nsbu', 'id': 'mlad16l5j1', 'members': {3: True}, 'paidBy': {'id': 5, 'name': 'ramprasad'}, 
     'peoples': ['princy'], 'settleUp': 'false'},
    {'activeType': 2, 'expensePrice': 50.0, 'expenseAmount': 25.0,
     'expenseName': 'nopi', 'expenseType': 'Grocery', 'group_ID': 'h2dz1l0nsbu', 'id': 'a10qox94go', 
     'members': {1: True, 3: True}, 'paidBy': {'id': 6, 'name': 'ramprasad'},
     'peoples': ['Swamynathan Bommaganty', 'princy'], 'settleUp': 'false'},
    {'activeType': -1, 'expensePrice': 75.0, 'expenseAmount': 75.0, 'expenseName': 'settleUp', 'expenseType': 'settleUp',
     'group_ID': 'h2dz1l0nsbu', 'id': 'y8ig0ikuvuq', 'members': {2: True}, 'paidBy': {'id': 8, 'name': 'princy'},
     'peoples': ['ramprasad'], 'settleUp': 'false'}
]

user_name = 'princy'
result = calculate(expenses, user_name)
print(result)
