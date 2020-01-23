app.directive('grdLicenseExamEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    dataItem: '=ngModel'
                },
                // templateUrl: recruitmentConfig.VirtualPath + '/Scripts/recruitment/directives/grd-educbkgrd-editor.html?v=' + templateVersion,
                template: kendo.template($("#licenseExamTemplate").html(), { useWithBlock: false }),
                controller: [
                    '$scope', '$attrs', function ($scope, $attrs) {

                        console.log($scope.dataItem)

                        $scope.optLicenseType = {
                            autoBind: false,
                            dataTextField: 'Name',
                            dataValueField: 'UID',
                            dataSource: new recruitment.CDataSource({
                                transport: {
                                    read: $repository
                                        .controller('LicenseType')
                                        .action('Retrieve')
                                        .url
                                }
                            }),
                        }

                        $scope.optDates = {
                            format: 'MMM dd, yyyy',
                            autoBind: true
                        }

                        $scope.optExamDate = {
                            start: "year",
                            depth: "year",
                            format: "MMMM yyyy",
                            dateInput: true
                        }

                        // $("#examRating").kendoNumericTextBox({
                        //     format: "p0",
                        //     factor: 100,
                        //     min: 0,
                        //     max: 1,
                        //     decimals: 2,
                        //     spinners: false,
                        //  });

                    }
                ],
                link: function ($scope, $attrs) {
                }
            };
        }
    ]);