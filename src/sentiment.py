"""
sentiment.py - analyze the sentiment/mood in a sentence

Usage: python sentiment.py <text>
"""

import sys
from textblob import TextBlob

POSITIVE = 0
NEGATIVE = 1


def analyze(text):
    """Return a tuple with a positive or negative flag, the sentiment score,
    and the actual string."""
    sentence = TextBlob(text)
    score = sentence.sentiment[0]
    sentiment = POSITIVE if score > 0 else NEGATIVE
    return (sentiment, score, sentence.string)


def main():
    if len(sys.argv) > 1:
        text = sys.argv[1]
        print 'anlyzing: %s' % text

        sentiment = analyze(text)
        mood = 'positive' if sentiment[0] == POSITIVE else 'negative'
        print 'sentiment is %s, with a score of %s' % (mood, sentiment[1])
        return 0
    else:
        print 'Usage: python %s <text>' % sys.argv[0]
        return 1

if __name__ == '__main__':
    sys.exit(main())
