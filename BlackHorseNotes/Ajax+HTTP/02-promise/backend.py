from flask import Flask
from flask import request
import requests
import jsonify

app = Flask(__name__)


@app.route('/test', methods=['POST'])
def hello():
    print(request.get_data().decode())
    return {} # whatever it is!


if __name__ == "__main__":
    app.run(debug=True)
