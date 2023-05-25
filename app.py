from flask import Flask, render_template, jsonify
import parse

app = Flask(__name__, static_folder='static')

mc_map = parse.Map()
maps = mc_map.get_world()

@app.route('/map')
def map():
    return jsonify(maps)

@app.route('/')
def hello():
    return render_template('index.html')