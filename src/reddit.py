import requests


class Reddit:
    COMMENTS_URL = 'http://www.reddit.com/%s/%s/comments.json?limit=%s'

    def comments(self, name, obj='user', limit=100):
        """Requests Reddit comments.

        Keyword arguments:
        name -- other a username of a subreddit name
        obj -- object type (e.g. user, r) (default: user)
        limit -- maximum number of comments to get (default: 100)
        """
        return requests.get(self.COMMENTS_URL % (obj, name, limit))
