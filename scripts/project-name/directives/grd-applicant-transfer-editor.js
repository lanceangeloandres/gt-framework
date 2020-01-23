app.directive('grdApplicantTransferEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel',
                    parentUid: '=parentUid'
                },
                replace: true,
                template: kendo.template($("#grdApplicantTransferEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    //$log.log("dataitem editor", $scope.dataItem);
                    //$log.log("parentUid", $scope.parentUid);

                    $scope.transferType = []

                    if ($scope.dataItem.UID === null) {
                        $scope.$apply(function () {
                            $repository
                                .controller("ApplicantTransferHistory")
                                .action('GetTransferInfoByAppManpowerUid')
                                .queryString({
                                    appManpowerUid: $scope.parentUid
                                })
                                .get()
                                .success(function (r) {
                                    $scope.$apply(function () {
                                        $scope.dataItem.Remarks = r.Remarks;
                                        $scope.dataItem.TransferType = r.TransferType;
                                        //$scope.dataItem.Employee = r.Employee;
                                        $scope.dataItem.ApplicantManpowerReq = r.ApplicantManpowerReq;
                                        $scope.dataItem.ApplicantConfig = r.ApplicantConfig;
                                        if ($scope.dataItem.ApplicantConfig.Currency === null) {
                                            $scope.dataItem.ApplicantConfig.Currency = {
                                                UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                                Name: 'Philippine Peso'
                                            }
                                        }
                                        else {
                                            if ($scope.dataItem.ApplicantConfig.Currency.UID === null) {
                                                $scope.dataItem.ApplicantConfig.Currency = {
                                                    UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                                    Name: 'Philippine Peso'
                                                }
                                            }
                                            else if ($scope.dataItem.ApplicantConfig.Currency.UID === Guid.Empty) {
                                                $scope.dataItem.ApplicantConfig.Currency = {
                                                    UID: 'AFA41F12-487A-4645-ACB8-A62A2EF67218',
                                                    Name: 'Philippine Peso'
                                                }
                                            }
                                        }  
                                        if (r.Employee === null) {
                                            $scope.dataItem.Employee = {
                                                UID: null,
                                                FullName: 'Please Select'
                                            }
                                        }
                                        else {
                                            if (r.Employee.UID === null) {
                                                $scope.dataItem.Employee = {
                                                    UID: null,
                                                    FullName: 'Please Select'
                                                }
                                            }
                                            else if (r.Employee.UID === Guid.Empty) {
                                                $scope.dataItem.Employee = {
                                                    UID: null,
                                                    FullName: 'Please Select'
                                                }
                                            }
                                        }
                                        $log.log("dataitem", $scope.dataItem);
                                        $repository
                                            .controller("TransferType")
                                            .action('Retrieve')
                                            .get()
                                            .success(function (r) {
                                                //$scope.$apply(function () {
                                                $scope.transferType = JSON.parse(JSON.stringify(r.Data));
                                                $log.log('TransferType', $scope.transferType);

                                                if ($scope.dataItem.ApplicantManpowerReq.ApplicantHiringStageLog.HiringStage.IsForHiredDate === true) {
                                                    $scope.transferType.forEach(function (element) {
                                                        if (element.UID.toUpperCase() === "32B446BA-DE30-4EBA-A2D0-2E7C6B181A19") { //Transfer
                                                            element.InActive = false;
                                                            $log.log('transferred', element);
                                                        }
                                                        else if (element.UID.toUpperCase() === "23C99D2E-45C6-426F-930D-005FA06B476C") { //Override
                                                            element.InActive = true;
                                                        }
                                                    });
                                                }
                                                else if ($scope.dataItem.ApplicantManpowerReq.ApplicantHiringStageLog.HiringStage.IsForHiredDate === false) {
                                                    $scope.transferType.forEach(function (element) {
                                                        if (element.UID.toUpperCase() === "23C99D2E-45C6-426F-930D-005FA06B476C") { //Override
                                                            element.InActive = false;
                                                            $log.log('override', element);
                                                        } else if (element.UID.toUpperCase() === "32B446BA-DE30-4EBA-A2D0-2E7C6B181A19") { //Transfer
                                                            element.InActive = true;
                                                        }
                                                    });
                                                }

                                                var ddlTransferType = $("#ddlTransferType").data("kendoDropDownList");
                                                ddlTransferType.dataSource.read();
                                                ddlTransferType.dataSource.data($scope.transferType);
                                                //});
                                            });
                                    });
                                });
                        });
                    }



                    $scope.optHiredDate = {
                        format: 'MMM dd, yyyy',
                        //disableDates: function (date) {
                        //    return ((new Date()) >= (new Date(date)));
                        //},
                        dateInput: true
                    }

                    $scope.optEmp = {
                        autoBind: false,
                        //index: 0,
                        //value: null,
                        filter: "contains",
                        dataTextField: "FullName",
                        dataValueField: "UID",
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
                            }
                        }),
                        dataBound: function () {
  
                        }
                    };

                    $scope.optTransferType = {
                        autoBind: false,
                        //index: 0,
                        //value: null,
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataBound: function (e) {
                            $log.log('dataBound', e);
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
                                    //if (dataItem.Name === "Transfer") {
                                    //    dataItem.InActive = true;
                                    //    //var dropdown = $("#ddlTransferType").data("kendoDropDownList");
                                    //    //var oranges = dropdown.dataSource.get(1);
                                    //    //$log.log('oranges', oranges);
                                    //    //oranges.set("InActive", true);
                                    //}

                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
                                });
                            }
                        },
                        select: function (e) {
                            if (e.dataItem.InActive) {
                                e.preventDefault();
                            }
                        },
                        template: kendo.template($("#template").html()),
                        dataSource: {//new kendo.data.DataSource({ //recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            data: $scope.transferType,
                            //transport: {
                            //    //read: $repository
                            //    //    .controller('TransferType')
                            //    //    .action('Retrieve')
                            //    //    .url
                            //    read: function (e) {
                            //        if ($scope.transferType.length <= 0) {
                            //            e.success($scope.transferType);
                            //        }
                            //        else {
                            //            e.success($scope.transferType);
                            //        }
                            //        //else {
                            //        //    var opt = {
                            //        //        total: $scope.transferType.length,
                            //        //        data: $scope.transferType
                            //        //    };
                            //        //    e.success(opt.data);
                            //        //}

                            //        console.log('read e.data', e.data);
                            //        console.log('read transferType', $scope.transferType);
                            //    },
                            //},
                            requestEnd: function (e) {
                                $log.log('requestEnd', e);

                                //if (e.hasOwnProperty('response')) {
                                //    if (e.response.length > 0) {
                                //        if ($scope.dataItem.ApplicantManpowerReq.ApplicantHiringStageLog.ApplicationStatus.IsForHiredDate === true) {
                                //            e.response.Data.forEach(function (element) {
                                //                if (element.UID.toUpperCase() === "32B446BA-DE30-4EBA-A2D0-2E7C6B181A19") { //Transfer
                                //                    element.InActive = true;
                                //                    $log.log('transferred', element);
                                //                }
                                //            });
                                //        }
                                //        else if ($scope.dataItem.ApplicantManpowerReq.ApplicantHiringStageLog.ApplicationStatus.IsForHiredDate === false) {
                                //            e.response.Data.forEach(function (element) {
                                //                if (element.UID.toUpperCase() === "23C99D2E-45C6-426F-930D-005FA06B476C") { //Override
                                //                    element.InActive = true;
                                //                    $log.log('override', element);
                                //                }
                                //            });
                                //        }
                                //    }
                                //}
                            }
                        }
                        //})
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
                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
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
                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
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
                        //index: 0,
                        //value: null,
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
                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
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
                            requestEnd: function () {
                            }
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
                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
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
                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
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
                                    //$scope.dataItem.set('DirtyUID', Guid.NewGuid());
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