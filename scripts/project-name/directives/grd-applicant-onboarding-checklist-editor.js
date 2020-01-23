app.directive('grdApplicantOnboardingChecklistEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel',
                    parentUid: '=parentUid'
                },
                replace: true,
                template: kendo.template($("#grdApplicantOnboardingChecklistEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                    if ($scope.dataItem.UID === null) {
                        $log.log('add');
                        $scope.isShowReqType = false;
                        $scope.dataItem.ApplicantManpowerReq.UID = $scope.parentUid;
                    } else if ($scope.dataItem.UID !== null) {
                        $log.log("update");
                        $scope.isShowReqType = true;
                    }

                    $scope.optOnboardingType = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('OnboardingRequirement')
                                    .action('RetrieveNotRequired')
                                    .url
                            },
                        })
                    };

                    //$scope.optApplicantStat = {
                    //    autoBind: false,
                    //    optionLabel: {
                    //        Name: "Select Type",
                    //        UID: null
                    //    },
                    //    filter: "contains",
                    //    dataTextField: "Name",
                    //    dataValueField: "UID",
                    //    dataBound: function (e) {
                    //        if ($scope.dataItem.ApplicantHiringStage === null) {
                    //            this.select(0);
                    //        }
                    //        else if ($scope.dataItem.ApplicantHiringStage.UID === null) {
                    //            this.select(0);
                    //        }
                    //    },
                    //    dataSource: new recruitment.CDataSource({
                    //        //sort: [{ field: "CreatedDate", dir: "desc" }],
                    //        transport: {
                    //            read: $repository
                    //                .controller('ApplicationStatus')
                    //                .action('IRetrieve')
                    //                .url
                    //        },
                    //    })
                    //};

                    //$scope.optDateSubmitted = {
                    //    format: 'MMM dd, yyyy',
                    //    dateInput: true
                    //}
                }]
            };
        }
    ]);