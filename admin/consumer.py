# amqps://sgcnvmkn:dO_cweGHSy-YdTgCShm9GabDimhsYhms@moose.rmq.cloudamqp.com/sgcnvmkn

import pika, json, os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")
django.setup()

from products.models import Product

params = pika.URLParameters("amqps://sgcnvmkn:dO_cweGHSy-YdTgCShm9GabDimhsYhms@moose.rmq.cloudamqp.com/sgcnvmkn")
# connection = pika.BlockingConnection(params)
connection =pika.adapters.blocking_connection.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(ch, method, properties, body):
    print("Received in admin")
    id = json.loads(body)
    print(id)
    product = Product.objects.get(id=id)
    product.likes = product.likes + 1
    product.save()
    print("Product likes was increased")

channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print("Started Admin Consuming")
channel.start_consuming()
channel.close()