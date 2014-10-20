import requests
import time


class Reddit:
    COMMENTS_URL = 'http://www.reddit.com/%s/%s/comments.json?limit=%s'
    MAX_RETRY_COUNT = 10
    RETRY_WAIT_TIME = 10

    def comments(self, name, obj='user', limit=100):
        """Requests Reddit comments.

        Keyword arguments:
        name -- other a username of a subreddit name
        obj -- object type (e.g. user, r) (default: user)
        limit -- maximum number of comments to get (default: 100)
        """
        tries = 0
        ren = None

        while tries < self.MAX_RETRY_COUNT:
            tries += 1
            res = requests.get(self.COMMENTS_URL % (obj, name, limit))

            if res.status_code == 200:
                return res
            else:
                time.sleep(RETRY_WAIT_TIME)

        return res
