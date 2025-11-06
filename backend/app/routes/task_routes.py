from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from ..models import db, Task, TaskStatus

task_bp = Blueprint("tasks", __name__)

@task_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_tasks():
    try:
        current_user_id = int(get_jwt_identity())
        tasks = Task.query.filter_by(user_id = current_user_id).all()
            
        tasks_list =[task.to_dict() for task in tasks]
        return jsonify({'tasks': tasks_list}), 200
    except SQLAlchemyError as e:
        return jsonify({'error': 'Failed to retrieve tasks', 'details': str(e)}), 500

@task_bp.route('/', methods=['POST'])
@jwt_required()
def create_task():
    try:
        data = request.get_json()
        current_user_id = int(get_jwt_identity())
            
        if not data:
            return jsonify({'error': 'Invalid input'}), 400
            
        title = data.get('title', '')
        description = data.get('description', '')
        status = data.get('status', TaskStatus.PENDING.value)
            
        if not title:
            return jsonify({'error': 'Title is required'}), 400
            
        if status not in TaskStatus._value2member_map_:
            return jsonify({'error': 'Invalid status value'}), 400
        new_task = Task(
            title=title,
            description=description,
            status=TaskStatus(status),
            user_id=current_user_id
            )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({
            'message': 'Task created successfully',
            'task': {
                    'id': new_task.id,
                    'title': new_task.title,
                    'description': new_task.description,
                    'status': new_task.status.value,
                    'user_id': new_task.user_id,
                    'created_at': new_task.created_at,
                    'updated_at': new_task.updated_at
                }
            }), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create task', 'details': str(e)}), 500
    
@task_bp.route('/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    try:
        current_user_id = int(get_jwt_identity())
        task = Task.query.filter_by(id=task_id, user_id=current_user_id).first()
        if not task:
            return jsonify({'error': 'Task not found'}), 404
        return jsonify({'task': task.to_dict()}), 200
    except SQLAlchemyError as e:
        return jsonify({'error': 'Failed to retrieve task', 'details': str(e)}), 500

@task_bp.route('/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    try:
        data = request.get_json()
        current_user_id = int(get_jwt_identity())
        task = Task.query.filter_by(id=task_id, user_id=current_user_id).first()
            
        if not task:
            return jsonify({'error': 'Task not found'}), 404
            
        if not data:
            return jsonify({'error': 'Invalid input'}), 400
            
        title = data.get('title', task.title)
        description = data.get('description', task.description)
        status = data.get('status', task.status.value)
            
        if status not in TaskStatus._value2member_map_:
            return jsonify({'error': 'Invalid status value'}), 400
            
        task.title = title
        task.description = description
        task.status = TaskStatus(status)
            
        db.session.commit()
        return jsonify({'message': 'Task updated successfully', 'task': task.to_dict()}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update task', 'details': str(e)}), 500
    
@task_bp.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    try:
        current_user_id = int(get_jwt_identity())
        task = Task.query.filter_by(id=task_id, user_id=current_user_id).first()
            
        if not task:
            return jsonify({'error': 'Task not found'}), 404
            
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete task', 'details': str(e)}), 500
    
    