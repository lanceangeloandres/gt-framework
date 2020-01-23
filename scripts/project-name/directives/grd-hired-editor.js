app.directive('grdHiredEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdHiredEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                    if ($scope.dataItem.UID === null) {
                        $scope.$apply(function () {
                            if ($scope.dataItem.ApplicantConfig.Currency === null) {
                                $scope.dataItem.ApplicantConfig.Currency = {
                                    UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                    Name: 'Philippine Peso'
                                }
                                $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                            }
                            else {
                                if ($scope.dataItem.ApplicantConfig.Currency.UID === null) {
                                    $scope.dataItem.ApplicantConfig.Currency = {
                                        UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                        Name: 'Philippine Peso'
                                    }
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                }
                                else if ($scope.dataItem.ApplicantConfig.Currency.UID === Guid.Empty) {
                                    $scope.dataItem.ApplicantConfig.Currency = {
                                        UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                        Name: 'Philippine Peso'
                                    }
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                }
                            }
                        });
                    }
                    else {
                        $scope.$apply(function () {
                            if ($scope.dataItem.ApplicantConfig.Currency === null) {
                                $scope.dataItem.ApplicantConfig.Currency = {
                                    UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                    Name: 'Philippine Peso'
                                }
                                $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                            }
                            else {
                                if ($scope.dataItem.ApplicantConfig.Currency.UID === null) {
                                    $scope.dataItem.ApplicantConfig.Currency = {
                                        UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                        Name: 'Philippine Peso'
                                    }
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                }
                                else if ($scope.dataItem.ApplicantConfig.Currency.UID === Guid.Empty) {
                                    $scope.dataItem.ApplicantConfig.Currency = {
                                        UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                        Name: 'Philippine Peso'
                                    }
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                }
                            }
                        });
                    }

                    $scope.optEmpStatus = {
                        autoBind: false,
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('EmpStatus')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optEmployeeGrp = {
                        autoBind: false,
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('EmployeeGrp')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optCurrency = {
                        autoBind: false,
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            sort: [{ field: "ID", dir: "asc" }],
                            transport: {
                                read: $repository
                                    .controller('Currency')
                                    .action('Retrieve')
                                    .url
                            },
                        }),
                        dataBound: function () {
                            if ($scope.dataItem.ApplicantConfig.Currency === null) {
                                this.select(1);
                            }
                            else {
                                if ($scope.dataItem.ApplicantConfig.Currency.UID === null) {
                                    this.select(1);
                                }
                                else if ($scope.dataItem.ApplicantConfig.Currency.UID === Guid.Empty) {
                                    this.select(1);
                                }
                            }
                        }
                    };

                    $scope.optTaxType = {
                        autoBind: false,
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('TaxType')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optTaxExemption = {
                        autoBind: false,
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",

                        cascadeFrom: 'ddlTaxType',
                        cascadeFromField: 'TaxType.UID',

                        dataBound: function (e) {
                        },
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('TaxExemption')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optPaymentType = {
                        autoBind: false,
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('PaymentType')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };
                }]
            };
        }
    ]);