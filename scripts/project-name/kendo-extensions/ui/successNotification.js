(function () {
    var _successNotification = {
        show: function (messages, title, autoHide) {
            if ($("#successNotif").data("kendoNotification") === undefined ||
                $("#successNotif").data("kendoNotification") === null) {
                $("#successNotif").kendoNotification({
                    autoHideAfter: 5000,
                    hideOnClick: true,
                    position: {
                        bottom: 20,
                        right: 20
                    },
                    // width: 300,
                    templates: [
                        {
                            type: "success",
                            // template: "<div class='success-notification'>#= customMsg#</div>"
                            template:
                                '<div data-notify="container" class="column is-one-quarter alert alert-success alert-with-icon animated fadeInDown" role="alert" data-notify-position="bottom-right">' +
                                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
                                '<i class="material-icons md-18">close</i>' +
                                '</button>' +
                                '<i data-notify="icon" class="material-icons">check_circle</i>' +
                                '#= customMsg#' +
                                '</div>'
                        }
                    ]
                });
            }

            var _notifWidget = $("#successNotif").data("kendoNotification");
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
            _notifWidget.success({
                customMsg: message
            });
        },
        hide: function () {
            if ($("#successNotif").data("kendoNotification") !== undefined &&
                $("#successNotif").data("kendoNotification") !== null) {
                var _notifWidget = $("#successNotif").data("kendoNotification");
                _notifWidget.hide();
            }
        }
    };

    window['successNotification'] = _successNotification;
})();