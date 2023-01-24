import json
import os.path
import requests


from api.v1 import api_v1
from flask import Flask
from flask import render_template, jsonify, request, Blueprint


# Set app flask
app = Flask(__name__)

# Set api url prefix
app.register_blueprint(api_v1, url_prefix='/api/v1')

# Set flask config
# Jsonify ASCII 설정 -> False : 한글 깨짐 방지
app.config['JSON_AS_ASCII'] = False


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
    # app.run(debug=True, port=5050)

