import os
import requests
from flask import Flask, jsonify, render_template, request, session, redirect,url_for,send_file,send_from_directory
import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
UPLOAD_FOLDER =os.getenv("UPLOAD_FOLDER")
if UPLOAD_FOLDER:app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
else:raise ValueError('No Upload Folder Defined')

basedate=datetime.date(day=30,month=6,year=2020)
@app.route("/")
def index():
    return render_template("index.html",date1=(datetime.date.today()-basedate).days)

@app.route('/uploads/<path:filename>')
def download_file(filename):
	filemap={'alert1.wav':'sms-alert-31-daniel_simon.wav','alert2.wav':'sms-alert-32-daniel_simon.wav','alert3.wav':'sms-alert-33-daniel_simon.wav'}
	# return '<h1>%s</h1>' % filemap.get(filename)
	return send_from_directory(UPLOAD_FOLDER,filemap.get(filename), as_attachment=True)
    
# @app.route('/alert/<path:filename>')
# def download_file(filename):
#     return send_from_directory('/static', filename)
