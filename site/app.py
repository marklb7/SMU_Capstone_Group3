from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
import numpy as np
import os
from modelHelper import ModelHelper

#init app and class
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
modelHelper = ModelHelper()

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tableau")
def tableau():

    return render_template("tableau.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/predictions")
def predict():
    return render_template("ml.html")
@app.route("/datatable")
def datatable():
    return render_template("datatable.html")

@app.route("/data")
def data():
    df=pd.read_csv("static/data/life_expectancy_data_combined_noNulls.csv")
    return(jsonify(json.loads(df.to_json(orient="records"))))

@app.route("/makePredictions", methods=["POST"])
def makePredictions():
    content = request.json["data"]
    
    # parse
    alcohol = float(content["alcohol"])
    percentageExpenditure = float(content["percentageExpenditure"])
    measles = float(content["measles"])
    bmi = float(content["bmi"])
    hiv_aids = float(content["hiv_aids"])
    schooling = float(content["schooling"])
    incomeGroup = content["incomeGroup"]


    prediction = modelHelper.makePredictions(alcohol,percentageExpenditure, measles,bmi,hiv_aids,schooling, incomeGroup)
    prediction= round(prediction,1)
    print(prediction)
    return(jsonify({"ok": True, "prediction": str(prediction)}))



@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)
