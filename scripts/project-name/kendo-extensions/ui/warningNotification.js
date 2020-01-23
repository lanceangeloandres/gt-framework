(function () {
    var _warningNotification = {
        show: function (messages, title, autoHide) {
            if ($("#warningNotif").data("kendoNotification") === undefined ||
                $("#warningNotif").data("kendoNotification") === null) {
                $("#warningNotif").kendoNotification({
                    autoHideAfter: 5000,
                    hideOnClick: true,
                    position: {
                        bottom: 20,
                        right: 20
                    },
                    // width: 300,
                    templates: [
                        {
                            type: "warning",
                            // template: "<div class='warning-notification'>#= customMsg#</div>"
                            template:
                                '<div data-notify="container" class="column is-one-quarter alert alert-warning alert-with-icon animated fadeInDown" role="alert" data-notify-position="bottom-right">' +
                                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
                                '<i class="material-icons md-18">close</i>' +
                                '</button>' +
                                '<i data-notify="icon" class="material-icons">notifications</i>' +
                                '#= customMsg#' +
                                '</div>'
                        }
                    ]
                });
            }

            var _notifWidget = $("#warningNotif").data("kendoNotification");
            if (autoHide === true)
                _notifWidget.options.autoHideAfter = 5000;

            var message = "";
            title = title === undefined ? "" : title;
            if (typeof (messages) === 'object') {
                message = '<ul style="list-style-type: none; padding: 0; margin: 0;">'
                messages.forEach(function (msg) {
                    message += '<span data-notify="message" class="is-size-6">' + msg + '</span></li>';
                });
                message += '</ul>';
            } else
                message = '<span data-notify="title" class="is-size-6 has-text-weight-semibold">' + title + '</span>' +
                    '<span data-notify="message" class="is-size-6">' + messages + '</span></li>';

            _notifWidget.hide();
            _notifWidget.warning({
                customMsg: message
            });
        },
        hide: function () {
            if ($("#warningNotif").data("kendoNotification") !== undefined &&
                $("#warningNotif").data("kendoNotification") !== null) {
                var _notifWidget = $("#warningNotif").data("kendoNotification");
                _notifWidget.hide();
            }
        }
    };

    window['warningNotification'] = _warningNotification;
})();