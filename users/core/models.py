from sqlalchemy import create_engine, Column, Integer, String, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

# Database connection string
# DATABASE_URL = "mysql+pymysql://user_admin:'127.0.0.1':3306/user_admin"
DATABASE_URL = "mysql+pymysql://user_admin:your_password@127.0.0.1:3306/user_admin"

# SQLAlchemy setup
engine = create_engine(DATABASE_URL, connect_args={"connect_timeout": 60})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Secondary table for many-to-many relationship between users and groups
user_groups = Table(
    'user_groups',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('group_id', Integer, ForeignKey('groups.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)  # Specify length for VARCHAR
    email = Column(String(100), unique=True, index=True)     # Specify length for VARCHAR
    password = Column(String(100))                           # Specify length for VARCHAR
    groups = relationship("Group", secondary=user_groups, back_populates="users")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
        }

class Group(Base):
    __tablename__ = 'groups'

    id = Column(Integer, primary_key=True, index=True)
    groupID = Column(String(255), nullable=True)
    name = Column(String(100), unique=True, index=True)
    type = Column(String(255), nullable=True)
    users = relationship("User", secondary=user_groups, back_populates="groups")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'groupID': self.groupID,
            'users': [user.to_dict() for user in self.users]
        }

# Create tables in the database
def init_db():
    Base.metadata.create_all(bind=engine)


































