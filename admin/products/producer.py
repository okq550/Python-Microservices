# amqps://sgcnvmkn:dO_cweGHSy-YdTgCShm9GabDimhsYhms@moose.rmq.cloudamqp.com/sgcnvmkn

import pika, json

params = pika.URLParameters("amqps://sgcnvmkn:dO_cweGHSy-YdTgCShm9GabDimhsYhms@moose.rmq.cloudamqp.com/sgcnvmkn")
# connection = pika.BlockingConnection(params)
connection =pika.adapters.blocking_connection.BlockingConnection(params)
channel = connection.channel()

def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='main', body=json.dumps(body), properties=properties)