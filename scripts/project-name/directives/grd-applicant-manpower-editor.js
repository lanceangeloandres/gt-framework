app.directive('grdApplicantManpowerEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdApplicantManpowerEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $log.log("dataitem", $scope.dataItem);

                    if ($scope.dataItem.UID === null) {
                        if ($scope.dataItem.ApplicantConfig === null) {
                            $scope.dataItem.ApplicantConfig = {
                                EmpStatus: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                EmployeeGrp: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                Currency: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                TaxType: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                TaxExemption: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                PaymentType: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                            }
                        }
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
                        $log.log("dataitem editor", $scope.dataItem);
                    }
                    else if ($scope.dataItem.UID !== null) {
                        if ($scope.dataItem.ApplicantConfig === null) {
                            $scope.dataItem.ApplicantConfig = {
                                EmpStatus: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                EmployeeGrp: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                Currency: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                TaxType: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                TaxExemption: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                                PaymentType: {
                                    UID: null,
                                    Name: 'Please Select'
                                },
                            }
                        }

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

                        $log.log("dataitem editor", $scope.dataItem);
                    }

                    $scope.employeeOptions = {
                        autoBind: false,
                        placeholder: 'Select Employee',
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        change: function (e) {
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                        }
                    };
                    $scope.optHiredDate = {
                        format: 'MMM dd, yyyy',
                        //disableDates: function (date) {
                        //    return ((new Date()) >= (new Date(date)));
                        //},
                        dateInput: true
                    }

                    $scope.optEmpStatus = {
                        autoBind: false,
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
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        cascadeFrom: 'ddlTaxType',
                        cascadeFromField: 'TaxType.UID',

                        dataBound: function (e) {
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
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        optionLabel: {
                            Name: "Please Select",
                            UID: null
                        },
                        dataBound: function (e) {
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

                    $scope.optManpower = {
                        autoBind: false,
                        optionLabel: {
                            Position: {
                                Name: "Select Job Position"
                            },
                            UID: null
                        },
                        template: '#: Code # - #: Position.Name #',
                        value: null,
                        filter: "contains",
                        dataTextField: "Position.Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('ManpowerRequest')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optApplicantStat = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                            if ($scope.dataItem.ApplicantHiringStageLog === null) {
                                this.select(0);
                            }
                            else if ($scope.dataItem.ApplicantHiringStageLog.UID === null) {
                                this.select(0);
                            }
                        },
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('HiringStage')
                                    .action('IRetrieve')
                                    .url
                            },
                        }),
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                $("#mltEmployee").data("kendoMultiSelect")
                                    .setDataSource(new recruitment.CDataSource({
                                        transport: {
                                            read: $repository
                                                .controller('Emp')
                                                .action('RetrieveSpecificEmp')
                                                .queryString({
                                                    uid: this.value() // came from ApplicantStat change event
                                                })
                                                .url
                                        }
                                    }))
                            }
                        }
                    };

                    $scope.optStat = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },

                        cascadeFrom: 'ddlApplicantStat',
                        cascadeFromField: 'HiringStage.UID',

                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                            if ($scope.dataItem.ApplicantHiringStageLog === null) {
                                this.select(0);
                            }
                            else if ($scope.dataItem.ApplicantHiringStageLog.UID === null) {
                                this.select(0);
                            }
                        },
                        dataSource: new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Status')
                                    .action('IRetrieve')
                                    .url
                            },
                        }),
                        change: function (e) {
                            console.log('currentApplicantStat', $scope.dataItem.currentApplicantStat)
                            $scope.$apply(function () {
                                $scope.dataItem.ApplicantHiringStageLog.Remarks = "";
                                $("#description").val("");
                            });
                        }
                    };
                }]
            };
        }
    ]);