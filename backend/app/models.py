from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum as SqlEnum
from enum import Enum
db = SQLAlchemy()
class TaskStatus(Enum):
        PENDING = 'pending'
        IN_PROGRESS = 'in_progress'
        COMPLETED = 'completed'
    
class User(db.Model):  
        id = db.Column(db.Integer, primary_key=True) 
        email = db.Column(db.String(120), unique=True, nullable=False) 
        password_hash = db.Column(db.String(128), nullable=False)
        first_name = db.Column(db.String(50), nullable=False)
        last_name = db.Column(db.String(50), nullable=False)
        created_at = db.Column(db.DateTime, server_default=db.func.now())
    
class Task(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String(100), nullable=False)
        description = db.Column(db.Text, nullable=True)
        status = db.Column(SqlEnum(TaskStatus), nullable=False, default=TaskStatus.PENDING)
        user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        created_at = db.Column(db.DateTime, server_default=db.func.now())
        updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
        user = db.relationship('User', backref=db.backref('tasks', lazy=True))
        
        def to_dict(self):
            return {
                'id': self.id,
                'title': self.title,
                'description': self.description,
                'status': self.status.value,
                'user_id': self.user_id,
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            }