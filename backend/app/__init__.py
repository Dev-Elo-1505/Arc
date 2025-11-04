import re 
from datetime import timedelta
from flask import Flask, jsonify, request 
from flask_cors import CORS 
from flask_jwt_extended import create_access_token, JWTManager 
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv 
import os

load_dotenv()

db_url = os.getenv('DATABASE_URL')
jwt_secret_key = os.getenv('JWT_SECRET_KEY')


def create_app():
    app = Flask(__name__)
    CORS(app) 
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = jwt_secret_key
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    
    jwt = JWTManager(app)
    db= SQLAlchemy(app)
    
    class User(db.Model):  
        id = db.Column(db.Integer, primary_key=True) 
        email = db.Column(db.String(120), unique=True, nullable=False) 
        password_hash = db.Column(db.String(128), nullable=False)
        name = db.Column(db.String(50), nullable=False)
        created_at = db.Column(db.DateTime, server_default=db.func.now())
     
    with app.app_context(): 
        db.create_all() 
    
    def validate_email(email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def validate_password(password):
        if len(password) < 8:
            return False, "Password must be at least 8 characters"
        if not any(c.isupper() for c in password):
            return False, "Password must contain at least one uppercase letter"
        if not any(c.isdigit() for c in password):
            return False, "Password must contain at least one number"
        if not any(c in "!@#$%^&*()-_+" for c in password):
            return False, "Password must contain at least one special character"
        return True, ""

    @app.route('/api/register', methods=['POST'])
    def register():
        try:
            data = request.get_json() 
            
            if not data: 
                return jsonify({"error": "Invalid input"}), 400
            email = data.get('email', '').strip()
            name = data.get('name', '').strip()
            password = data.get('password', '')
            
            if not email or not name or not password:
                return jsonify({"error": "All fields are required"}), 400
            
            if not validate_email(email):
                return jsonify({"error": "Invalid email format"}), 400
            
            is_valid, err_msg = validate_password(password)
            if not is_valid:
                return jsonify({"error": err_msg}), 400
            
            if User.query.filter_by(email=email).first():
                return jsonify({"error": "Email already exists"}), 400
            
            password_hash = generate_password_hash(password)
            new_user = User(email=email, name=name, password_hash=password_hash)
            
            db.session.add(new_user) 
            db.session.commit() 
            return jsonify({
                'message': 'User registered successfully',
                'user': {
                    'id': new_user.id,
                    'email': new_user.email,
                    'name': new_user.name,
                    'created_at': new_user.created_at
                }
            }), 201
        except Exception as e:
            db.session.rollback() 
            return jsonify({'error': 'Registration failed', 'details': str(e)}), 500
            
    @app.route('/api/login', methods=['POST'])
    def login():
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({'error': 'Invalid input'}), 400 
            
            email = data.get('email', '').strip()
            password = data.get('password', '')
            
            if not email or not password:
                return jsonify({'error': 'Email and password are required'}), 400
            
            user = User.query.filter_by(email=email).first()
            
            if not user or not check_password_hash(user.password_hash, password):
                return jsonify({'error': 'Invalid email or password'}), 401
            
            access_token = create_access_token(identity=user.id)
            return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
        }), 200
        except Exception as e:
            return jsonify({'error': 'Login failed', 'details': str(e)}), 500
    
    return app