app.directive('advSearchManpowerRequest',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                template: kendo.template($("#advSearchManpowerRequest").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $scope.active = true;

                    $scope.subClientUid = Guid.Empty();
                    $scope.divUid = Guid.Empty();
                    $scope.deptUid = Guid.Empty();
                    $scope.secUid = Guid.Empty();

                    $scope.optDatePicker = {
                        format: 'MMM dd, yyyy'
                    }

                    $scope.refreshDataSourcePosition = function (divUid, deptUid, secUid) {
                        var ddlPositionDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Position')
                                    .action('GetPositionByDesignation')
                                    .queryString({
                                        divUid: divUid,
                                        deptUid: deptUid,
                                        secUid: secUid
                                    })
                                    .url
                            }
                        });
                        var ddlPosition = $("#ddlPositionFilter").data("kendoDropDownList");
                        ddlPosition.setDataSource(ddlPositionDS);
                        ddlPosition.dataSource.read();
                    }

                    $scope.optSubClient = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Entity",
                            UID: null
                        },
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('SubClient')
                                    .action('Retrieve')
                                    .url
                            },
                            requestEnd: function (e) {
                            }
                        }),
                        change: function (e) {

                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);

                                $scope.subClientUid = dataItem.UID;
                                $scope.divUid = Guid.Empty();
                                $scope.deptUid = Guid.Empty();
                                $scope.secUid = Guid.Empty();

                                $scope.FilterBy.Division = null;
                                $scope.FilterBy.Department = null;
                                $scope.FilterBy.Section = null;

                            }
                        }
                    };

                    $scope.optDivision = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Division",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",

                        cascadeFrom: 'ddlSubClientFilter',
                        cascadeFromField: 'SubClient.UID',

                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Division')
                                    .action('Retrieve')
                                    .url
                            },
                            requestEnd: function (e) {
                            }
                        }),
                        change: function (e) {

                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);

                                $scope.subClientUid = Guid.Empty();
                                $scope.divUid = dataItem.UID === null ? Guid.Empty() : dataItem.UID;
                                $scope.deptUid = Guid.Empty();
                                $scope.secUid = Guid.Empty();

                                $scope.FilterBy.Department = null;
                                $scope.FilterBy.Section = null;
                                $scope.FilterBy.Position = null;

                                $scope.refreshDataSourcePosition($scope.divUid, $scope.deptUid, $scope.secUid);

                            }
                        }
                    };

                    $scope.optDepartment = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Department",
                            UID: null
                        },
                        //index: 0,
                        //value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",

                        cascadeFrom: 'ddlDivisionFilter',
                        cascadeFromField: 'Division.UID',
                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Department')
                                    .action('Retrieve')
                                    .url
                            },
                            requestEnd: function (e) {
                            }
                        }),
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);

                                $scope.subClientUid = Guid.Empty();
                                //$scope.divUid = Guid.Empty();
                                $scope.deptUid = dataItem.UID === null ? Guid.Empty() : dataItem.UID;
                                $scope.secUid = Guid.Empty();

                                $scope.FilterBy.Section = null;
                                $scope.FilterBy.Position = null;

                                $scope.refreshDataSourcePosition($scope.divUid, $scope.deptUid, $scope.secUid);

                            }
                        }
                    };

                    $scope.optSection = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Section",
                            UID: null
                        },
                        cascadeFrom: 'ddlDepartmentFilter',
                        cascadeFromField: 'Department.UID',

                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Section')
                                    .action('Retrieve')
                                    .url
                            },
                            requestEnd: function (e) {
                            }
                        }),
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);

                                $scope.subClientUid = Guid.Empty();
                                //$scope.divUid = Guid.Empty();
                                //$scope.deptUid = Guid.Empty();
                                $scope.secUid = dataItem.UID === null ? Guid.Empty() : dataItem.UID;

                                $scope.FilterBy.Position = null;

                                $scope.refreshDataSourcePosition($scope.divUid, $scope.deptUid, $scope.secUid);

                            }
                        }
                    };

                    $scope.optPosition = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Position",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID"
                        //dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                        //    //sort: [{ field: "CreatedDate", dir: "desc" }],
                        //    transport: {
                        //        read: $repository
                        //            .controller('Position')
                        //            .action('Retrieve')
                        //            .url
                        //    },
                        //})
                    };

                    $scope.optJobLevel = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Job Level",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('JobLevel')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.optEmp = {
                        autoBind: false,
                        optionLabel: {
                            FullName: "Select Employee",
                            UID: null
                        },
                        //template: function (e) {
                        //    var base64UrlPath = "data:image/png;base64," + e.Image;
                        //    var temp =
                        //        '<img class="dropdown-photo" src="data:image/png;base64, ' + e.Image + '"></img>' +
                        //        '<span class="dropdown-name"><h3>' + e.FullName + '</h3><p>' + e.Position.Name + '</p></span>'
                        //    return temp;
                        //},
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

                    $scope.optClassification = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Classification",
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

                    $scope.optRequestStatus = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Request Status",
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
                    }

                    $scope.optLocation = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Location",
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

                    $scope.FilterBy = {
                        SubClient: null,
                        Division: null,
                        Department: null,
                        Section: null,
                        Position: null,
                        JobLevel: null,
                        RequestedBy: null,
                        Classification: null,
                        RequestStatus: null,
                        Location: null,
                        ExpectedStartDateFrom: null,
                        ExpectedStartDateTo: null
                    }

                    $scope.filterApp = function () {

                        $log.log($scope.FilterBy.SubClient);
                        $log.log($scope.FilterBy.Division);
                        $log.log($scope.FilterBy.Department);
                        $log.log($scope.FilterBy.Section);
                        $log.log($scope.FilterBy.Position);
                        $log.log($scope.FilterBy.JobLevel);
                        $log.log($scope.FilterBy.RequestedBy);
                        $log.log($scope.FilterBy.Classification);
                        $log.log($scope.FilterBy.RequestStatus);
                        $log.log($scope.FilterBy.Location);

                        var filter = { logic: 'and', filters: [] };

                        if ($scope.FilterBy.SubClient !== null) {
                            if ($scope.FilterBy.SubClient !== undefined) {
                                if ($scope.FilterBy.SubClient !== "") {
                                    filter.filters.push({
                                        field: 'subclient',
                                        operator: 'eq',
                                        value: $scope.FilterBy.SubClient
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Division !== null) {
                            if ($scope.FilterBy.Division !== undefined) {
                                if ($scope.FilterBy.Division !== "") {
                                    filter.filters.push({
                                        field: 'division',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Division
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Department !== null) {
                            if ($scope.FilterBy.Department !== undefined) {
                                if ($scope.FilterBy.Department !== "") {
                                    filter.filters.push({
                                        field: 'department',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Department
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Section !== null) {
                            if ($scope.FilterBy.Section !== undefined) {
                                if ($scope.FilterBy.Section !== "") {
                                    filter.filters.push({
                                        field: 'section',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Section
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Position !== null) {
                            if ($scope.FilterBy.Position !== undefined) {
                                if ($scope.FilterBy.Position !== "") {
                                    filter.filters.push({
                                        field: 'position',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Position
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.JobLevel !== null) {
                            if ($scope.FilterBy.JobLevel !== undefined) {
                                if ($scope.FilterBy.JobLevel !== "") {
                                    filter.filters.push({
                                        field: 'joblevel',
                                        operator: 'eq',
                                        value: $scope.FilterBy.JobLevel
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.RequestedBy !== null) {
                            if ($scope.FilterBy.RequestedBy !== undefined) {
                                if ($scope.FilterBy.RequestedBy !== "") {
                                    filter.filters.push({
                                        field: 'requestedby',
                                        operator: 'eq',
                                        value: $scope.FilterBy.RequestedBy
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Classification !== null) {
                            if ($scope.FilterBy.Classification !== undefined) {
                                if ($scope.FilterBy.Classification !== "") {
                                    filter.filters.push({
                                        field: 'classification',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Classification
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.RequestStatus !== null) {
                            if ($scope.FilterBy.RequestStatus !== undefined) {
                                if ($scope.FilterBy.RequestStatus !== "") {
                                    filter.filters.push({
                                        field: 'requeststatus',
                                        operator: 'eq',
                                        value: $scope.FilterBy.RequestStatus
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Location !== null) {
                            if ($scope.FilterBy.Location !== undefined) {
                                if ($scope.FilterBy.Location !== "") {
                                    filter.filters.push({
                                        field: 'location',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Location
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.ExpectedStartDateFrom !== null) { //|| $scope.FilterBy.HiredDateFrom !== undefined
                            filter.filters.push({
                                field: 'expectedstartdatefrom',
                                operator: 'startswith',
                                value: kendo.toString($scope.FilterBy.ExpectedStartDateFrom, "yyyy-MM-dd")
                            });
                        }
                        if ($scope.FilterBy.ExpectedStartDateTo !== null) { //|| $scope.FilterBy.HiredDateTo !== undefined
                            filter.filters.push({
                                field: 'expectedstartdateto',
                                operator: 'endswith',
                                value: kendo.toString($scope.FilterBy.ExpectedStartDateTo, "yyyy-MM-dd")
                            });
                        }

                        $('#grdManpowerRequest').data('kendoGrid').dataSource.filter(filter);
                    };
                }]
            }
        }
    ]);