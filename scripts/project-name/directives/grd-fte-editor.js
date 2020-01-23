app.directive('grdFteEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                //templateUrl: recruitmentConfig.VirtualPath + '/Scripts/recruitment/directives/grd-school-editor.html?v=' + templateVersion,
                template: kendo.template($("#grdFteEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $log.log("dataitem editor", $scope.dataItem);

                    $scope.divUid = Guid.Empty();
                    $scope.deptUid = Guid.Empty();
                    $scope.secUid = Guid.Empty();

                    $scope.dllPositionDataSourceRead = function (divUid, deptUid, secUid, value) {
                        $log.log('dllPositionDataSourceRead');

                        $log.log('mag bind ka divUid', divUid);
                        $log.log('mag bind ka deptUid', deptUid);
                        $log.log('mag bind ka secUid', secUid);
                        $log.log('mag bind ka posUid', value);

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

                        //var ddlPositionDS = new recruitment.CDataSource({
                        //    transport: {
                        //        read: $repository
                        //            .controller('Position')
                        //            .action('GetPositionByDesignation')
                        //            .queryString({
                        //                divUid: divUid,
                        //                deptUid: deptUid,
                        //                secUid: secUid
                        //            })
                        //            .url
                        //    },
                        //    requestEnd: function (e) {
                        //        $scope.$apply(function () {
                        //            if (e.response.Data.length > 0) {
                        //                $scope.ddlPositionIsVisible = true;
                        //            }
                        //            else {
                        //                $scope.ddlPositionIsVisible = false;
                        //            }
                        //        });
                        //    }
                        //});

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
                                $scope.$apply(function () {
                                    if (e.response.Data.length > 0) {
                                        $scope.ddlDivisionIsVisible = true;
                                    }
                                    else {
                                        $scope.ddlDivisionIsVisible = false;
                                    }
                                });
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
                                $scope.$apply(function () {
                                    if (e.response.Data.length > 0) {
                                        $scope.ddlDepartmentIsVisible = true;
                                    }
                                    else {
                                        $scope.ddlDepartmentIsVisible = false;
                                    }
                                });
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
                                $scope.$apply(function () {
                                    if (e.response.Data.length > 0) {
                                        $scope.ddlSectionIsVisible = true;
                                    }
                                    else {
                                        $scope.ddlSectionIsVisible = false;
                                    }
                                });
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

                                                $scope.$apply(function () {
                                                    if (e.response.Data.length > 0) {
                                                        $scope.ddlDivisionIsVisible = true;
                                                    }
                                                    else {
                                                        $scope.ddlDivisionIsVisible = false;
                                                    }
                                                });

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

                                                                $scope.$apply(function () {
                                                                    if (e.response.Data.length > 0) {
                                                                        $scope.ddlDepartmentIsVisible = true;
                                                                    }
                                                                    else {
                                                                        $scope.ddlDepartmentIsVisible = false;
                                                                    }
                                                                });

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
                                                                        $scope.$apply(function () {
                                                                            if (e.response.Data.length > 0) {
                                                                                $scope.ddlSectionIsVisible = true;
                                                                            }
                                                                            else {
                                                                                $scope.ddlSectionIsVisible = false;
                                                                            }
                                                                        });
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
                                    $scope.secUid = ($scope.dataItem.Section === null || $scope.dataItem.Section.UID === null) ? Guid.Empty() : $scope.dataItem.Section.UID;

                                    $scope.dllPositionDataSourceRead($scope.divUid, $scope.deptUid, $scope.secUid, $scope.dataItem.Position.UID);
                                }
                                else {
                                    if (e.response.Data.length > 0) {
                                        //do something
                                    }
                                    else {
                                        var ddlDivisionDS = new recruitment.CDataSource({
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
                                                if (e.response.Data.length > 0) {
                                                    $scope.ddlDivisionIsVisible = true;
                                                }
                                                else {
                                                    $scope.ddlDivisionIsVisible = false;
                                                }
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
                    };

                    $scope.optDepartment = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",

                        cascadeFrom: 'optDivision',
                        cascadeFromField: 'Division.UID',
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
                        dataSource: {
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
                        dataSource: {
                        },
                    };

                    var preventAction = false;
                    $("#grdFteEmpStatus").kendoGrid({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add"
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
                                    $log.log('create FTEEmpStatScope', $scope.dataItem.FTEEmpStatScope);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    e.success(e.data);
                                },
                                read: function (e) {
                                    if ($scope.dataItem.FTEEmpStatScope.length <= 0) {
                                        e.success($scope.dataItem.FTEEmpStatScope);
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.FTEEmpStatScope.length,
                                            data: $scope.dataItem.FTEEmpStatScope
                                        };
                                        e.success(opt.data);
                                    }

                                    console.log('read e.data', e.data);
                                    console.log('read FTEEmpStatScope', $scope.dataItem.FTEEmpStatScope);
                                },
                                update: function (e) {
                                    $log.log("update", e);
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("update e.data", e.data);
                                    $log.log("update FTEEmpStatScope", $scope.dataItem.FTEEmpStatScope);
                                    e.success(e.data);
                                },
                                destroy: function (e) {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                    $log.log("destroy e.data", e.data);
                                    $log.log("destory FTEEmpStatScope", $scope.dataItem.FTEEmpStatScope);
                                    e.success(e.data);
                                }
                            },
                            schema: {
                                model: recruitment.model.FTEEmpStatScope.kendoModel,
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
                            if (e.model.CurrentBalance > e.model.ApprovedBalance) {
                                e.preventDefault();
                                warningNotification("Current balance is greater than the approved balance.", "");
                            }
                            else {
                                e.model.RemainingBalance = e.model.ApprovedBalance - e.model.CurrentBalance;
                            }  
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
                            $log.log("dataBound", $scope.dataItem.FTEEmpStatScope);

                            $scope.$apply(function () {
                                $scope.dataItem.ApprovedFTEBalance = 0;
                                $scope.dataItem.CurrentFTEBalance = 0;
                                $scope.dataItem.RemainingFTEBalance = 0;

                                for (var x = 0; x < $scope.dataItem.FTEEmpStatScope.length; x++) {

                                    $scope.dataItem.ApprovedFTEBalance = $scope.dataItem.FTEEmpStatScope[x].ApprovedBalance + $scope.dataItem.ApprovedFTEBalance;
                                    $scope.dataItem.CurrentFTEBalance = $scope.dataItem.FTEEmpStatScope[x].CurrentBalance + $scope.dataItem.CurrentFTEBalance;
                                    $scope.dataItem.RemainingFTEBalance = $scope.dataItem.FTEEmpStatScope[x].RemainingBalance + $scope.dataItem.RemainingFTEBalance;

                                    $log.log("$scope.dataItem.ApprovedFTEBalance", $scope.dataItem.ApprovedFTEBalance);
                                    $log.log("$scope.dataItem.CurrentFTEBalance", $scope.dataItem.CurrentFTEBalance);
                                    $log.log("$scope.dataItem.RemainingFTEBalance", $scope.dataItem.RemainingFTEBalance);
                                }
                            });

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
                                field: "EmpStatus",
                                title: "Emp Status",
                                editor: dropdownEmpStatus,
                                template: function (dataItem) {
                                    return dataItem.EmpStatus.Name;
                                },
                                //editor: function (container, data) {
                                //    container.append('<input kendo-drop-down-list style="width: 100%;" k-ng-model="dataItem.EmpStatus" k-options="optCompDed" required />');
                                //},
                                width: 150
                            },
                            {
                                field: "ApprovedBalance",
                                title: "Approved Balance",
                                editor: amountEditor,
                                width: 100
                            },
                            {
                                field: "CurrentBalance",
                                title: "Current Balance",
                                editor: amountEditor,
                                width: 100
                            },
                            {
                                field: "RemainingBalance",
                                title: "Remaining Balance",
                                editor: inputTxtEditorRemainingBalance,
                                width: 100
                            },
                            {
                                command: [
                                    {
                                        name: "edit",
                                        text: { edit: "", cancel: "", update: "" },
                                        template: "<a grdFteEmpStatus-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                        template: "<a grdFteEmpStatus-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                    },
                                ],
                                title: "",
                                width: 70
                            }                        ],
                    }).data("kendoGrid");

                    $scope.optCompDed = {
                        optionLabel: 'Please Select',
                        autoBind: false,
                        filter: 'contains',
                        dataTextField: 'Name',
                        dataValueField: 'UID',
                        //template: '<div><b>#= Name #</b></div>',
                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('EmpStatus')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    }

                    function dropdownEmpStatus(container, options) {
                        $('<input required="required" data-bind="value: ' + options.field + '"/>') //data-bind="value: ' + options.field + '"
                            .appendTo(container)
                            .kendoDropDownList({
                                autoBind: false,
                                //valuePrimitive: true,
                                dataTextField: "Name",
                                dataValueField: "UID",
                                template: '<div><b>#= Name #</b></div>',
                                dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                                    //sort: [{ field: "CreatedDate", dir: "desc" }],
                                    transport: {
                                        read: $repository
                                            .controller('EmpStatus')
                                            .action('Retrieve')
                                            .url
                                    },
                                })
                            });
                        //$('<span style="width: 100%;" maxlength="">' + options.model.EmpStatus.Name + '</span>').appendTo(container);
                    }

                    function inputTxtEditorRemainingBalance(container, options) {
                        $('<span style="width: 100%;" maxlength="">' + options.model.RemainingBalance + '</span>').appendTo(container);
                    }

                    function amountEditor(container, options) {
                        //ng-hide= "!trigger" 
                        var guid = kendo.guid();
                        $('<input required ng-show="true" data-bind="value: ' + options.field + '" data-k-spinners="false" />')
                            .appendTo(container)
                            .kendoNumericTextBox({
                                //decimals: 7,
                                format: "0",
                                decimals: 0,
                                min: 0,
                                spinners: false,
                                change: function (e) {
                                    //$log.log("change amt editor", e);
                                    //if (isEdited == true) {
                                    //    $log.log("amount editor", e);
                                    //    $scope.total = currTotal; // - this.value();
                                    //    fte.log("on amount editor change total value", $scope.total);
                                    //}

                                },
                            });
                    }
                }]
            }
        }
    ]);