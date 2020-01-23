app.directive('grdSubModuleTeamMemberEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdSubModuleTeamMemberEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                    $scope.optTeamMember = {
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
                                    .controller('TeamMember')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };
                }]
            };
        }
    ]);