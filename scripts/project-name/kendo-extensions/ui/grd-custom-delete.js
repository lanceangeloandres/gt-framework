app.directive('grdCustomDelete',
    [
        function () {
            return {
                restrict: 'AE',
                require: '^kendoGrid',
                replace: true,
                scope: {
                    //controller: '='
                    dataItem: '=ngModel'
                },
                template: '<div id="onDeleteDialogBox"></div>',
                //link: function (scope, element, attr) {
                //    scope.kendoGrid = angular.element(element).closest('.k-grid').data('kendoGrid');
                //    //scope.placeHolder = attr.placeholder;
                //    //scope.history = '';
                //    //scope.searchInput = '';

                //    //scope.onKeyPress = function (e) {
                //    //    if (e.keyCode === 13) {
                //    //        e.preventDefault();

                //    //        scope.OnGoClick();
                //    //    }
                //    //};
                //},
                controller: [
                    '$scope', '$attrs', function ($scope, $attrs) {
                        var grid = $('#onDeleteDialogBox').closest('.k-grid').data('kendoGrid');

                        console.log("grdCustomDelete", grid);

                        $("#onDeleteDialogBox").kendoConfirm({
                            title: "Delete Entry",
                            content: "Continue to <strong>delete</strong> this entry?",
                            messages: {
                                okText: "OK"
                            }
                        }).data("kendoConfirm").result.done(function () {
                            $('body').append($('<div id="onDeleteDialogBox">'));
                            $log.log("kendo clicked OK");

                            $repository
                                .controller('School')
                                .action('SoftDeleteByUID')
                                .post(JSON.stringify({ uid: opt.UID }))
                                .complete(function (r) {
                                    //successNotification("Successfully deleted", "");
                                    var grdSchools = $("#grdSchools").data("kendoGrid");
                                    grdSchools.dataSource.read();
                                    //$scope.optGrdSchools.dataSource.read();
                                    //opt.success(r);
                                });
                        }).fail(function () {
                            $('body').append($('<div id="onDeleteDialogBox">'));
                        });
                    }
                ],
            }
        }
    ]);