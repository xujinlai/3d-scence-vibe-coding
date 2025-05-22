from flask import Flask, render_template

app = Flask(__name__)

# Placeholder image data
image_data = [
    {
        "filename": "placeholder_ice_1.png",
        "title": "Ice Cube - Perspective View",
        "description": "A placeholder image of a single ice cube showing a perspective angle."
    },
    {
        "filename": "placeholder_ice_2.png",
        "title": "Ice Cubes - Group",
        "description": "A placeholder image depicting a small group of ice cubes."
    },
    {
        "filename": "placeholder_ice_3.png",
        "title": "Ice Cube - Macro Detail",
        "description": "A placeholder close-up image highlighting the texture of an ice cube."
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html', images=image_data)

if __name__ == '__main__':
    app.run(debug=True)
