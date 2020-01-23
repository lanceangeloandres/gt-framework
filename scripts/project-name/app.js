var app = angular.module('recruitment', ['kendo.directives', 'ngSanitize']);

app.Services = {
    Repository: 'dataFactory',
    Log: 'devLogger',
    Cache: 'nexusCache',
}

var recruitment = {
    appEnum: {},
    model: {}
};
var recruitmentConfig = {};

var recruitmentUser = {
    UserRoleType: null,
}

var approver = {
    appEnum: {},
    model: {}
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

//var sessionKey = getCookie(Config.CookieName);
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

var gridUtil = {
    edit: function (e) {
        console.log("e.model", e);

        if (e.model.isNew()) {
            e.container.data("kendoWindow").title('Add New Entry');
            $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-update'></span>Save";
        } else {
            e.container.data("kendoWindow").title('Update Entry');
            $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-update'></span>Update";
        }

        e.sender.editable.validatable = new recruitment.CValidator(e.container);

        e.sender.unbind("save");
        e.sender.bind("save", function (sc) {
            sc.preventDefault();
            _handleGridUI.disable($('a.k-grid-update'));
            $.when(e.sender.dataSource.sync()).then(function () {
                _handleGridUI.enable($('a.k-grid-update'));
            }, function () {
                _handleGridUI.enable($('a.k-grid-update'));
            });
        });

        prepareForm(e);
    },
    inlineEdit: function (e) {
        var commandCellUpdate = e.container.find("td:nth-last-child(2)");
        commandCellUpdate.html('<a class="k-button k-grid-update"><i class="material-icons">check</i></a>');

        var commandCellCancel = e.container.find("td:last");
        commandCellCancel.empty();
        //commandCellCancel.html('<a class="k-button k-grid-cancel" style="min-width:16px;"><span class="k-icon k-cancel"></span></a>');
    },
    inlineEditWithKeyboardShortcut: function (e) {
        var commandCellUpdate = e.container.find("td:nth-last-child(2)");
        var btnUpdate = $('<a class="k-button k-grid-update"><i class="material-icons">check</i></a>');

        e.sender.editable.validatable = new recruitment.CValidator(e.container);

        e.sender.unbind("save");
        e.sender.bind("save", function (sc) {
            sc.preventDefault();
            _handleGridUI.disable(btnUpdate);
            var deferred = $.Deferred();
            $.when(e.sender.dataSource.sync()).then(function () {
                _handleGridUI.enable(btnUpdate);
            }, function () {
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
            '"><span class="k-icon k-cancel"></span>' +
            '</a>');

        shortcut.add('ESC', function () {
            btnCnl.click();
        });

        commandCellCancel.append(btnCnl);
        prepareForm(e, btnUpdate);
    },
    dataBound: function (e, controlEditDelete) {
        controlEditDelete = typeof controlEditDelete !== 'undefined'
            ? controlEditDelete
            : true;

        gridEmptyMessage(e.sender, "No Entry Found!");

        if (controlEditDelete) {
            var editBtn = e.sender.element.find('tbody tr .k-grid-edit');
            var deleteBtn = e.sender.element.find('tbody tr .k-grid-manualDestroy');


            editBtn.each(function () {
                var item = e.sender.dataItem($(this).closest("tr"));

                if (item.CanUpdate !== undefined) {
                    if (!item.CanUpdate) {
                        //$(this).remove();
                        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                    }
                }
            });

            deleteBtn.each(function () {
                var item = e.sender.dataItem($(this).closest("tr"));

                //if (item.Source !== undefined) {
                //    if (item.Source !== RubiconConfig.RequestSource) {
                //        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                //    }
                //}

                if (item.CanDelete !== undefined) {
                    if (!item.CanDelete) {
                        //if (false) {
                        //$(this).remove();
                        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                    }
                }
            });

        }
    },
    dataSource: {
        schema: {
            total: 'Total',
            parse: function (response, a) {
                //
                if (response.Total !== undefined) {
                    var arr = [];
                    arr.Total = response.Total;

                    for (var i = 0; i < response.Data.length; i++) {
                        arr.push(response.Data[i]);
                    }
                    return arr;
                }

                // this is set if the request is not serverside (serverFiltering, serverPaging, serverSorting)
                response.Total = response.length;

                return response;
            },
            findByModelName: function (modelName) {
                // this modelName can be found at ~/Rubicon/Rubicon-models.js

                if (rubicon.model[modelName] === undefined ||
                    rubicon.model[modelName] === null) {
                    throw modelName + " is not defined in rubicon.model";
                }

                var retVal = {
                    model: recruitment.model[modelName].kendoModel,
                    total: gridUtil.dataSource.schema.total,
                    parse: gridUtil.dataSource.schema.parse
                }

                return retVal;
            },
        },
        transport: {
            parameterMap: function (options, operation) {
                var a = angular.copy(options);

                if (operation === 'destroy')
                    return a.UID;

                if (operation !== "read")
                    return JSON.stringify(a);

                // this is for read operation
                // a will return the pattern for serverFiltering, serverSorting, serverPaging
                if (a['filter'] !== undefined)
                    a['filter'] = JSON.stringify(a['filter']);

                return a;
            }
        }
    },
    columns: {
        viewCommand: function (btnClick) {
            var retVal = {
                command: [
                    {
                        name: "View",
                        text: "",
                        // imageClass: "k-icon k-i-search ob-icon-only",
                        template: "<a class='k-button k-grid-view'><i class='material-icons md-18'>view_list</i></a>",
                        click: function (e) {
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                            console.log('View', dataItem);

                            if (btnClick !== undefined) {
                                btnClick();
                            }
                        }
                    }
                ],
                title: " ",
                width: 100
            };

            return retVal;
        },
        editCommand: function (click) {
            var retVal = {
                command: [
                    {
                        id: "edit",
                        name: "edit",
                        //text: { edit: "Modify", update: "Save", cancel: "Cancel" },
                        text: { edit: "Modify", update: "Save" },
                        template: "<a class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>"
                    }
                ],
                title: " ",
                width: 100
            };

            return retVal;
        },
        deleteCommand: function (click) {
            var retVal = {
                command: [
                    {
                        name: "manualDestroy",
                        text: "",
                        template: "<a class='k-button k-grid-manualDestroy'><i class='material-icons md-18'>delete_forever</i></a>",
                        click: function (e) {
                            e.preventDefault();

                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                            var ds = this.dataSource;

                            if (dataItem.IsDefault !== null) {
                                if (dataItem.IsDefault) {
                                    kendo.confirm('Change default to continue deleting this entry.', "Can't Delete Default", function () {

                                    });
                                }
                            }

                            kendo.confirm('Continue to delete this entry?', 'Delete Entry', function () {
                                ds.remove(dataItem);
                                ds.sync();
                            });

                            //kendo.confirm("Continue to delete this entry?").then(function () {
                            //    //kendo.alert("You chose the Ok action.");
                            //    //app.Services.Repository
                            //    //    .controller(ds.options.repository.controller)
                            //    //    .action(ds.options.repository.action.destroy)
                            //    //    .post()
                            //    //    .success(function (res) {
                            //    //        $scope.$apply(function () {
                            //    //            successNotification.show("Approved amount successfully updated.", "", true);
                            //    //        });
                            //    //    });
                            //    ds.transport.options.destroy();
                            //}, function () {
                            //    //kendo.alert("You chose to Cancel action.");
                            //});
                        }
                    }
                ],
                title: " ",
                width: 100
            };

            return retVal;
        }
    },
    getFilterForQueryStrings: function (filters) {
        var retVal = {};
        console.log('filters', filters);
        if (filters !== null) {
            if (filters.field !== null && filters.field !== '') {
                retVal[filters.field] = filters.value;
            }

            if (filters.filters.length > 0) {
                filters.filters.forEach(function (_filter) {
                    retVal[_filter.field] = _filter.value;
                });
            }
        }
        retVal = "applicanttransferhistory~eq~'00000000-0000-0000-0000-000000000000'"
        console.log('retVal', retVal);
        return retVal;
    }
}

$.ajaxSetup({
    withCredentials: true,
    beforeSend: function (xhr, req) {
        //xhr.setRequestHeader(Config.CookieName, sessionKey);

        var controllerActionPath = req.url.replace(window.location.origin, '').trim("/");
        var _segments = controllerActionPath.split('/');

        var controllerIndex = 1;
        if (window.location.host === "localhost") {
            controllerIndex = 2;
        }
        xhr.uid = recruitment.preloader.show("Processing " + _segments[controllerIndex]);
    },
    complete: function (xhr) {
        recruitment.preloader.hide(xhr.uid);
    },
    //success: function (xhr) {
    //    //recruitment.preloader.hide(xhr.uid);
    //},
    error: function (xhr) {
        var _xhrUID = null;
        console.log("error app.js ajaxSetup", xhr);
        if (xhr !== null && xhr !== undefined) {
            if (xhr.responseText !== "") {
                var message = angular.fromJson(xhr.responseText);
                console.log('request error', message);
                // errorNotification.show(message);
                errorNotification(message, "");
                //if (message.Message.indexOf('Parameter name: source') == -1) {
                //errorNotification.show(message.Message);
                //}

                //_xhrUID = xhr.uid;
            }
        }
        else 
            // errorNotification.show("An unknown error has occured");
            errorNotification("An unknown error has occured", "");

        recruitment.preloader.hide(xhr.uid);
    }
});

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {

    $scope.onChevron = function () {
        console.log("hello");
        // e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $(".push-left").toggleClass("push-left-active");
    };


}]);

function repositoryParseResult(result) {

    return result;
}

function parseMVCJsonResult(item) {
    if (item !== undefined && item !== null) {
        for (var prop in item) {
            if (item.hasOwnProperty(prop)) {
                if (typeof item[prop] === "string" && item[prop].toLowerCase().includes("/date(")) {
                    if (item[prop] === "/Date(-62135596800000)/") {
                        item[prop] = null;
                    } else {
                        item[prop] = kendo.parseDate(item[prop], "MM/dd/yyyy hh:mm tt");
                        console.log('asdf', new Date(item[prop], "MM/dd/yyyy hh:mm tt"));
                        //item[prop].setHours(item[prop].getHours() + 8);
                    }
                }
            }
        };
    }
    return item;
}


