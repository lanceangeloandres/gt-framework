(function(app) {
    app.service('dataFactory',
        [
            app.Services.Log, app.Services.Cache,
            function($log, $cache) {
                //var dataFactory = function(){};

                var dataFactory = function() {
                    this.key = {};
                    this.url = '';
                    this.me = function(actionUIDs) {
                        if ($.type(actionUIDs) == 'array') {
                            return $.ajax(recruitmentConfig.VirtualPath + "/", 
                                {
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: JSON.stringify(actionUIDs)
                                });
                        }

                        return $.ajax(recruitmentConfig.VirtualPath + "/", 
                            {
                                type: 'GET',
                                dataType: 'json'
                            });
                    };

                    this.controller = function(ctrler) {
                        this.url = recruitmentConfig.VirtualPath + "/" + ctrler; 
                        return this;
                    };
                    this.action = function(actn) {
                        //if (ctrler.trim() == '') alert('Controller is not defined') ;
                        if (actn.trim() !== '') this.url = this.url + '/' + actn;
                        return this;
                    };
                    this.queryString = function(valuePair) {
                        this.url = NexusJS.URLUtility.appendQueryStrings(this.url, valuePair);

                        return this;
                    };
                    this.includeQS = function(arr) {
                        if (arr !== undefined && arr !== null) {
                            var a = {};

                            for (var i = 0; i < arr.length; i++) {
                                var b = NexusJS.URLUtility.getQueryString(arr[i]);

                                if (b !== undefined) {
                                    a[arr[i]] = b;
                                } else {
                                    var cachedVal = $cache.getGlobal(arr[i].toLowerCase());

                                    if (cachedVal !== undefined) {
                                        a[arr[i]] = cachedVal;
                                    }
                                }
                            }

                            this.url = NexusJS.URLUtility.appendQueryStrings(this.url, a);
                        }

                        return this;
                    };
                    this.param = function(parm) {
                        if (parm !== undefined &&
                            parm !== null &&
                            parm !== '') {
                            var a = parm.toString();
                            //if (ctrler.trim() == '') alert('Controller is not defined');
                            if (a.trim() !== '') this.url = this.url + '/' + a;
                        }

                        return this;
                    };
                    this.filter = function(filterKeyword) {
                        //if (filterKeyword != undefined && filterKeyword.trim() !== '')
                        //    this.url = NexusJS.URLUtility.appendQueryStrings(this.url, {
                        //        filter: filterKeyword
                        //    });
                        this.url = NexusJS.URLUtility.appendQueryStrings(this.url,
                            {
                                filter: JSON.stringify(filterKeyword)
                            });
                        
                        return this;
                    };
                    this.sort = function(sort) {
                        this.url = NexusJS.URLUtility.appendQueryStrings(this.url,
                            {
                                sort: JSON.stringify(sort)
                            });

                        return this;
                    };
                    this.get = function (async = true) {
                        var currentQString = NexusJS.URLUtility.getQueryStrings();
                        var tempUrl = NexusJS.URLUtility
                            .appendQueryStrings(this.url, currentQString);

                        $log.info('API GET: ',
                            {
                                url: tempUrl
                            });

                        return $.ajax(tempUrl,
                            {
                                type: 'GET',
                                dataType: 'json',
                                xhrField: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                async: async
                            })
                            //.success(function (res) {
                            //    //if (res != null && res != undefined) {
                            //    //    return parseMVCJsonResult(res);
                            //    //}
                            //    return repositoryParseResult(res);
                            //})
                            ;

                        //var httpObj = $http.get(tempUrl);
                        //httpObj.url = tempUrl;
                        //return httpObj;
                    };
                    this.post = function (item) {
                        var currentQString = NexusJS.URLUtility.getQueryStrings();
                        var tempUrl = NexusJS.URLUtility
                            .appendQueryStrings(this.url, currentQString);
                        if (item !== undefined) {
                            if (item !== null) {
                                if (Object.prototype.toString.call(item) === '[object Array]') {
                                    $log.info('API POST: ',
                                        {
                                            url: tempUrl,
                                            top10data: item.take(10)
                                        });
                                } else {
                                    $log.info('API POST: ',
                                        {
                                            url: tempUrl,
                                            top10data: item
                                        });
                                }
                            }
                        } else {
                            $log.info('API POST: ',
                                {
                                    url: tempUrl
                                });
                        }
                        $log.info("inaantok na ko", this);
                        var httpObj = $.ajax(tempUrl,
                            {
                                type: 'POST',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: item,
                                processData: false
                            });

                        return httpObj;

                        //var httpObj = $http.post(this.url, item);
                        //httpObj.url = this.url;
                        //return httpObj;
                    };
                    this.put = function (item) {
                        var currentQString = NexusJS.URLUtility.getQueryStrings();
                        var tempUrl = NexusJS.URLUtility
                            .appendQueryStrings(this.url, currentQString);

                        if (item !== undefined) {
                            if (item !== null) {
                                if (Object.prototype.toString.call(item) === '[object Array]') {
                                    $log.info('API PUT: ',
                                        {
                                            url: tempUrl,
                                            top10data: item.take(10)
                                        });
                                } else {
                                    $log.info('API PUT: ',
                                        {
                                            url: tempUrl,
                                            top10data: item
                                        });
                                }
                            }
                        } else {
                            $log.info('API PUT: ',
                                {
                                    url: tempUrl
                                });
                        }

                        return $.ajax(tempUrl,
                            {
                                type: 'PUT',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: item,
                                processData: false,
                            });

                        //var httpObj = $http.put(this.url, item);
                        //httpObj.url = this.url;
                        //return httpObj;
                    };
                    this.delete = function() {
                        var currentQString = NexusJS.URLUtility.getQueryStrings();
                        var tempUrl = NexusJS.URLUtility
                            .appendQueryStrings(this.url, currentQString);

                        $log.info('API DELETE: ',
                            {
                                url: tempUrl
                            });

                        return $.ajax(tempUrl,
                            {
                                type: 'DELETE'
                            });

                        //var httpObj = $http.delete(this.url);
                        //httpObj.url = this.url;
                        //return httpObj;
                    };

                    this.key.__defineGetter__('cuid',
                        function (index) {
                            if (window.location.query !== undefined && window.location.query['cuid'] !== undefined) {
                                return window.location.query['cuid'];
                            } else {
                                var cachedVal = $cache.getGlobal('cuid');

                                return cachedVal;
                            }
                        });
                }

                recruitment.repository = dataFactory;

                return new dataFactory();
            }
        ]);
})(app);