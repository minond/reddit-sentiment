from textblob import TextBlob

POSITIVE = 1
NEUTRAL = 0
NEGATIVE = -1


def human(mood):
    """Takes a mood label and returns a mood string"""
    if mood == POSITIVE:
        return 'positive'
    elif mood == NEGATIVE:
        return 'negative'
    else:
        return 'neutral'


def mood(score):
    """Takes a sentiment score and returns a mood label"""
    if score > 0:
        return POSITIVE
    elif score < 0:
        return NEGATIVE
    else:
        return NEUTRAL


def analyze(text):
    """Return a dictionary with a sentence's sentiment, score, and text"""
    sentence = TextBlob(text)
    score = sentence.sentiment[0]
    sentiment = mood(score)

    return {
        'sentiment': sentiment,
        'score': score,
        'text': sentence.string
    }


def report(strings, sample_set_size=10):
    """Takes a list of strings, analyzes all of them, then returns a dictionary
    with a basic report. Includes average sentiment and the top ten comments
    that best represent the overall mood

    Keyword arguments:
    sample_set_size -- number of samples to return with report
    """
    overall_sentiment = 0
    total_processed = 0

    positive = []
    negative = []
    neutral = []
    samples = []

    for text in strings:
        sentence = analyze(text)
        sentiment = sentence['sentiment']

        overall_sentiment += sentiment
        total_processed += 1

        if sentiment == POSITIVE:
            positive.append(sentence)
        elif sentiment == NEGATIVE:
            negative.append(sentence)
        else:
            neutral.append(sentence)

    positive = sorted(positive, key=lambda c: c['sentiment'], reverse=True)
    negative = sorted(negative, key=lambda c: c['sentiment'])

    if mood(overall_sentiment) == POSITIVE:
        samples = positive[:sample_set_size]
    elif mood(overall_sentiment) == NEGATIVE:
        samples = negative[:sample_set_size]
    else:
        samples = neutral[:sample_set_size]

    return {
        'sentiment': mood(overall_sentiment),
        'human_sentiment': human(mood(overall_sentiment)),
        'total_processed': total_processed,
        'overall_sentiment': overall_sentiment,
        'average_sentiment': float(overall_sentiment) / total_processed,
        'samples': samples
    }


if __name__ == '__main__':
    import sys

    if len(sys.argv) > 1:
        text = sys.argv[1]
        sentence = analyze(text)
        mood = human(sentence['sentiment'])

        print 'sentiment is %s, with a score of %s' % (mood, sentence['score'])
        sys.exit(0)
    else:
        print 'Usage: python %s <text>' % sys.argv[0]
        sys.exit(1)
