"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def create_new_user():
    email = request.json.get('email', None) #porque aqui es un get y no un .post?
    password = request.json.get('password', None)
    is_active = request.json.get('is_active', True)

    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "all ok"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def go_private():
    users = User.query.all()
    users = [user.serialize() for user in users]
    return jsonify({"users": users}), 200
