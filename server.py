from flask import Flask
from flask import jsonify
from src import sentiment
from src.reddit import Reddit

app = Flask(__name__)
reddit = Reddit()


@app.route('/')
def get_index():
    return app.send_static_file('index.html')


@app.route('/sentiment/<string:obj>/<string:name>')
def get_sentiment(obj, name):
    ok = False
    human_error = ''

    res = reddit.comments(name, obj=obj)
    report = {}

    if res.status_code == 200:
        try:
            posts = res.json()
            comments = [post['data']['body'] for i, post in enumerate(
                posts['data']['children'])]

            report = sentiment.report(comments)
            report['obj'] = obj
            report['name'] = name
            ok = True
        except Exception as err:
            print err
            human_error = 'error processing comments'
    else:
        human_error = 'error downloading comments'

    return jsonify(
        ok=ok, human_error=human_error,
        report=report, obj=obj, name=name)

if __name__ == '__main__':
    app.run()
