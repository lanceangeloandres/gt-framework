app.directive('grdEmailContentEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdEmailContentEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem grdEmailContentEditor", $scope.dataItem);

                    //$("textarea.override-editor").closest("table.k-editor").addClass("override-editor");

                    if($scope.dataItem.CarbonCopy != null){
                        if($scope.dataItem.CarbonCopy.length > 0)
                            $scope.IsCarbonCopyVisible = true;
                        else
                            $scope.IsCarbonCopyVisible = false;

                    }

                    if($scope.dataItem.BlindCarbonCopy != null){
                        if($scope.dataItem.BlindCarbonCopy.length > 0)
                            $scope.IsBlindCarbonCopyVisible = true;
                        else
                            $scope.IsBlindCarbonCopyVisible = false;
                    }

                    $('#carbonCopyAnchor').on('click', function(){
                        $scope.$apply(function () {                        
                            $scope.IsCarbonCopyVisible = !$scope.IsCarbonCopyVisible;
                        });
                    });

                    $('#blindCarbonCopyAnchor').on('click', function(){
                        $scope.$apply(function () {                        
                            $scope.IsBlindCarbonCopyVisible = !$scope.IsBlindCarbonCopyVisible;
                        });
                    });

                    // $('#carbonCopyLabel').on('click', function(){
                    //     $scope.$apply(function () {                        
                    //         $scope.IsCarbonCopyVisible = !$scope.IsCarbonCopyVisible;
                    //     });
                    // });

                    // $('#blindCarbonCopyLabel').on('click', function(){
                    //     $scope.$apply(function () {                        
                    //         $scope.IsBlindCarbonCopyVisible = !$scope.IsBlindCarbonCopyVisible;
                    //     });
                    // });

                    $scope.optEmailContentType = {
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
                                    .controller('EmailContentType')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };

                    $scope.optEmailContentTypeAction = {
                        autoBind: false,
                        optionLabel: {
                            Name: "Select Type",
                            UID: null
                        },
                        cascadeFrom: 'ddlEmailContentType',
                        cascadeFromField: 'EmailContentType.Name',
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('EmailContentTypeAction')
                                    .action('Retrieve')
                                    .url
                            },
                        })
                    };

                    $("#emailBodyEditor").kendoEditor({
                        tools: [
                            "bold", "italic", "underline"
                        ]
                    });

                    
                    $scope.emailContent =
                    '<div email-content>' +
                    '    <p class="has-text-weight-semibold" contenteditable="false">Dear Charo,</p><br>' +
                    '    <p contenteditable="false">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</p><br>' +
                    '    <br>' +
                    '    <p contenteditable="false">Regards,</p>' +
                    '    <p class="has-text-weight-semibold" contenteditable="false">Homeless</p>' +
                    '    <p class="has-text-weight-semibold" contenteditable="false">Spider-Man</p>' +
                    '</div>'

                    $scope.optKendoEditorSubject = {
                        content: true,
                        tools: [
                            "bold", "italic", "underline",
                            {
                                name: "customTemplate",
                                //template: '<label for="templateTool" style="vertical-align:middle;">Background:</label><input kendo-drop-down-list id="templateTool" k-options="optTemplateTool" style="width: 100%" />'
                                template: '<input kendo-drop-down-list id="templateToolSubject" k-options="optTemplateToolSubject" style="width: 100%" />'

                            }
                        ],
                        change: function (e) {
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                        },
                        immutables: true
                    }

                    $scope.optKendoEditorBody = {
                        content: true,
                        tools: [
                            "bold", "italic", "underline",
                            {
                                name: "customTemplate",
                                //template: '<label for="templateTool" style="vertical-align:middle;">Background:</label><input kendo-drop-down-list id="templateTool" k-options="optTemplateTool" style="width: 100%" />'
                                template: '<input kendo-drop-down-list id="templateToolBody" k-options="optTemplateToolBody" style="width: 100%" />'

                            }
                        ],
                        change: function (e) {
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());
                        },
                        immutables: true
                    }
                   //$(document).ready(function () {
                   //    $scope.$apply(function () {
                   //        $("textarea.override-editor").closest("table.k-editor").addClass("override-editor");
                   //    });
                   // });

                    $scope.optTemplateToolSubject = {
                        autoBind: false,
                        optionLabel: {
                            Text: "Select Keyword",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Text",
                        dataValueField: "ImmutableValue",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('EmailKeyword')
                                    .action('Retrieve')
                                    .url
                            },
                        }),
                        change: function (e) {
                            $log.log("e", e);
                            var editor = $("#editorSubject").data("kendoEditor");
                            //editor.exec("inserthtml", { value: "<span style='background-color: yellow;' contenteditable='false'>" + e.sender.value() + "</span>" });
                            editor.exec("inserthtml", { value: e.sender.value() });

                            var templateTool = $("#templateToolSubject").data("kendoDropDownList");
                            templateTool.value(null);
                            
                            //editor.exec("inserthtml", { value: '<b contenteditable="false">' + '{{' + e.sender.value() + '}}' + '</b>'});
                        }
                    };

                    $scope.optTemplateToolBody = {
                        autoBind: false,
                        optionLabel: {
                            Text: "Select Keyword",
                            UID: null
                        },
                        filter: "contains",
                        dataTextField: "Text",
                        dataValueField: "ImmutableValue",
                        dataSource: new recruitment.CDataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('EmailKeyword')
                                    .action('Retrieve')
                                    .url
                            },
                        }),
                        change: function (e) {
                            $log.log("e", e);
                            var editor = $("#editorBody").data("kendoEditor");
                            //editor.exec("inserthtml", { value: "<span style='background-color: yellow;' contenteditable='false'>" + e.sender.value() + "</span>" });
                            editor.exec("inserthtml", { value: e.sender.value() });

                            var templateTool = $("#templateToolBody").data("kendoDropDownList");
                            templateTool.value(null);

                            //editor.exec("inserthtml", { value: '<b contenteditable="false">' + '{{' + e.sender.value() + '}}' + '</b>'});
                        }
                    };

                    //$(function () {
                    //    console.log("HELLO ISRAEL");
                    //    $("textarea.override-editor").closest("table.k-editor").addClass("override-editor");
                    //});


                    $scope.optRecipient = {
                        autoBind: true,
                        placeholder: 'Select Employee',
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({
                            requestEnd: function () {
                            },
                            transport: {
                                read: $repository
                                    .controller('Emp')
                                    .action('Retrieve')
                                    .url
                            }
                        }),
                        change: function (e) {
                            $scope.dataItem.set('UID', Guid.NewGuid());
                        }
                    };

                    // $scope.optCarbonCopy = {
                    //     autoBind: true,
                    //     placeholder: 'Select Employee',
                    //     dataTextField: "Recipient.FullName",
                    //     dataValueField: "UID",
                    //     dataSource: new recruitment.CDataSource({
                    //         requestEnd: function () {
                    //         },
                    //         transport: {
                    //             read: $repository
                    //                 .controller('EmailRecipient')
                    //                 .action('Retrieve')
                    //                 .queryString({
                    //                     type: 2
                    //                 })
                    //                 .url
                    //         }
                    //     }),
                    //     change: function (e) {
                    //         $scope.dataItem.set('UID', Guid.NewGuid());
                    //     }
                    // };

                    // $scope.optBlindCarbonCopy = {
                    //     autoBind: true,
                    //     placeholder: 'Select Employee',
                    //     dataTextField: "Recipient.FullName",
                    //     dataValueField: "UID",
                    //     dataSource: new recruitment.CDataSource({
                    //         requestEnd: function () {
                    //         },
                    //         transport: {
                    //             read: $repository
                    //                 .controller('EmailRecipient')
                    //                 .action('Retrieve')
                    //                 .queryString({
                    //                     type: 3
                    //                 })
                    //                 .url
                    //         }
                    //     }),
                    //     change: function (e) {
                    //         $scope.dataItem.set('UID', Guid.NewGuid());
                    //     }
                    // };
                }]
            };
        }
    ]);