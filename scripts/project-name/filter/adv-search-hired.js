app.directive('advSearchHired',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                template: kendo.template($("#advSearchHired").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $scope.activeHired = true;

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


                    $scope.optApplicantStatus = {
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
                                    .controller('ApplicantStatus')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.FilterBy = {
                        Hired_ApplicantName: null,
                        //ApplicationStatus: null,
                        //ApplicantStatus: null,
                        Hired_AppliedDateFrom: null,
                        Hired_AppliedDateTo: null,
                        Hired_HiredDateFrom: null,
                        Hired_HiredDateTo: null
                    }

                    $scope.Hired_filterApp = function () {

                        $log.log($scope.FilterBy.Hired_ApplicantName);
                        ////$log.log($scope.FilterBy.ApplicationStatus);
                        //$log.log($scope.FilterBy.ApplicantStatus);
                        $log.log($scope.FilterBy.Hired_AppliedDateFrom);
                        $log.log($scope.FilterBy.Hired_ApplicantStatus);
                        $log.log($scope.FilterBy.Hired_HiredDateFrom);
                        $log.log($scope.FilterBy.Hired_HiredDateTo);

                        var filter = { logic: 'and', filters: [] };

                        if ($scope.FilterBy.Hired_ApplicantName !== null) { //|| $scope.FilterBy.AppliedDateFrom !== undefined
                            if ($scope.FilterBy.Hired_ApplicantName !== undefined) {
                                if ($scope.FilterBy.Hired_ApplicantName !== '') {
                                    filter.filters.push({
                                        field: 'applicantname',
                                        operator: 'contains',
                                        value: $scope.FilterBy.Hired_ApplicantName
                                    });
                                }
                            }
                        }

                        //if ($scope.FilterBy.ApplicationStatus !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                        //    if ($scope.FilterBy.ApplicationStatus !== undefined) {
                        //        if ($scope.FilterBy.ApplicationStatus !== "") {
                        //            filter.filters.push({
                        //                field: 'applicationstatus',
                        //                operator: 'eq',
                        //                value: $scope.FilterBy.ApplicationStatus
                        //            });
                        //        }
                        //    }
                        //}

                        //if ($scope.FilterBy.ApplicantStatus !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                        //    if ($scope.FilterBy.ApplicantStatus !== undefined) {
                        //        if ($scope.FilterBy.ApplicantStatus !== "") {
                        //            filter.filters.push({
                        //                field: 'applicantstatus',
                        //                operator: 'eq',
                        //                value: $scope.FilterBy.ApplicantStatus
                        //            });
                        //        }
                        //    }
                        //}

                        if ($scope.FilterBy.Hired_AppliedDateFrom !== null) { //|| $scope.FilterBy.HiredDateFrom !== undefined
                            if ($scope.FilterBy.Hired_AppliedDateFrom !== undefined) {
                                if ($scope.FilterBy.Hired_AppliedDateFrom !== "") {
                                    filter.filters.push({
                                        field: 'applieddatefrom',
                                        operator: 'startswith',
                                        value: kendo.toString($scope.FilterBy.Hired_AppliedDateFrom, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }
                        if ($scope.FilterBy.Hired_AppliedDateTo !== null) { //|| $scope.FilterBy.HiredDateTo !== undefined
                            if ($scope.FilterBy.Hired_AppliedDateTo !== undefined) {
                                if ($scope.FilterBy.Hired_AppliedDateTo !== "") {
                                    filter.filters.push({
                                        field: 'applieddateto',
                                        operator: 'endswith',
                                        value: kendo.toString($scope.FilterBy.Hired_AppliedDateTo, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }
                        if ($scope.FilterBy.Hired_HiredDateFrom !== null) { //|| $scope.FilterBy.HiredDateFrom !== undefined
                            if ($scope.FilterBy.Hired_HiredDateFrom !== undefined) {
                                if ($scope.FilterBy.Hired_HiredDateFrom !== "") {
                                    filter.filters.push({
                                        field: 'hireddatefrom',
                                        operator: 'startswith',
                                        value: kendo.toString($scope.FilterBy.Hired_HiredDateFrom, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }
                        if ($scope.FilterBy.Hired_HiredDateTo !== null) { //|| $scope.FilterBy.HiredDateTo !== undefined
                            if ($scope.FilterBy.Hired_HiredDateTo !== undefined) {
                                if ($scope.FilterBy.Hired_HiredDateTo !== "") {
                                    filter.filters.push({
                                        field: 'hireddateto',
                                        operator: 'endswith',
                                        value: kendo.toString($scope.FilterBy.Hired_HiredDateTo, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }

                        filter.filters.push({
                            field: 'applicanttransferhistory',
                            operator: 'eq',
                            value: Guid.Empty()
                        });

                        $('#grdHired').data('kendoGrid').dataSource.filter(filter);
                    };
                }]
            }
        }
    ]);