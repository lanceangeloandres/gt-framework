app.directive('grdCandidatesEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdCandidatesEditor").html(), { useWithBlock: false }),
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
                            //if ($scope.dataItem.ApplicantHiringStageLog.ApplicationStatus.IsWithAssignedEmp === true) {
                            //    $repository
                            //        .controller("ApplicantHiringStageLog")
                            //        .action('GetAssignedStaffByApplicantStatHistLogUID')
                            //        .queryString({
                            //            uid: $scope.dataItem.ApplicantHiringStageLog.UID
                            //        })
                            //        .get()
                            //        .success(function (r) {
                            //            $scope.$apply(function () {
                            //                $scope.dataItem.ApplicantHiringStageLog.AssignedStaff = JSON.parse(JSON.stringify(r.Data));
                            //                ///$log.log("AssignedStaff", $scope.dataItem.ApplicantHiringStageLog.AssignedStaff);
                            //            });
                            //        }).error(function (err) {
                            //        });
                            //}

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

                    $scope.optHiredDate = {
                        format: 'MMM dd, yyyy',
                        //disableDates: function (date) {
                        //    return ((new Date()) >= (new Date(date)));
                        //},
                        dateInput: true
                    }

                    $scope.employeeOptions = {
                        autoBind: false,
                        //filter: "contains",
                        valuePrimitive: false,
                        placeholder: 'Select Employee',
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        //dataSource: new recruitment.CDataSource({
                        //    requestEnd: function () {
                        //    },
                        //    transport: {
                        //        read: $repository
                        //            .controller('Emp')
                        //            .action('RetrieveEmp')
                        //            .url
                        //    }
                        //}),
                        change: function (e) {
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                        },
                        //value: ["2bb3b6ef-153e-435f-a7ec-e184a60d1fb9"]
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

                    $scope.optApplicantStatus = {
                        autoBind: false,
                        //optionLabel: {
                        //    Name: "Select Applicant Status",
                        //    UID: null
                        //},
                        index: 0,
                        value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
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
                                    .controller('ApplicantStatus')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optStat = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },

                        cascadeFrom: 'ddlHiringStage',
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
                            $scope.$apply(function () {
                                $scope.dataItem.ApplicantHiringStageLog.Remarks = "";
                                $("#description").val("");
                            });
                        }
                    };

                    $scope.optHiringStage = {
                        autoBind: false,
                        //optionLabel: {
                        //    Name: "Select Applicant Status",
                        //    UID: null
                        //},
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                        },
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
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
                        },
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('HiringStage')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };
                }]
            };
        }
    ]);