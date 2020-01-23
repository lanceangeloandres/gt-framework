app.directive('grdJobSourceEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdJobSourceEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $scope.$apply(function () {
                        $scope.dataItem.JobSourceLink = $scope.dataItem.JobSourceLink.replace('https://', '');//.split('https://')[0]; //trimLeft("https://")
                        $log.log("dataitem editor", $scope.dataItem);
                    });


                }]
            };
        }
    ]);