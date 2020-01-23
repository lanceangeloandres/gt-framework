(function () {
    function XPreloader() {
        var _base = this;

        _base.show = function (message) {
            if (message === undefined || message === null) {
                message = "";
                //return null;
            }

            if (message.toString().trim() === '') {
                message = "";
                //return null;
            }

            var _msg = "";
            if (message !== "") {
                _msg = message.toString().trim().substr(0, 24) + (message.toString().trim().length > 25 ? '..' : '');
            }

            var _msgUID = Guid.NewGuid();

            var _li = $('<li></li>')
                .attr({
                    'data-uid': _msgUID,
                    title: message.toString().trim()
                })
                .text(_msg);

            $('#xPageWaitList').append(_li);

            var _remainingItems = $('#xPageWaitList').find('li');

            if (_remainingItems.length == 1) {
                $('#xPageWaitList')
                    .css({
                        'line-height': '50px'
                    });
            } else if (_remainingItems.length == 2) {
                $('#xPageWaitList')
                    .css({
                        'line-height': '25px'
                    });
            } else {
                $('#xPageWaitList')
                    .css({
                        'line-height': ''
                    });
            }

            var nexusBarHeight = 40;
            var preloaderTop = 40;

            var scrollVal = $(document).scrollTop();

            var additionalTop = preloaderTop;

            if (scrollVal > nexusBarHeight) {
                additionalTop -= nexusBarHeight;
            }


            $('#xPageWait')
                .css({

                    //position: 'absolute',
                    //display: 'block',
                    //'top': additionalTop + $(document).scrollTop(),

                    position: 'absolute',
                    display: 'block',
                    'top': additionalTop + $(document).scrollTop(),
                    //width: '100%'
                    //additionalTop + $(document).scrollTop(),
                    //'left': '0px',
                    //'height': 'calc(100% - ' + additionalTop + 'px)',
                    //'width': '100%',
                    //'background-color': '#1515155e'
                });
            //$('#xPageWait')
            //    .css({
            //        width: '100%',
            //        display: 'block'
            //    });

            return _msgUID;
        };

        _base.hide = function (messageID) {
            if (messageID === undefined) {
                $('#xPageWaitList').find('li').remove();
                //$('#xPageWait')
                //    .css({
                //        width: '0'
                //    });
                $('#xPageWait').hide();

                return;
            }

            var _liToRemove = $('#xPageWaitList').find('[data-uid="' + messageID + '"]');

            _liToRemove.remove();

            var _remainingItems = $('#xPageWaitList').find('li');

            if (_remainingItems.length == 1) {
                $('#xPageWaitList')
                    .css({
                        'line-height': '50px'
                    });
            } else if (_remainingItems.length == 2) {
                $('#xPageWaitList')
                    .css({
                        'line-height': '25px'
                    });
            } else {
                $('#xPageWaitList')
                    .css({
                        'line-height': ''
                    });
            }

            if (_remainingItems.length == 0) {
                //$('#xPageWait')
                //    .css({
                //        width: '0'
                //    });
                $('#xPageWait').hide();
            }
        };
    }

    $('document').ready(function () {
        var nexusBarHeight = 40;
        var preloaderTop = 50;
        if ($._data(window).events.scroll === undefined) {
            $(window).scroll(function () {
                var $this = $(this);
                var additionalTopOnScroll = preloaderTop;


                if ($this.scrollTop() < nexusBarHeight) {
                    additionalTopOnScroll = preloaderTop - $this.scrollTop();
                } else {
                    additionalTopOnScroll -= nexusBarHeight;
                }

                //$('#xPageWait').css({
                //    'width': '100%',
                //});
                $('#xPageWait').css({
                    'top': additionalTopOnScroll + $this.scrollTop(),
                });

            });
        }
    });


    recruitment.preloader = new XPreloader();
})();