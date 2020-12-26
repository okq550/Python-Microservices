from flask import Flask, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import UniqueConstraint
from dataclasses import dataclass
from producer import publish

import requests

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@db/main"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

db = SQLAlchemy(app)

@dataclass
class Product(db.Model):
    id: int
    title: str
    image: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))

@dataclass
class ProductUser(db.Model):
    id: int
    user_id: int
    product_id: int

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)

    db.UniqueConstraint('user_id', 'product_id', name='user_product_unique')

@app.route('/api/products')
def index():
    return jsonify(Product.query.order_by(Product.id).all())


@app.route('/api/products/<int:id>/like', methods=['POST'])
def like(id):
    # Call the admin app admin/users to get a random user then like on his/her behalf
    req = requests.get('http://docker.for.mac.localhost:8000/api/users')
    json = req.json()

    # try:
    productUser = ProductUser(user_id=json['id'], product_id=id)
    db.session.add(productUser)
    db.session.commit()
    # Like product Event
    publish("like_product", id)
    # except:
    #     abort(400, 'You already liked this product!')

    return jsonify({
        'message': 'success'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')