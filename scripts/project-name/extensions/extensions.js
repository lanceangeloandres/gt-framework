var Guid =
{
    NewGuid: function() {
        // http://stackoverflow.com/a/2117523/403971
        var a = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        return a.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    Empty: function() {
        return '00000000-0000-0000-0000-000000000000';
    },
    IsValid: function(guid) {
        var patt = new RegExp("^[{]?[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}[}]?$");
        return patt.test(guid);
    }
};

var string =
{
    isNullOrEmpty: function (str) {
        if (!str) {
            return true;
        }

        return false;
    }
};

var Int32 =
{
    TryParse: function (s, result) {
        var sTemp = s.trim().replace(',', '').split('.')[0];
        var regex = /(\d){1,}/;
        var isValid = regex.exec(sTemp)[0].length == sTemp.length;

        if (s.match(/\./g).length > 1) {
            result(0);
            return false;
        }

        if (isValid) {
            result(parseInt(sTemp));
        } else {
            result(0);
        }

        return isValid;
    }
};

(function() {
    function url() {
        var _url;
        var _resultQS = '';

        this.queryString = {};
        this.origin = '';
        this.port = '';
        this.hash = [];

        this.parse = function(strUrl) {
            _url = strUrl;

            this.queryString = NexusJS.URLUtility.getQueryStrings(_url);
            this.origin = strUrl.split('?')[0];

            for (var _a in this.queryString) {
                _resultQS += '&' + _a + '=' + this.queryString[_a];
            }

            return this;
        }

        this.toString = function() {
            _resultQS = '';

            for (var _a in this.queryString) {
                _resultQS += '&' + _a + '=' + this.queryString[_a];
            }

            return this.origin + '?' + _resultQS.substring(1);
        }
    }

    window['url'] = new url();
})(window);


var NexusJS = {
    ObjectUtility: {
        removeProperties: {},
        indexOf: {}
    },
    APIUtility: {
        generateUrl: {}
    },
    URLUtility: {
        getQueryStrings: {},
        appendQueryStrings: {}
    }
}

NexusJS.APIUtility.generateUrl = function(ctrlName, actionName, param) {
    var winLoc = window.location.origin;
    var apiUrl = '/api/' + ctrlName;

    if (actionName !== undefined && actionName !== null && actionName.trim() !== "") {
        apiUrl = apiUrl + '/' + actionName;
    }

    if (param !== undefined && param !== null && param.trim() !== "") {
        apiUrl = apiUrl + '/' + param;
    }
    
    return winLoc + apiUrl;
}

NexusJS.ObjectUtility.removeProperties = function (obj, propsToRemove) {
    delete obj['_events'];
    delete obj['_parent'];
    delete obj['length'];
    delete obj['type'];

    if (Object.prototype.toString.call(obj) === '[object Array]') {
        for (var i = 0; i < obj.length; i++) {
            obj[i] = NexusJS.ObjectUtility.removeProperties(obj[i], propsToRemove);
        }

        return obj;
    }


    for (p in obj) {
        var objProp = obj[p];

        if (typeof objProp === 'object' || (typeof objProp === 'function' && objProp !== null)) {
            obj[p] = NexusJS.ObjectUtility.removeProperties(objProp, propsToRemove);
        }

        if (NexusJS.ObjectUtility.indexOf.call(propsToRemove, p) != -1) {
            delete obj[p];
        }
    }

    return obj;
}

NexusJS.ObjectUtility.indexOf = function(needle) {
    if (typeof Array.prototype.indexOf === 'function') {
        NexusJS.ObjectUtility.indexOf = Array.prototype.indexOf;
    } else {
        NexusJS.ObjectUtility.indexOf = function(needle) {
            var i = -1,
                index = -1;

            for (i = 0; i < this.length; i++) {
                if (this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return NexusJS.ObjectUtility.indexOf.call(this, needle);
}

NexusJS.URLUtility.getQueryStrings = function (url) {
    var tempUrl = window.location.toString();

    if (url !== undefined &&
        url !== null &&
        url.toString().trim() !== '') {
        tempUrl = url;
    }

    var re = /[\?&]([^&=]+)=([^&=]+)/g;
    var m;
    var arr = {};

    while ((m = re.exec(tempUrl)) != null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

        arr[m[1]] = m[2];
    }

    return arr;
}

NexusJS.URLUtility.getQueryString = function (queryStrKey) {
    var tempUrl = window.location.toString();

    var re = /[\?&]([^&=]+)=([^&=]+)/g;
    var m;
    var retVal;

    while ((m = re.exec(tempUrl)) != null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

        if (m[1].toLowerCase() === queryStrKey.toLowerCase() )

        retVal = m[2];
    }

    return retVal;
}

NexusJS.URLUtility.appendQueryStrings = function (url, queryStrings) {
    var tempUrl = window.location.toString() || "";
    var resultQString = '';

    if (url !== undefined &&
        url !== null &&
        url.toString().trim() !== '') {
        tempUrl = url;
    }

    var arr = NexusJS.URLUtility.getQueryStrings(url);
    var baseUrl = tempUrl.split('?')[0];

    if (typeof queryStrings == 'string' ||
        queryStrings instanceof String) {

        var re = /[\?&]([^&=]+)=([^&=]+)/g;
        var m;

        while ((m = re.exec(queryStrings)) != null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }

            arr[m[1]] = m[2];
        }

    } else {
        for (var q in queryStrings) {
            arr[q] = queryStrings[q];
        }
    }


    for (var a in arr) {
        if (arr[a] !== undefined && arr[a] !== null && arr[a] !== '')
            resultQString += '&' + a + '=' + arr[a];
    }

    if (resultQString.substring(1) === null ||
        resultQString.substring(1).trim() === "" ||
        resultQString.substring(1) === undefined) {
        return baseUrl;
    }

    return baseUrl + '?' + resultQString.substring(1);
}


function gridEmptyMessage(grid, message, ds) {
    // Get the number of Columns in the grid
    var dataSource = ds === undefined ? grid.dataSource : ds;
    var isNoResult = false;
    var colCount = grid.element.find('.k-grid-header colgroup > col').length;

    grid.element.find('.k-grid-content')
        .css({
            'overflow': 'auto',
            'overflow-x': 'auto',
            'overflow-y': 'scroll'
        });

    // If there are no results place an indicator row
    if (dataSource._view.length == 0) {
        isNoResult = true;
        grid.element.find('.k-grid-content tbody')
            .append('<tr><td colspan="' + colCount + '" style="text-align:center"><b>' + message + '</b></td></tr>');

        grid.element.find('.k-grid-content')
            .css('overflow', 'hidden');
    }

    // Get visible row count
    var rowCount = grid.element.find('.k-grid-content tbody tr').length;

    // Get the row count limit
    var rowTake = dataSource._take != undefined ? dataSource._take : dataSource.take();

    // If the row count is less that the page size add in the number of missing rows
    if (rowCount < rowTake) {
        var addRows = rowTake - rowCount;

        for (var i = 0; i < addRows; i++) {
            var css = (rowCount + i) % 2 !== 0
                //&& !isNoResult
                ? 'k-alt' : '';

            var td = $('<tr></tr>')
                .addClass(css);
            
            for (var c = 0; c < colCount; c++) {
                td.append('<td>&nbsp;</td>');
                
                //if (isNoResult) {
                //    break;
                //}
            }

            grid.element.find('.k-grid-content tbody').append(td);
        }
    }
}

function dateOnly(e) {
    if ((new Date(e.target.value)).toString() === "Invalid Date") e.target.value = "";
};
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
        // if ($._data(window).events.scroll === undefined) {
        //     $(window).scroll(function () {
        //         var $this = $(this);
        //         var additionalTopOnScroll = preloaderTop;


        //         if ($this.scrollTop() < nexusBarHeight) {
        //             additionalTopOnScroll = preloaderTop - $this.scrollTop();
        //         } else {
        //             additionalTopOnScroll -= nexusBarHeight;
        //         }

        //         //$('#xPageWait').css({
        //         //    'width': '100%',
        //         //});
        //         $('#xPageWait').css({
        //             'top': additionalTopOnScroll + $this.scrollTop(),
        //         });

        //     });
        // }
    });


    recruitment.preloader = new XPreloader();
})();
(function() {
    app.directive('ngBindHtmlCompile',
        [
            '$compile',
            function($compile) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attrs) {
                        scope.$watch(
                            function () {
                                return scope.$eval(attrs.ngBindHtmlCompile);
                            },
                            function(value) {
                                // Incase value is a TrustedValueHolderType, sometimes it
                                // needs to be explicitly called into a string in order to
                                // get the HTML string.
                                element.html(value && value.toString());
                                // If scope is provided use it, otherwise use parent scope
                                var compileScope = scope;
                                if (attrs.bindHtmlScope) {
                                    compileScope = scope.$eval(attrs.bindHtmlScope);
                                }
                                $compile(element.contents())(compileScope);
                            });
                    }
                }
            }
        ]);
})(recruitment);