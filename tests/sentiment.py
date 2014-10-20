import unittest
from src import sentiment


class TestSentimentFunctions(unittest.TestCase):
    def test_human_format(self):
        self.assertEqual('positive', sentiment.human(sentiment.POSITIVE))
        self.assertEqual('negative', sentiment.human(sentiment.NEGATIVE))
        self.assertEqual('neutral', sentiment.human(sentiment.NEUTRAL))

    def test_mood_response(self):
        self.assertEqual(sentiment.POSITIVE, sentiment.mood(1))
        self.assertEqual(sentiment.NEGATIVE, sentiment.mood(-1))
        self.assertEqual(sentiment.NEUTRAL, sentiment.mood(0))

    def test_a_positive_string(self):
        sentence = sentiment.analyze('i love you')
        self.assertEqual(sentiment.POSITIVE, sentence['sentiment'])

    def test_a_negative_string(self):
        sentence = sentiment.analyze('i hate you')
        self.assertEqual(sentiment.NEGATIVE, sentence['sentiment'])

    def test_a_neutral_string(self):
        sentence = sentiment.analyze('hello how are you')
        self.assertEqual(sentiment.NEUTRAL, sentence['sentiment'])

    def test_analize_returns_right_information(self):
        sentence = sentiment.analyze('hello how are you')
        self.assertIsNotNone(sentence['sentiment'])
        self.assertIsNotNone(sentence['human_sentiment'])
        self.assertIsNotNone(sentence['score'])
        self.assertIsNotNone(sentence['text'])

    def test_report_returns_right_information(self):
        report = sentiment.report(['i love you'])
        self.assertIsNotNone(report['sentiment'])
        self.assertIsNotNone(report['human_sentiment'])
        self.assertIsNotNone(report['total_processed'])
        self.assertIsNotNone(report['average_sentiment'])
        self.assertIsNotNone(report['samples'])

    def test_report_positive_strings(self):
        report = sentiment.report(['i love you'])
        self.assertEqual(sentiment.POSITIVE, report['sentiment'])

    def test_report_positive_strings(self):
        report = sentiment.report(['i hate you'])
        self.assertEqual(sentiment.NEGATIVE, report['sentiment'])

    def test_report_neutral_strings(self):
        report = sentiment.report(['hey', 'hello'])
        self.assertEqual(sentiment.NEUTRAL, report['sentiment'])

    def test_report_checks_all_strings(self):
        report = sentiment.report(['hey'] * 100)
        self.assertEqual(100, report['total_processed'])

if __name__ == '__main__':
    unittest.main()
