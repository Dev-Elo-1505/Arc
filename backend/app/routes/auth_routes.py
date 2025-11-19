from flask import Blueprint, jsonify, request 
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_jwt_extended import create_access_token, get_jwt, jwt_required  
from sqlalchemy.exc import SQLAlchemyError
from ..models import db, User
from ..blocklist import BLOCKLIST
from ..utils.validators import validate_email, validate_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json() 
        if not data: 
            return jsonify({"error": "Invalid input"}), 400
        email = data.get('email', '').strip()
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        password = data.get('password', '')
            
        if not email or not first_name or not last_name or not password:
            return jsonify({"error": "All fields are required"}), 400
            
        if not validate_email(email):
            return jsonify({"error": "Invalid email format"}), 400
            
        is_valid, err_msg = validate_password(password)
        if not is_valid:
            return jsonify({"error": err_msg}), 400
            
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 409
            
        password_hash = generate_password_hash(password)
        new_user = User(email=email, first_name=first_name, last_name = last_name, password_hash=password_hash)
            
        db.session.add(new_user) 
        db.session.commit() 
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'first_name': new_user.first_name,
                'last_name': new_user.last_name,
                'created_at': new_user.created_at
            }
        }), 201
    except SQLAlchemyError as e:
        db.session.rollback() 
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400

    email = data.get('email', '').strip()
    password = data.get('password', '')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email}
    }), 200


@auth_bp.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    BLOCKLIST.add(jti)
    return jsonify({'message': 'Logout successful'}), 200