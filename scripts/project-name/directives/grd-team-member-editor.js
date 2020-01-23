app.directive('grdTeamMemberEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdTeamMemberEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem editor", $scope.dataItem);

                    if ($scope.dataItem.UID === null) {
                        $scope.$apply(function () {
                            $("ddlRole").removeAttr("data-bind"); 
                            var myEl = angular.element(document.querySelector('#ddlRole'));
                            myEl.attr('ng-model', "dataItem.UserRoleType");
                        });
                    }
                    else {
                        $("ddlRole").removeAttr("ng-model");
                        var myEl = angular.element(document.querySelector('#ddlRole'));
                        myEl.attr('data-bind', "value: UserRoleType");
                    }

                    $scope.optRole = {
                        autoBind: false,
                        optionLabel: {
                            Text: "Select Role",
                            Value: null
                        },
                        //placeholder: 'Please Select',
                        //index: 0,
                        //value: null,
                        //filter: "contains",
                        dataTextField: "Text",
                        dataValueField: "Value",
                        dataSource: {
                            data: recruitment.appEnum.userRoleType.toArray()
                        },
                    };

                    //var dataSource = new kendo.data.DataSource({
                    //    pageSize: 20,
                    //    data: [{
                    //        ProductID: 1,
                    //        ProductName: 'TEST',
                    //        Category: 'TEST',
                    //        UnitPrice: 2
                    //    }],
                    //    autoSync: true,
                    //    schema: {
                    //        model: {
                    //            id: "ProductID",
                    //            fields: {
                    //                ProductID: { editable: false, nullable: true },
                    //                ProductName: { validation: { required: true } },
                    //                Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages" } },
                    //                UnitPrice: { type: "number", validation: { required: true, min: 1 } }
                    //            }
                    //        }
                    //    }
                    //});
                    var retrieveEmpDS = new kendo.data.DataSource({//new recruitment.CDataSource({ 
                        //pageSize: 10,
                        autoSync: false,
                        transport: {
                            //read: $repository
                            //    .controller('Emp')
                            //    .action('RetrieveEmp')
                            //    .url
                            read: function (opt) {
                                $repository
                                    .controller('Emp')
                                    .action('RetrieveEmpDesignation')
                                    .get()
                                    .success(function (r) {
                                        $log.log(r);
                                        opt.success(r.Data);
                                    });
                            }
                        }
                    });

                    //$("#filter").kendoFilter({
                    //    dataSource: retrieveEmpDS,//dataSource,
                    //    applyButton: true,
                    //    fields: [
                    //        { name: "FullName", label: "Full Name" },
                    //        { name: "Code", label: "Code" },
                    //        { name: "Division.Name", label: "Division", editorTemplate: divisionDropDownEditor },
                    //        { name: "Department.Name", type: "number", label: "Department", defaultValue: 1, editorTemplate: departmentDropDownEditor },
                    //        { name: "Section.Name", type: "number", label: "Section", defaultValue: 1, editorTemplate: sectionDropDownEditor },
                    //        { name: "Position.JobLevel.JobLevelGroup.Name", type: "number", label: "Job Level Group", defaultValue: 1, editorTemplate: categoryDropDownEditor },
                    //        { name: "Position.JobLevel.Name", type: "number", label: "Job Level", defaultValue: 1, editorTemplate: categoryDropDownEditor },
                    //        { name: "Position.Name", type: "number", label: "Position", defaultValue: 1, editorTemplate: categoryDropDownEditor },
                    //        //{ name: "UnitPrice", type: "number", label: "Unit Price", editorTemplate: unitPriceEditor },
                    //        //{ name: "UnitsInStock", type: "number", label: "Units In Stock" },
                    //        //{ name: "QuantityPerUnit", label: "Quantity Per Unit" },
                    //    ]
                    //});

                    //function unitPriceEditor(container, options) {
                    //    $('<input data-bind="value: value" name="' + options.field + '"/>')
                    //        .appendTo(container)
                    //        .kendoNumericTextBox();
                    //}

                    //$scope.division = "";
                    //$scope.department = "";
                    //$scope.section = "";
                    //$scope.position = "";

                    //function divisionDropDownEditor(container, options) {
                    //    $scope.division = new recruitment.CDataSource({
                    //        transport: {
                    //            read: $repository
                    //                .controller('Division')
                    //                .action('Retrieve')
                    //                .url
                    //        },
                    //    });

                    //    $('<input id="division" data-bind="value: value" name="' + options.field + '"/>')
                    //        .appendTo(container)
                    //        .kendoDropDownList({
                    //            dataTextField: "Name",
                    //            dataValueField: "Name",
                    //            filter: "contains",
                    //            dataSource: $scope.division,
                    //            dataBound: function () {
                    //                if ($scope.division.value() && $scope.department.value() && $scope.section.value()) { //check if parents have value
                    //                    $scope.position.enable(true); //enable the widget
                    //                    $scope.position.dataSource.filter([ //filter the dataSource
                    //                        { field: "Division.Name", operator: "eq", value: parseInt($scope.division.value()) },
                    //                        { field: "Department.Name", operator: "eq", value: parseInt($scope.department.value()) },
                    //                        { field: "Section.Name", operator: "eq", value: parseInt($scope.section.value()) }
                    //                    ]);
                    //                } else {
                    //                    $scope.position.value(""); //clear the value
                    //                    $scope.position.enable(false); //disable the widget
                    //                }
                    //            }
                    //        });
                    //}

                    //function departmentDropDownEditor(container, options) {
                    //    $('<input id="department" data-bind="value: value" name="' + options.field + '"/>')
                    //        .appendTo(container)
                    //        .kendoDropDownList({
                    //            dataTextField: "Name",
                    //            dataValueField: "Name",
                    //            filter: "contains",
                    //            cascadeFrom: 'division',
                    //            cascadeFromField: 'Division.Name',
                    //            dataSource: new recruitment.CDataSource({
                    //                transport: {
                    //                    read: $repository
                    //                        .controller('Department')
                    //                        .action('Retrieve')
                    //                        .url
                    //                },
                    //            })
                    //        });
                    //}

                    //function sectionDropDownEditor(container, options) {
                    //    $('<input id="section" data-bind="value: value" name="' + options.field + '"/>')
                    //        .appendTo(container)
                    //        .kendoDropDownList({
                    //            dataTextField: "Name",
                    //            dataValueField: "Name",
                    //            filter: "contains",
                    //            cascadeFrom: 'department',
                    //            cascadeFromField: 'Department.Name',
                    //            dataSource: new recruitment.CDataSource({
                    //                transport: {
                    //                    read: $repository
                    //                        .controller('Section')
                    //                        .action('Retrieve')
                    //                        .url
                    //                },
                    //            })
                    //        });
                    //}

                    //function categoryDropDownEditor(container, options) {
                    //    $('<input data-bind="value: value" name="' + options.field + '"/>')
                    //        .appendTo(container)
                    //        .kendoDropDownList({
                    //            dataTextField: "CategoryName",
                    //            dataValueField: "CategoryID",
                    //            dataSource: {
                    //                type: "odata",
                    //                transport: {
                    //                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                    //                }
                    //            }
                    //        });
                    //}

                    // var optionalTemplate = '<span class="k-state-default"></span>' +
                    //     '<span class="k-state-default"><h3></h3><p></p></span>';
                             //var customerTemplate = '<span class="k-state-default" style="background-image: url(\'../content/web/Customers/#:data.CustomerID#.jpg\')"></span>' +
                    //    '<span class="k-state-default"><h3>#: data.FullName #</h3><p>#: data.Code #</p></span>';
                    var listbox = $("#optional").kendoListBox({
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        template: function (e) {
                            $log.log("out of my league", e);
                            return '<div class="card">' +
                                '<article class="media recent-post optional-team-member"> ' +
                                '    <div class="media-left is-hidden-mobile"> ' +
                                '        <figure class="image is-32x32"> ' +
                                '            <img class="dropdown-photo" id="src-' + e.UID + '" uid=' + e.UID + ' is-loaded-' + e.UID + '="false" js-request-url="' + recruitmentConfig.VirtualPath + '/Member/PictureB64?uid=' + e.UID + '" src="' + recruitmentConfig.VirtualPath + '/Content/assets/images/photo-loader.svg"> ' +
                                '        </figure> ' +
                                '    </div> ' +
                                '    <div class="media-content"> ' +
                                '        <div> ' +
                                '            <h5 class="post-title">' + e.FullName + '</h5> ' +
                                '            <div class="post-timestamp">' + e.Code + '</div> ' +
                                '            <div class="post-read-more"><p>' + e.Position.Name + '</p></div> ' +
                                '        </div> ' +
                                '    </div> ' +
                                '</article>' +
                                '</div>'
                        },
                        dataSource: retrieveEmpDS,
                        autoBind: false,
                        //selectable: "multiple",
                        //dataSource: new recruitment.CDataSource({
                        //    //transport: {
                        //    //    read: {
                        //    //        dataType: "jsonp",
                        //    //        url: "https://demos.telerik.com/kendo-ui/service/Customers",
                        //    //    }
                        //    //}
                        //    transport: {
                        //        read: $repository
                        //            .controller('Emp')
                        //            .action('RetrieveEmp')
                        //            .url
                        //    },
                        //}),
                        draggable: { placeholder: customPlaceholder },
                        dropSources: ["selected"],
                        connectWith: "selected",
                        toolbar: {
                            position: "right",
                            tools: [/*"moveUp", "moveDown",*/ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"]
                        },
                        dataBound: function () {                          
                            //$scope.dataItem.TeamMemberEmpScope = [];
                            //$scope.dataItem.TeamMemberEmpScope = $('#selected').data('kendoListBox').dataItems();
                            //$log.log('optional dataBound', $scope.dataItem.TeamMemberEmpScope);
                        },
                        //add: function () {                            
                        //    //this.refresh();
                        //    $scope.dataItem.TeamMemberEmpScope = [];
                        //    $scope.dataItem.TeamMemberEmpScope = $('#selected').data('kendoListBox').dataItems();
                        //    $log.log('optional add', $scope.dataItem.TeamMemberEmpScope);
                        //},
                        //remove: function () {                           
                        //    //this.refresh();
                        //    $scope.dataItem.TeamMemberEmpScope = [];
                        //    $scope.dataItem.TeamMemberEmpScope = $('#selected').data('kendoListBox').dataItems();
                        //    $log.log('optional remove', $scope.dataItem.TeamMemberEmpScope);
                        //},
                        //change: function () {                                                     
                        //    //this.refresh();
                        //    $scope.dataItem.TeamMemberEmpScope = [];
                        //    $scope.dataItem.TeamMemberEmpScope = $('#selected').data('kendoListBox').dataItems();
                        //    $log.log('optional change', $scope.dataItem.TeamMemberEmpScope);
                        //}
                    }).data("kendoListBox");

                    //$("#pager").kendoPager({
                    //    //autoBind: false,
                    //    dataSource: retrieveEmpDS
                    //});

                    function removeFromArray(array, value) {
                        var idx = array.indexOf(value);
                        if (idx !== -1) {
                            array.splice(idx, 1);
                        }
                        return array;
                    }
                    
                    var selected = $("#selected").kendoListBox({
                        dataTextField: "FullName",
                        dataValueField: "UID",
                        template: function (e) {
                            $log.log("out of my league", e);
                            return '<div class="card">' +
                                '<article class="media recent-post optional-team-member"> ' +
                                '    <div class="media-left is-hidden-mobile"> ' +
                                '        <figure class="image is-32x32"> ' +
                                '            <img class="dropdown-photo" id="src-' + e.UID + '" uid=' + e.UID + ' is-loaded-' + e.UID + '="false" js-request-url="' + recruitmentConfig.VirtualPath + '/Member/PictureB64?uid=' + e.UID + '" src="' + recruitmentConfig.VirtualPath + '/Content/assets/images/photo-loader.svg"> ' +
                                '        </figure> ' +
                                '    </div> ' +
                                '    <div class="media-content"> ' +
                                '        <div> ' +
                                '            <h5 class="post-title">' + e.FullName + '</h5> ' +
                                '            <div class="post-timestamp">' + e.Code + '</div> ' +
                                '            <div class="post-read-more"><p>' + e.Position.Name + '</p></div> ' +
                                '        </div> ' +
                                '    </div> ' +
                                '</article>' +
                                '</div>'                         
                        },
                        draggable: { placeholder: customPlaceholder },
                        dropSources: ["optional"],
                        connectWith: "optional",
                        toolbar: {
                            position: "right",
                            tools: [/*"moveUp", "moveDown",*/ "remove"]
                        },
                        dataSource: {
                            data: $scope.dataItem.TeamMemberEmpScope
                        },
                        //dataSource: {//$scope.dataItem.TeamMemberEmpScope
                        //    transport: {
                        //        create: function () {
                        //            $log.log("Cause they fill the open air");
                        //        },
                        //        read: function () {
                        //            $log.log("Lit up the world as I fell asleep");
                        //        },
                        //        update: function () {
                        //            $log.log("If ten million fireflies");
                        //        },
                        //        destroy: function () {
                        //            $log.log("You would not believe your eyes");
                        //        }
                        //    }
                        //}
                        dataBound: function () {
                            //$scope.dataItem.TeamMemberEmpScope = $('#selected').data('kendoListBox').dataItems();
                            //$log.log('selected dataBound', $scope.dataItem.TeamMemberEmpScope);
                        },
                        add: function (e) {
                            //this.refresh();
                            $log.log('selected add', e.dataItems);
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());

                            //e.dataItems.forEach(function (element) {
                            //    $log.log('element', element);
                            //    $scope.dataItem.TeamMemberEmpScope.push(element);
                            //});
                            $log.log('$scope.TeamMemberEmpScope', $scope.dataItem.TeamMemberEmpScope);
                        },
                        remove: function (e) {                           
                            //this.refresh();
                            $log.log('selected remove', e);
                            $scope.dataItem.set('DirtyUID', Guid.NewGuid());

                            e.dataItems.forEach(function (element) {
                                //$scope.dataItem.TeamMemberEmpScope.some(item => {
                                //    if (item.UID === element.UID) // Case sensitive, will only remove first instance
                                //        $scope.dataItem.TeamMemberEmpScope.splice($scope.dataItem.TeamMemberEmpScope.indexOf(item), 1)
                                //});
                                removeFromArray($scope.dataItem.TeamMemberEmpScope, element);
                                //$scope.dataItem.TeamMemberEmpScope = $scope.dataItem.TeamMemberEmpScope.filter(x => x.UID === element.UID);
                            });
                            $log.log('$scope.TeamMemberEmpScope', $scope.dataItem.TeamMemberEmpScope);
                        },
                        change: function () {                                                     
                            //this.refresh();
                            //$log.log('selected change', $scope.dataItem.TeamMemberEmpScope);
                        }
                    }).data("kendoListBox");

                    $("#search").on("input", function (e) {
                        selected.dataSource.filter({ field: "FullName", value: $(e.target).val(), operator: "contains" });
                    });

                    function customPlaceholder(draggedItem) {
                        return draggedItem
                            .clone()
                            .addClass("custom-placeholder")
                            .removeClass("k-ghost");
                    }

                    //var filter = $("#filter").getKendoFilter();
                    //$log.log('filter', filter);
                    //filter.applyFilter();

                    //$scope.onEditSubmit = function () {
                    //    $log.log('filter', filter);
                    //}

                    //$("#load").click(function (e) {
                    //    e.preventDefault();
                    //    var options = localStorage["kendo-filter-options"];
                    //    if (options) {
                    //        options = JSON.parse(options);
                    //        options.dataSource = dataSource;
                    //        filter.setOptions(options);
                    //        filter.applyFilter();
                    //    }
                    //});
                }]
            };
        }
    ]);