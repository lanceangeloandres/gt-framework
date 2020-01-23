(function () {
    function CDataSource(customOpt) {
        //var _loadingID = null;
        for (var _k in customOpt) {
            this[_k] = customOpt[_k];
        }

        this.pageSize = 10;
        if (customOpt.pageSize !== undefined) {
            this.pageSize = customOpt.pageSize;
        }

        //For ASP MVC API
        //Documentation
        //https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-type
        //Forum
        //https://www.telerik.com/forums/%27sort%27-parameter-of-datasourcerequest-in-mvc-action-is-null-
        this.type = "aspnetmvc-ajax";
        if (customOpt.type !== undefined) {
            this.type = customOpt.type;
        }
        if (customOpt.group !== undefined) {
            this.group = customOpt.group;
        }

        this.controller = '/';

        if (customOpt.serverFiltering !== null && customOpt.serverFiltering !== undefined) {
            this.serverFiltering = customOpt.serverFiltering;
        } else {
            this.serverFiltering = true;
        }

        if (customOpt.requestEnd !== undefined) {
            this.requestEnd = customOpt.requestEnd;
        } //YEL WAS HERE
        else {
            this.requestEnd = function (e) {
                if (e.type === 'destroy' || e.type === 'create') {
                    this.read();
                }
                else {
                    this.requestEnd = customOpt.requestEnd;
                }
            };
        }

        if (customOpt.serverPaging !== null && customOpt.serverPaging !== undefined) {
            this.serverPaging = customOpt.serverPaging;
        } else {
            this.serverPaging = true;
        }

        if (customOpt.serverSorting !== null && customOpt.serverSorting !== undefined) {
            this.serverSorting = customOpt.serverSorting;
        } else {
            this.serverSorting = true;
        }
        this.error = function (err) {
            console.log("error", err);
            if (err.xhr !== null || err.xhr === undefined) {
                var errorObj = err.xhr;
                var message = angular.fromJson(errorObj.responseText);

                if (message.Type === 'recruitment.recruitmentException.NotAuthorizeExecutionException') {
                    return;
                }

                // errorNotification.show(message.Message, "Error");
                errorNotification("Error", message.Message);

                if (message.Description.indexOf('DEL_Err') === 0) {
                    this.cancelChanges();
                    //this.read();
                }

            } else errorNotification("An unknown error has occured", "");
        };

        //this.requestStart = customOpt.requestStart;

        //this.requestEnd = customOpt.requestEnd;
        if (customOpt.data === undefined) {
            this.transport = {
                read: {
                    type: 'GET'
                },
                create: {
                    //contentType: this.type === "aspnetmvc-ajax" ? "aspnetmvc-ajax" : "application/json;charset=utf-8",
                    //contentType: "application/json;charset=utf-8",
                    //type: 'POST',
                    //processData: false,
                },
                update: {
                    //contentType: 'aspnetmvc-ajax',
                    //type: 'POST',
                    //processData: false,
                    //dataType: "jsonp"
                },
                destroy: {
                    type: 'DELETE'
                },

                parameterMap: function (options, operation) {
                    if (this.type !== "aspnetmvc-ajax") {
                        var _a = angular.copy(options);

                        if (operation === 'destroy')
                            return _a.UID;

                        if (operation !== "read") {
                            if (customOpt !== undefined) {
                                if (customOpt.beforeSend !== undefined) {
                                    customOpt.beforeSend(_a);
                                }
                            }
                            return JSON.stringify(_a);
                        }

                        var _qFilter = _a['filter'];
                        var _qSort = _a['sort'];

                        //this.options.read.url = this.options.read.url;
                        var _curUrl = {};

                        if (typeof this.options.read.url === 'string') {
                            _curUrl = url.parse(this.options.read.url);
                        } else if (typeof this.options.read.url === 'function') {
                            _curUrl = url.parse(this.options.read.url());
                        } else {
                            throw 'Not a valid this.options.read.url type';
                        }

                        var _defFilter = {};

                        if (_curUrl.queryString['filter'] !== undefined) {
                            _defFilter = JSON.parse(_curUrl.queryString['filter']);
                        }

                        //delete _curUrl.queryString['filter'];

                        // this.options.read.url = _curUrl.toString();

                        // this is for read operation
                        // a will return the pattern for serverFiltering, serverSorting, serverPaging
                        // #region Filter
                        if (_qFilter !== undefined) {
                            if (_qFilter['filters'] !== undefined) {
                                if (_qFilter['filters'][0] !== undefined) {
                                    if (_qFilter['filters'][0].field === 'search') {
                                        _defFilter['search'] = _qFilter['filters'][0].value;
                                    } else {
                                        for (var _i = 0; _i < _qFilter['filters'].length; _i++) {
                                            var _field = _qFilter['filters'][_i]['field'];
                                            var _value = _qFilter['filters'][_i]['value'];

                                            _defFilter[_field] = _value;
                                        }
                                    }
                                }
                            }

                            if (_qFilter['field'] !== undefined) {
                                if (_qFilter['field'] === 'search') {
                                    _defFilter['search'] = _qFilter['value'];
                                }
                            }
                        }

                        var _filterStr = JSON.stringify(_defFilter);
                        if (_filterStr !== '{}') {
                            _a['filter'] = _filterStr;
                        }
                        // #endregion

                        if (_qSort !== undefined) {
                            _a['sort'] = JSON.stringify(_qSort[0]);
                        }

                        return _a;
                    }
                    return JSON.stringify(options);
                }
            };
        } else {
            this.data = customOpt.data;
        }


        if (this.type === "aspnetmvc-ajax") {
            this.schema = {
                data: "Data",
                total: "Total",
                errors: "Errors",
                //parse: function (response, a) {
                //    console.log('parse called', response);
                //    if (response.Total !== undefined) {
                //        var arr = [];
                //        arr.Total = response.Total;

                //        if (response.Data !== undefined && response.Data !== null) {
                //            for (var i = 0; i < response.Data.length; i++) {
                //                arr.push(response.Data[i]);
                //            }
                //        }

                //        return arr;
                //    }
                //    //response = eval(response);
                //    //response.Data.map(function(item) {
                //    //    for (var prop in item) {
                //    //        if (item.hasOwnProperty(prop)) {
                //    //            if (typeof item[prop] == "string" && item[prop].toLowerCase().includes("date")) {
                //    //                if (item[prop] === "/Date(-62135596800000)/") {
                //    //                    item[prop] = null;
                //    //                } else {
                //    //                    item[prop] = kendo.parseDate(item[prop]);
                //    //                }
                //    //            }
                //    //        }
                //    //    };
                //    //});
                //    response = repositoryParseResult(response);


                //    // this is set if the request is not serverside (serverFiltering, serverPaging, serverSorting)
                //    response.Total = response.length;
                //    return response;
                //}
            };
        } else {
            //this.schema = {
            //    total: 'TotalRows',
            //    errors: function (r) {
            //    },
            //    data: 'Data',
            //    parse: function (response, a) {
            //        console.log('parse called 2', response);
            //        if (response.TotalRows !== undefined) {
            //            var arr = [];
            //            arr.TotalRows = response.TotalRows;

            //            if (response.Result !== undefined && response.Result !== null) {
            //                for (var i = 0; i < response.Result.length; i++) {
            //                    arr.push(response.Result[i]);
            //                }
            //            }

            //            return arr;
            //        }
            //        //response = eval(response);
            //        //response.Data.map(function(item) {
            //        //    for (var prop in item) {
            //        //        if (item.hasOwnProperty(prop)) {
            //        //            if (typeof item[prop] == "string" && item[prop].toLowerCase().includes("date")) {
            //        //                if (item[prop] === "/Date(-62135596800000)/") {
            //        //                    item[prop] = null;
            //        //                } else {
            //        //                    item[prop] = kendo.parseDate(item[prop]);
            //        //                }
            //        //            }
            //        //        }
            //        //    };
            //        //});
            //        response = repositoryParseResult(response);


            //        // this is set if the request is not serverside (serverFiltering, serverPaging, serverSorting)
            //        response.TotalRows = response.length;
            //        return response;
            //    }
            //};
            this.schema = {
                total: 'Total',
                errors: function (r) {
                },
                data: 'Data',
                parse: function (response, a) {
                    console.log('parse called 2', response);
                    if (response.Total !== undefined) {
                        var arr = [];
                        arr.Total = response.Total;

                        if (response.Data !== undefined && response.Data !== null) {
                            for (var i = 0; i < response.Data.length; i++) {
                                arr.push(response.Data[i]);
                            }
                        }

                        return arr;
                    }
                    //response = eval(response);
                    //response.Data.map(function(item) {
                    //    for (var prop in item) {
                    //        if (item.hasOwnProperty(prop)) {
                    //            if (typeof item[prop] == "string" && item[prop].toLowerCase().includes("date")) {
                    //                if (item[prop] === "/Date(-62135596800000)/") {
                    //                    item[prop] = null;
                    //                } else {
                    //                    item[prop] = kendo.parseDate(item[prop]);
                    //                }
                    //            }
                    //        }
                    //    };
                    //});
                    response = repositoryParseResult(response);


                    // this is set if the request is not serverside (serverFiltering, serverPaging, serverSorting)
                    response.Total = response.length;
                    return response;
                }
            };
        }

        if (customOpt !== undefined && customOpt !== null) {
            var _createRepo = new recruitment.repository(),
                _readRepo = new recruitment.repository(),
                _updateRepo = new recruitment.repository(),
                _deleteRepo = new recruitment.repository();

            if (customOpt.schema !== undefined && customOpt.schema !== null) {
                if (customOpt.schema.model !== undefined && customOpt.schema.model !== null) {
                    if (customOpt.schema.model.kendoModel !== undefined && customOpt.schema.model.kendoModel !== null) {
                        this.schema.model = customOpt.schema.model.kendoModel;
                    } else {
                        this.schema.model = customOpt.schema.model;
                    }
                }
            }

            //#region Overriding Transport
            if (customOpt.transport !== undefined && customOpt.transport !== null) {
                if (customOpt.transport.autoSync !== undefined) {
                    this.transport.autoSync = customOpt.transport.autoSync;
                }

                if (customOpt.transport.read !== undefined && customOpt.transport.read !== null) {
                    if (typeof customOpt.transport.read === 'string' ||
                        customOpt.transport.read instanceof String ||
                        typeof customOpt.transport.read === 'function') {
                        this.transport.read = customOpt.transport.read;
                    } else {
                        if (customOpt.transport.read.url !== undefined) {
                            this.transport.read.url = customOpt.transport.read.url;
                        }
                    }
                }

                if (customOpt.transport.create !== undefined && customOpt.transport.create !== null) {
                    if (typeof customOpt.transport.create === 'string' ||
                        customOpt.transport.create instanceof String ||
                        typeof customOpt.transport.create === 'function') {
                        this.transport.create = customOpt.transport.create;
                    } else {
                        if (customOpt.transport.create.url !== undefined) {
                            this.transport.create.url = customOpt.transport.create.url;
                        }
                    }
                }

                if (customOpt.transport.update !== undefined && customOpt.transport.update !== null) {
                    if (typeof customOpt.transport.update === 'string' ||
                        customOpt.transport.update instanceof String ||
                        typeof customOpt.transport.update === 'function') {
                        this.transport.update = customOpt.transport.update;
                    } else {
                        if (customOpt.transport.update.url !== undefined) {
                            this.transport.update.url = customOpt.transport.update.url;
                        }
                    }
                } else {
                    var _reUpdate = new RegExp(recruitmentConfig.VirtualPath + "/" + '[a-zA-Z][a-zA-Z0-9]+', 'i');
                    var _strUpdate = '';

                    if (typeof this.transport.read === 'string') {
                        _strUpdate = this.transport.read;
                    } else {
                        if (typeof this.transport.read.url === 'string') {
                            _strUpdate = this.transport.read.url;
                        } else if (typeof this.transport.read.url === 'function') {
                            _strUpdate = this.transport.read.url();
                        }
                    }

                    var _matchUpdate;

                    if ((_matchUpdate = _reUpdate.exec(_strUpdate)) !== null) {
                        if (_matchUpdate.index === _reUpdate.lastIndex) {
                            _reUpdate.lastIndex++;
                        }

                        this.transport.update.url = _matchUpdate[0];
                    }
                }

                if (customOpt.transport.destroy !== undefined && customOpt.transport.destroy !== null) {
                    if (typeof customOpt.transport.destroy === 'string' ||
                        customOpt.transport.destroy instanceof String ||
                        typeof customOpt.transport.destroy === 'function') {
                        this.transport.destroy = customOpt.transport.destroy;
                    } else {
                        if (customOpt.transport.destroy.url !== undefined) {
                            this.transport.destroy.url = customOpt.transport.destroy.url;
                        }
                    }
                } else {
                    var _reDel = new RegExp(recruitmentConfig.VirtualPath + "/" + '[a-zA-Z][a-zA-Z0-9]+', 'i');

                    var _strDel = '';

                    if (typeof this.transport.read === 'string') {
                        _strDel = this.transport.read;
                    } else {
                        if (typeof this.transport.read.url === 'string') {
                            _strDel = this.transport.read.url;
                        } else if (typeof this.transport.read.url === 'function') {
                            _strDel = this.transport.read.url();
                        }
                    }

                    var _matchDel;

                    if ((_matchDel = _reDel.exec(_strDel)) !== null) {
                        if (_matchDel.index === _reDel.lastIndex) {
                            _reDel.lastIndex++;
                        }

                        this.transport.destroy.url = function () {
                            var _dataToDel = this.data;
                            this.data = null;

                            return _matchDel[0] + '/' + _dataToDel;
                        };
                    }
                }
            }
            //#endregion

            //#region New Type of Transport (Repository)
            if (customOpt.repository !== undefined && customOpt.repository !== null) {
                if (customOpt.repository.controller !== undefined && customOpt.repository.controller !== null) {

                    this.controller = customOpt.repository.controller;

                    if (customOpt.repository.action !== undefined && customOpt.repository.action !== null) {
                        if (customOpt.repository.action.read !== undefined &&
                            customOpt.repository.action.read !== null) {
                            _readRepo.controller(customOpt.repository.controller);
                            _readRepo.action(customOpt.repository.action.read);
                            _readRepo.param(customOpt.repository.param);
                            _readRepo.includeQS(customOpt.repository.includeQS);
                            _readRepo.queryString(customOpt.repository.queryString);
                            _readRepo.filter(customOpt.repository.filter);
                            _readRepo.sort(customOpt.repository.sort);
                            this.transport.read.url = _readRepo.url;
                        }

                        if (customOpt.repository.action.create !== undefined &&
                            customOpt.repository.action.create !== null) {
                            _createRepo.controller(customOpt.repository.controller);
                            _createRepo.action(customOpt.repository.action.create);
                            _createRepo.param(customOpt.repository.param);
                            _createRepo.includeQS(customOpt.repository.includeQS);
                            _createRepo.queryString(customOpt.repository.queryString);
                            _createRepo.filter(customOpt.repository.filter);
                            this.transport.create.url = _createRepo.url;
                        }

                        if (customOpt.repository.action.update !== undefined &&
                            customOpt.repository.action.update !== null) {
                            _updateRepo.controller(customOpt.repository.controller);
                            _updateRepo.action(customOpt.repository.action.update);

                            //this.transport.update.url = function () {
                            //    var _updateData = JSON.stringify(this.data);
                            //    this.data = null;

                            //    var _repoCopy = angular.copy(_updateRepo);
                            //    console.log('update data', _updateData);

                            //    return _repoCopy.param(_updateData).url;
                            //};
                            this.transport.update.url = _updateRepo.url;
                        }

                        if ((customOpt.repository.action.delete !== undefined &&
                            customOpt.repository.action.delete !== null) ||
                            (customOpt.repository.action.destroy !== undefined &&
                                customOpt.repository.action.destroy !== null)
                        ) {
                            _deleteRepo.controller(customOpt.repository.controller);

                            if (customOpt.repository.action.delete !== undefined &&
                                customOpt.repository.action.delete !== null) {
                                _deleteRepo.action(customOpt.repository.action.delete);
                            }
                            if (customOpt.repository.action.destroy !== undefined &&
                                customOpt.repository.action.destroy !== null) {
                                _deleteRepo.action(customOpt.repository.action.destroy);
                            }

                            this.transport.destroy.url = function () {
                                var _delData = this.data;
                                this.data = null;

                                var _repoCopy = angular.copy(_deleteRepo);

                                return _repoCopy.param(_delData).url;
                            };
                        }

                    }


                }
            }
            //#endregion

            if (customOpt.change !== undefined && customOpt.change !== null) {
                this.change = customOpt.change;
            }
            if (customOpt.parameterMap !== undefined && customOpt.parameterMap !== null) {
                this.transport.parameterMap = customOpt.parameterMap;
            }
        }
    };

    recruitment.CDataSource = CDataSource;
})(recruitment);