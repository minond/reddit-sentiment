from src import sentiment
from src.reddit import Reddit

reddit = Reddit()
res = reddit.comments('php', obj='r')

if res.status_code == 200:
    try:
        posts = res.json()
        comments = [post['data']['body'] for i, post in enumerate(
            posts['data']['children'])]

        report = sentiment.report(comments)
        print report
    except Exception as err:
        print 'error processing comments'
        print err
else:
    print 'error downloading comments'
    print res
