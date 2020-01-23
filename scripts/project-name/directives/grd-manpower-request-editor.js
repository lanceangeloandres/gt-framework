app.directive('grdManpowerRequestEditor', [
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            scope: {
                dataItem: '=ngModel'
            },
            replace: true,
            //templateUrl: recruitmentConfig.VirtualPath + '/Scripts/recruitment/directives/grd-school-editor.html?v=' + templateVersion,
            template: kendo.template($("#grdManpowerRequestEditor").html(), { useWithBlock: false }),
            controller: ['$scope', '$attrs', function ($scope, $attrs) {
                $log.log("dataitem editorrr", $scope.dataItem);


                if ($scope.dataItem.UID == null) {
                    $log.log("add");
                    $scope.$apply(function () {
                        $scope.isHideRequestStatusField = false;
                    });                    
                }
                else {
                    $log.log("update");
                    $scope.$apply(function () {
                        $scope.isHideRequestStatusField = true;
                    });          
                }

                $scope.$apply(function () {
                    $scope.dataItem.ReplacedStaff = JSON.parse(JSON.stringify($scope.dataItem.ReplacedStaff));
                    $log.log('$scope.dataItem.ReplacedStaff before', $scope.dataItem.ReplacedStaff);
                });
                //$scope.$apply(function () {
                //    $log.log('$scope.dataItem.ReplacedStaff before', $scope.dataItem.ReplacedStaff);
                //    if ($scope.dataItem.ReplacedStaff !== null) {
                //        if ($scope.dataItem.ReplacedStaff.length > 0) {
                //            $scope.dataItem.ReplacedStaff = [
                //                {
                //                    FullName: 'ABACO, DEXTER CARL V',
                //                    UID: 'aa306863-3fa4-44d9-b8ce-ab17841d4f8f'
                //                },
                //                {
                //                    FullName: 'ABAN, FERRIZA BIANCA SALINAS',
                //                    UID: 'c2428c01-ec3d-404a-b103-b9993d29998f'
                //                },
                //            ];
                //        }
                //    }
                //    $log.log('$scope.dataItem.ReplacedStaff after', $scope.dataItem.ReplacedStaff);
                //});

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
                            $log.log('requestEnd', e);
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

                $scope.optNumericTextbox = {
                    min: 0,
                    decimals: 0,
                    format: "0",
                };

                $scope.optClassification = {
                    autoBind: false,
                    optionLabel: {
                        Name: "Select Type",
                        UID: null
                    },
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "UID",
                    dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //sort: [{ field: "CreatedDate", dir: "desc" }],
                        transport: {
                            read: $repository
                                .controller('EmpClassification')
                                .action('Retrieve')
                                .url
                        },
                    }),
                    change: function (e) {
                        if (e.sender.selectedIndex > -1) {
                            var dataItem = this.dataItem(e.selectedIndex);
                            $log.log("dataItem", dataItem);
                        }

                    }


                };

                $scope.optStatus = {
                    autoBind: false,
                    optionLabel: {
                        Name: "Select Type",
                        UID: null
                    },
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "UID",
                    dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //sort: [{ field: "CreatedDate", dir: "desc" }],
                        transport: {
                            read: $repository
                                .controller('EmpStatus')
                                .action('Retrieve')
                                .url
                        },
                    }),
                    change: function (e) {
                        if (e.sender.selectedIndex > -1) {
                            var dataItem = this.dataItem(e.selectedIndex);
                            $log.log("dataItem", dataItem);
                        }
                    }
                };

                $scope.optLocation = {
                    autoBind: false,
                    optionLabel: {
                        Name: "Select Type",
                        UID: null
                    },
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "UID",
                    dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //sort: [{ field: "CreatedDate", dir: "desc" }],
                        transport: {
                            read: $repository
                                .controller('Location')
                                .action('Retrieve')
                                .url
                        },
                    }),
                    change: function (e) {
                        if (e.sender.selectedIndex > -1) {
                            var dataItem = this.dataItem(e.selectedIndex);
                            $log.log("dataItem", dataItem);
                        }
                    }
                };

                $scope.employeeOptions = {
                    autoBind: false,
                    placeholder: 'Select Employee',
                    dataTextField: "FullName",
                    dataValueField: "UID",
                    dataSource: new recruitment.CDataSource({
                        requestEnd: function () {
                        },
                        transport: {
                            read: $repository
                                .controller('Emp')
                                .action('Retrieve')
                                .url
                        }
                    }),
                    change: function (e) {
                        $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                    }
                };

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
                                $scope.secUid = ($scope.dataItem.Section === null || $scope.dataItem.Section.UID === null) ? Guid.Empty() : $scope.dataItem.Section.UID;

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
                            if ($("#ddlSection").data("kendoDropDownList").dataSource._data.length > 0) {
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

                $scope.optRequestReason = {
                    autoBind: false,
                    optionLabel: {
                        Name: "Select Type",
                        UID: null
                    },
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "UID",
                    dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //sort: [{ field: "CreatedDate", dir: "desc" }],
                        transport: {
                            read: $repository
                                .controller('RequestReason')
                                .action('IRetrieve')
                                .url
                        },
                    }),
                    change: function (e) {
                        if (e.sender.selectedIndex > -1) {
                            var dataItem = this.dataItem(e.selectedIndex);
                            $log.log("dataItem", dataItem);
                        }
                    }
                }

                $scope.optRequestStatus = {
                    autoBind: false,
                    optionLabel: {
                        Name: "Select Type",
                        UID: null
                    },
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "UID",
                    dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //sort: [{ field: "CreatedDate", dir: "desc" }],
                        transport: {
                            read: $repository
                                .controller('RequestStatus')
                                .action('IRetrieve')
                                .url
                        },
                    }),
                    change: function (e) {
                        if (e.sender.selectedIndex > -1) {
                            var dataItem = this.dataItem(e.selectedIndex);
                            $log.log("dataItem", dataItem);
                        }
                    }
                }

                var preventAction = false;
                $("#grdManpowerEmpStatus").kendoGrid({
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
                                $log.log('create ManpowerRequestEmpStatScope', $scope.dataItem.ManpowerRequestEmpStatScope);
                                $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                e.success(e.data);
                            },
                            read: function (e) {
                                if ($scope.dataItem.ManpowerRequestEmpStatScope.length <= 0) {
                                    e.success($scope.dataItem.ManpowerRequestEmpStatScope);
                                }
                                else {
                                    var opt = {
                                        total: $scope.dataItem.ManpowerRequestEmpStatScope.length,
                                        data: $scope.dataItem.ManpowerRequestEmpStatScope
                                    };
                                    e.success(opt.data);
                                }

                                console.log('read e.data', e.data);
                                console.log('read ManpowerRequestEmpStatScope', $scope.dataItem.ManpowerRequestEmpStatScope);
                            },
                            update: function (e) {
                                $log.log("update", e);
                                $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                $log.log("update e.data", e.data);
                                $log.log("update ManpowerRequestEmpStatScope", $scope.dataItem.ManpowerRequestEmpStatScope);
                                e.success(e.data);
                            },
                            destroy: function (e) {
                                $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                $log.log("destroy e.data", e.data);
                                $log.log("destory ManpowerRequestEmpStatScope", $scope.dataItem.ManpowerRequestEmpStatScope);
                                e.success(e.data);
                            }
                        },
                        schema: {
                            model: recruitment.model.ManpowerRequestEmpStatScope.kendoModel,
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
                        if (e.model.CurrentOccupiedNumOfSlots > e.model.ApprovedNumOfSlots) {
                            e.preventDefault();
                            warningNotification("Current balance is greater than the approved balance.", "");
                        }
                        else {
                            e.model.RemainingNumOfSlots = e.model.ApprovedNumOfSlots - e.model.CurrentOccupiedNumOfSlots;
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
                        $log.log("dataBound", $scope.dataItem.ManpowerRequestEmpStatScope);

                        //$scope.$apply(function () {
                        //    $scope.dataItem.ApprovedFTEBalance = 0;
                        //    $scope.dataItem.CurrentFTEBalance = 0;
                        //    $scope.dataItem.RemainingFTEBalance = 0;

                        //    for (var x = 0; x < $scope.dataItem.FTEEmpStatScope.length; x++) {

                        //        $scope.dataItem.ApprovedFTEBalance = $scope.dataItem.FTEEmpStatScope[x].ApprovedBalance + $scope.dataItem.ApprovedFTEBalance;
                        //        $scope.dataItem.CurrentFTEBalance = $scope.dataItem.FTEEmpStatScope[x].CurrentBalance + $scope.dataItem.CurrentFTEBalance;
                        //        $scope.dataItem.RemainingFTEBalance = $scope.dataItem.FTEEmpStatScope[x].RemainingBalance + $scope.dataItem.RemainingFTEBalance;

                        //        $log.log("$scope.dataItem.ApprovedFTEBalance", $scope.dataItem.ApprovedFTEBalance);
                        //        $log.log("$scope.dataItem.CurrentFTEBalance", $scope.dataItem.CurrentFTEBalance);
                        //        $log.log("$scope.dataItem.RemainingFTEBalance", $scope.dataItem.RemainingFTEBalance);
                        //    }
                        //});

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
                            field: "ApprovedNumOfSlots",
                            title: "Approved Num of Slots",
                            editor: amountEditor,
                            width: 100
                        },
                        {
                            field: "CurrentOccupiedNumOfSlots",
                            title: "Current Occupied Num of Slots",
                            template: "#if(CurrentOccupiedNumOfSlots == null) {##: '' ##} else { ##= CurrentOccupiedNumOfSlots ##} #",
                            editor: inputTxtEditorCurrentOccupiedNumOfSlots,
                            width: 100
                        },
                        {
                            field: "RemainingNumOfSlots",
                            title: "Remaining Num of Slots",
                            template: "#if(RemainingNumOfSlots == null) {##: '' ##} else { ##= RemainingNumOfSlots ##} #",                      
                            editor: inputTxtEditorRemainingNumOfSlots,
                            width: 100
                        },
                        {
                            command: [
                                {
                                    name: "edit",
                                    text: { edit: "", cancel: "", update: "" },
                                    template: "<a grdManpowerRequestEmpStatScope-update class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>",

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
                                    template: "<a grdManpowerRequestEmpStatScope-delete class='k-button k-grid-delete'><i class='material-icons md-18'>delete</i></a>",
                                },
                            ],
                            title: "",
                            width: 70
                        }
                    ],
                }).data("kendoGrid");

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

                function inputTxtEditorCurrentOccupiedNumOfSlots(container, options) {
                    $('<span style="width: 100%;" maxlength="">' + options.model.CurrentOccupiedNumOfSlots + '</span>').appendTo(container);
                }
                function inputTxtEditorRemainingNumOfSlots(container, options) {
                    $('<span style="width: 100%;" maxlength="">' + options.model.RemainingNumOfSlots + '</span>').appendTo(container);
                }
            }]
        }

    }
]);