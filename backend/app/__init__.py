from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    @app.route('/')
    def home():
        return "<h1>Hello, My First Flask App!</h1>"
    
    return app