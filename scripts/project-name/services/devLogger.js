(function(angularApp, global) {
    angularApp.factory('devLogger',
    [
        '$log',
        function($log) {
            var currentLogTick;

            var _retVal = {
                resetTimer: function() {
                    currentLogTick = undefined;
                },
                log: function(msg, data) {
                    var time = '0.00 ms';

                    if (currentLogTick === undefined) {
                        currentLogTick = performance.now();
                    } else {
                        var newLogTick = performance.now();
                        var diffLog = newLogTick - currentLogTick;

                        currentLogTick = newLogTick;

                        time = diffLog.toFixed(2).toString() + ' ms';
                    }

                    if (data === undefined) {
                        console.log("Dev:" + time + " ", msg);
                    } else {
                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            console.log("Dev:" + time + " " + msg, data);
                        } else if (Object.prototype.toString.call(data) === '[object Boolean]') {
                            console.log("Dev:" + time + " " + msg, data);
                        } else {
                            console.log("Dev:" + time + " " + msg, { data: data });
                        }
                    }
                },
                info: function (info, data) {
                    var time = '0.00 ms';

                    if (currentLogTick === undefined) {
                        currentLogTick = performance.now();
                    } else {
                        var newLogTick = performance.now();
                        var diffLog = newLogTick - currentLogTick;

                        currentLogTick = newLogTick;

                        time = diffLog.toFixed(2).toString() + ' ms';
                    }

                    if (data === undefined) {
                        $log.debug('Dev:' + time + " " + info);
                    } else {
                        $log.debug('Dev:' + time + " " + info, data);
                    }
                }
            };

            global['console'] = _retVal;

            return _retVal;
        }
    ]);
})(app, recruitment);