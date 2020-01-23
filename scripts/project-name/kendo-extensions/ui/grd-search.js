(function () {
    app.directive('grdSearch',
        [
            function () {
                return {
                    restrict: 'A',
                    require: '^kendoGrid',
                    scope: {
                        filter: '&'
                    },
                    replace: true,
                    template: kendo.template($("#grdSearchTemplate").html()),
                    link: function (scope, element, attr) {
                        scope.kendoGrid = angular.element(element).closest('.k-grid').data('kendoGrid');
                        scope.placeHolder = attr.placeholder;
                        scope.history = '';
                        scope.searchInput = '';

                        scope.onKeyPress = function (e) {
                            if (e.keyCode === 13) {
                                e.preventDefault();

                                scope.OnGoClick();
                            }
                        };

                        scope.$parent[attr.grdSearch] = {
                            filter: function () {
                                if (scope.kendoGrid !== undefined) {
                                    var _jsFilter = {
                                        field: 'search',
                                        value: scope.searchInput.trim()
                                    };

                                    scope.filter({
                                        e: _jsFilter
                                    });

                                    scope.kendoGrid.dataSource.filter(_jsFilter);
                                }
                            }
                        };

                        scope.OnGoClick = function () {
                            if (scope.searchInput.trim() === scope.history) return;
                            if (scope.searchInput.trim() === '' && scope.history === '') return;

                            var _keyword = scope.searchInput.trim();

                            scope.history = _keyword;

                            if (scope.kendoGrid !== undefined) {
                                var _jsFilter = {
                                    field: 'search',
                                    value: _keyword
                                };

                                scope.kendoGrid.filterValue = _keyword;

                                scope.kendoGrid.clearFilter = function () {
                                    scope.searchInput = '';
                                    scope.$apply();
                                };

                                scope.filter({
                                    e: _jsFilter
                                });

                                scope.kendoGrid.dataSource.filter(_jsFilter);
                            }
                        };
                    },
                };
            }
        ]);
})(recruitment);
