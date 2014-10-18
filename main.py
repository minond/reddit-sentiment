from src import sentiment
import requests

class Reddit:
    def comments(self, obj, username):
        req = requests.get('http://www.reddit.com/%s/%s/comments.json?limit=100' % (obj, username))
        print req.json()

# print sentiment.analyze('')
reddit = Reddit()
reddit.comments('user', 'cybrbeast')
