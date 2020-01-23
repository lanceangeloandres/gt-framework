app.directive('grdEducbkgrdEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    dataItem: '=ngModel'
                },
                // templateUrl: recruitmentConfig.VirtualPath + '/Scripts/recruitment/directives/grd-educbkgrd-editor.html?v=' + templateVersion,
                template: kendo.template($("#grdEducationalBackground").html(), { useWithBlock: false }),
                controller: [
                    '$scope', '$attrs', function ($scope, $attrs) {

                        console.log($scope.dataItem)

                        // $scope.optStartDate = $scope.optEndDate = {
                        //     autoBind: true,
                        //     format: 'MMM dd, yyyy'
                        // }

                        $scope.optSchoolName = {
                            dataTextField: "SchoolName",
                            dataValueField: "UID",
                            optionLabel: "Select School",
                            filter: "contains",
                            dataSource: new recruitment.CDataSource({
                                transport: {
                                    read: $repository
                                        .controller('School')
                                        .action('RetrieveNoCourses')
                                        .url
                                },
                                sort: { field: 'SchoolName', dir: 'asc' }
                            }),
                            change: function(e){
                                console.log($scope.dataItem)
                            }
                        };

                        $scope.optEducLevel = {
                            dataTextField: "Description",
                            dataValueField: "UID",
                            optionLabel: "Select Education Level",
                            dataSource: new recruitment.CDataSource({
                                transport: {
                                    read: $repository
                                        .controller('EducLevel')
                                        .action('Retrieve')
                                        .url
                                },
                                sort: { field: 'Level', dir: 'desc' }
                            }),
                            change: function(e){
                                console.log($scope.dataItem)
                            }
                        };

                        $scope.optCourse = {
                            autoBind: false,
                            dataTextField: "CourseName",
                            dataValueField: "UID",
                            cascadeFrom: "SchoolName",
                            cascadeFromField: "School.UID",
                            optionLabel: "Select Course",
                            filter: "contains",
                            dataSource: new recruitment.CDataSource({
                                transport: {
                                    read: $repository
                                        .controller('SchoolCourse')
                                        .action('Retrieve')
                                        .url
                                },
                                sort: { field: 'CourseName', dir: 'asc' }
                            }),
                            change: function(e){
                                console.log($scope.dataItem)
                            }
                        }
                        
                        var preventAction = false;

                        $scope.optGrdRecognition = {
                            toolbar: [
                                {
                                    name: "create",
                                    text: "Add a Recognition"
                                },
                                "excel",
                            ],
                            dataSource: {
                                transport:{
                                    read: function(e){
                                        if ($scope.dataItem.Recognitions.length <= 0) {
                                            e.success($scope.dataItem.Recognitions);
                                        }
                                        else {
                                            var opt = {
                                                total: $scope.dataItem.Recognitions.length,
                                                data: $scope.dataItem.Recognitions
                                            };
                                            e.success(opt.data);
                                        }
                                    },
                                    create: function(e){
                                        // e.data.UID = Guid.NewGuid();
                                        // $scope.dataItem.Recognitions.push(e.data)
                                        $scope.dataItem.NoRecognitions = $scope.dataItem.Recognitions.length

                                        e.success(e.data);
                                    },
                                    update: function(e){
                                        // var index = $scope.dataItem.Recognitions.findIndex(x => x.UID === e.data.UID);
                                        // $scope.dataItem.Recognitions[index] = e.data;

                                        for (var r = 0;
                                            r < $scope.dataItem.Recognitions.length;
                                            r++) {
                                            if ($scope.dataItem.Recognitions[r].UID ===
                                                e.data.UID) {
                                                $scope.dataItem.Recognitions[r] = e.data;
                                            }
                                        }

                                        e.success(e.data);
                                    },
                                    destroy: function(e){
                                        // $scope.dataItem.Recognitions.splice($scope.dataItem.Recognitions.map(i => i.UID)
                                        //         .indexOf(e.data.UID),
                                        //         1);
                                        // var index = 0;
                                        for (var r = 0;
                                            r < $scope.dataItem.Recognitions.length;
                                            r++) {
                                            if ($scope.dataItem.Recognitions[r].UID ===
                                                e.data.UID) {
                                                    $scope.dataItem.Recognitions.splice(r,1);
                                                    break;
                                            }
                                        }

                                        console.log('Delete $scope.dataItem.Recognitions', $scope.dataItem.Recognitions)
                                        
                                        e.success(e.data);
                                    }
                                },
                                batch:false,
                                pageSize: 5,
                                schema: {
                                    data: function (data) {
                                        $log.log("schema data", data);
                                        return data;
                                    },
                                    total: function (data) {
                                        $log.log("schema total", data.length);
                                        return data.length;
                                    },
                                    model: {
                                        id: 'UID',
                                        fields: {
                                            UID: { type: 'string', editable: false, nullable: true },
                                            RecognitionName: {
                                                type: 'string',
                                                name: 'RecognitionName',
                                                validation: {
                                                    required: true
                                                }
                                            },
                                            RecognitionYear: {
                                                type: 'string',
                                                name: 'RecognitionYear',
                                                validation: {
                                                    required: true
                                                }
                                            },
                                            RecognitionType: {
                                                type: 'string',
                                                name: 'RecognitionType',
                                                validation: {
                                                    required: true
                                                }
                                            },
                                            Remarks: {
                                                type: 'string',
                                                name: 'Remarks'
                                            }
                                        }
                                    }
                                },
                                requestStart: function (e) { //prevent grid navigation
                                    $log.log("requeststart");
                                    if (preventAction) {
                                        e.preventDefault();
                                        warningNotification("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                        // warningNotification.show("Please fill in the required field(s) and make sure to click the check [✔] button to commit your entry before sorting or filtering.", "");
                                    }
                                }
                            },
                            edit: function () {
                                $log.log("edit");
                                preventAction = true;
    
                            },
                            save: function (e) {
                                $log.log("save", e);
                                preventAction = false;
    
                            },
                            remove: function (e) {
                                $log.log("remove");
                                preventAction = false;
                            },
                            cancel: function (e) {
                                $log.log("cancel", e);
                                preventAction = false;
                            },
                            autoBind: true,
                            sortable: true,
                            reorderable: false,
                            resizable: true,
                            filterable: false,
                            mobile: true,
                            pageable: {
                                refresh: true,
                                pageSizes: true
                            },
                            columns: [
                                {
                                    field: "RecognitionName",
                                    title: "Recognition",
                                    width: 150
                                },
                                {
                                    field: "RecognitionYear",
                                    title: "Recognition Year",
                                    editor: function(container, options){
                                        $("<input required='required' />")
                                            .attr('name', options.field)
                                            .appendTo(container)
                                            .kendoMaskedTextBox({
                                                mask: "0000"
                                            })
                                    },
                                    template: "#= RecognitionYear #",
                                    width: 150
                                },
                                {
                                    field: "RecognitionType",
                                    title: "Recognition Type",
                                    editor: function(container, options){
                                        $("<input required='required'/>")
                                            .attr('name', options.field)
                                            .appendTo(container)
                                            .kendoDropDownList({
                                                autoBind: false,
                                                dataTextField: 'Text',
                                                dataValueField: 'Text',
                                                dataSource: {
                                                    data: recruitment.appEnum.recognitionType.toArray()
                                                }
                                            })
                                    },
                                    width: 150,
                                    template: "#= RecognitionType#"
                                },
                                {
                                    field: "Remarks",
                                    title: "Remarks",
                                    width: 150
                                },
                                { 
                                    command: [
                                        "edit", 
                                        "destroy"
                                    ], 
                                    title: "&nbsp;", 
                                    width: 250 
                                }
                                // {
                                //     command: [
                                //         {
                                //             name: "edit",
                                //             width: 75,
                                //             text: {
                                //                 edit: "<i class='material-icons md-18'/>", update: "<i class='material-icons md-18'/>", cancel: "<i class='material-icons md-18'/>"
                                //             }
                                //         },
                                //         {
                                //             name: "destroy",
                                //             width: 75,
                                //             text: "<i class='material-icons md-18'/>"
                                //         }
                                //     ]
                                // }
                            ],
                            editable:  {
                                mode: "inline",
                                confirmation: false
                            }
                        } 
                    }
                ],
                link: function ($scope, $attrs) {
                }
            };
        }
    ]);