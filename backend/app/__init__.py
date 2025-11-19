from datetime import timedelta
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS 
from dotenv import load_dotenv 
import os
from .models import db
from .blocklist import BLOCKLIST
from flask_migrate import Migrate

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app) 
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    
    jwt = JWTManager(app)
    db.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, db)
    
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLOCKLIST

    with app.app_context():
        db.create_all()
    
    from .routes.auth_routes import auth_bp
    from .routes.task_routes import task_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(task_bp, url_prefix='/api/tasks')

    return app
    

    
            
    
        
        
   
    
    