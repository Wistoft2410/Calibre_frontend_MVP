from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
import json

app = Flask(__name__)


def run_sql(function_name):
    try:
        connection = mysql.connector.connect(
                                            database='mysovedk_calibre',
                                            user='mysovedk_seb',
                                            password='LineSebfif10!',
                                            host='cp04.nordicway.dk'
                                            )
        if connection.is_connected():
            global cursor
            cursor = connection.cursor()
            if function_name == "func":
                return func()
            else:
                print("No function named " + function_name)


    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def func():
    query = ("SELECT * FROM Users")

    cursor.execute(query)

    users = cursor.fetchall()
    l = []
    for i in users:
       l.append(i[1])
    # print(json.dumps(users[0],default=str))
    return json.dumps(l)


@app.route('/', methods=['GET'])
def get_all():
    return jsonify({"hello": "world"})


@app.route('/add', methods=['GET'])
def add():
    return run_sql("func")



if __name__ == '__main__':
    app.run(debug=True)