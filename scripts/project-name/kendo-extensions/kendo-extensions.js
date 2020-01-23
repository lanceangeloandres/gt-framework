(function (app) {
    function CValidator(form) {
        // set up options of validator
        var strErrorMessage;

        this.options = {
            validateOnBlur: false,
            rules: {
                //Ex. <input required> - field is required
                required: function (ctrl) {
                    if (ctrl.is("[required]") && !ctrl.is(".ng-hide") && !ctrl.closest("div").hasClass("ng-hide")) {
                        console.log('ctrl in', ctrl.closest("div"));
                        if (ctrl.is("[kendo-combo-box]") || ctrl.is("[data-kendo-combo-box]")) {
                            var elem = ctrl.data("kendoComboBox");

                            if (elem.selectedIndex > -1) return true;
                            else if (elem.value() !== "" && elem.value() !== null && elem.value() !== undefined) return true;

                            return false;
                        } else if (ctrl.is("[kendo-drop-down-list]") || ctrl.is("[data-kendo-drop-down-list]")) {
                            console.log('eto yun e');
                            elem = ctrl.data("kendoDropDownList");
                            if (elem.options.optionLabel !== "" || elem.options.optionLabel !== undefined) {
                                if (elem.selectedIndex > 0) return true;
                                else if (elem.value() !== "" && elem.value() !== null && elem.value() !== undefined) return true;
                            } else {
                                if (elem.selectedIndex > -1) return true;
                                else if (elem.value() !== "" && elem.value() !== null && elem.value() !== undefined) return true;
                            }

                            return false;
                        } else if (ctrl.is("[kendo-upload]") || ctrl.is("[data-kendo-upload]")) {
                            var elem = ctrl.data("kendoUpload");
                            return (elem.options.files.length > 0);
                        } else if (ctrl.is("[data-kendo-multi-select]") || ctrl.is("[kendo-multi-select]")) {
                            var elem = ctrl.data("kendoMultiSelect");
                            return (elem.listView._dataItems.length > 0);
                        } else if (ctrl.is("[data-kendo-editor]") || ctrl.is("[kendo-editor]")) {
                            var elem = ctrl.data("kendoEditor");
                            var value = (new DOMParser).parseFromString(elem.value(), "text/html")
                                .documentElement
                                .textContent;
                            return (value.trim().replace(/ /g, "") !== "" &&
                                elem.value() !== null &&
                                elem.value() !== undefined);
                        } else {
                            console.log('value', ctrl[0].value);
                            return (ctrl[0].value !== undefined && ctrl[0].value !== null && ctrl[0].value.trim() !== "");
                        }
                    }
                    return true;
                },
                //Ex. <input notZero> - field may be a +/- value but must not be zero
                notZero: function (ctrl) {
                    if (ctrl.is("[notZero]") && !ctrl.is(".ng-hide")) {
                        var intVal = parseFloat(ctrl[0].value, 10);
                        return (intVal !== 0);
                    }
                    return true;
                },
                //Ex. <input kendo-date-picker""> - checks if the value if its value is a real date or in correct format (only if kendo-date-picker widget is used)
                validateDate: function (ctrl) {
                    if (ctrl.is("[kendo-date-picker]")) {
                        if (ctrl[0].value !== undefined && ctrl[0].value !== null && ctrl[0].value !== '') {
                            var date = ctrl.data("kendoDatePicker");
                            var format = date.options.format;

                            if (format !== null && format !== undefined) return angular.isDate(kendo.parseDate(date.value(), format));
                            else return angular.isDate(date.value());
                        }
                    } else if (ctrl.is("[kendo-date-time-picker]")) {
                        if (ctrl[0].value !== undefined && ctrl[0].value !== null && ctrl[0].value !== '') {
                            var date = ctrl.data("kendoDateTimePicker");
                            var format = date.options.format;

                            if (format !== null && format !== undefined) return angular.isDate(kendo.parseDate(date.value(), format));
                            else return angular.isDate(date.value());
                        }
                    }
                    return true;
                },
                // Ex. <input kendo-date-picker="myStartDate" ng-model="dataItem.StartDate"> 
                //     <input kendo-date-picker compareDate="myStartDate">
                //     <input kendo-date-picker compareDate="{{ dataItem.StartDate }}">
                //compareDate="value" : let value = starting date to be compared to ctrl's date value.
                //value = {{ dataItem.date }} or may value of kendo-date-picker="thisDate" within the same parent
                compareDate: function (ctrl) {
                    if (ctrl.is("[kendo-date-picker]")) {
                        if (hasAttribute(ctrl, "comparedate")) {
                            var cdDate = ctrl.attr("compareDate");
                            var startDate = new Date(cdDate);

                            if (!angular.isDate(startDate) || isNaN(startDate)) {
                                //compareDate value must be a name declared inside kendo-date-picker attr.                        
                                var elm = $(this.element).find('[kendo-date-picker="' + cdDate + '"]');
                                if (elm === null || elm === undefined) {
                                    elm = $(this.element).siblings().find('[kendo-date-picker="' + cdDate + '"]');
                                    if (elm === null || elm === undefined) {
                                        console.error("No matching compare date [" + cdDate + "] found for ", ctrl);
                                        return true;
                                    }
                                }

                                var _startDate = elm.data("kendoDatePicker");
                                _startDate = _startDate.value();
                                if (angular.isDate(_startDate) && !isNaN(_startDate))
                                    startDate = _startDate;
                            }

                            if (angular.isDate(startDate)) {
                                var dateToCompare = ctrl.data("kendoDatePicker");
                                if (dateToCompare.value() !== null && dateToCompare.value() !== undefined) {
                                    var format = dateToCompare.options.format;
                                    if (format !== null && format !== undefined)
                                        startDate = kendo.parseDate(startDate, format);

                                    return !(startDate > dateToCompare.value());
                                }
                            } else {
                                console.error("Invalid value compareDate [" + cdDate + "] for ", ctrl);
                            }
                        }
                    }
                    return true;
                },
                serverValidate: function (ctrl) {
                    if (ctrl.is("[serverValidate]") && !ctrl.is(".ng-hide")) {
                        var value = $(ctrl).attr("serverValidate");
                        return value === "false" ? false : true;
                    }
                    return true;
                },
                maximumlength: function (ctrl) {
                    if (ctrl.is("[maximumlength]") && !ctrl.is(".ng-hide")) {
                        var max = ctrl.attr("maximumlength");
                        return (ctrl[0].value.length <= max);
                    }
                    return true;
                }
            },
            messages: {
                required: function (ctrl) {
                    if (ctrl.is("[kendo-combo-box]") || ctrl.is("[kendo-drop-down-list]")) strErrorMessage = "Please select from the required option.";
                    else if (ctrl.is("[kendo-upload]")) strErrorMessage = "Please upload a file.";
                    else strErrorMessage = "Please fill in required field(s).";
                    console.log('ctrl error', ctrl);
                    console.log('ctrl mes', strErrorMessage);
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
                notZero: function (ctrl) {
                    strErrorMessage = "Field must not be in zero value.";
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
                validateDate: function (ctrl) {
                    strErrorMessage = "Dates entered may be invalid or in wrong format.";
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
                compareDate: function (ctrl) {
                    strErrorMessage = "Dates must not be lower than its relative date.";
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
                serverValidate: function (ctrl) {
                    strErrorMessage = "";
                    var errorType = $(ctrl).attr("serverErrorType");
                    switch (errorType) {
                        case 'TransactionPostedAllPayouts':
                            strErrorMessage = "Payment mode has previous payout to be posted.";

                            //var message = app.label[errorType];
                            //console.log(errorType);
                            //addErrorMessage(message);                           
                            break;
                        case 'RemittanceNoPostedTransaction':
                            strErrorMessage = "Selected Month Year for remittance has no posted payout.";
                            break;
                    }
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
                maximumlength: function (ctrl) {
                    strErrorMessage = "You have reached the maximum " + ctrl.attr("maximumlength") + " characters.";
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
            },
            validate: function (e) {
                console.log('got the feeling', this);
                console.log('got the feeling 2', jQuery.unique(this.errors()));
                var errorMessages = this.errors();
                console.log('errorMessages', errorMessages);
                var _isAllValid = true;
                _isAllValid = validateRequiredGrid(e.sender.element);


                if (!_isAllValid) errorMessages.push("Required grid must have at least 1 item.");

                this.hideMessages();
                // iziToast.destroy();
                //console.log('errorMessages', errorMessages);
                if (e.valid) {
                    if (_isAllValid) {
                        // errorNotification.hide();
                        //e.sender.options.errors = [];
                        // iziToast.destroy();
                        return true;
                    } else {
                        e.valid = false;
                    }
                }
                console.log('for the first time', e.valid);
                if (!e.valid) {
                    console.log('for the first time 2', jQuery.unique(errorMessages));
                    console.log('for the first time 3', strErrorMessage);
                    var jqueryUnique = jQuery.unique(errorMessages);
                    if (jqueryUnique.length > 0) {
                        console.log('for the first time 4');
                        if (strErrorMessage !== null || strErrorMessage !== undefined || strErrorMessage !== "") {
                            console.log('for the first time 5');
                            errorNotification(strErrorMessage, "");
                        }
                        else {
                            console.log('for the first time 6');
                            errorNotification(jqueryUnique[0], "");
                        }
                    }
                    else {
                        if (jqueryUnique !== null || jqueryUnique !== undefined) {
                            console.log('for the first time 7');
                            if (strErrorMessage !== null || strErrorMessage !== undefined || strErrorMessage !== "") {
                                console.log('for the first time 8');
                                errorNotification(strErrorMessage, "");
                            }
                            else {
                                console.log('for the first time 9');
                                errorNotification(jqueryUnique, "");
                            }
                        }
                        else {
                            console.log('for the first time 10');
                            errorNotification(strErrorMessage, "");
                        }
                    }
                    //TODO: yel was here
                    //console.log("Form Validation Errors", errorMessages);
                    // errorNotification.show(errorMessages, "Validation Message");
                    // errorNotification(errorMessages, "");

                }
            },
        };

        function validateRequiredGrid(form) {
            var grids = $(form).find("[requiredGrid]").toArray();
            var isValid = true;

            if (grids.length > 0) {
                if (typeof (grids) === 'object') {
                    grids.forEach(function (grid) {
                        grid = $(grid).data("kendoGrid");
                        console.log("grid data", grid.dataSource.data());
                        console.log("grid total", grid.dataSource.total());
                        isValid = grid.dataSource.total() > 0;
                    });
                } else {
                    isValid = grid.dataSource.total() > 0;
                }
            }

            //if (!isValid) addErrorMessage("Required grid must have at least 1 item.");

            console.log("required grid", isValid);
            return isValid;
        }

        function hasAttribute(ctrl, name) {
            if (ctrl.length) {
                for (var i = 0; i < ctrl[0].attributes.length; i++) {
                    if (ctrl[0].attributes[i].name === name) return true;
                }
            }

        }

        //var errorMessages = [];

        //function addErrorMessage(message) {
        //    if (errorMessages.filter(function(value) {
        //        return value === message;
        //    }).length < 1)
        //        errorMessages.push(message);
        //}
        //function clearErrorMessage(e) {
        //    errorMessages = [];
        //    //this.sender.options.errors = [];
        //    console.log('clearErrorMessage called', this);
        //}

        //function showErrorMessage() {
        //    //notifWidget.hide();
        //    var text = '<ul style="list-style-type: none; padding: 0; margin: 0;">';
        //    errorMessages.forEach(function (msg) {
        //        text += '<li>' + msg + '</li>';
        //    });

        //    text += '</ul>';
        //    errorNotification.show(text);
        //}

        return form.kendoValidator(this.options).data("kendoValidator");
    }

    recruitment.CValidator = CValidator;

    app.directive('formValidation',
        [
            function () {
                return {
                    restrict: 'A',
                    scope: false,
                    link: function (scope, elem, attrs) {
                        var validator = new recruitment.CValidator(elem);
                        if (attrs.formValidation !== "") {
                            scope[attrs.formValidation] = validator;
                        } else {
                            scope.formValidator = validator;
                        }
                    }
                };
            }
        ]);
})(app);
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


        if (customOpt.serverFiltering != null && customOpt.serverFiltering != undefined) {
            this.serverFiltering = customOpt.serverFiltering;
        } else {
            this.serverFiltering = true;
        }

        if (customOpt.requestEnd != undefined) {
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

        if (customOpt.serverPaging != null && customOpt.serverPaging != undefined) {
            this.serverPaging = customOpt.serverPaging;
        } else {
            this.serverPaging = true;
        }

        if (customOpt.serverSorting != null && customOpt.serverSorting != undefined) {
            this.serverSorting = customOpt.serverSorting;
        } else {
            this.serverSorting = true;
        }
        this.error = function (err) {
            console.log("error", err);
            if (err.xhr !== null || err.xhr === undefined) {
                var errorObj = err.xhr;
                var message = angular.fromJson(errorObj.responseText);

                if (message.Type === 'Recruitment.RecruitmentException.NotAuthorizeExecutionException') {
                    return;
                }

                // errorNotification.show(message);
                errorNotification(message, "");

                //if (message.Description.indexOf('DEL_Err') === 0) {
                //    this.cancelChanges();
                //    //this.read();
                //}

            } else errorNotification("An unknown error has occured", "");
        };

        //this.requestStart = customOpt.requestStart;

        //this.requestEnd = customOpt.requestEnd;
        if (customOpt.data == undefined) {
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

                read: function (options) {

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
                            _strDel = this.transport.url();
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
(function () {
    var _errorNotification = {
        show: function (messages, title, autoHide) {
            if ($("#errorNotif").data("kendoNotification") === undefined ||
                $("#errorNotif").data("kendoNotification") === null) {
                $("#errorNotif").kendoNotification({
                    autoHideAfter: 5000,
                    hideOnClick: false,
                    position: {
                        bottom: 20,
                        right: 20
                    },
                    // width: 300,
                    templates: [
                        {
                            type: "error",
                            // template: "<div class='error-notification'>#= customMsg#</div>"
                            template:
                                '<div data-notify="container" class="column is-one-quarter alert alert-danger alert-with-icon animated fadeInDown" role="alert" data-notify-position="bottom-right">' +
                                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
                                '<i class="material-icons md-18">close</i>' +
                                '</button>' +
                                '<i data-notify="icon" class="material-icons">error</i>' +
                                '#= customMsg#' +
                                '</div>'
                        }
                    ]
                });
            }

            var _notifWidget = $("#errorNotif").data("kendoNotification");
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
            _notifWidget.error({
                customMsg: message
            });
        },
        hide: function () {
            if ($("#errorNotif").data("kendoNotification") !== undefined &&
                $("#errorNotif").data("kendoNotification") !== null) {
                var _notifWidget = $("#errorNotif").data("kendoNotification");
                _notifWidget.hide();
            }
        }
    };

    window['errorNotification'] = _errorNotification;
})();
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
(function () {
    app.directive('grdSearch',
        [
            function () {
                return {
                    restrict: 'A',
                    require: '^kendoGrid',
                    scope: {
                        filter: '&'
                    },
                    replace: true,
                    template: kendo.template($("#grdSearchTemplate").html()),
                    link: function (scope, element, attr) {
                        scope.kendoGrid = angular.element(element).closest('.k-grid').data('kendoGrid');
                        scope.placeHolder = attr.placeholder;
                        scope.history = '';
                        scope.searchInput = '';

                        scope.onKeyPress = function (e) {
                            if (e.keyCode === 13) {
                                e.preventDefault();

                                scope.OnGoClick();
                            }
                        };

                        scope.$parent[attr.grdSearch] = {
                            filter: function () {
                                if (scope.kendoGrid !== undefined) {
                                    var _jsFilter = {
                                        field: 'search',
                                        value: scope.searchInput.trim()
                                    };

                                    scope.filter({
                                        e: _jsFilter
                                    });

                                    scope.kendoGrid.dataSource.filter(_jsFilter);
                                }
                            }
                        };

                        scope.OnGoClick = function () {
                            if (scope.searchInput.trim() === scope.history) return;
                            if (scope.searchInput.trim() === '' && scope.history === '') return;

                            var _keyword = scope.searchInput.trim();

                            scope.history = _keyword;

                            if (scope.kendoGrid !== undefined) {
                                var _jsFilter = {
                                    field: 'search',
                                    value: _keyword
                                };

                                scope.kendoGrid.filterValue = _keyword;

                                scope.kendoGrid.clearFilter = function () {
                                    scope.searchInput = '';
                                    scope.$apply();
                                };

                                scope.filter({
                                    e: _jsFilter
                                });

                                scope.kendoGrid.dataSource.filter(_jsFilter);
                            }
                        };
                    },
                };
            }
        ]);
})(recruitment);
(function () {
    function CGrid(customOpt) {
        //var _emptyMsg = 'No Entry Found';

        if (customOpt !== undefined) {
            for (var _k in customOpt) {
                this[_k] = customOpt[_k];
            }

            this.pageable = true;

            if (customOpt.sortable == undefined || customOpt.sortable == null) {
                this.sortable = true;
            } else {
                this.sortable = customOpt.sortable;
            }
            this.selectable = true;
            this.navigatable = true;
            this.autoBind = customOpt.autoBind !== undefined ? customOpt.autoBind : true;
            this.reorderable = true;
            this.resizable = true;
            this.noRecords = true;

            this.noRecords = {
                template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
            };

            //if (customOpt.gridEmptyMessage !== undefined &&
            //    customOpt.gridEmptyMessage !== null &&
            //    customOpt.gridEmptyMessage.trim() !== '') {
            //    _emptyMsg = customOpt.gridEmptyMessage;
            //}

            //this.filterable = true;
            //this.columnMenu = true;


            this.excel = {
                allPages: true,
                filterable: false
            };
            if (customOpt.excel != null && customOpt.excel !== undefined) {
                if (customOpt.excel.fileName != null && customOpt.excel.fileName !== undefined) {
                    this.excel.fileName = customOpt.excel.fileName;
                }
            }

            if (customOpt.excelExport != null && customOpt.excelExport !== undefined) {
                this.excelExport = customOpt.excelExport;
            } else {
                this.excelExport = function (e) {
                    var sheet = e.workbook.sheets[0];

                    for (var c = 0; c < sheet.columns.length; c++) {
                        if (this.columns[c].template != undefined &&
                            this.columns[c].template != null &&
                            typeof this.columns[c].template != "function" &&
                            this.columns[c].field != undefined &&
                            this.columns[c].field != null &&
                            this.columns[c].field !== "") {

                            var template = kendo.template(this.columns[c].template
                                .replace(/<\s*\w.*?>/g, '')
                                .replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, ''));
                            console.log('template', this.columns[c].template

                                .replace(/<\s*\w.*?>/g, '')
                                .replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, '')

                                //.replace(/<!--(.*?)-->/gm, "")
                                ///*replace value of attrs*/.replace(/="(.*?)"/gm, "")
                                ///*replace html markup */.replace(/<[\s\S]*?>/g, "")
                                ///*replace whitespaces */.replace(/\s/g, '')
                                //.replace(/<\s*\w.*?>/g, '')
                                //.replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, '')
                            );
                            delete sheet.columns[c].width;
                            sheet.columns[c].autoWidth = true;

                            for (var r = 0; r < sheet.rows.length; r++) {
                                var row = sheet.rows[r];
                                if (r === 0) {
                                    if (this.columns[c].headerTemplate != undefined &&
                                        this.columns[c].headerTemplate != null) {
                                        if (this.columns[c].headerTemplate !== "") {
                                            row.cells[c].value = this.columns[c].headerTemplate
                                                .replace(/<\s*\w.*?>/g, '')
                                                .replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, '');
                                        }
                                    }
                                } else {
                                    row.cells[c].value = template(e.data[r - 1]);
                                }
                            }
                        } else if (this.columns[c].field == undefined ||
                            this.columns[c].field == null ||
                            this.columns[c].field === "") {

                        }
                    }
                }
            }


            this.toolbar = [];
            this.editable = customOpt.editable;

            if ($.type(customOpt.pageable) === 'boolean') {
                this.pageable = customOpt.pageable;
            }

            if ($.type(customOpt.navigatable) === 'boolean') {
                this.navigatable = customOpt.navigatable;
            }

            if ($.type(customOpt.selectable) === 'boolean') {
                this.selectable = customOpt.selectable;
            }

            if ($.type(customOpt.pageable) === 'object') {
                for (var _p in customOpt.pageable) {
                    this.pageable[_p] = customOpt.pageable[_p];
                }
            }

            if ($.type(customOpt.toolbar) === 'array') {
                var _defaultCreate = {
                    name: 'create',
                    text: 'Add Record'
                };

                //var _defaultSave = {
                //    name: 'save',
                //    text: 'Save'
                //};

                var _defaultExcel = {
                    name: 'excel',
                    text: 'Export'
                };

                for (var i = 0; i < customOpt.toolbar.length; i++) {
                    var _toolbar = customOpt.toolbar[i];

                    if ($.type(_toolbar) === 'string') {
                        switch (_toolbar) {
                            case 'search':
                                this.toolbar.push({
                                    name: 'grdSearch',
                                    template: '<input grd-search="" placeholder="Search keyword" />'
                                });
                                break;
                            case 'create':
                                this.toolbar.push(_defaultCreate);
                                break;
                            //case 'save':
                            //    this.toolbar.push(_defaultSave);
                            //    break;
                            case 'excel':
                                this.toolbar.push(_defaultExcel);
                                break;
                            case 'template':
                                this.toolbar.push({
                                    name: 'downloadTemplate',
                                    template: '<div download-template></div>'
                                });
                                break;
                            case 'upload':
                                this.toolbar.push({
                                    name: 'uploadTemplate',
                                    template: '<button batch-upload action="Insert"></button>'
                                });
                                break;
                            default:
                                break;

                        }
                    } else {
                        if (_toolbar.name !== undefined) {
                            switch (_toolbar.name) {
                                case 'create':
                                    this.toolbar.push({
                                        name: _defaultCreate.name,
                                        text: _toolbar.text !== "" && _toolbar.text != null
                                            ? _toolbar.text
                                            : _defaultCreate.text
                                    });
                                    break;
                                //case 'save':
                                //    this.toolbar.push({
                                //        name: _defaultSave.name,
                                //        text: _toolbar.text !== "" && _toolbar.text != null
                                //            ? _toolbar.text
                                //            : _defaultSave.text
                                //    });
                                //    break;
                                case 'search':
                                    this.toolbar.push({
                                        name: 'grdSearch',
                                        template: '<input grd-search="" placeholder="Search keyword" />'
                                    });
                                    break;
                                case 'upload':
                                    var _batchType = _toolbar.batchType;
                                    var _batchAction = _toolbar.batchAction || 'Insert';
                                    var _waitBatch = true;
                                    var _noTemplate = _toolbar.noTemplate || false;

                                    if (_toolbar.action !== undefined && _toolbar.action !== null) {
                                        if (_toolbar.action.trim().toLowerCase() === "insert" ||
                                            _toolbar.action.trim().toLowerCase() === "update") {
                                            _batchAction = _toolbar.action.trim();
                                        }
                                    }

                                    var _attr = {
                                        'batch-upload': '',
                                        'action': _batchAction,
                                        'no-template': _noTemplate
                                    };

                                    if (_toolbar.waitBatch !== undefined && _toolbar.waitBatch !== null) {
                                        _waitBatch = _toolbar.waitBatch;
                                    }

                                    if (_batchType !== undefined && _batchType !== null) {
                                        _attr['batch-type'] = _batchType;
                                        _attr['wait-batch'] = _waitBatch;
                                    }

                                    this.toolbar.push({
                                        name: 'uploadTemplate',
                                        template: $('<button />')
                                            .attr(_attr)
                                            .prop('outerHTML')
                                    });
                                    break;
                                case 'template':
                                    this.toolbar.push({
                                        name: 'downloadTemplate',
                                        template: '<div download-template ' +
                                            (
                                                _toolbar.controller !== undefined &&
                                                    _toolbar.controller !== null &&
                                                    _toolbar.controller !== ''
                                                    ? ('ctrl="' + _toolbar.controller + '"')
                                                    : ''
                                            ) +
                                            ' level="' +
                                            _toolbar.level +
                                            '"></div>'
                                    });
                                    break;
                                default:
                                    this.toolbar.push(_toolbar);
                                    break;
                            }
                        }
                    }
                }
            }

            if (customOpt.autoBind !== undefined) {
                this.autoBind = customOpt.autoBind;
            }


            //if (customOpt.withKeyboardShortcut !== undefined) {
            //    if (customOpt.withKeyboardShortcut) {
            //        this.edit = function (e) {

            //            var commandCellUpdate = e.container.find("td:nth-last-child(2)");
            //            var btnUpdate =
            //                $(
            //                    '<a class="k-button k-grid-update" style="min-width:16px;"><span class="k-icon k-update"></span></a>');

            //            e.sender.editable.validatable = new recruitment.CValidator(e.container);

            //            e.sender.unbind("save");
            //            e.sender.bind("save",
            //                function (sc) {
            //                    sc.preventDefault();
            //                    _handleGridUI.disable(btnUpdate);
            //                    var deferred = $.Deferred();
            //                    $.when(e.sender.dataSource.sync()).done(function () {
            //                        _handleGridUI.enable(btnUpdate);
            //                    },
            //                        function () {
            //                            _handleGridUI.enable(btnUpdate);
            //                        });
            //                    if (customOpt.save !== undefined) {
            //                        customOpt.save();
            //                    }
            //                });

            //            commandCellUpdate.empty();
            //            commandCellUpdate.append(btnUpdate);

            //            var commandCellCancel = e.container.find("td:last");
            //            commandCellCancel.empty();

            //            var btnCnl = $('' +
            //                '<a class="k-button ' +
            //                'k-grid-cancel" ' +
            //                'style="min-width:16px;"><span class="k-icon k-cancel"></span>' +
            //                '</a>');

            //            shortcut.add('ESC',
            //                function () {
            //                    btnCnl.click();
            //                });

            //            commandCellCancel.append(btnCnl);
            //            _prepareForm(e, btnUpdate);
            //        };
            //    }
            //} else {
            //    this.edit = function (e) {
            //        //if (!e.model.CanUpdate) {
            //        //    e.container.data("kendoWindow").title('View Entry');
            //        //    $("div.k-edit-buttons")[0].innerHTML = '';
            //        //    console.log('form', $("div.k-popup-edit-form"));
            //        //} else {
            //        var entryName = null;
            //        if (customOpt.editable != null && customOpt.editable != undefined) {
            //            if (customOpt.editable.window != null && customOpt.editable.window != undefined) {
            //                if (customOpt.editable.window.title != undefined) {
            //                    entryName = customOpt.editable.window.title;
            //                }
            //            }
            //        }
            //        if (e.model.isNew()) {
            //            e.container.data("kendoWindow").title('Add New ' + (entryName != null ? entryName : 'Entry'));
            //            $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-update'></span>Save";
            //        } else {
            //            e.container.data("kendoWindow").title('Update ' + (entryName != null ? entryName : 'Entry'));
            //            $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-update'></span>Update";
            //        }
            //        //}
            //        e.sender.editable.validatable = new recruitment.CValidator(e.container);

            //        e.sender.unbind("save");
            //        e.sender.bind("save",
            //            function (sc) {
            //                console.log('sc', sc);
            //                sc.preventDefault();
            //                if (customOpt.customSaveChanges != undefined && customOpt.customSaveChanges != null) {
            //                    if ($.type(customOpt.customSaveChanges) === 'function')
            //                        customOpt.customSaveChanges(sc);
            //                } else {
            //                    _handleGridUI.disable($('a.k-grid-update'));;
            //                    $.when(e.sender.dataSource.sync()).then(function () {
            //                        _handleGridUI.enable($('a.k-grid-update'));
            //                        //e.model.set('IsDirty', false);
            //                        e.sender.dataSource.read();//TODO Sucessful Update then Edit and cancel (Temporary fixed)
            //                        console.log("success @ when", e.model);
            //                    },
            //                        function () {
            //                            _handleGridUI.enable($('a.k-grid-update'));
            //                            console.log("failed @ when");
            //                        });
            //                }
            //            });
            //        console.log('e', e);
            //        _prepareForm(e);
            //    };
            //}

            if (customOpt.editable === "inline") {
                this.edit = function (e) {
                    var commandCellUpdate = e.container.find("td:nth-last-child(2)");

                    //e.model.set('DirtyUID', Guid.NewGuid());
                    console.log("grid edit e", e);

                    var btnUpdate =
                        $('<a class="k-button k-grid-update"><i class="material-icons">check</i ></a>');

                    e.sender.editable.validatable = new recruitment.CValidator(e.container);

                    e.sender.unbind("save");
                    e.sender.bind("save",
                        function (sc) {
                            sc.preventDefault();

                            _handleGridUI.disable(btnUpdate);
                            var deferred = $.Deferred();
                            $.when(e.sender.dataSource.sync()).done(function () {
                                _handleGridUI.enable(btnUpdate);

                                // jett was here
                                if (customOpt.save != null && customOpt.save !== undefined) {
                                    if ($.type(customOpt.save) === 'function') {
                                        customOpt.save(e.model);
                                    }
                                }
                                // yel was here
                                else if (customOpt.update != null && customOpt.update !== undefined) {
                                    if ($.type(customOpt.update) === 'function') {
                                        customOpt.update(e.model);
                                    }
                                }
                            },
                                function () {
                                    _handleGridUI.enable(btnUpdate);


                                });
                            if (customOpt.save !== undefined) {
                                customOpt.save();
                            }
                        });

                    commandCellUpdate.empty();
                    commandCellUpdate.append(btnUpdate);

                    var commandCellCancel = e.container.find("td:last");
                    commandCellCancel.empty();

                    var btnCnl = $('' +
                        '<a class="k-button ' +
                        'k-grid-cancel" ' +
                        '><i class="material-icons">close</i></span>' +
                        '</a>');

                    //if (customOpt.withKeyboardShortcut !== undefined) {
                    //    if (customOpt.withKeyboardShortcut) {
                    //shortcut.add('ESC',
                    //    function () {

                    //        btnCnl.click();
                    //    });
                    //    }
                    //}

                    commandCellCancel.append(btnCnl);
                    _prepareForm(e, btnUpdate);
                };
            } else {
                this.edit = function (e) {
                    //if (!e.model.CanUpdate) {
                    //    e.container.data("kendoWindow").title('View Entry');
                    //    $("div.k-edit-buttons")[0].innerHTML = '';
                    //    console.log('form', $("div.k-popup-edit-form"));
                    //} else {
                    //console.log("Model", e);
                    var entryName = null;
                    if (customOpt.editable != null && customOpt.editable != undefined) {
                        if (customOpt.editable.window != null && customOpt.editable.window != undefined) {
                            if (customOpt.editable.window.title != undefined) {
                                entryName = customOpt.editable.window.title;
                            }

                            var _action = "";
                            if (e.model.isNew()) {
                                //e.container.data("kendoWindow").title('Add New ' + (entryName != null ? entryName : 'Entry'));
                                e.container.data("kendoWindow").title((entryName != null ? entryName : 'Add New Entry'));
                                $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-i-check'></span>Save";
                                _action = "created";
                            } else {
                                e.container.data("kendoWindow").title('Update ' + (entryName != null ? entryName : 'Entry'));
                                $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-i-check'></span>Update";
                                _action = "updated";
                            }
                        }
                    }
                    //}
                    e.sender.editable.validatable = new recruitment.CValidator(e.container);

                    e.sender.unbind("save");
                    e.sender.bind("save",
                        function (sc) {
                            sc.preventDefault();

                            if (customOpt.customSaveChanges != undefined && customOpt.customSaveChanges != null) {
                                if ($.type(customOpt.customSaveChanges) === 'function')
                                    customOpt.customSaveChanges(sc);
                                //yel was here
                                $.when(e.sender.dataSource.read()).then(function () {
                                    _handleGridUI.disable($('a.k-grid-update'));
                                    console.log("success @ when");
                                    //successNotification.show("Successfully " + _action + ".", "", true);
                                    //successNotification("Successfully " + _action + ".", "");
                                },
                                    function () {
                                        _handleGridUI.enable($('a.k-grid-update'));
                                        console.log("failed @ when");
                                    });
                            } else {
                                _handleGridUI.disable($('a.k-grid-update'));

                                $.when(e.sender.dataSource.sync()).then(function () {
                                    _handleGridUI.enable($('a.k-grid-update'));
                                    console.log("success @ when");
                                    // successNotification.show("Successfully " + _action + ".", "", true);
                                    // successNotification("Successfully " + _action + ".", "");
                                    // jett was here
                                    if (customOpt.save != null && customOpt.save !== undefined) {
                                        if ($.type(customOpt.save) === 'function') {
                                            customOpt.save(e.model); //yel was here (added e.model return)
                                            console.log('e.model save', e.model);
                                            //return e.model;
                                        }
                                    }
                                    // yel was here
                                    else if (customOpt.update != null && customOpt.update !== undefined) {
                                        if ($.type(customOpt.update) === 'function') {
                                            customOpt.update(e.model);
                                            console.log('e.model updated', e.model);
                                            //return e.model;
                                        }
                                    }

                                },
                                    function () {
                                        _handleGridUI.enable($('a.k-grid-update'));
                                        console.log("failed @ when");
                                    });
                            }
                        });

                    _prepareForm(e);
                };
            }

            this.dataSource = new recruitment.CDataSource(customOpt.dataSource);
            if (customOpt.columns !== undefined) {
                this.columns = customOpt.columns;
            }

            //this.cancel = function (e) {
            //    e.preventDefault();
            //    this.dataSource.cancelChanges();
            //    console.log('ewan', e.model);
            //    errorNotification.hide();
            //}
        }

        this.prepareForm = function (parent, btnUpdate) {
            _prepareForm(parent, btnUpdate);
        }

        function _prepareForm(parent, btnUpdate) {
            var kOptionElements = [];
            var isOnEdit = !parent.model.isNew();

            var formElements = $(parent.container).find('input, [kendo-combo-box], [kendo-drop-down-list]').toArray();
            formElements.forEach(function (item) {
                if ($(item).is('[kendo-combo-box]') || $(item).is('[kendo-drop-down-list]')) {
                    var elem = $(item).data("kendoComboBox") || $(item).data("kendoDropDownList");
                    if (elem.dataSource.data().length == 0) kOptionElements.push(elem);
                }
                $(item).change(function (e) {
                    parent.model.set('IsDirty', Guid.NewGuid());
                });
            });

            if (kOptionElements.length > 0) {
                var ctr = 0;
                var btn = btnUpdate === undefined || btnUpdate === null ? $('a.k-grid-update') : btnUpdate;
                //_handleGridUI.disable(btn); // commented on 11/2/2015 by enteng

                kOptionElements.forEach(function (elm) {
                    if (elm.options.cascadeFrom === "" || elm.options.cascadeFrom === undefined) {
                        $.when(elm.dataSource.read()).done(function () {
                            ++ctr;
                            if (ctr === kOptionElements.length) {
                                //OPEN OPTIONS IF BY DEFAULT
                                if (customOpt !== undefined) {
                                    if (customOpt.editorSettings !== undefined) {
                                        if (customOpt.editorSettings.optionOpenByDefault) {
                                            var firstOption = kOptionElements[0];
                                            firstOption.open();
                                        }
                                    }
                                }
                                _handleGridUI.enable(btn);
                            }
                            CheckItemExist(elm);
                        });
                    } else {
                        elm.bind("dataBound", CheckItemExist);
                    }
                });
            }

            function CheckItemExist(elm) {
                console.log("elm", elm);
                if (elm.selectedIndex == -1 && isOnEdit) {
                    var itemName = GetDataItemProperty(elm, parent.model);
                    console.log("itemName", itemName);
                    if (itemName !== undefined) {
                        //var tooltip = $(elm.element).kendoTooltip({
                        //    content: itemName + " does not exist in this list.",
                        //    position: "right",
                        //}).data("kendoTooltip");
                        //tooltip.show($(elm.input));
                    }
                }
            }

            //HANDLE FORMS CANCELLED/CLOSED
            var formContainer = parent.container.data("kendoWindow");
            if (formContainer !== undefined) {
               formContainer.one("close",
                   function() {
                       console.log('formContainer', parent.sender.dataSource);
                       //parent.sender.dataSource.cancelChanges();
                    //    errorNotification.hide();
                        iziToast.destroy();
                   });
            } else {
               var btnCancel = $("a.k-grid-cancel.k-button");
               if (btnCancel !== undefined) {
                   //btnCancel.click(function(e) {
                   //    //parent.sender.dataSource.cancelChanges();
                   //    errorNotification.hide();
                   //});
                   iziToast.destroy();
               }
            }
        }

        function GetDataItemProperty(e, model) {
            var _kNgModel = $(e.element).attr("k-ng-model");

            if (_kNgModel !== undefined) {
                var opt = $(e.element).attr("k-ng-model").split('.');
                var ref = opt.length > 0 ? opt[1] : opt[0];

                if (model[ref] !== undefined)
                    return model[ref][e.options.dataTextField];
                return undefined;
            }

            return 'Item';
        }

        var _handleGridUI = {
            disable: function (e) {
                $(e).addClass('k-state-disabled');
                $(e).css({ 'pointer-events': 'none' });
                //console.log("Disabled", e);
            },
            enable: function (e) {
                $(e).removeClass('k-state-disabled');
                $(e).css({ 'pointer-events': '' });
                //console.log("Enabled", e);
            }
        };


        this.dataBound = function (e, controlEditDelete) {
            controlEditDelete = typeof controlEditDelete !== 'undefined'
                ? controlEditDelete
                : true;

            //gridEmptyMessage(e.sender, _emptyMsg);

            if (controlEditDelete) {
                var editBtn = e.sender.element.find('tbody tr .k-grid-edit');
                var deleteBtn = e.sender.element.find('tbody tr .k-grid-delete');

                editBtn.each(function () {
                    var item = e.sender.dataItem($(this).closest("tr"));

                    if (item.CanUpdate !== undefined) {
                        if (!item.CanUpdate) {
                            //$(this).remove();
                            $(this).replaceWith(
                                '<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                        }
                    }
                });

                deleteBtn.each(function () {
                    var item = e.sender.dataItem($(this).closest("tr"));
                    //if (item.Source !== undefined)
                    //    if (item.Source !== PayrollConfig.RequestSource) {
                    //        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                    //    }
                    //}

                    if (item.CanDelete !== undefined) {
                        if (!item.CanDelete) {
                            //if (false) {
                            //$(this).remove();
                            $(this).replaceWith(
                                '<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                            //console.log('databound called', this);
                        }
                    }
                });
            }
            //if (customOpt.dataBound != undefined && customOpt.dataBound != null) {
            //    customOpt.dataBound(e);
            //}
            //https://www.telerik.com/forums/deleting-last-remaining-row-on-kendo-grid-on-the-last-page-does-not-go-to-the-previous-page
            if (this.dataSource.view().length === 0) {
                var currentPage = this.dataSource.page();
                if (currentPage > 1) {
                    this.dataSource.page(currentPage - 1);
                }
            }

        };
    }

    recruitment.CGrid = CGrid;
})(recruitment);
(function () {
    app.directive('editorFileUpload',
        [
            '$compile',
            function ($compile) {
                return {
                    restrict: 'A',
                    //require: '^kendoEditor',
                    scope: {
                        fileAttachments: '=',
                        //kendoEditorId: '='
                        //dependencyButton: '='
                        id: '@',
                        path: '@',
                        unit: '@'
                    },
                    replace: true,
                    //template: kendo.template($("#grdSearchTemplate").html()),
                    template: '<input name=\"files\" type=\"file\" title="Insert file" accept=".doc,.docx,.xls,.xlsx,.png,.jpeg,.pdf" />',
                    //template: '<input name=\"files\" type=\"file\" kendo-upload k-options=\"optKendoUpload\" />',
                    controler: ['$scope', function ($scope) {
                        //$scope.optKendoUpload =
                    }],
                    link: function (scope, element, attrs) {
                        //element.html(
                        //    "<input name=\"files\" type=\"file\" kendo-upload k-options=\"optKendoUpload\" />");
                        //$compile(element.contents())(scope);
                        var editor = null;
                        var uid;
                        $(element).kendoUpload({

                            async:
                            {
                                saveUrl: recruitmentConfig.VirtualPath + "/recruitment/SaveUpload",
                                autoUpload: true,
                                batch: true,
                            },
                            upload: function (e) {
                                uid = recruitment.preloader.show("Attaching file");
                                if (attrs.dependencyButton != null &&
                                    attrs.dependencyButton != undefined &&
                                    attrs.dependencyButton !== "") {
                                    console.log("[for-editor-file-upload=\"" + attrs.dependencyButton + "\"]");
                                    $("[for-editor-file-upload=\"" + attrs.dependencyButton + "\"]").addClass("button is-loading");
                                }



                                e.data =
                                    {
                                        //clearanceReqId: parseInt($scope.getClearanceIdForUpload),
                                        //UnitID: parseInt($scope.getUnitIdForUpload),

                                        clearanceReqId: parseInt(scope.id),
                                        LPath: scope.path,
                                        UnitID: scope.unit,

                                    };

                            },
                            //Allow selected file types
                            validation: {
                                allowedExtensions: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx", ".xls", ".xlsx"]
                            },
                            success: function (e) {


                                var file = e.response[0];
                                console.log('this', $(this.element));
                                console.log('parents',
                                    $(this.element)
                                        .parents("table[class='k-widget k-editor k-header k-editor-widget']"));
                                //console.log('file', file);
                                //console.log('$(this.element)', $(this.element));
                                //console.log('$(this.element).parents', $(this.element).parents("table[class='k-widget k-editor k-header k-editor-widget']"));
                                //console.log('$(this.element).parents.find', $(this.element).parents("table[class='k-widget k-editor k-header k-editor-widget']").find("textarea[kendo-editor]"));

                                if (attrs.fileAttachments != null &&
                                    attrs.fileAttachments != undefined &&
                                    attrs.fileAttachments !== "") {
                                    scope.fileAttachments.push(file.UID);
                                }

                                if (editor == null) {
                                    editor =
                                        $(this.element)
                                            .parents("table[class='k-widget k-editor k-header k-editor-widget']")
                                            .find("textarea[kendo-editor]")
                                            .data("kendoEditor");
                                    //if (attrs.kendoEditorId != null &&
                                    //    attrs.kendoEditorId != undefined &&
                                    //    attrs.kendoEditorId !== "") {
                                    //    editor = $('#' + attrs.kendoEditorId)
                                    //        //$(this.element)
                                    //        //    .parents("table[class='k-widget k-editor k-header k-editor-widget']")
                                    //        //    .find("textarea[kendo-editor]")
                                    //        .data("kendoEditor");
                                    //}
                                }


                                var fileArray = [];

                                for (var i in e.response) {

                                    fileArray.push(e.response[i].FileID);

                                    editor.exec("inserthtml",
                                        {
                                            //    value: "<a " +
                                            //        "href=\"" +
                                            //        ticketConfig.VirtualPath +
                                            //        "/Clearance/DownloadFile?id=" +
                                            //        e.response.FileID +
                                            //        "\" title=\"Download this file\">" +
                                            //        e.response.C_Name +
                                            //        "</a>"

                                            value: '<a href="' + recruitmentConfig.VirtualPath + '/recruitment/DownloadFile?id=' + e.response[i].FileID + '">' + e.response[i].C_Name + '</a> ',
                                        });
                                }


                                var fID = fileArray;


                                if (sessionStorage.getItem("bindFileID").length <= 0) {
                                    sessionStorage.setItem("bindFileID", JSON.stringify(fID));

                                } else {



                                    var getBindFileID = JSON.parse(sessionStorage.getItem('bindFileID'));



                                    for (var i in fID) {
                                        getBindFileID.push(fID[i]);

                                    }


                                    sessionStorage.setItem("bindFileID", JSON.stringify(getBindFileID));
                                }






                                console.log(sessionStorage.getItem("bindFileID"));

                                recruitment.preloader.hide(uid);
                                if (attrs.dependencyButton != null &&
                                    attrs.dependencyButton != undefined &&
                                    attrs.dependencyButton !== "") {
                                    $("[for-editor-file-upload=\"" + attrs.dependencyButton + "\"]")
                                        .removeClass("button is-loading");
                                    //$('button[forEditorFileUpload="' + attrs.dependencyButton + '"]').removeClass("button is-loading");
                                }
                            },
                            localization: {
                                select: ""
                            }
                        });

                        $(element).next("span").addClass("k-tool-icon k-icon k-i-file-add");
                        $(element).parents("div.k-dropzone").css("padding", "0");
                        $(element).parent("div.k-upload-button")
                            .css("background", "#f2f2f2")
                            .css("box-shadow", "none")
                            .css("border", "0")
                            .css("cursor", "pointer")
                            .hover(function () {
                                $(this).css("color", "#444")
                                    .css("border-color", "#ebebeb")
                                    .css("background-color", "#ebebeb")
                                    .css("cursor", "pointer");
                            }, function () {
                                $(this).css("color", "")
                                    .css("border-color", "")
                                    .css("background", "#f2f2f2")
                                    .css("cursor", "pointer");
                            });
                        $(element).parents("div.k-upload").css("border", "0");
                        //                        * color: #444; * /
                        ///* border-color: #ebebeb; */
                        ///* background-color: #ebebeb;
                    }
                };
            }
        ]);
})(recruitment);