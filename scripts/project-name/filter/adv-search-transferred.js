app.directive('advSearchTransferred',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                template: kendo.template($("#advSearchTransferred").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $scope.activeTransferred = true;

                    //$scope.optApplicationStatus = {
                    //    autoBind: false,
                    //    optionLabel: {
                    //        Name: "Select Application Status",
                    //        UID: null
                    //    },
                    //    filter: "contains",
                    //    dataTextField: "Name",
                    //    dataValueField: "UID",
                    //    dataSource: new recruitment.CDataSource({
                    //        //sort: [{ field: "CreatedDate", dir: "desc" }],
                    //        transport: {
                    //            read: $repository
                    //                .controller('ApplicationStatus')
                    //                .action('Retrieve')
                    //                .url
                    //        }
                    //    })
                    //};

                    $scope.optEmpStatus = {
                        autoBind: false,
                        optionLabel: {
                            Name: "View All",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('EmpStatus')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.optTransferType = {
                        autoBind: false,
                        optionLabel: {
                            Name: "View All",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('TransferType')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.FilterBy = {
                        Transferred_ApplicantName: null,
                        Transferred_EmployeeCode: null,
                        Transferred_TransferType: null,
                        Transferred_EmployeeStatus: null,
                        Transferred_TransferredDateFrom: null,
                        Transferred_TransferredDateTo: null
                    }

                    $scope.Transferred_filterApp = function () {

                        $log.log($scope.FilterBy.Transferred_ApplicantName);
                        $log.log($scope.FilterBy.Transferred_TransferType);
                        $log.log($scope.FilterBy.Transferred_TransferredDateFrom);
                        $log.log($scope.FilterBy.Transferred_TransferredDateTo);
                        $log.log($scope.FilterBy.Transferred_EmployeeCode);
                        $log.log($scope.FilterBy.Transferred_EmployeeStatus);

                        var filter = { logic: 'and', filters: [] };

                        if ($scope.FilterBy.Transferred_ApplicantName !== null) {
                            if ($scope.FilterBy.Transferred_ApplicantName !== undefined) {
                                if ($scope.FilterBy.Transferred_ApplicantName !== '') {
                                    filter.filters.push({
                                        field: 'applicantname',
                                        operator: 'contains',
                                        value: $scope.FilterBy.Transferred_ApplicantName
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Transferred_EmployeeCode !== null) {
                            if ($scope.FilterBy.Transferred_EmployeeCode !== undefined) {
                                if ($scope.FilterBy.Transferred_EmployeeCode !== '') {
                                    filter.filters.push({
                                        field: 'employeecode',
                                        operator: 'contains',
                                        value: $scope.FilterBy.Transferred_EmployeeCode
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Transferred_TransferType !== null) { 
                            if ($scope.FilterBy.Transferred_TransferType !== undefined) {
                                if ($scope.FilterBy.Transferred_TransferType !== "") {
                                    filter.filters.push({
                                        field: 'transfertype',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Transferred_TransferType
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Transferred_EmployeeStatus !== null) {
                            if ($scope.FilterBy.Transferred_EmployeeStatus !== undefined) {
                                if ($scope.FilterBy.Transferred_EmployeeStatus !== "") {
                                    filter.filters.push({
                                        field: 'employeestatus',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Transferred_EmployeeStatus
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Transferred_TransferredDateFrom !== null) { 
                            if ($scope.FilterBy.Transferred_TransferredDateFrom !== undefined) {
                                if ($scope.FilterBy.Transferred_TransferredDateFrom !== "") {
                                    filter.filters.push({
                                        field: 'transferreddatefrom',
                                        operator: 'startswith',
                                        value: kendo.toString($scope.FilterBy.Transferred_TransferredDateFrom, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Transferred_TransferredDateTo !== null) { 
                            if ($scope.FilterBy.Transferred_TransferredDateTo !== undefined) {
                                if ($scope.FilterBy.Transferred_TransferredDateTo !== "") {
                                    filter.filters.push({
                                        field: 'transferreddateto',
                                        operator: 'endswith',
                                        value: kendo.toString($scope.FilterBy.Transferred_TransferredDateTo, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }

                        $('#grdTransferred').data('kendoGrid').dataSource.filter(filter);
                    };
                }]
            }
        }
    ]);