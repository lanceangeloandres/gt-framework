app.directive('grdJobConfEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdJobConfEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $log.log("dataitem editor", $scope.dataItem);

                    //JobDescription
                    var preventActionJobDescription = false;
                    $("#grdJobDescription").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Description"
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
                                    $log.log('create JobDescription', $scope.dataItem.JobDescription);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.JobDescription.length <= 0) {
                                        e.success($scope.dataItem.JobDescription);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.JobDescription.length,
                                            data: $scope.dataItem.JobDescription
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read JobDescription', $scope.dataItem.JobDescription);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update JobDescription", $scope.dataItem.JobDescription);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory JobDescription", $scope.dataItem.JobDescription);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.JobDescription.kendoModel,
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data);
                                    return data.length;
                                },
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventActionJobDescription) {
                                    e.preventDefault();
                                    "Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", ""
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventActionJobDescription = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventActionJobDescription = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventActionJobDescription = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventActionJobDescription = false;
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
                                field: "Value",
                                title: "Value",
                                width: 200,
                                editor: valueEditor
                            },
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
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdJobDescription-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdJobDescription-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                    }).data("kendoGrid");

                    //JobResponsibilities
                    var preventActionJobResponsibilities = false;
                    $("#grdJobResponsibilities").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Responsibilities"
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
                                    $log.log('create JobResponsibilities', $scope.dataItem.JobResponsibilities);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.JobResponsibilities.length <= 0) {
                                        e.success($scope.dataItem.JobResponsibilities);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.JobResponsibilities.length,
                                            data: $scope.dataItem.JobResponsibilities
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read JobResponsibilities', $scope.dataItem.JobResponsibilities);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update JobResponsibilities", $scope.dataItem.JobResponsibilities);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory JobResponsibilities", $scope.dataItem.JobResponsibilities);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.JobResponsibilities.kendoModel,
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data);
                                    return data.length;
                                },
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventActionJobResponsibilities) {
                                    e.preventDefault();
                                    "Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", ""
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventActionJobResponsibilities = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventActionJobResponsibilities = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventActionJobResponsibilities = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventActionJobResponsibilities = false;
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
                                field: "Value",
                                title: "Value",
                                width: 200,
                                editor: valueEditor
                            },
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
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdJobResponsibilities-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdJobResponsibilities-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                    }).data("kendoGrid");

                    //JobQualification
                    var preventActionJobQualification = false;
                    $("#grdJobQualification").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Qualification"
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
                                    $log.log('create JobQualification', $scope.dataItem.JobQualification);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.JobQualification.length <= 0) {
                                        e.success($scope.dataItem.JobQualification);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.JobQualification.length,
                                            data: $scope.dataItem.JobQualification
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read JobQualification', $scope.dataItem.JobQualification);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update JobQualification", $scope.dataItem.JobQualification);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory JobQualification", $scope.dataItem.JobQualification);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.JobQualification.kendoModel,
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data);
                                    return data.length;
                                },
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventActionJobQualification) {
                                    e.preventDefault();
                                    "Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", ""
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventActionJobQualification = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventActionJobQualification = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventActionJobQualification = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventActionJobQualification = false;
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
                                field: "Value",
                                title: "Value",
                                width: 200,
                                editor: valueEditor
                            },
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
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdJobQualification-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdJobQualification-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                    }).data("kendoGrid");

                    //JobPrefQualification
                    var preventActionJobPrefQualification = false;
                    $("#grdJobPrefQualification").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Preferred Qualification"
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
                                    $log.log('create JobPrefQualification', $scope.dataItem.JobPrefQualification);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.JobPrefQualification.length <= 0) {
                                        e.success($scope.dataItem.JobPrefQualification);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.JobPrefQualification.length,
                                            data: $scope.dataItem.JobPrefQualification
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read JobPrefQualification', $scope.dataItem.JobPrefQualification);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update JobPrefQualification", $scope.dataItem.JobPrefQualification);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory JobPrefQualification", $scope.dataItem.JobPrefQualification);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.JobPrefQualification.kendoModel,
                                data: function (data) {
                                    $log.log("schema data", data);
                                    return data;
                                },
                                total: function (data) {
                                    $log.log("schema total", data);
                                    return data.length;
                                },
                            },
                            requestStart: function (e) { //prevent grid navigation
                                $log.log("requeststart");
                                if (preventActionJobPrefQualification) {
                                    e.preventDefault();
                                    "Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", ""
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                        },
                        edit: function () {
                            $log.log("edit");
                            preventActionJobPrefQualification = true;

                        },
                        save: function (e) {
                            $log.log("save", e);
                            preventActionJobPrefQualification = false;

                        },
                        remove: function (e) {
                            $log.log("remove");
                            preventActionJobPrefQualification = false;
                        },
                        cancel: function (e) {
                            $log.log("cancel", e);
                            preventActionJobPrefQualification = false;
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
                                field: "Value",
                                title: "Value",
                                editor: valueEditor,
                                width: 200
                            },
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
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdJobPrefQualification-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdJobPrefQualification-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                        ],
                    }).data("kendoGrid");


                    function checkBox(container, options) {
                        var guid = kendo.guid();
                        $('<div class="custom-control fill-checkbox custom-control-grid">' +
                            '<label class="custom-control fill-checkbox custom-control-grid" for="InActive">' +
                            '<input name="InActive" id="InActive" data-bind="value: ' + options.field + '" ' +
                            'class="fill-control-input" type="checkbox"/>' +
                            '<span class="fill-control-indicator fill-control-kendogrid"></span></label></div>')
                            .appendTo(container);
                    }
                    function valueEditor(container, options) {
                        var guid = kendo.guid();
                        $('<textarea class="k-input k-textbox" style="width: 100%; height:100%;" required data-bind="value: ' + options.field + '" />') 
                            .appendTo(container);
                    }

                    $scope.divUid = Guid.Empty();
                    $scope.deptUid = Guid.Empty();
                    $scope.secUid = Guid.Empty();

                    $scope.dllPositionDataSourceRead = function (divUid, deptUid, secUid, value) {
                        $log.log('dllPositionDataSourceRead');

                        var ddlPosition = $("#ddlPosition").data("kendoDropDownList");

                        var ddlPositionDS = new kendo.data.DataSource({
                            transport: {
                                read: function (opt) {
                                    $repository
                                        .controller("Position")
                                        .action('GetPositionByDesignation')
                                        .queryString({
                                            divUid: divUid,
                                            deptUid: deptUid,
                                            secUid: secUid
                                        })
                                        .get()
                                        .success(function (r) {
                                            $log.log('ddlPositionDS', r);
                                            opt.success(r.Data);
                                        });
                                }
                            },
                            requestEnd: function (e) {
                                $scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if (e.response.length > 0) {
                                            $scope.ddlPositionIsVisible = true;
                                        }
                                        else {
                                            $scope.ddlPositionIsVisible = false;
                                        }
                                    }
                                    else {
                                        $scope.ddlPositionIsVisible = false;
                                    }
                                });
                            }
                        });

                        ddlPosition.setDataSource(ddlPositionDS);
                        ddlPosition.dataSource.read();
                        ddlPosition.value(value);
                    }

                    $scope.ddlDivisionDataSourceRead = function (subClientUid, value) {
                        $log.log('ddlDivisionDataSourceRead');

                        var ddlDivision = $("#ddlDivision").data("kendoDropDownList");

                        var ddlDivisionDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Division')
                                    .action('GetDivisionBySubClientUiD')
                                    .queryString({
                                        subClientUid: subClientUid
                                    })
                                    .url
                            },
                            requestEnd: function (e) {                                
                            }
                        });

                        ddlDivision.setDataSource(ddlDivisionDS);
                        ddlDivision.dataSource.read();
                        ddlDivision.value(value);
                    }

                    $scope.ddlDepartmentDataSourceRead = function (divisionUid, value) {
                        $log.log('ddlDepartmentDataSourceRead');

                        var ddlDepartment = $("#ddlDepartment").data("kendoDropDownList");

                        var ddlDepartmentDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Department')
                                    .action('GetDepartmentByDivisionUiD')
                                    .queryString({
                                        divisionUid: divisionUid
                                    })
                                    .url
                            },
                            requestEnd: function (e) {
                            }
                        });

                        ddlDepartment.setDataSource(ddlDepartmentDS);
                        ddlDepartment.dataSource.read();
                        ddlDepartment.value(value);
                    }

                    $scope.ddlSectionDataSourceRead = function (departmentUid, value) {
                        $log.log('ddlSectionDataSourceRead');

                        var ddlSection = $("#ddlSection").data("kendoDropDownList");

                        var ddlSectionDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Section')
                                    .action('GetSectionByDepartmentUiD')
                                    .queryString({
                                        departmentUid: departmentUid
                                    })
                                    .url
                            },
                            requestEnd: function (e) {
                            }
                        });

                        ddlSection.setDataSource(ddlSectionDS);
                        ddlSection.dataSource.read();
                        ddlSection.value(value);
                    }

                    $scope.optSubClient = {
                        autoBind: true,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            //transport: {
                            //    read: {
                            //        url: $repository
                            //            .controller('SubClient')
                            //            .action('Retrieve')
                            //            .url
                            //            .complete(function (r) {
                            //                $log.log("subclient");
                            //            })
                            //    }
                            //}
                            transport: {
                                read: $repository
                                    .controller('SubClient')
                                    .action('Retrieve')
                                    .url
                            },
                            requestEnd: function (e) {
                                var response = e.response;
                                var type = e.type;
                                var ddlDivision = $("#ddlDivision").data("kendoDropDownList");
                                
                                if ($scope.dataItem.SubClient.UID !== null) {
                                    var ddlDivisionDS = new recruitment.CDataSource({
                                        transport: {
                                            read: $repository
                                                .controller('Division')
                                                .action('GetDivisionBySubClientUiD')
                                                .queryString({
                                                    subClientUid: $scope.dataItem.SubClient.UID
                                                })
                                                .url
                                        },
                                        requestEnd: function (e) {
                                            if ($scope.dataItem.Division.UID !== null) {
                                                var ddlDepartment = $("#ddlDepartment").data("kendoDropDownList");

                                                var ddlDepartmentDS = new recruitment.CDataSource({
                                                    transport: {
                                                        read: $repository
                                                            .controller('Department')
                                                            .action('GetDepartmentByDivisionUiD')
                                                            .queryString({
                                                                divisionUid: $scope.dataItem.Division.UID
                                                            })
                                                            .url
                                                    },
                                                    requestEnd: function (e) {
                                                        if ($scope.dataItem.Department !== null) {
                                                            if ($scope.dataItem.Department.UID !== null) {

                                                                var ddlSection = $("#ddlSection").data("kendoDropDownList");

                                                                var ddlSectionDS = new recruitment.CDataSource({
                                                                    transport: {
                                                                        read: $repository
                                                                            .controller('Section')
                                                                            .action('GetSectionByDepartmentUiD')
                                                                            .queryString({
                                                                                departmentUid: $scope.dataItem.Department.UID
                                                                            })
                                                                            .url
                                                                    },
                                                                    requestEnd: function (e) {

                                                                    }
                                                                });

                                                                ddlSection.setDataSource(ddlSectionDS);
                                                                ddlSection.dataSource.read();
                                                            }
                                                        }
                                                    }
                                                });

                                                ddlDepartment.setDataSource(ddlDepartmentDS);
                                                ddlDepartment.dataSource.read();
                                            }
                                        }
                                    });

                                    ddlDivision.setDataSource(ddlDivisionDS);
                                    ddlDivision.dataSource.read();

                                    $scope.divUid = $scope.dataItem.Division.UID;
                                    $scope.deptUid = ($scope.dataItem.Department === null || $scope.dataItem.Department.UID === null) ? Guid.Empty() : $scope.dataItem.Department.UID;
                                    $scope.secUid = ($scope.dataItem.Section === null || $scope.dataItem.Section.UID === null)? Guid.Empty() : $scope.dataItem.Section.UID;

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, $scope.dataItem.Position.UID);
                                }
                                else {
                                    if (e.response.Data.length > 0) {
                                        //do something
                                    }
                                    else {
                                        var ddlDivisionDS = new recruitment.CDataSource({//new kendo.data.DataSource({
                                            //transport: {
                                            //    read: function (opt) {
                                            //        $repository
                                            //            .controller("Division")
                                            //            .action('Retrieve')
                                            //            .get()
                                            //            .success(function (r) {
                                            //                opt.success(r.Data);
                                            //            }).error(function (err) {
                                            //            });
                                            //    }
                                            //}
                                            transport: {
                                                read: $repository
                                                    .controller('Division')
                                                    .action('Retrieve')
                                                    .url
                                            },
                                            requestEnd: function (e) {
                                                $log.log("department default");
                                            }
                                        });                         
                                        ddlDivision.setDataSource(ddlDivisionDS);
                                        ddlDivision.dataSource.read();
                                        ddlDivision.value(null);
                                    }
                                }
                            }
                        }),
                        change: function (e) {
                            var ddlDivision = $("#ddlDivision").data("kendoDropDownList");
                            var ddlDepartment = $("#ddlDepartment").data("kendoDropDownList");
                            var ddlSection = $("#ddlSection").data("kendoDropDownList");
                            var ddlPosition = $("#ddlPosition").data("kendoDropDownList");

                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                               
                                if (dataItem.UID !== null) {
                                    $scope.ddlDivisionDataSourceRead(dataItem.UID, null);
                                }
                                
                                ddlDepartment.dataSource.data([]);
                                ddlDepartment.value(null);
                               
                                ddlSection.dataSource.data([]);
                                ddlSection.value(null);

                                if ($scope.dataItem.Department !== null) {
                                    $scope.dataItem.Department.UID = null;
                                }
                                else {
                                    $scope.dataItem.Department = null;
                                }
                                if ($scope.dataItem.Section !== null) {
                                    $scope.dataItem.Section.UID = null;
                                }
                                else {
                                    $scope.dataItem.Section = null;
                                }
                                
                                $scope.divUid = Guid.Empty();
                                $scope.deptUid = Guid.Empty();
                                $scope.secUid = Guid.Empty();

                                $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, null);
                            }
                            else {
                                ddlDivision.dataSource.data([]);
                                ddlDivision.value(null);
                            }
                        }
                    };

                    $scope.optDivision = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",

                        cascadeFrom: 'optSubClient',
                        cascadeFromField: 'SubClient.UID',

                        dataSource: {
                        },
                        dataBound: function (e) {
                            $scope.$apply(function () {
                                if ($("#ddlDivision").data("kendoDropDownList").dataSource._data.length > 0) {
                                    $scope.ddlDivisionIsVisible = true;
                                }
                                else {
                                    $scope.ddlDivisionIsVisible = false;
                                }
                            });
                        },
                        change: function (e) {
                            var ddlDepartment = $("#ddlDepartment").data("kendoDropDownList");
                            var ddlSection = $("#ddlSection").data("kendoDropDownList");
                            var ddlPosition = $("#ddlPosition").data("kendoDropDownList");

                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);

                                if (dataItem.UID === null) {
                                    ddlPosition.dataSource.data([]);
                                    ddlPosition.value(null);

                                    ddlDepartment.dataSource.data([]);
                                    ddlDepartment.value(null);

                                    if ($scope.dataItem.Department !== null) {
                                        $scope.dataItem.Department.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Department = null;
                                    }
                                    if ($scope.dataItem.Section !== null) {
                                        $scope.dataItem.Section.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Section = null;
                                    }
                                }
                                else {
                                    $scope.ddlDepartmentDataSourceRead(dataItem.UID, null);

                                    $scope.divUid = dataItem.UID;
                                    $scope.deptUid = Guid.Empty();
                                    $scope.secUid = Guid.Empty();

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, null);

                                    if ($scope.dataItem.Department !== null) {
                                        $scope.dataItem.Department.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Department = null;
                                    }
                                    if ($scope.dataItem.Section !== null) {
                                        $scope.dataItem.Section.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Section = null
                                    }
                                }
                       
                                ddlSection.dataSource.data([]);
                                ddlSection.value(null);
                            }
                            else {
                                ddlDepartment.dataSource.data([]);
                                ddlDepartment.value(null);

                                if ($scope.dataItem.Department !== null) {
                                    $scope.dataItem.Department.UID = null;
                                }
                                else {
                                    $scope.dataItem.Department = null;
                                }
                                if ($scope.dataItem.Section !== null) {
                                    $scope.dataItem.Section.UID = null;
                                }
                                else {
                                    $scope.dataItem.Section = null;
                                }
                            }
                        }
                        //dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //    //sort: [{ field: "CreatedDate", dir: "desc" }],
                        //    //transport: {
                        //    //    read: $repository
                        //    //        .controller('Division')
                        //    //        .action('Retrieve')
                        //    //        .url
                        //    //},
                        //})
                    };

                    $scope.optDepartment = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        //index: 0,
                        //value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",

                        cascadeFrom: 'optDivision',
                        cascadeFromField: 'Division.UID',
                        dataBound: function (e) {
                            $scope.$apply(function () {
                                if ($("#ddlDepartment").data("kendoDropDownList").dataSource._data.length > 0) {
                                    $scope.ddlDepartmentIsVisible = true;
                                }
                                else {
                                    $scope.ddlDepartmentIsVisible = false;
                                }
                            });
                        },
                        dataSource: {
                        },
                        change: function (e) {
                            var ddlSection = $("#ddlSection").data("kendoDropDownList");
                            var ddlPosition = $("#ddlPosition").data("kendoDropDownList");

                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);

                                if (dataItem.UID === null) {

                                    $scope.divUid = $scope.dataItem.Division.UID;
                                    $scope.deptUid = ($scope.dataItem.Department === null || $scope.dataItem.Department.UID === null) ? Guid.Empty() : $scope.dataItem.Department.UID;
                                    $scope.secUid = ($scope.dataItem.Section === null || $scope.dataItem.Section.UID === null) ? Guid.Empty() : $scope.dataItem.Section.UID;

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, null);

                                    ddlSection.dataSource.data([]);
                                    ddlSection.value(null);

                                    if ($scope.dataItem.Department !== null) {
                                        $scope.dataItem.Department.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Department = null
                                    }
                                    if ($scope.dataItem.Section !== null) {
                                        $scope.dataItem.Section.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Section = null;
                                    }
                                }
                                else {
                                    $scope.ddlSectionDataSourceRead(dataItem.UID, null);

                                    $scope.divUid = $scope.dataItem.Division.UID;
                                    $scope.deptUid = dataItem.UID;
                                    $scope.secUid = Guid.Empty();

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, null);

                                    if ($scope.dataItem.Section !== null) {
                                        $scope.dataItem.Section.UID = null;
                                    }
                                    else {
                                        $scope.dataItem.Section = null;
                                    }
                                }
                            }
                            else {
                                ddlSection.dataSource.data([]);
                                ddlSection.value(null);

                                if ($scope.dataItem.Section !== null) {
                                    $scope.dataItem.Section.UID = null;
                                }
                                else {
                                    $scope.dataItem.Section = null;
                                }
                            }
                        }
                        //dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //    //sort: [{ field: "CreatedDate", dir: "desc" }],
                        //    transport: {
                        //        read: $repository
                        //            .controller('Department')
                        //            .action('Retrieve')
                        //            .url
                        //    },
                        //})
                    };

                    $scope.optSection = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        cascadeFrom: 'optDepartment',
                        cascadeFromField: 'Department.UID',

                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        //dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //    //sort: [{ field: "CreatedDate", dir: "desc" }],
                        //    transport: {
                        //        read: $repository
                        //            .controller('Section')
                        //            .action('Retrieve')
                        //            .url
                        //    },
                        //}),
                        dataSource: {
                        },
                        dataBound: function (e) {
                            $scope.$apply(function () {
                            if($("#ddlSection").data("kendoDropDownList").dataSource._data.length > 0) {
                                $scope.ddlSectionIsVisible = true;
                                }
                            else {
                                $scope.ddlSectionIsVisible = false;
                                }
                            });
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                var ddlPosition = $("#ddlPosition").data("kendoDropDownList");

                                if (dataItem.UID === null) {
                                    $scope.divUid = $scope.dataItem.Division.UID;
                                    $scope.deptUid = ($scope.dataItem.Department === null || $scope.dataItem.Department.UID === null) ? Guid.Empty() : $scope.dataItem.Department.UID;
                                    $scope.secUid = Guid.Empty();

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, null);
                                }
                                else {
                                    $scope.divUid = $scope.dataItem.Division.UID;
                                    $scope.deptUid = ($scope.dataItem.Department === null || $scope.dataItem.Department.UID === null) ? Guid.Empty() : $scope.dataItem.Department.UID;
                                    $scope.secUid = dataItem.UID;

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, null);
                                }
                            }                          
                        }                     
                    };

                    $scope.optPosition = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        //dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //    //sort: [{ field: "CreatedDate", dir: "desc" }],
                        //    transport: {
                        //        read: $repository
                        //            .controller('Position')
                        //            .action('Retrieve')
                        //            .url
                        //    },
                        //})
                        dataBound: function (e) {                           
                            $scope.$apply(function () {
                                if ($("#ddlPosition").data("kendoDropDownList").dataSource._data.length > 0) {
                                    $scope.ddlPositionIsVisible = true;
                                }
                                else {
                                    $scope.ddlPositionIsVisible = false;
                                }
                            });
                        },
                        dataSource: {
                        },
                    };
                    
                    //$scope.optKendoEditor = {
                    //    content: true,
                    //    tools: [
                    //        "bold",
                    //        "italic",
                    //        "underline",
                    //        "insertUnorderedList",
                    //        //{
                    //        //    name: "custom",
                    //        //    tooltip: "Insert bullet list",
                    //        //    exec: function (e) {
                    //        //        var editor = $(this).data("kendoEditor");
                    //        //        editor.exec("inserthtml", { value: "<li>Item 1</li>" });
                    //        //    }
                    //        //}
                    //    ],
                    //    change: function (e) {
                    //        $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //    }
                    //};

                }]
            };
        }
    ]);