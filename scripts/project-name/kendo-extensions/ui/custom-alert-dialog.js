app.directive('customAlertDialog',
    [
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    functionToInvoke: '=',
                },
                template: '<div id="dialog"><div/>',
                link: function ($scope, element, attrs) {
                    /*This method will be called whet the 'objectToInject' value is changes*/
                    console.log("custom alter dialog box");
                    $scope.$watch('functionToInvoke', function (value) {
                        /*Checking if the given value is not undefined*/
                        if (value) {
                            $scope.Obj = value;
                            /*Injecting the Method*/
                            $scope.Obj.myAlert = function () {
                                //Do something
                                $("<div class='k-edit-form-container'></div>").kendoAlert({
                                    title: "My Title",
                                    content: "content"//content
                                }).data("kendoAlert").open().toFront();

                                console.log("custom alert dialog box");
                            }
                        }
                    });
                }
            }
        }
    ]);