from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "mysql+pymysql://user_admin:your_password@127.0.0.1:3306/user_admin"
DATABASE_URL = "mysql+pymysql://user_admin:your_password@127.0.0.1:3306/expense_admin"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Expense(Base):
    __tablename__ = 'users'

    settlement_id = Column(Integer,primary_key=True)
    expenseID = Column(String(50)) 
    group_id = Column(String(50))
    payer_name = Column(String(50))
    payee_name = Column(String(50))
    expenseType = Column(String(1000))
    activeType = Column(Integer)
    price = Column(Float)
    amount = Column(Float)
    description = Column(String(50))
    is_settled = Column(String(50))

    def to_dict(self):
        return {
             "settlement_id": self.settlement_id,
             "expenseID": self.expenseID,
             "group_id": self.group_id,
             "payer_name": self.payer_name,
             "payee_name": self.payee_name,
             "price": self.price,
             "amount": self.amount,
             "description": self.description,
             "is_settled": self.is_settled,
             "expenseType": self.expenseType,
             "activeType": self.activeType
        }


class Balance(Base):
    __tablename__ = 'balance'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))  # Specify length for VARCHAR
    status = Column(String(100), unique=True, index=True)
    amountOwned = Column(Float)    

    def to_dict(self):
        return {
            "name": self.name,
            "status": self.status, 
            "amountOwed": self.amountOwned
        }


def init_db():
    Base.metadata.create_all(bind=engine)
