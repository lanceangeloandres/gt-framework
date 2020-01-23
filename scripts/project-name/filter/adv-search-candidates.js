app.directive('advSearchCandidates',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                template: kendo.template($("#advSearchCandidates").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $scope.activeCand = true;

                    $scope.optApplicationStatus = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Application Status",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('ApplicationStatus')
                                    .action('Retrieve')
                                    .url
                            }
                        })
                    };


                    //$scope.optApplicantStatus = {
                    //    autoBind: false,
                    //    optionLabel: {
                    //        Name: "View All",
                    //        UID: null
                    //    },
                    //    filter: "contains",
                    //    dataTextField: "Name",
                    //    dataValueField: "UID",
                    //    dataSource: new recruitment.CDataSource({
                    //        //sort: [{ field: "CreatedDate", dir: "desc" }],
                    //        transport: {
                    //            read: $repository
                    //                .controller('ApplicantStatus')
                    //                .action('GetApplicantStatus')
                    //                .queryString({
                    //                    isHired: false
                    //                })
                    //                .url
                    //        }
                    //    })
                    //};

                    $scope.FilterBy = {
                        Candidates_ApplicantName: null,
                        //ApplicationStatus: null,
                        Candidates_ApplicantStatus: null,
                        Candidates_AppliedDateFrom: null,
                        Candidates_AppliedDateTo: null
                    }

                    $scope.Candidates_filterApp = function () {

                        $log.log($scope.FilterBy.Candidates_ApplicantName);
                        //$log.log($scope.FilterBy.ApplicationStatus);
                        $log.log($scope.FilterBy.Candidates_ApplicantStatus);
                        $log.log($scope.FilterBy.Candidates_AppliedDateFrom);
                        $log.log($scope.FilterBy.Candidates_AppliedDateTo);

                        var filter = { logic: 'and', filters: [] };

                        if ($scope.FilterBy.Candidates_ApplicantName !== null) { //|| $scope.FilterBy.AppliedDateFrom !== undefined
                            if ($scope.FilterBy.Candidates_ApplicantName !== undefined) {
                                if ($scope.FilterBy.Candidates_ApplicantName !== '') {
                                    filter.filters.push({
                                        field: 'applicantname',
                                        operator: 'contains',
                                        value: $scope.FilterBy.Candidates_ApplicantName
                                    });
                                }
                            }
                        }

                        if ($scope.FilterBy.Candidates_ApplicationStatus !== null) { //|| $scope.FilterBy.ApplicantStatus !== undefined
                            if ($scope.FilterBy.Candidates_ApplicationStatus !== undefined) {
                                if ($scope.FilterBy.Candidates_ApplicationStatus !== "") {
                                    filter.filters.push({
                                        field: 'applicationstatus',
                                        operator: 'eq',
                                        value: $scope.FilterBy.Candidates_ApplicationStatus
                                    });
                                }
                            }
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

                        if ($scope.FilterBy.Candidates_AppliedDateFrom !== null) { //|| $scope.FilterBy.HiredDateFrom !== undefined
                            if ($scope.FilterBy.Candidates_AppliedDateFrom !== undefined) {
                                if ($scope.FilterBy.Candidates_AppliedDateFrom !== "") {
                                    filter.filters.push({
                                        field: 'applieddatefrom',
                                        operator: 'startswith',
                                        value: kendo.toString($scope.FilterBy.Candidates_AppliedDateFrom, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }
                        if ($scope.FilterBy.Candidates_AppliedDateTo !== null) { //|| $scope.FilterBy.HiredDateTo !== undefined
                            if ($scope.FilterBy.Candidates_AppliedDateTo !== undefined) {
                                if ($scope.FilterBy.Candidates_AppliedDateTo !== "") {
                                    filter.filters.push({
                                        field: 'applieddateto',
                                        operator: 'endswith',
                                        value: kendo.toString($scope.FilterBy.Candidates_AppliedDateTo, "yyyy-MM-dd")
                                    });
                                }
                            }
                        }

                        filter.filters.push({
                            field: 'applicanttransferhistory',
                            operator: 'eq',
                            value: Guid.Empty()
                        });

                        $('#grdCandidates').data('kendoGrid').dataSource.filter(filter);
                    };
                }]
            }
        }
    ]);