import os
import requests
from flask import Flask, jsonify, render_template, request, session, redirect,url_for,send_file,send_from_directory
import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")


basedate=datetime.date(day=30,month=6,year=2020)
@app.route("/")
def index():
    return render_template("index.html",date1=(datetime.date.today()-basedate).days)

    
# @app.route('/alert/<path:filename>')
# def download_file(filename):
#     return send_from_directory('/static', filename)
