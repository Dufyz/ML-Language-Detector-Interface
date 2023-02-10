import json
from flask import request
from flask import Flask, render_template

from languageDetectorScript import language_classifier

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/clientInput', methods=['POST', 'GET'])
def clientInputPost():
    output = request.get_json()
    result = json.loads(output) #this converts the json output to a python dictionary
    
    language_classifier_data = result['clientInput']
    detected = language_classifier(language_classifier_data)

    jsonFile = {
        'clientInput': language_classifier_data,
        'clientOutput': detected
    }

    with open('clientData.json', 'w') as file:
        json.dump(jsonFile, file, indent=4)

    return result

@app.route('/clientOutput', methods=['GET'])
def clientOutput():
    with open('clientData.json', 'r') as file:
        return json.load(file)
