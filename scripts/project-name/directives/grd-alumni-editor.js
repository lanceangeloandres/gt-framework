app.directive('grdAlumniEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdAlumniEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);


                    $scope.optEmp = {
                        autoBind: false,
                        optionLabel: {
                            FullName: "Select Employee",
                            UID: null
                        },
                        //valueTemplate: '<span style="background-image: url("data:image/png;base64,  #: Image #")"></span><span>#:FullName#</span>',
                        //valueTemplate: function (e) {
                        //    $log.log("base64UrlPath valueTemplate", e);
                        //    var base64UrlPath = "data:image/png;base64," + e.Image;
                        //    var temp =
                        //        '<img class="selected-value" src="data:image/png;base64, ' + e.Image +'"></img><span>' + e.FullName + '</span>'
                        //    return temp;
                        //},
                        valueTemplate: function (e) {
                            var src = $('#src-' + e.UID + '').attr('src');
                            $log.log("src", src);
                            var temp =
                                '<span class="selected-value" id="bgImg-' + e.UID + '" uid=' + e.UID + ' is-loaded-' + e.UID + '="false" js-request-url="' + recruitmentConfig.VirtualPath + '/Member/PictureB64?uid=' + e.UID + '" style="background-image: url(\'' + src + '\')"></span><span>' + e.FullName + '</span>'
                            return temp;
                        },
                        template: function (e) {
                            //var base64UrlPath = "data:image/png;base64," + e.Image;
                            //var temp =
                            //    '<span class="k-state-default" style="background-image: url(\'data:image/png;base64, ' + e.Image + '\')"></span>' +
                            //    '<span class="k-state-default"><h3>' + e.FullName + '</h3><p>' + e.Position.Name + '</p></span>'
                            var temp =
                                '<img class="dropdown-photo" id="src-' + e.UID + '" uid=' + e.UID + ' is-loaded-' + e.UID + '="false" js-request-url="' + recruitmentConfig.VirtualPath + '/Member/PictureB64?uid=' + e.UID + '" src="' + recruitmentConfig.VirtualPath + '/Content/assets/images/photo-loader.svg" />' +
                                '<span class="dropdown-name"><h3>' + e.FullName + '</h3><p>' + e.Position.Name + '</p></span>'
                            return temp;
                        },
                        //template: '<span class="k-state-default" style="background-image: url(\'data:image/png;base64, #: Image #\')"></span>' +
                        //'<span class="k-state-default"><h3>#: FullName #</h3><p>#: FullName #</p></span>',
                        filter: "contains",
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            sort: [{ field: "FullName", dir: "asc" }],
                            transport: {
                                read: $repository
                                    .controller('Emp')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };

                    var preventAction = false;
                    $("#grdAlumniSocialMedia").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Social Media"
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
                                    $log.log('create AlumniSocialMedia', $scope.dataItem.AlumniSocialMedia);
                                    //$scope.dataItem.SchoolCourse.push(e.data);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.AlumniSocialMedia.length <= 0) {
                                        e.success($scope.dataItem.AlumniSocialMedia);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.AlumniSocialMedia.length,
                                            data: $scope.dataItem.AlumniSocialMedia
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read AlumniSocialMedia', $scope.dataItem.AlumniSocialMedia);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update AlumniSocialMedia", $scope.dataItem.AlumniSocialMedia);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory AlumniSocialMedia", $scope.dataItem.AlumniSocialMedia);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.AlumniSocialMedia.kendoModel,
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
                                    "Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", ""
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
                            //if (preventAction) {
                            //    e.preventDefault();
                            //    e.row.show();
                            //}
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
                        },
                        columns: [
                            {
                                field: "SocialMedia",
                                title: "Social Media",
                                editor: dropdownEmpStatus,
                                template: function (dataItem) {
                                    $log.log("dataItem", dataItem);
                                    return dataItem.SocialMedia.Name;
                                },
                                width: 150
                            },
                            {
                                field: "Value",
                                title: "Value",
                                width: 150
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 150
                            },
                            //{
                            //    field: "CourseName",
                            //    title: "Course Name",
                            //    width: 200
                            //},
                            //{
                            //    field: "Description",
                            //    title: "Description",
                            //    width: 200
                            //},
                            //{
                            //    field: "InActive",
                            //    title: "Inactive",
                            //    template: '<div class="custom-control fill-checkbox custom-control-grid">' +
                            //    '<label class="custom-control fill-checkbox custom-control-grid" for="InActive">' +
                            //    '<input type="checkbox" #= InActive ? \'checked="checked"\' : "" # class="fill-control-input" type="checkbox"/>' +
                            //    '<span class="fill-control-indicator fill-control-kendogrid">' +
                            //    '</span>' +
                            //    '</label>' +
                            //    '</div>',
                            //    width: 70,
                            //    editor: checkBox
                            //},
                            {
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdAlumniSocialMedia-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdAlumniSocialMedia-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
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
                        var grid = $('#grdAlumniSocialMedia').data('kendoGrid');
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

                    function dropdownEmpStatus(container, options) {
                        $('<input required="required" data-bind="value: ' + options.field + '"/>') //data-bind="value: ' + options.field + '"
                            .appendTo(container)
                            .kendoDropDownList({
                                autoBind: false,
                                //valuePrimitive: true,
                                filter: "contains",
                                dataTextField: "Name",
                                dataValueField: "UID",
                                template: '<div><b>#= Name #</b></div>',
                                dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                                    //sort: [{ field: "CreatedDate", dir: "desc" }],
                                    transport: {
                                        read: $repository
                                            .controller('SocialMedia')
                                            .action('IRetrieve')
                                            .url
                                    },
                                })
                            });
                        //$('<span style="width: 100%;" maxlength="">' + options.model.EmpStatus.Name + '</span>').appendTo(container);
                    }
                }]
            };
        }
    ]);