from flask import Flask
from flask import jsonify
from src import sentiment
from src.reddit import Reddit

app = Flask(__name__)
reddit = Reddit()


@app.route('/')
def get_index():
    return 'hi'


@app.route('/sentiment/<string:obj>/<string:name>')
def get_sentiment(obj, name):
    ok = False
    human_error = ''

    res = reddit.comments('php', obj='r')
    report = {}

    if res.status_code == 200:
        try:
            posts = res.json()
            comments = [post['data']['body'] for i, post in enumerate(
                posts['data']['children'])]

            report = sentiment.report(comments)
            ok = True
        except Exception as err:
            print err
            human_error = 'error processing comments'
    else:
        human_error = 'error downloading comments'

    return jsonify(ok=ok, human_error=human_error, report=report)

if __name__ == '__main__':
    app.run()
