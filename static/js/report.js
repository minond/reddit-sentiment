'use strict';

/* globals $ */

var POSITIVE = 1,
    NEUTRAL = 0,
    NEGATIVE = -1;

var COMMENT_CUTOFF_LEN = 300,
    COMMENT_MAX_OFFSET = 1.15;

var TRANSITION_EVENTS = 'transitionend ' +
    'webkitTransitionEnd oTransitionEnd ' +
    'otransitionend MSTransitionEnd';

var ERROR_MESSAGE = 'error reqesting comments for {obj}/{name}: {error}',
    REPORT_LABEL = '{obj}/{name}',
    REPORT_COMMENT = '- {text} ({score})',
    REPORT_CONTENT = 'comments for {obj}/{name} appear to be in a ' +
        '{human_sentiment} mood, with an average score of ' +
        '{average_sentiment} across {total_processed} comments analyzed.';

var noop = function () {};

var $analyze = $('#analyze'),
    $err_msg = $analyze.find('.alert-danger').hide(),
    $spinner = $analyze.find('.btn .glyphicon-refresh-animate').hide();

var $objects = $analyze.find('input[name="obj"]'),
    $name = $analyze.find('#name');

var $report = $analyze.find('#report'),
    $report_content = $report.find('.content'),
    $report_comments = $report.find('.comments'),
    $report_title = $report.find('.title'),
    $alien = $analyze.find('#reddit-alien').hide();

/**
 * @param {Number} deg degrees to move antenna by
 * @param {Number} time transition time
 * @param {Function} cb transtion end callback
 * @return {jQuery} returns the jqueryfid antenna node
 */
function moveAntenna(deg, time, cb) {
    return $alien.find('.antenna').css({
        transition: time + 's',
        transform: 'rotate(' + deg + 'deg)'
    }).one(TRANSITION_EVENTS, cb || noop);
}

/**
 * @param {Number} top ear's y (top) axis movement
 * @param {Number} left left ear's x (left) axis movement
 * @param {Number} right right ear's x (left) axis movement
 * @param {Number} time transition time
 * @param {Function} cb transtion end callback
 * @return {jQuery} returns the jqueryfid ear nodes
 */
function wiggleEars(top, left, right, time, cb) {
    $alien.find('.ear.left').css({
        transition: time + 's',
        top: top,
        left: left
    });

    $('#reddit-alien .ear.right').css({
        transition: time + 's',
        top: top,
        left: right
    }).one(TRANSITION_EVENTS, cb || noop);

    return $('#reddit-alien .ear');
}

/**
 * wiggles the antenna and ears
 */
function alien_is_happy() {
    wiggleEars(90, 50, 206, 0.5, function () {
        wiggleEars(100, 40, 216, 0.5);
    });

    moveAntenna(1, 0.5, function () {
        moveAntenna(16, 0.5);
    });
}

/**
 * @param {String} string
 * @param {Object} fields
 * @return {String}
 */
function sprintf(string, fields) {
    var mfield, field;

    for (field in fields) {
        if (fields.hasOwnProperty(field)) {
            mfield = '{' + field + '}';
            string = string.replace(new RegExp(mfield, 'g'), fields[ field ]);
        }
    }

    return string;
}

/**
 * @param {String} obj user, r, etc.
 * @param {String} name object's name
 * @param {Function} preback called before the request
 * @param {Function} postback called after every request
 * @param {Function} callback called on success
 * @param {Function} errback called on errors
 */
function get_report(obj, name, preback, postback, callback, errback) {
    var fields = {
        obj: obj,
        name: name
    };

    preback(obj, name);

    $.ajax(sprintf('/sentiment/{obj}/{name}', fields)).then(function (res, stat) {
        postback(obj, name);

        if (res.ok) {
            callback(res, obj, name);
        } else {
            errback(res, stat, res.human_error, obj, name);
        }
    }, function (res, stat, err) {
        postback(obj, name);
        errback(res, stat, err, obj, name);
    });
}

/**
 * @param {Object} req jQuery.ajax response
 */
function show_report(res) {
    var $comment,
        label = sprintf(REPORT_LABEL, res.report),
        content = sprintf(REPORT_CONTENT, res.report);

    $alien.show();
    $report_title.text(label);
    $report_content.text(content);
    $report_comments.find('*').remove();

    $.each(res.report.samples, function (i, sample) {
        if (sample.text.length > COMMENT_CUTOFF_LEN * COMMENT_MAX_OFFSET) {
            sample.text = sample.text.substr(0, COMMENT_CUTOFF_LEN).replace(/\s+$/, '');
            sample.text += '...';
        }

        $comment = $('<div>').text(sprintf(REPORT_COMMENT, sample));
        $report_comments.append($comment);
    });

    switch (res.report.sentiment) {
        case POSITIVE:
            setTimeout(alien_is_happy, 1000);
            break;
    }
}

/**
 * @param {Object} res jQuery.ajax response
 * @param {String} stat
 * @param {String} err
 * @param {String} obj
 * @param {String} name
 */
function show_errors(res, stat, err, obj, name) {
    var fields = {
        obj: obj,
        name: name,
        error: res && res.human_error ? res.human_error : err,
    };

    $alien.hide();
    $report.hide();
    $err_msg.text(sprintf(ERROR_MESSAGE, fields))
        .show();
}

/**
 * cleans up ui before a request is made
 */
function request_setup() {
    $err_msg.hide();
    $spinner.show();

    $report.show();
    $alien.hide();
    $report_title.text('');
    $report_content.text('');
    $report_comments.text('');
}

/**
 * cleans up ui after a request is complete
 */
function request_teardown() {
    $spinner.hide();
}

$analyze.submit(function (e) {
    var name, obj;

    e.preventDefault();
    name = $name.val();
    obj = $objects.filter(':checked').val();

    get_report(obj, name, request_setup, request_teardown, show_report, show_errors);
});
