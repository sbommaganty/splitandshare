from sqlalchemy import create_engine, MetaData

# Database connection URL
DATABASE_URL = "mysql+pymysql://expense_admin:Swamy123@expense-db-cluster.cluster-cd8624soidis.us-east-1.rds.amazonaws.com:3306/expense"
# DATABASE_URL = "mysql+pymysql://user_admin:Swamy123@user-db-cluster.cluster-cd8624soidis.us-east-1.rds.amazonaws.com:3306/user"

# Create an engine
engine = create_engine(DATABASE_URL)

# Reflect the existing database schema
meta = MetaData()
meta.reflect(bind=engine)

# List of tables to drop
tables_to_drop = ['users', 'groups', 'user_groups']  # Replace with your table names

# Drop the tables
for table_name in tables_to_drop:
    if table_name in meta.tables:
        table = meta.tables[table_name]
        table.drop(engine)
        print(f"Table {table_name} dropped successfully.")
    else:
        print(f"Table {table_name} does not exist.")

print("All specified tables have been processed.")



# from sqlalchemy import create_engine, MetaData, text

# # Database connection URL
# DATABASE_URL = "mysql+pymysql://user_admin:Swamy123@user-db-cluster.cluster-cd8624soidis.us-east-1.rds.amazonaws.com:3306/user"

# # Create an engine
# engine = create_engine(DATABASE_URL)

# # Reflect the existing database schema
# meta = MetaData()
# meta.reflect(bind=engine)

# # List of tables to drop
# tables_to_drop = ['user_groups', 'groups', 'users']  # Drop in reverse order of dependencies

# # Drop the foreign key constraints first
# with engine.connect() as conn:
#     conn.execute(text('ALTER TABLE user_groups DROP FOREIGN KEY user_groups_ibfk_1'))

# # Drop the tables
# for table_name in tables_to_drop:
#     if table_name in meta.tables:
#         table = meta.tables[table_name]
#         table.drop(engine)
#         print(f"Table {table_name} dropped successfully.")
#     else:
#         print(f"Table {table_name} does not exist.")

# print("All specified tables have been processed.")
