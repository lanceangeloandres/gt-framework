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