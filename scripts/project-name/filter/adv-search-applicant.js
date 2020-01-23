app.directive('advSearchApplicant',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                template: kendo.template($("#advSearchApplicant").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {


                    $scope.optAppStatus = {
                        autoBind: false,
                        optionLabel: "View All",

                        dataTextField: "Name",
                        dataValueField: "UID",

                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('ApplicantStatus')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.optApplStatus = {
                        autoBind: false,
                        optionLabel: "View All",

                        dataTextField: "Name",
                        dataValueField: "UID",

                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('ApplicationStatus')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.optManpowerRequest = {
                        autoBind: false,
                        optionLabel: "View All",

                        dataTextField: "Code",
                        dataValueField: "UID",

                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('ManpowerRequest')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.optJobSource = {
                        autoBind: false,
                        optionLabel: "View All",

                        dataTextField: "Name",
                        dataValueField: "UID",

                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('JobSource')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };

                    $scope.active = true;

                    $scope.optDatePicker = {
                        format: 'MMM dd, yyyy'
                    }

                    $scope.FilterBy = {
                        ApplicantName: null,
                        AppliedDateFrom: null,
                        AppliedDateTo: null,
                        HiredDateFrom: null,
                        HiredDateTo: null,
                        //ApplicantStatus: null,
                        ApplicationStatus: null,
                        ApplicantJobSource: null,
                        ManpowerRequest: null
                    }

                    $scope.filterApp = function () {

                        $log.log($scope.FilterBy.ApplicantName);
                        $log.log($scope.FilterBy.AppliedDateFrom);
                        $log.log($scope.FilterBy.AppliedDateTo);
                        $log.log($scope.FilterBy.HiredDateFrom);
                        $log.log($scope.FilterBy.HiredDateTo);
                        $log.log($scope.FilterBy.ApplicantStatus);
                        $log.log($scope.FilterBy.ApplicantJobSource);
                        $log.log($scope.FilterBy.ManpowerRequest);
                        $log.log($scope.FilterBy.ApplicationStatus);

                        var filter = { logic: 'and', filters: [] };

                        if ($scope.FilterBy.ApplicantName !== null) { //|| $scope.FilterBy.AppliedDateFrom !== undefined
                            if ($scope.FilterBy.ApplicantName !== '') {
                                filter.filters.push({
                                    field: 'applicantname',
                                    operator: 'contains',
                                    value: $scope.FilterBy.ApplicantName
                                });
                            }
                        }
                        if ($scope.FilterBy.AppliedDateFrom !== null) { //|| $scope.FilterBy.AppliedDateFrom !== undefined
                            filter.filters.push({
                                field: 'applieddatefrom',
                                operator: 'startswith',
                                value: kendo.toString($scope.FilterBy.AppliedDateFrom, 'yyyy-MM-dd')
                            });
                        }
                        if ($scope.FilterBy.AppliedDateTo !== null) { //|| $scope.FilterBy.AppliedDateTo !== undefined
                            filter.filters.push({
                                field: 'applieddateto',
                                operator: 'endswith',
                                value: kendo.toString($scope.FilterBy.AppliedDateTo, "yyyy-MM-dd")
                            });
                        }
                        if ($scope.FilterBy.HiredDateFrom !== null) { //|| $scope.FilterBy.HiredDateFrom !== undefined
                            filter.filters.push({
                                field: 'hireddatefrom',
                                operator: 'startswith',
                                value: kendo.toString($scope.FilterBy.HiredDateFrom, "yyyy-MM-dd")
                            });
                        }
                        if ($scope.FilterBy.HiredDateTo !== null) { //|| $scope.FilterBy.HiredDateTo !== undefined
                            filter.filters.push({
                                field: 'hireddateto',
                                operator: 'endswith',
                                value: kendo.toString($scope.FilterBy.HiredDateTo, "yyyy-MM-dd")
                            });
                        }
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

                        if ($scope.FilterBy.ApplicationStatus !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.ApplicationStatus !== undefined) {
                                if ($scope.FilterBy.ApplicationStatus !== "") {
                                    filter.filters.push({
                                        field: 'applicationstatus',
                                        operator: 'eq',
                                        value: $scope.FilterBy.ApplicationStatus
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.ApplicantJobSource !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.ApplicantJobSource !== undefined) {
                                if ($scope.FilterBy.ApplicantJobSource !== "") {
                                    filter.filters.push({
                                        field: 'applicantjobsource',
                                        operator: 'eq',
                                        value: $scope.FilterBy.ApplicantJobSource
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.ManpowerRequest !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.ManpowerRequest !== undefined) {
                                if ($scope.FilterBy.ManpowerRequest !== "") {
                                    filter.filters.push({
                                        field: 'manpowerrequest',
                                        operator: 'eq',
                                        value: $scope.FilterBy.ManpowerRequest
                                    });
                                }
                            }
                        }

                        $('#grdApplicant').data('kendoGrid').dataSource.filter(filter);
                    };
                }]
            }
        }
    ]);