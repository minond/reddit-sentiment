'use strict';

/* globals $name, show_report */

$name.val('javascript');
show_report({
    "human_error": "",
    "name": "javascript",
    "obj": "r",
    "ok": true,
    "report": {
        "average_sentiment": 0.46,
        "human_sentiment": "positive",
        "name": "javascript",
        "obj": "r",
        "overall_sentiment": 46,
        "samples": [
            {
                "human_sentiment": "positive",
                "score": 0.4,
                "sentiment": 1,
                "text": "Yeah, and forget legacy support. But, these features are already (mostly) available in Node, yes?"
            },
            {
                "human_sentiment": "positive",
                "score": 0.35,
                "sentiment": 1,
                "text": "Thank you! I feel like I need to get a proper handle on the innards of JS before I can be good at programming with it. "
            },
            {
                "human_sentiment": "positive",
                "score": 0.28125,
                "sentiment": 1,
                "text": "What the hell is with all of the ES6 articles on Reddit today? We're still *years* off from it ever being fully implemented across most major browsers."
            },
            {
                "human_sentiment": "positive",
                "score": 0.08333333333333333,
                "sentiment": 1,
                "text": "Please read up on reddit's rules @ http://reddit.com/rules, specifically point #1 of rule #1. Our [guidelines](http://www.reddit.com/r/javascript/wiki/index) also have more information regarding promotion &amp; self-promotion.\n\n**Consider this your only warning.** If you continue to post _only_ your site, we'll be forced to take action.\n\nThanks for your understanding."
            },
            {
                "human_sentiment": "positive",
                "score": 0.08333333333333333,
                "sentiment": 1,
                "text": "Please read up on reddit's rules @ http://reddit.com/rules, specifically point #1 of rule #1. Our [guidelines](http://www.reddit.com/r/javascript/wiki/index) also have more information regarding promotion &amp; self-promotion.\n\n**Consider this your only warning.** If you continue to post _only_ your site, we'll be forced to take action.\n\nThanks for your understanding."
            },
            {
                "human_sentiment": "positive",
                "score": 0.11802248677248676,
                "sentiment": 1,
                "text": "I have actually, every single day for work and open source projects. In fact my coworker works very closely with substack on plugins/transforms around Browserify. I'm also on the core team of Marionette.js, a Backbone framework which uses jQuery. And here's an open source project I have that uses Browserify, jQuery, and several jQuery plugins: https://github.com/thejameskyle/marionette-wires.\n\nSo if this is a question if I've actually used this technology, the answer is yes, I have.\n\nI've use all sorts of frameworks and libraries and work very hard to keep really massive applications rendering as fast as possible. There's never been a time in my career where removing a generic library has sped up time to first render in any significant way. There's a lot more going on there. Paul Irish has some great talks on the matter if you're interested."
            },
            {
                "human_sentiment": "positive",
                "score": 0.0875,
                "sentiment": 1,
                "text": "Wow.  Talk about a blast from the past.  The two lines at the top are browser detection.  If you called 'document.all', and the object wasn't undefined, then you knew you were in IE land, and likewise, only Netscape supported layer elements.\n\n"
            },
            {
                "human_sentiment": "positive",
                "score": 0.07708333333333332,
                "sentiment": 1,
                "text": "There is a staggering amount of spelling and grammatical errors in that article. Normally i wouldn't worry too much about it but in this case its pretty hard to read."
            },
            {
                "human_sentiment": "positive",
                "score": 0.08666666666666667,
                "sentiment": 1,
                "text": "Hi, Mithril author here.\n\nHave you considered looking at sweet.js? James Long wrote a JSX parser with it here ( http://jlongster.com/Compiling-JSX-with-Sweet.js-using-Readtables ), and I also use it for Mithril's template compiler (it basically takes m() calls and converts them into the respective output data structures). In theory, it should be possible to adapt these projects to transpile from one vdom structure to another (and possibly even to transpile to the higher-level view languages (i.e. h(), m(), jsx).\n\nI think interop between frameworks is a bit of a loftier goal. Personally, I don't think anyone would want to write code targeting an universal vdom because xkcd.com/927\n\nI think it's more realistic to think of tools to make existing components transpilable. FWIW, I took your universal proof-of-concept ( https://gist.github.com/gcanti/52d6240ee8e51b857985 ) and ported it to Mithril and the code turned out almost identical ( https://gist.github.com/lhorie/0391520181d761722977 ).\n\nWould also be interested in seeing someone try writing a React-to-Mithril or to-Mercury adapter."
            },
            {
                "human_sentiment": "positive",
                "score": 0.15000000000000002,
                "sentiment": 1,
                "text": "When compared with the next must common library amongst all the top sites I'll bet that it is a huge number"
            }
        ],
        "sentiment": 1,
        "total_processed": 100
    }
});
