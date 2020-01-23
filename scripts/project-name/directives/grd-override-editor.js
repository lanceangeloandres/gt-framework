app.directive('grdOverrideEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdOverrideEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

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
                        $log.log("dataitem editor 1", $scope.dataItem);
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
                        $log.log("dataitem editor 2", $scope.dataItem);
                    }

                    $scope.optHiredDate = {
                        format: 'MMM dd, yyyy',
                        //disableDates: function (date) {
                        //    return ((new Date()) >= (new Date(date)));
                        //},
                        dateInput: true
                    }

                    $scope.optEmp = {
                        autoBind: true,
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        filter: "contains",
                        optionLabel: {
                            FullName: "Please Select",
                            UID: null
                        },
                        dataSource: new recruitment.CDataSource({
                            sort: [{ field: "FullName", dir: "asc" }],
                            transport: {
                                read: $repository
                                    .controller('Emp')
                                    .action('RetrieveEmp')
                                    .url
                            },
                        }),
                        dataBound: function () {
                            if ($scope.dataItem.Employee === null) {
                                $log.log("emp 1");
                                this.select(0);
                            }
                            else {
                                if ($scope.dataItem.Employee.UID === null) {
                                    $log.log("emp 2");
                                    this.select(0);
                                }
                                else if ($scope.dataItem.Employee.UID === Guid.Empty()) {
                                    $log.log("emp 3");
                                    this.select(0);
                                }
                            }
                        }
                    };

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