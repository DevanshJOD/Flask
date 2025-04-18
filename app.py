from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import os

app = Flask(__name__)

# MongoDB URI (you can replace this with your own MongoDB URI if you have a remote database)
app.config["MONGO_URI"] = "mongodb://localhost:27017/user_db"  # Specify the database name here

# Initialize PyMongo
mongo = PyMongo(app)

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()

    # Extract the username and password from the request
    username = data.get('username')
    password = data.get('password')

    # Insert the new user into MongoDB
    users = mongo.db.users  # This refers to the 'users' collection in the 'user_db' database
    users.insert_one({"username": username, "password": password})

    return jsonify({"message": "User registered successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
