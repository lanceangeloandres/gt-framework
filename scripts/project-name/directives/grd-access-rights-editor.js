app.directive('grdAccessRightsEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                //templateUrl: recruitmentConfig.VirtualPath + '/Scripts/recruitment/directives/grd-school-editor.html?v=' + templateVersion,
                template: kendo.template($("#grdAccessRightsEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    
                    
                }]
            }
        }
    ]);