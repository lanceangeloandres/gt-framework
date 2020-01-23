app.directive('grdHiringStageEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdHiringEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                    function isNumeric(n) {
                        return !isNaN(parseFloat(n)) && isFinite(n);
                    }

                    function getBoolean(str) {
                        if ("true".startsWith(str)) {
                            return true;
                        } else if ("false".startsWith(str)) {
                            return false;
                        } else {
                            return null;
                        }
                    }

                    $scope.optGrdAssignedEmp = {
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Employee"
                            },
                            "excel",
                        ],
                        noRecords: {
                            template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        },
                        dataSource: {
                            transport:{
                                create: function (e) {
                                    $log.log('create e.data', e.data);
                                    $log.log('create AssignedEmp', $scope.dataItem.AssignedEmp);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.AssignedEmp.length <= 0) {
                                        e.success($scope.dataItem.AssignedEmp);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.AssignedEmp.length, // total: $scope.dataItem.Status !== null ? $scope.dataItem.Status.length : 0,
                                            data: $scope.dataItem.AssignedEmp
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read AssignedEmp', $scope.dataItem.AssignedEmp);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update AssignedEmp", $scope.dataItem.AssignedEmp);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory AssignedEmp", $scope.dataItem.AssignedEmp);
                                    e.success(e.data);
                                }
                            },
                            batch:false,
                            pageSize: 5,
                            schema: {
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data.length);
                                    return data.length;
                                },
                                model: {
                                    id: 'UID',
                                    fields: {
                                        UID: { type: 'string', editable: false, nullable: true },
                                        Employee: {
                                            name: 'Employee',
                                            defaultValue: {
                                                'UID': null,
                                                'FullName': 'Please Select',
                                            }                
                                        }
                                    }
                                }
                                // model: recruitment.model.AssignedEmp.kendoModel
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventAction) {
                                    e.preventDefault();
                                    warningNotification("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventAction = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventAction = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventAction = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventAction = false;
                        },
                        autoBind: true,
                        sortable: true,
                        reorderable: false,
                        resizable: true,
                        filterable: false,
                        mobile: true,
                        pageable: {
                            refresh: true,
                            pageSizes: true
                        },
                        columns: [
                            {
                                field: "Employee",
                                title: "Employee Name",
                                width: 150,
                                editor: function(container, options){
                                    // $("<input style='width:100%;'" +
                                    //     "id='ddlAssignEmp'" +
                                    //     "name='Employee'" +
                                    //     "data-bind='value: " +options.field +"'" +
                                    //     "placeholder='Select Employee'" +
                                    //     "validationMessage='Please select an employee." +
                                    //     "required />")
                                    //     .appendTo(container)
                                    //     .kendoDropDownList({
                                    //         autoBind: false,
                                    //         dataTextField: 'FullName',
                                    //         dataValueField: 'UID',
                                    //         filter: "contains",
                                    //         optionLabel: "Select Employee",
                                    //         template: '<div>#= FullName #</b></div>',
                                    //         dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                                    //             sort: [{ field: "ID", dir: "asc" }],
                                    //             transport: {
                                    //                 read: $repository
                                    //                     .controller('Emp')
                                    //                     .action('Retrieve')
                                    //                     .url
                                    //             }
                                    //         })
                                    //     })

                                    $("<input style='width:100%;' data-bind='value: " +options.field +"' required/>")
                                        .appendTo(container)
                                        .kendoDropDownList({
                                            autoBind: false,
                                            filter: "contains",
                                            dataTextField: "FullName",
                                            dataValueField: "UID",
                                            optionLabel: "Select Employee",
                                            template: '<div><b>#= FullName #</b></div>',
                                            dataSource: new recruitment.CDataSource({
                                                sort: [{ field: "FullName", dir: "asc" }],
                                                transport: {
                                                    read: $repository
                                                        .controller('Emp')
                                                        .action('RetrieveEmp')
                                                        .url
                                                },
                                            })
                                        })
                                },
                                template: function (dataItem) {
                                    return dataItem.Employee.FullName;
                                },
                            },
                            {
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdAssignedEmp-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

                                    },
                                ],
                                title: "",
                                width: 70
                            },
                            {
                                command: [
                                    {
                                        name: "destroy",
                                        text: "",
                                        template: "<a grdAssignedEmp-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                        editable: {
                            mode: "inline",
                            confirmation: false
                        },
                    } 


                    //if ($scope.dataItem.UID !== null) {
                    //    if ($scope.dataItem.IsTransferred == true) {
                    //        if ($scope.dataItem.ApplicationStatusExcludeTabAccess !== null) {
                    //            if ($scope.dataItem.ApplicationStatusExcludeTabAccess.length > 0) {
                    //                $scope.dataItem.ApplicationStatusExcludeTabAccess.forEach(function (element) {
                    //                    const splitCamelCase = str => str.match(/^[A-Z]?[^A-Z]*|[A-Z][^A-Z]*/g).join(' ');
                    //                    element.ApplicantTabType = splitCamelCase(element.ApplicantTabType);
                    //                    element.GridAction = splitCamelCase(element.GridAction);
                    //                });
                    //            }
                    //        }
                    //    }
                    //}

                    //recruitment.appEnum.applicantTabType.toArray().forEach(function (element) {
                    //    const splitCamelCase = str => str.match(/^[A-Z]?[^A-Z]*|[A-Z][^A-Z]*/g).join(' ');
                    //    element.Text = splitCamelCase(element.Text);
                    //});

                    //#region grdStatus
                    var preventAction = false;
                    $("#grdStatus").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Status"
                            },
                            'excel',
                            {
                                text: "Search",
                                template: '<input class="k-textbox" id="filter" style="float: right" placeholder="Search" />'
                            },
                        ],
                        scrollable: true,
                        pageable: true,
                        resizable: true,
                        noRecords: {
                            template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        },
                        sortable: true,
                        editable: {
                            mode: "inline",
                            confirmation: false
                        },
                        dataSource: {
                            pageSize: 10,
                            batch: false,
                            transport: {
                                create: function (e) {
                                    e.data.UID = Guid.NewGuid();
                                    $log.log('create e.data', e.data);
                                    $log.log('create status', $scope.dataItem.Status);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    //if ($scope.dataItem.Status !== null) {
                                        if ($scope.dataItem.Status.length <= 0) {
                                            e.success($scope.dataItem.Status);
                                        }                                 
                                    //}
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.Status.length, // total: $scope.dataItem.Status !== null ? $scope.dataItem.Status.length : 0,
                                            data: $scope.dataItem.Status
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read Status', $scope.dataItem.Status);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update Status", $scope.dataItem.Status);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory Status", $scope.dataItem.Status);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.Status.kendoModel,
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data);
                                    //var _total = 0;
                                    //if (data !== null) {
                                    //    _total = data.length;
                                    //}
                                    return data.length;
                                },
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventAction) {
                                    e.preventDefault();
                                    warningNotification("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventAction = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventAction = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventAction = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventAction = false;
                        },
                        dataBound: function (e) {

                            var editBtn = e.sender.element.find('tbody tr .k-grid-edit');
                            var deleteBtn = e.sender.element.find('tbody tr .k-grid-delete');

                            editBtn.each(function () {
                                var item = e.sender.dataItem($(this).closest("tr"));

                                if (item.CanUpdate !== undefined) {
                                    if (!item.CanUpdate) {
                                        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                                    }
                                }
                            });

                            deleteBtn.each(function () {
                                var item = e.sender.dataItem($(this).closest("tr"));

                                if (item.CanDelete !== undefined) {
                                    if (!item.CanDelete) {
                                        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                                    }
                                }
                            });

                            if ($scope.dataItem.IsForOnboardingChecklist === true) {
                                e.sender.showColumn("IsForOnboardingChecklist");

                                setTimeout(function () {
                                    for (i = 0; i <= e.sender.columns.length; i++) {
                                        e.sender.autoFitColumn(i);
                                    }
                                    e.sender.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);

                            } else {
                                e.sender.hideColumn("IsForOnboardingChecklist");

                                setTimeout(function () {
                                    for (i = 0; i <= e.sender.columns.length; i++) {
                                        e.sender.autoFitColumn(i);
                                    }
                                    e.sender.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);
                            }

                            if ($scope.dataItem.IsForDashboard === true) {
                                e.sender.showColumn("IsForDashboard");

                                setTimeout(function () {
                                    for (i = 0; i <= e.sender.columns.length; i++) {
                                        e.sender.autoFitColumn(i);
                                    }
                                    e.sender.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);

                            } else {
                                e.sender.hideColumn("IsForDashboard");

                                setTimeout(function () {
                                    for (i = 0; i <= e.sender.columns.length; i++) {
                                        e.sender.autoFitColumn(i);
                                    }
                                    e.sender.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);
                            }

                        },
                        columns: [
                            {
                                field: "Name",
                                title: "Name",
                                width: 150
                            },
                            //{
                            //    field: "Description",
                            //    title: "Description",
                            //    width: 200
                            //},
                            {
                                field: "InActive",
                                title: "Inactive",
                                template: '<div class="custom-control fill-checkbox custom-control-grid">' +
                                    '<label class="custom-control fill-checkbox custom-control-grid" for="InActive">' +
                                    '<input type="checkbox" #= InActive ? \'checked="checked"\' : "" # class="fill-control-input" type="checkbox"/>' +
                                    '<span class="fill-control-indicator fill-control-kendogrid">' +
                                    '</span>' +
                                    '</label>' +
                                    '</div>',
                                width: 70,
                                editor: checkBox
                            },
                            {
                                field: "IsForOnboardingChecklist",
                                title: "For Onboarding Checklist",
                                template: '<div class="custom-control fill-checkbox custom-control-grid">' +
                                    '<label class="custom-control fill-checkbox custom-control-grid" for="IsForOnboardingChecklist">' +
                                    '<input type="checkbox" #= IsForOnboardingChecklist ? \'checked="checked"\' : "" # class="fill-control-input" type="checkbox"/>' +
                                    '<span class="fill-control-indicator fill-control-kendogrid">' +
                                    '</span>' +
                                    '</label>' +
                                    '</div>',
                                width: 70,
                                editor: checkBoxIsForOnboardingChecklist
                            },
                            {
                                field: "IsForDashboard",
                                title: "Display on Dashboard",
                                template: '<div class="custom-control fill-checkbox custom-control-grid">' +
                                    '<label class="custom-control fill-checkbox custom-control-grid" for="IsForDashboard">' +
                                    '<input type="checkbox" #= IsForDashboard ? \'checked="checked"\' : "" # class="fill-control-input" type="checkbox"/>' +
                                    '<span class="fill-control-indicator fill-control-kendogrid">' +
                                    '</span>' +
                                    '</label>' +
                                    '</div>',
                                width: 70,
                                editor: checkBoxIsForDashboard
                            },
                            {
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdStatus-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

                                    },
                                ],
                                title: "",
                                width: 70
                            },
                            {
                                command: [
                                    {
                                        name: "destroy",
                                        text: "",
                                        template: "<a grdStatus-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                    }).data("kendoGrid");

                    function checkBox(container, options) {
                        var guid = kendo.guid();
                        $log.log("checkbox", options);
                        $('<div class="custom-control fill-checkbox custom-control-grid">' +
                            '<label class="custom-control fill-checkbox custom-control-grid" for="InActive">' +
                            '<input name="InActive" id="InActive" data-bind="value: ' + options.field + '" ' +
                            'class="fill-control-input" type="checkbox"/>' +
                            '<span class="fill-control-indicator fill-control-kendogrid"></span></label></div>')
                            .appendTo(container);
                    }

                    function checkBoxIsForOnboardingChecklist(container, options) {
                        var guid = kendo.guid();
                        $log.log("checkbox", options);
                        $('<div class="custom-control fill-checkbox custom-control-grid">' +
                            '<label class="custom-control fill-checkbox custom-control-grid" for="IsForOnboardingChecklist">' +
                            '<input name="IsForOnboardingChecklist" id="IsForOnboardingChecklist"' + 
                            'data-bind="value: ' + options.field + '" ' +
                            'class="fill-control-input" type="checkbox"/>' +
                            '<span class="fill-control-indicator fill-control-kendogrid"></span></label></div>')
                            .appendTo(container);
                    }

                    function checkBoxIsForDashboard(container, options) {
                        var guid = kendo.guid();
                        $log.log("checkbox", options);
                        $('<div class="custom-control fill-checkbox custom-control-grid">' +
                            '<label class="custom-control fill-checkbox custom-control-grid" for="IsForDashboard">' +
                            '<input name="IsForDashboard" id="IsForDashboard"' + 
                            'data-bind="value: ' + options.field + '" ' +
                            'class="fill-control-input" type="checkbox"/>' +
                            '<span class="fill-control-indicator fill-control-kendogrid"></span></label></div>')
                            .appendTo(container);
                    }

                    $scope.isChecked = false;

                    $("#IsForOnboardingChecklistEditor").click(function () {
                        $log.log('IsForOnboardingChecklist', $scope.dataItem.IsForOnboardingChecklist);
                        $log.log('this.checked', this.checked);

                        if (this.checked === true) {
                            console.log("hit");

                            //$scope.$apply(function () {
                            //    var grid = $("#grdStatus").data("kendoGrid");
                            //    grid.hideColumn("IsForOnboardingChecklist");
                            //    grid.refresh();
                            //});

                            $scope.$apply(function () {
                                var grid = $("#grdStatus").data("kendoGrid");
                                grid.showColumn("IsForOnboardingChecklist");


                                setTimeout(function () {
                                    for (i = 0; i <= grid.columns.length; i++) {
                                        grid.autoFitColumn(i);
                                    }
                                    grid.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);

                                //grid.refresh();
                            });
                        }
                        else {
                            console.log("not hit");

                            $scope.$apply(function () {
                                var grid = $("#grdStatus").data("kendoGrid");
                                grid.hideColumn("IsForOnboardingChecklist");
                                //grid.refresh();


                                setTimeout(function () {
                                    for (i = 0; i <= grid.columns.length; i++) {
                                        grid.autoFitColumn(i);
                                    }
                                    grid.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);

                            });

                        }

                    });

                    $("#IsForDashboardEditor").click(function () {
                        $log.log('IsForDashboard', $scope.dataItem.IsForDashboard);
                        $log.log('this.checked', this.checked);

                        if (this.checked === true) {
                            console.log("hit");

                            //$scope.$apply(function () {
                            //    var grid = $("#grdStatus").data("kendoGrid");
                            //    grid.hideColumn("IsForOnboardingChecklist");
                            //    grid.refresh();
                            //});

                            $scope.$apply(function () {
                                var grid = $("#grdStatus").data("kendoGrid");
                                grid.showColumn("IsForDashboard");


                                setTimeout(function () {
                                    for (i = 0; i <= grid.columns.length; i++) {
                                        grid.autoFitColumn(i);
                                    }
                                    grid.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);

                                //grid.refresh();
                            });
                        }
                        else {
                            console.log("not hit");

                            $scope.$apply(function () {
                                var grid = $("#grdStatus").data("kendoGrid");
                                grid.hideColumn("IsForDashboard");
                                //grid.refresh();


                                setTimeout(function () {
                                    for (i = 0; i <= grid.columns.length; i++) {
                                        grid.autoFitColumn(i);
                                    }
                                    grid.element.find('table[role="grid"]').removeAttr('style');

                                }, 100);

                            });

                        }

                    });

                    //#endregion

                    //#region grdApplicationStatusExcludeTabAccess
                    var preventActionGrdHiringStageExcludeTabAccess = false;
                    $("#grdHiringStageExcludeTabAccess").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add"
                            },
                            'excel'
                        ],
                        scrollable: true,
                        pageable: true,
                        resizable: true,
                        noRecords: {
                            template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        },
                        sortable: true,
                        editable: {
                            mode: "inline",
                            confirmation: false
                        },
                        dataSource: {
                            pageSize: 10,
                            batch: false,
                            transport: {
                                create: function (e) {
                                    e.data.UID = Guid.NewGuid();
                                    $log.log('create e.data', e.data);
                                    $log.log('create HiringStageExcludeTabAccess', $scope.dataItem.HiringStageExcludeTabAccess);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.HiringStageExcludeTabAccess.length <= 0) {
                                        e.success($scope.dataItem.HiringStageExcludeTabAccess);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.HiringStageExcludeTabAccess.length, 
                                            data: $scope.dataItem.HiringStageExcludeTabAccess
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read Status', $scope.dataItem.HiringStageExcludeTabAccess);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update HiringStageExcludeTabAccess", $scope.dataItem.HiringStageExcludeTabAccess);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory HiringStageExcludeTabAccess", $scope.dataItem.HiringStageExcludeTabAccess);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.HiringStageExcludeTabAccess.kendoModel,
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data);
                                    //var _total = 0;
                                    //if (data !== null) {
                                    //    _total = data.length;
                                    //}
                                    return data.length;
                                },
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventActionGrdHiringStageExcludeTabAccess) {
                                    e.preventDefault();
                                    warningNotification("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventActionGrdHiringStageExcludeTabAccess = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventActionGrdHiringStageExcludeTabAccess = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventActionGrdHiringStageExcludeTabAccess = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventActionGrdHiringStageExcludeTabAccess = false;
                        },
                        dataBound: function (e) {

                            var editBtn = e.sender.element.find('tbody tr .k-grid-edit');
                            var deleteBtn = e.sender.element.find('tbody tr .k-grid-delete');

                            editBtn.each(function () {
                                var item = e.sender.dataItem($(this).closest("tr"));

                                if (item.CanUpdate !== undefined) {
                                    if (!item.CanUpdate) {
                                        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                                    }
                                }
                            });

                            deleteBtn.each(function () {
                                var item = e.sender.dataItem($(this).closest("tr"));

                                if (item.CanDelete !== undefined) {
                                    if (!item.CanDelete) {
                                        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                                    }
                                }
                            });

                        },
                        columns: [
                            {
                                field: "ApplicantTabType",
                                title: "Exclude Access",
                                editor: function (container, options) {
                                    $("<input required='required'/>")
                                        .attr('name', options.field)
                                        .appendTo(container)
                                        .kendoDropDownList({
                                            autoBind: false,
                                            dataTextField: 'Text',
                                            dataValueField: 'Text',
                                            //template: function (x) {
                                            //    $log.log('x', x);
                                            //    const splitCamelCase = str => str.match(/^[A-Z]?[^A-Z]*|[A-Z][^A-Z]*/g).join(' ');
                                            //    return splitCamelCase(x.Text);
                                            //},
                                            dataSource: {
                                                data: recruitment.appEnum.applicantTabType.toArray()
                                            }
                                        })
                                },
                                //template: function (e) {
                                //    const splitCamelCase = str => str.match(/^[A-Z]?[^A-Z]*|[A-Z][^A-Z]*/g).join(' ');
                                //    return splitCamelCase(e.ApplicantTabType);
                                //},
                                width: 150
                            },
                            {
                                field: "GridAction",
                                title: "Action",
                                editor: function (container, options) {
                                    $("<input required='required'/>")
                                        .attr('name', options.field)
                                        .appendTo(container)
                                        .kendoDropDownList({
                                            autoBind: false,
                                            dataTextField: 'Text',
                                            dataValueField: 'Text',
                                            dataSource: {
                                                data: recruitment.appEnum.gridAction.toArray()
                                            }
                                        })
                                },
                                width: 150
                            },
                            {
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdHiringStageExcludeTabAccess-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

                                    },
                                ],
                                title: "",
                                width: 70
                            },
                            {
                                command: [
                                    {
                                        name: "destroy",
                                        text: "",
                                        template: "<a grdHiringStageExcludeTabAccess-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                    }).data("kendoGrid");
                    //#endregion
                }]
            };
        }
    ]);