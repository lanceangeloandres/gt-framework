app.directive('grdSchoolEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel',
                    //alertDialog: '&'
                },
                replace: true,
                //templateUrl: recruitmentConfig.VirtualPath + '/Scripts/recruitment/directives/grd-school-editor.html?v=' + templateVersion,
                template: kendo.template($("#grdSchoolEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $log.log("dataitem editor", $scope.dataItem);
                    $log.log("recruitment.model.SchoolCourse", recruitment.model.SchoolCourse);

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

                    var preventAction = false;
                    $("#grdCourses").kendoGrid({ 
                        toolbar: [
                            {
                                name: "create",
                                text: "Add School Course"
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
                                        $log.log('create schoolcourse', $scope.dataItem.SchoolCourse);
                                        //$scope.dataItem.SchoolCourse.push(e.data);
                                        $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                        e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.SchoolCourse.length <= 0) {
                                        e.success($scope.dataItem.SchoolCourse);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.SchoolCourse.length,
                                            data: $scope.dataItem.SchoolCourse
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read schoolcourse', $scope.dataItem.SchoolCourse);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update schoolcourse", $scope.dataItem.SchoolCourse);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory schoolcourse", $scope.dataItem.SchoolCourse);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.SchoolCourse.kendoModel,
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
                                if (preventAction) {
                                    e.preventDefault();
                                    warningNotification("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                    // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                }
                            }
                            //schema: {
                            //    model: {
                            //        id: 'UID',
                            //        fields: {
                            //            UID: { type: 'string', editable: false, nullable: true },
                            //            CourseCode: {
                            //                type: 'string',
                            //                name: 'CourseCode',
                            //                validation: {
                            //                    required: true
                            //                }
                            //            },
                            //            CourseName: {
                            //                type: 'string',
                            //                name: 'CourseName',
                            //                validation: {
                            //                    required: true
                            //                }
                            //            },
                            //            Description: {
                            //                type: 'string',
                            //                name: 'Description',
                            //                validation: {
                            //                    required: true
                            //                }
                            //            },
                            //        }
                            //    }
                            //}
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
                            //if (preventAction) {
                            //    e.preventDefault();
                            //    e.row.show();
                            //}
                        },
                        cancel: function (e){
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
                        },
                        columns: [
                            {
                                field: "CourseCode",
                                title: "Course Code",
                                width: 150
                            },
                            {
                                field: "CourseName",
                                title: "Course Name",
                                width: 200
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
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdSchoolCourse-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdSchoolCourse-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }
                            //gridUtil.columns.editCommand(),
                            //gridUtil.columns.deleteCommand(),
                        ],
                    }).data("kendoGrid");

                    $('#filter').on('keydown', function (e) {
                        var grid = $('#grdCourses').data('kendoGrid');
                        var columns = grid.columns;

                        var filter = { logic: 'or', filters: [] };
                        console.log("e.target.value", e.target.value);

                        if (e.keyCode === 13) {
                            console.log("clicked");
                            if (e.target.value !== "") {
                                columns.forEach(function (x) {
                                    if (x.field) {

                                        if (x.field.includes(".")) {
                                            filter.filters.push({
                                                field: x.field,
                                                operator: 'contains',
                                                value: e.target.value
                                            })
                                        }
                                        else {
                                            var type = grid.dataSource.options.schema.model.fields[x.field].type;

                                            if (type === 'string') {
                                                filter.filters.push({
                                                    field: x.field,
                                                    operator: 'contains',
                                                    value: e.target.value
                                                })
                                            }
                                            else if (type === 'number') {
                                                if (isNumeric(e.target.value)) {
                                                    filter.filters.push({
                                                        field: x.field,
                                                        operator: 'eq',
                                                        value: e.target.value
                                                    });
                                                }

                                            } else if (type === 'date') {
                                                var data = grid.dataSource.data();
                                                for (var i = 0; i < data.length; i++) {
                                                    var dateStr = kendo.format(x.format, data[i][x.field]);
                                                    // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                                                    if (dateStr.startsWith(e.target.value)) {
                                                        filter.filters.push({
                                                            field: x.field,
                                                            operator: 'eq',
                                                            value: data[i][x.field]
                                                        })
                                                    }
                                                }
                                            } else if (type === 'boolean' && getBoolean(e.target.value) !== null) {
                                                var bool = getBoolean(e.target.value);
                                                filter.filters.push({
                                                    field: x.field,
                                                    operator: 'eq',
                                                    value: bool
                                                });
                                            }
                                        }
                                    }
                                });
                                grid.dataSource.filter(filter);

                            }
                            else {
                                console.log("filter([])");
                                grid.dataSource.filter([]);
                            }
                        }
                    });

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

                    //    var filter = { logic: 'or', filters: [] };
                    //    columns.forEach(function (x) {
                    //        if (x.field) {
                    //            var type = grid.dataSource.options.schema.model.fields[x.field].type;
                    //            if (type === 'string') {
                    //                filter.filters.push({
                    //                    field: x.field,
                    //                    operator: 'contains',
                    //                    value: e.target.value
                    //                })
                    //            }
                    //            else if (type === 'number') {
                    //                if (isNumeric(e.target.value)) {
                    //                    filter.filters.push({
                    //                        field: x.field,
                    //                        operator: 'eq',
                    //                        value: e.target.value
                    //                    });
                    //                }

                    //            } else if (type === 'date') {
                    //                var data = grid.dataSource.data();
                    //                for (var i = 0; i < data.length; i++) {
                    //                    var dateStr = kendo.format(x.format, data[i][x.field]);
                    //                    // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                    //                    if (dateStr.startsWith(e.target.value)) {
                    //                        filter.filters.push({
                    //                            field: x.field,
                    //                            operator: 'eq',
                    //                            value: data[i][x.field]
                    //                        })
                    //                    }
                    //                }
                    //            } else if (type === 'boolean' && getBoolean(e.target.value) !== null) {
                    //                var bool = getBoolean(e.target.value);
                    //                filter.filters.push({
                    //                    field: x.field,
                    //                    operator: 'eq',
                    //                    value: bool
                    //                });
                    //            }
                    //        }
                    //    });
                    //    grid.dataSource.filter(filter);
                    //});

                    //$(".k-grid").on("mousedown", ".k-grid-header th", function (e) {
                    //    // prevent sorting/filtering for the current Grid only
                    //    var grid = $(this).closest(".k-grid");
                    //    var editRow = grid.find(".k-grid-edit-row");

                    //    // prevent sorting/filtering while any Grid is being edited
                    //    //var editRow = $(".k-grid-edit-row");

                    //    if (editRow.length > 0) {
                    //        //alert("Please complete the editing operation before sorting or filtering");
                    //        //$.extend({
                    //        //    alert: function (message, title) {
                    //        //                $("<div></div>").kendoWindow({
                    //        //                    title: "My Title",
                    //        //                    modal: true,
                    //        //                    content: ""
                    //        //                }).data("kendoWindow").open();
                    //        //    }
                    //        //});

                    //        //$.alert("SD", "SD")
                    //        //$.extend({
                    //        //    alert: function (message, title) {
                    //        //        $("<div></div>").kendoAlert({
                    //        //            title: "My Title",
                    //        //            content: content
                    //        //        }).data("kendoAlert").open();
                    //        //    }
                    //        //});
                    //        //$scope.alertDialog();
                    //        errorNotification.show("Please complete the editing operation before sorting or filtering.", "");
                    //        $log.log("grid", grid);
                    //        $("#grdCourses").data('kendoGrid').dataSource.read();
                    //        //$scope.invoke
                    //        e.preventDefault();
                    //    }
                    //});


                    //$scope.optGrdCourses = new recruitment.CGrid({
                    //    toolbar: [
                    //        {
                    //            name: "create",
                    //            text: "Add School Course"
                    //        },
                    //        'excel'
                    //    ],
                    //    //filterable: true,
                    //    //scrollable: false,
                    //    editable: "inline",
                    //    dataSource: {
                    //        transport: {
                    //            create: function (e) {
                    //                console.log('create data', e.data);
                    //                console.log('create', e.data.model);
                    //                if (e.data.models) {
                    //                    //batch editing
                    //                    for (var i = 0; i < e.data.models.length; i++) {
                    //                        e.data.models[i].UID = Guid.NewGuid();
                    //                        $scope.dataItem.SchoolCourse.push(e.data.models[i]);
                    //                    }
                    //                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //                    e.success(e.data.models);
                    //                } else {
                    //                    e.data.UID = Guid.NewGuid();
                    //                    console.log('e.data', e.data);
                    //                    $scope.dataItem.SchoolCourse.push(e.data);
                    //                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //                    e.success(e.data);
                    //                }
                    //            },
                    //            read: function (e) {
                    //                //console.log('read', e.data);
                    //                if ($scope.dataItem.SchoolCourse.length <= 0) {
                    //                    e.success($scope.dataItem.SchoolCourse);
                    //                }
                    //                else {
                    //                    var t = {
                    //                        Total: $scope.dataItem.SchoolCourse.length,
                    //                        Data: $scope.dataItem.SchoolCourse
                    //                            .slice(e.data.skip,
                    //                            (e.data.skip + e.data.take))
                    //                    };
                    //                    $log.log('read');
                    //                    e.success(t);
                    //                }
                    //            },
                    //            update: function (e) {
                    //                if (e.data.models) {
                    //                    //batch editing
                    //                    for (var i = 0; i < e.data.models.length; i++) {
                    //                        for (var r = 0;
                    //                            r < $scope.dataItem.SchoolCourse.length;
                    //                            r++) {
                    //                            if ($scope.dataItem.SchoolCourse[r].UID ===
                    //                                e.data.models[i].UID) {
                    //                                $scope.dataItem.SchoolCourse[r] =
                    //                                    e.data.models[i];
                    //                            }
                    //                        }
                    //                    }
                    //                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //                    e.success(e.data.models);
                    //                } else {
                    //                    for (var r = 0;
                    //                        r < $scope.dataItem.SchoolCourse.length;
                    //                        r++) {
                    //                        if ($scope.dataItem.SchoolCourse[r].UID ===
                    //                            e.data.UID) {
                    //                            $scope.dataItem.SchoolCourse[r] = e.data;
                    //                        }
                    //                    }
                    //                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //                    e.success(e.data);
                    //                }
                    //            },
                    //            destroy: function (e) {
                    //                console.log('destroy', e.data.models);
                    //                if (e.data.models) {
                    //                    //batch editing
                    //                    for (var i = 0; i < e.data.models.length; i++) {
                    //                        $scope.dataItem.SchoolCourse
                    //                            .splice($scope.dataItem.SchoolCourse
                    //                                .map(i => i.UID).indexOf(e.data.models[i].UID),
                    //                            1);
                    //                    }
                    //                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //                    e.success(e.data.models);
                    //                } else {
                    //                    $scope.dataItem.SchoolCourse
                    //                        .splice($scope.dataItem.SchoolCourse.map(i => i.UID)
                    //                            .indexOf(e.data.UID),
                    //                        1);
                    //                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    //                    e.success(e.data);
                    //                }
                    //            }
                    //        },
                    //        schema: {
                    //            model: recruitment.model.SchoolCourse
                    //        }
                    //    },
                    //    columns: [
                    //        {
                    //            field: "CourseCode",
                    //            title: "Course Code",
                    //            width: 150
                    //        },
                    //        {
                    //            field: "CourseName",
                    //            title: "Course Name",
                    //            width: 200
                    //        },
                    //        {
                    //            field: "Description",
                    //            title: "Description",
                    //            width: 200
                    //        },
                    //        //{ command: ["edit", "destroy"], title: "&nbsp;", width: "20%" },
                    //        gridUtil.columns.editCommand(),
                    //        gridUtil.columns.deleteCommand(),
                    //    ],
                    //});
                }]
            }
        }
    ]);