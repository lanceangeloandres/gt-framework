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
                notZero: function(ctrl) {
                    if (ctrl.is("[notZero]") && !ctrl.is(".ng-hide")) {
                        var intVal = parseFloat(ctrl[0].value, 10);
                        return (intVal !== 0);
                    }
                    return true;
                },
                //Ex. <input kendo-date-picker""> - checks if the value if its value is a real date or in correct format (only if kendo-date-picker widget is used)
                validateDate: function(ctrl) {
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
                compareDate: function(ctrl) {
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
                serverValidate: function(ctrl) {
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
                    else strErrorMessage = "Fill in required field(s).";
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
                validateDate: function(ctrl) {
                    strErrorMessage = "Dates entered may be invalid or in wrong format.";
                    //addErrorMessage(strErrorMessage);
                    return strErrorMessage;
                },
                compareDate: function(ctrl) {
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
                
                //console.log('errorMessages', errorMessages);
                if (e.valid) {
                    if (_isAllValid) {
                        // iziToast.hide({
                        //     transitionOut: 'fadeOutUp'
                        // }, toast);
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
                    grids.forEach(function(grid) {
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
        function() {
            return {
                restrict: 'A',
                scope: false,
                link: function(scope, elem, attrs) {
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