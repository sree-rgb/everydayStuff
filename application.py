import os
import requests
from flask import Flask, jsonify, render_template, request, session, redirect,url_for
import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")


basedate=datetime.date(day=30,month=6,year=2020)
@app.route("/")
def index():
    return render_template("index.html",date1=(datetime.date.today()-basedate).days)
