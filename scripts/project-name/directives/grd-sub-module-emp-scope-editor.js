﻿app.directive('grdSubModuleEmpScopeEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdSubModuleEmpScopeEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                        
                }]
            };
        }
    ]);