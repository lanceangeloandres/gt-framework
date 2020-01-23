﻿app.directive('advSearchTeamMembers',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                template: kendo.template($("#advSearchTeamMembers").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $scope.active = true;

                    $scope.subClientUid = Guid.Empty();
                    $scope.divUid = Guid.Empty();
                    $scope.deptUid = Guid.Empty();
                    $scope.secUid = Guid.Empty();

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

                    $scope.optJobLevelGroup = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Job Level Group",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('JobLevelGroup')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.FilterBy = {
                        SubClient: null,
                        Division: null,
                        Department: null,
                        Section: null,
                        Position: null,
                        JobLevel: null,
                        FullName: null,
                        JobLevelGroup: null,
                        Code: null
                    }

                    $scope.filterApp = function () {

                        $log.log($scope.FilterBy.SubClient);
                        $log.log($scope.FilterBy.Division);
                        $log.log($scope.FilterBy.Department);
                        $log.log($scope.FilterBy.Section);
                        $log.log($scope.FilterBy.Position);
                        $log.log($scope.FilterBy.JobLevel);
                        $log.log($scope.FilterBy.FullName);
                        $log.log($scope.FilterBy.JobLevelGroup);
                        $log.log($scope.FilterBy.Code);

                        var filter = { logic: 'and', filters: [] };

                        if ($scope.FilterBy.FullName !== null) { //|| $scope.FilterBy.AppliedDateFrom !== undefined
                            if ($scope.FilterBy.FullName !== '') {
                                filter.filters.push({
                                    field: 'FullName',
                                    operator: 'contains',
                                    value: $scope.FilterBy.FullName
                                });
                            }
                        }

                        if ($scope.FilterBy.Code !== null) { //|| $scope.FilterBy.AppliedDateFrom !== undefined
                            if ($scope.FilterBy.Code !== '') {
                                filter.filters.push({
                                    field: 'Code',
                                    operator: 'contains',
                                    value: $scope.FilterBy.Code
                                });
                            }
                        }

                        if ($scope.FilterBy.SubClient !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.SubClient !== undefined) {
                                if ($scope.FilterBy.SubClient !== "") {
                                    filter.filters.push({
                                        field: 'SubClient.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.SubClient
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Division !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.Division !== undefined) {
                                if ($scope.FilterBy.Division !== "") {
                                    filter.filters.push({
                                        field: 'Division.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Division
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Department !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.Department !== undefined) {
                                if ($scope.FilterBy.Department !== "") {
                                    filter.filters.push({
                                        field: 'Department.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Department
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Section !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.Section !== undefined) {
                                if ($scope.FilterBy.Section !== "") {
                                    filter.filters.push({
                                        field: 'Section.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Section
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Position !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.Position !== undefined) {
                                if ($scope.FilterBy.Position !== "") {
                                    filter.filters.push({
                                        field: 'Position.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Position
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.JobLevel !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.JobLevel !== undefined) {
                                if ($scope.FilterBy.JobLevel !== "") {
                                    filter.filters.push({
                                        field: 'Position.JobLevel.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.JobLevel
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.JobLevelGroup !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.JobLevelGroup !== undefined) {
                                if ($scope.FilterBy.JobLevelGroup !== "") {
                                    filter.filters.push({
                                        field: 'Position.JobLevel.JobLevelGroup.UID',
                                        operator: 'eq',
                                        value: $scope.FilterBy.JobLevelGroup
                                    });
                                }
                            }
                        }

                        $('#optional').data('kendoListBox').dataSource.filter(filter);
                    };
                }]
            }
        }
    ]);