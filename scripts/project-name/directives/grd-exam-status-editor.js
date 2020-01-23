app.directive('grdExamStatusEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdExamStatusEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);
                }]
            };
        }
    ]);