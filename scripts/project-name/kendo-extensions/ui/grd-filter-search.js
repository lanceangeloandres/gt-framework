app.directive('grdFilterSearch',
    [
        function () {
            return {
                restrict: 'A',
                require: '^kendoGrid',
                replace: true,
                scope: {
                    //controller: '='
                },
                //template: '<input class="k-textbox" id="filterSearch" style="left: 100%; right: 0; position: sticky;" placeholder="Search" />',
                template: '<input class="k-textbox" ng-keypress="onKeyPress($event)" style="left: 100%; right: 0; position: sticky;" placeholder="Search" />',
                link: function (scope, element, attr) {
                    //YEL WAS HERE - CUSTOM FILTER SEARCH
                    function isNumeric(n) {
                        return !isNaN(parseFloat(n)) && isFinite(n);
                    }

                    function getBoolean(str) {
                        if ("true".startsWith(str)) {
                            return true;
                        } else if ("false".startsWith(str)) {
                            return false;
                        } else {
                            return null;
                        }
                    }

                    //function isValidDate(str) {
                    //    var d = moment(str, 'D/M/YYYY');
                    //    if (d == null || !d.isValid()) return false;

                    //    console.log("this is a date moment");
                    //}

                    var grid = angular.element(element).closest('.k-grid').data('kendoGrid');
                    var columns = grid.columns;

                    scope.onKeyPress = function (e) {
                        if (e.keyCode === 13) {
                            var filter = { logic: 'or', filters: [] };
                            console.log("e.target.value", e.target.value);

                            e.preventDefault();

                            if (e.target.value !== "") {
                                columns.forEach(function (x) {
                                    if (x.field) {

                                        if (x.field.includes(".")) {
                                            filter.filters.push({
                                                field: x.field,
                                                operator: 'contains',
                                                value: e.target.value
                                            })
                                        }
                                        else if (x.field.toString().toLowerCase().includes("time")) {
                                            if (e.target.value.substr(2, 1) === ':') {
                                                if (!e.target.value.match(/^\d\d:\d\d/)) {
                                                    console.log("this is not a time");
                                                }
                                                else if (parseInt(e.target.value.substr(0, 2)) >= 24 || parseInt(e.target.value.substr(3, 2)) >= 60) {
                                                    console.log("this is not a time");
                                                }
                                                else {
                                                    console.log("this is a time");

                                                    filter.filters.push({
                                                        field: x.field,
                                                        operator: 'contains',
                                                        value: e.target.value
                                                    })
                                                }

                                            }
                                            else {
                                                console.log("this is not a time");
                                            }
                                        }
                                        else {
                                            var type = grid.dataSource.options.schema.model.fields[x.field].type;

                                            if (type === 'string') {
                                                filter.filters.push({
                                                    field: x.field,
                                                    operator: 'contains',
                                                    value: e.target.value
                                                })
                                            }
                                            else if (type === 'number') {
                                                if (isNumeric(e.target.value)) {
                                                    filter.filters.push({
                                                        field: x.field,
                                                        operator: 'eq',
                                                        value: e.target.value
                                                    });
                                                }

                                            } else if (type === 'date') {
                                                //var data = grid.dataSource.data();
                                                //for (var i = 0; i < data.length; i++) {
                                                //    var dateStr = kendo.format(x.format, data[i][x.field]);
                                                //    // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                                                //    if (dateStr.startsWith(e.target.value)) {
                                                //        filter.filters.push({
                                                //            field: x.field,
                                                //            operator: 'eq',
                                                //            value: data[i][x.field]
                                                //        })
                                                //    }
                                                //}

                                                var parsedDate = Date.parse(e.target.value);

                                                // You want to check again for !isNaN(parsedDate) here because Dates can be converted
                                                // to numbers, but a failed Date parse will not.
                                                if (!isNaN(parsedDate)) {
                                                    /* do your work */
                                                    filter.filters.push({
                                                        field: x.field,
                                                        operator: 'eq',
                                                        value: kendo.toString(e.target.value, "yyyy-MM-dd")
                                                    });
                                                }

                                                //isValidDate(e.target.value);

                                            } else if (type === 'boolean' && getBoolean(e.target.value) !== null) {
                                                var bool = getBoolean(e.target.value);
                                                filter.filters.push({
                                                    field: x.field,
                                                    operator: 'eq',
                                                    value: bool
                                                });
                                            }
                                        }
                                    }
                                });
                                grid.dataSource.filter(filter);

                            }
                            else {
                                console.log("filter([])");
                                grid.dataSource.filter([]);
                            }
                        }
                    }

                },
                //controller: [
                //    //'$scope', '$attrs', function ($scope, $attrs) {

                //    //    console.log("grdFilterSearch");

                //    //    //$scope.onKeyPress = function (e) {
                //    //    //    if (e.keyCode === 13) {
                //    //    //        e.preventDefault();
                //    //    //        $scope.OnGoClick();
                //    //    //        console.log("im cliecked");
                //    //    //    }
                //    //    //};

                //    //    function isNumeric(n) {
                //    //        return !isNaN(parseFloat(n)) && isFinite(n);
                //    //    }

                //    //    function getBoolean(str) {
                //    //        if ("true".startsWith(str)) {
                //    //            return true;
                //    //        } else if ("false".startsWith(str)) {
                //    //            return false;
                //    //        } else {
                //    //            return null;
                //    //        }
                //    //    }

                //    //    $('#filterSearch').on('keydown', function (e) {
                //    //        var grid = $('#filterSearch').closest('.k-grid').data('kendoGrid');
                //    //        //$('#grdCourses').data('kendoGrid');
                //    //        var columns = grid.columns;

                //    //        var filter = { logic: 'or', filters: [] };
                //    //        console.log("e.target.value", e.target.value);
                //    //        //console.log("filter value", filter.filters[0].value);

                //    //        if (e.keyCode === 13) {
                //    //            console.log("clicked");
                //    //            if (e.target.value !== "") {
                //    //                columns.forEach(function (x) {
                //    //                    if (x.field) {

                //    //                        //if (x.field.includes(".")) {
                //    //                        //    console.log("field is an object");
                //    //                        //}

                //    //                        //if (grid.dataSource.options.schema.model.fields[x.field].hasOwnProperty('type')) {//(typeof (grid.dataSource.options.schema.model.fields[x.field].type) === 'undefined') {
                //    //                        //    console.log("undefined");
                //    //                        //}

                //    //                        if (x.field.includes(".")) {
                //    //                            //console.log("field is an object");
                //    //                            filter.filters.push({
                //    //                                field: x.field,
                //    //                                operator: 'contains',
                //    //                                value: e.target.value
                //    //                            })
                //    //                        }
                //    //                        else {
                //    //                            var type = grid.dataSource.options.schema.model.fields[x.field].type;

                //    //                            if (type === 'string') {
                //    //                                filter.filters.push({
                //    //                                    field: x.field,
                //    //                                    operator: 'contains',
                //    //                                    value: e.target.value
                //    //                                })
                //    //                            }
                //    //                            else if (type === 'number') {
                //    //                                if (isNumeric(e.target.value)) {
                //    //                                    filter.filters.push({
                //    //                                        field: x.field,
                //    //                                        operator: 'eq',
                //    //                                        value: e.target.value
                //    //                                    });
                //    //                                }

                //    //                            } else if (type === 'date') {
                //    //                                var data = grid.dataSource.data();
                //    //                                for (var i = 0; i < data.length; i++) {
                //    //                                    var dateStr = kendo.format(x.format, data[i][x.field]);
                //    //                                    // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                //    //                                    if (dateStr.startsWith(e.target.value)) {
                //    //                                        filter.filters.push({
                //    //                                            field: x.field,
                //    //                                            operator: 'eq',
                //    //                                            value: data[i][x.field]
                //    //                                        })
                //    //                                    }
                //    //                                }
                //    //                            } else if (type === 'boolean' && getBoolean(e.target.value) !== null) {
                //    //                                var bool = getBoolean(e.target.value);
                //    //                                filter.filters.push({
                //    //                                    field: x.field,
                //    //                                    operator: 'eq',
                //    //                                    value: bool
                //    //                                });
                //    //                            }
                //    //                        }
                //    //                    }
                //    //                });
                //    //                grid.dataSource.filter(filter);

                //    //            }
                //    //            else {
                //    //                console.log("filter([])");
                //    //                grid.dataSource.filter([]);
                //    //                //grid.dataSource.read();
                //    //            }
                //    //        }

                //    //    });
                //    //}
                //],
            }
        }
    ]);