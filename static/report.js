'use strict';

var REPORT_LABEL = '{obj}/{name}',
    REPORT_COMMENT = '- {text} ({score})',
    REPORT_CONTENT = 'comments for {obj}/{name} seems to be in a ' +
        '{human_sentiment} mood, with an average score of ' +
        '{average_sentiment} across {total_processed} comments analyzed.';

var $analyze = $('#analyze'),
    $err_msg = $analyze.find('.alert-danger').hide(),
    $spinner = $analyze.find('.btn .glyphicon-refresh-animate').hide();

var $objects = $analyze.find('input[name="obj"]'),
    $name = $analyze.find('#name');

var $report = $analyze.find('#report'),
    $report_content = $report.find('.content'),
    $report_comments = $report.find('.comments'),
    $report_title = $report.find('.title');

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
            errback(res, stat);
        }
    }, function (res, stat, err) {
        postback(obj, name);
        errback(res, stat, err);
    });
}

/**
 * @param {Object} req jQuery.ajax response
 */
function show_report(res) {
    var $comment,
        label = sprintf(REPORT_LABEL, res.report),
        content = sprintf(REPORT_CONTENT, res.report);

    $report_title.text(label);
    $report_content.text(content);
    $report_comments.find('*').remove();

    $.each(res.report.samples, function (i, sample) {
        $comment = $('<div>').text(sprintf(REPORT_COMMENT, sample));
        $report_comments.append($comment);
    });
}

/**
 * @param {Object} res jQuery.ajax response
 * @param {String} stat
 * @param {String} err
 */
function show_errors(res, stat, err) {
    var msg = res && res.human_error ? res.human_error : err;

    $report.hide();
    $err_msg.text('error: ' + msg)
        .show();
}

/**
 * cleans up ui before a request is made
 */
function request_setup() {
    $err_msg.hide();
    $spinner.show();

    $report.show();
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
    e.preventDefault();

    var name = $name.val(),
        obj = $objects.filter(':checked').val();

    get_report(obj, name, request_setup, request_teardown, show_report, show_errors);
});
