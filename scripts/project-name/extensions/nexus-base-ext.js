

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