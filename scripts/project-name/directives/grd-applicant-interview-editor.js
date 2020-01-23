app.directive('grdApplicantInterviewEditor',
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
                template: kendo.template($("#grdApplicantInterviewEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {

                    $log.log("dataitem editor", $scope.dataItem);
                    $log.log("parentUid editor", $scope.parentUid);

                    //$scope.todayDateIncreBy1 = new Date() + 1;

                    // $scope.dataItem.ScheduleTime = kendo.toString(new Date($scope.dataItem.ScheduleTime), "HH:mm");

                    if ($scope.dataItem.UID === null) {
                        $log.log('add');
                        $scope.dataItem.ApplicantManpowerReq.UID = $scope.parentUid;
                        $scope.isHideApprovalStat = false;

                    } else if ($scope.dataItem.UID !== null) {
                        $log.log("update");
                        $scope.isHideApprovalStat = true;

                        $scope.$apply(function () {
                            var myEl = angular.element(document.querySelector('#ddlExaminer'));
                            myEl.attr('k-ng-model', "dataItem.ExaminerEmp");
                        });
                        $scope.$apply(function () {
                            var myEl = angular.element(document.querySelector('#ddlExamStatus'));
                            myEl.attr('k-ng-model', "dataItem.ExamStatus");
                        });
                        $scope.$apply(function () {
                            var myEl = angular.element(document.querySelector('#ddlExamType'));
                            myEl.attr('k-ng-model', "dataItem.ExamType");
                        });
                    }

                    $scope.employeeOptions = {
                        autoBind: false,
                        placeholder: 'Select Employee',
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            requestEnd: function () {
                            },
                            transport: {
                                read: $repository
                                    .controller('Emp')
                                    .action('RetrieveEmp')
                                    .url
                            }
                        }),
                        change: function (e) {
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                        }
                    };

                    $scope.optApprovalStat = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('ApprovalStatus')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optInterviewType = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('InterviewType')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };

                    

                    $scope.optInterviewStatus = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('InterviewStatus')
                                    .action('IRetrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optMeetingRoom = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "Name",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('MeetingRoom')
                                    .action('Retrieve')
                                    .url
                            },
                        }),
                    };

                    $scope.optInterviewer = {
                        autoBind: false,
                        optionLabel: {
                            FullName: "Select Employee",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            sort: [{ field: "FullName", dir: "asc" }],
                            transport: {
                                read: $repository
                                    .controller('Emp')
                                    .action('RetrieveEmp')
                                    .url
                            },
                        }),
                    };

                    $scope.optScheduleDate = {
                        format: 'MMM dd, yyyy',
                        //disableDates: function (date) {
                        //    return ((new Date()) >= (new Date(date)));
                        //},
                        dateInput: true
                    }

                    console.log(kendo.toString(new Date($scope.dataItem.ScheduleTime), "HH:mm"))

                    // $scope.dataItem.ScheduleTime = kendo.toString(new Date($scope.dataItem.ScheduleTime), "HH:mm")

                    $scope.optScheduleTime = {
                        format: 'hh:mm tt',
                        // change: function (e) {
                        //     debugger
                        //     var item = this.value();
                        //     $scope.dataItem.ScheduleTime = kendo.toString(new Date(this.value()), "HH:mm");
                        //     console.log($scope.dataItem.ScheduleTime)
                        // },
                        dateInput: true
                    }
                }]
            };
        }
    ]);