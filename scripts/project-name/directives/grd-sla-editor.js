app.directive('grdSlaEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdSlaEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                    $scope.optNumericTextbox = {
                        min: 0,
                        decimals: 0,
                        format: "0",
                    };

                    $scope.optJobLvlGrp = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                            //$log.log("$scope.dataItem.Key", $scope.dataItem.Key);
                            //if ($scope.dataItem.Key === null) {
                            //    this.select(0);
                            //}
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('JobLevelGroup')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };
                }]
            };
        }
    ]);