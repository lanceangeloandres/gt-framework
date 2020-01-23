app.directive('grdApplicantEditor',
    [
        app.Services.Repository, app.Services.Log,
        function ($repository, $log) {
            return {
                restrict: 'AE',
                scope: {
                    dataItem: '=ngModel'
                },
                replace: true,
                template: kendo.template($("#grdApplicantEditor").html(), { useWithBlock: false }),
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    $log.log("dataitem grdApplicantEditor", $scope.dataItem);

                    $scope.editStepperInstance;

                    
                    $scope.markUpTooltip = function (className, content) {
                        $('.' + className).tooltipster({
                            content: content,
                            contentAsHTML: true,
                            side: "top",
                            animationDuration: 0,
                            delay: 100,
                            theme: ['tooltipster-punk', 'tooltipster-punk-customized'],
                            trigger: 'hover',
                            functionBefore: function (instance, helper) {
                                var _tpl = kendo.template($("#mrf-slots-computation").html())($scope.view_dataItem.ManpowerRequest);
                                instance.content(_tpl);
                            },
                            //functionBefore: function (instance, helper) {
                            //    var $origin = $(helper.origin);
                            //    var _rawScore = $origin[0].dataset;

                            //    $log.log('$origin', $origin);
                            //    $log.log('_rawScore', _rawScore);
                            //}
                        });

                    }

                    $scope.$on('editInit', function(event, data){    
                        $scope.originalDataItem = $scope.dataItem = data;

                        var editstepper = document.querySelector('.edit-stepper');

                        $scope.editStepperInstance = new MStepper(editstepper, {
                            firstActive: 0,
                            linearStepsNavigation: false,
                            autoFocusInput: false,
                            autoFormCreation: false,
                            stepTitleNavigation: true
                        })

                        $scope.onEditNextStep = function() {
                            $scope.editApplicantValidation.validate();
                            $scope.editStepperInstance.nextStep();
                            $scope.onRetrieveBasicInfo($scope.originalDataItem, 1);
                        }

                        $scope.onEditPrevStep = function() {
                            $scope.editStepperInstance.prevStep();
                            $scope.onRetrieveBasicInfo($scope.originalDataItem, -1);
                        }

                        $('.applicantInfo').change(function(){
                            $scope.ApplicantInfoUpdated();
                        });

                        $('.applicantInfoCont').change(function(){
                            $scope.ApplicantInfoContUpdated();
                        });

                        $('.applicantInfoAddr').change(function(){
                            $scope.ApplicantInfoAddrUpdated();
                        });



                    });

                    $scope.$on('onRetrieveBasicInfo', function(event, data){
                        $scope.onRetrieveBasicInfo(data);
                    });

                    $scope.$on('onRetrieveApplicationDet', function(event, data){
                        $scope.onRetrieveApplicationDet(data);
                    });
                    
                    $scope.$on('resetEditStepper', function(){
                        var steps = $scope.editStepperInstance.getSteps().steps;

                        for(var i=0; i<steps.length; i++){
                            var step = steps[i];
                            
                            if(step != undefined){
                                if(step.className.includes('wrong')){
                                    var id = step.id;
                                    $('#' + id).removeClass('wrong');
                                }else if(step.className.includes('done')){
                                    var id = step.id;
                                    $('#' + id).removeClass('done');
                                }
                            }
                        }
                    });

                    $scope.ApplicantInfoUpdated = function() {
                        $scope.dataItem.ApplicantInfo.Updated = true;
                        console.log('$scope.ApplicantInfoUpdated', $scope.dataItem.ApplicantInfo.Updated)
                    }

                    $scope.ApplicantInfoContUpdated = function() {
                        $scope.dataItem.ApplicantInfoCont.Updated = true;
                        console.log('$scope.ApplicantInfoContUpdated', $scope.dataItem.ApplicantInfoCont.Updated)
                    }

                    $scope.ApplicantInfoAddrUpdated = function() {
                        $scope.dataItem.ApplicantInfoAddr.Updated = true;
                        console.log('$scope.ApplicantInfoAddrUpdated', $scope.dataItem.ApplicantInfoAddr.Updated)
                    }

                    $scope.ApplicantWorkInfoUpdated = function() {
                        $scope.dataItem.ApplicantPrevEmployment.Updated = true;
                        console.log('$scope.ApplicantPrevEmploymentUpdated', $scope.dataItem.ApplicantPrevEmployment.Updated)
                    }

                    $scope.ApplicantEducBkgUpdated = function() {
                        $scope.dataItem.ApplicantEducBkgrnd.Updated = true;
                        console.log('$scope.ApplicantEducBkgrndUpdated', $scope.dataItem.ApplicantEducBkgrnd.Updated)
                    }

                    $scope.ApplicantLicensesUpdated = function() {
                        $scope.dataItem.ApplicantLicenseExam.Updated = true;
                        console.log('$scope.ApplicantLicenseExamUpdated', $scope.dataItem.ApplicantLicenseExam.Updated)
                    }


                    $scope.tsMainOptPData = {
                        scrollable: false,
                        tabPosition: "top",
                        select: function (e) {
                            var _item = $(e.item).attr('data-value');

                            $log.log('switch');
                            switch (_item) {
                                case 'Information':
                                    $log.log("Information");
                                    $scope.$apply(function () {
                                        $scope.onEditField = true;
                                        $scope.btnBasicInfoName = "Update";
                                        $scope.onRetrieveBasicInfo($scope.originalDataItem);
                                        $scope.dataItem = $scope.originalDataItem;
                                    });

                                    break;
                                case 'Application':
                                    $log.log("Application", $scope.dataItem.UID);
                                    $scope.$apply(function () {
                                        $scope.onRetrieveApplicationDet($scope.originalDataItem);
                                        $scope.dataItem = $scope.originalDataItem;
                                    });

                                    break;
                                //case 'Onboarding':
                                //    $log.log("Onboarding", $scope.dataItem.UID);
                                //    $scope.$apply(function () {
                                //        $scope.onRetrieveAppOnboarding($scope.dataItem);
                                //    });
                                //    break;
                                //case 'Attachment':
                                //    $log.log("Attachment");
                                //    break;
                                default:
                                    $log.log('default _item', _item);
                                    break;
                            }
                        }
                    }


                    $scope.onRetrieveBasicInfo = function (dataItem, dir) {
                        var steps = $scope.editStepperInstance.getSteps().active,
                            index
                            
                        if(dir == undefined)
                            index = 0;
                        else
                            index = steps.index + dir;
                            
                        switch(index){
                            case 0: 
                                if($scope.dataItem.ApplicantInfo == null || !$scope.dataItem.ApplicantInfo.Updated){
                                    $repository
                                        .controller("ApplicantInfo")
                                        .action('RetrieveByAppUID')
                                        .queryString({
                                            appuid: dataItem.UID
                                        })
                                        .get()
                                        .success(function (r) {
                                            $scope.$apply(function () {
                                                // debugger
                                                $scope.originalDataItem.ApplicantInfo = r;
                                                $scope.dataItem.ApplicantInfo = r;
                                                $log.log('$scope.dataItem.ApplicantInfo', $scope.dataItem.ApplicantInfo);
                                                $scope.dataItem.Gender = r.Gender.toString();
                                                $scope.dataItem.CivilStatus = r.CivilStatus.toString();
                                            });
                                        }).error(function (err) {
                                        });

                                }
                                
                                break;
                            case 1: 
                                if($scope.dataItem.ApplicantInfoCont == null || !$scope.dataItem.ApplicantInfoCont.Updated){
                                    $repository
                                        .controller("ApplicantInfoCont")
                                        .action('IRetrieveByUID')
                                        .queryString({
                                            uid: dataItem.UID
                                        })
                                        .get()
                                        .success(function (r) {
                                            $scope.$apply(function () {
                                                $scope.dataItem.ApplicantInfoCont = r.Data;
                                                $log.log("ApplicantInfoCont", r.Data);
        
                                                for (var y = 0; y < $scope.dataItem.ApplicantInfoCont.length; y++) {
                                                    if ($scope.dataItem.ApplicantInfoCont[y].ContactBase.UID == "50cb97c7-c9c4-42f1-8c5c-d052979ee20f") {
                                                        $scope.contIndex = y;
                                                    }
                                                    else if ($scope.dataItem.ApplicantInfoCont[y].ContactBase.UID == "5c26b308-e754-462b-9e2e-5ca5f65c0ccf") {
                                                        $scope.emailIndex = y;
                                                    }
                                                }
                                            });
                                        }).error(function (err) {
                                        });
                                }
                                
                                break;
                            case 2:
                                if($scope.dataItem.ApplicantInfoAddr == null || !$scope.dataItem.ApplicantInfoAddr.Updated){
                                    $repository
                                        .controller("ApplicantInfoAddr")
                                        .action('IRetrieveByUID')
                                        .queryString({
                                            uid: dataItem.UID
                                        })
                                        .get()
                                        .success(function (r) {
                                            $scope.$apply(function () {
                
                                                $scope.dataItem.ApplicantInfoAddr = r.Data;
                
                                                for (var x = 0; x < $scope.dataItem.ApplicantInfoAddr.length; x++) {
                                                    if ($scope.dataItem.ApplicantInfoAddr[x].AddressBase.UID == "39861256-3ea9-492c-9658-1ba87ac42c28") {
                                                        $scope.permanentAddrIndex = x;
                                                        $scope.permanentRegDesc = $scope.dataItem.ApplicantInfoAddr[x].Region;
                                                        $scope.permanentProvDesc = $scope.dataItem.ApplicantInfoAddr[x].Provincial;
                                                        $scope.permanentCityDesc = $scope.dataItem.ApplicantInfoAddr[x].City;
                                                        $scope.permanentDistDesc = $scope.dataItem.ApplicantInfoAddr[x].District;
                
                                                        $scope.ddlPermanentProvinceDS($scope.permanentRegDesc);
                                                        $scope.ddlPermanentCityDS($scope.permanentProvDesc);
                                                        $scope.ddlPermanentDistrictDS($scope.permanentCityDesc, $scope.permanentProvDesc);
                
                                                    }
                                                    else if ($scope.dataItem.ApplicantInfoAddr[x].AddressBase.UID == "ec0024b3-cc5e-4a99-bd40-889a3ccca345") {
                                                        $scope.presentAddrIndex = x;
                                                        $scope.presentRegDesc = $scope.dataItem.ApplicantInfoAddr[x].Region;
                                                        $scope.presentProvDesc = $scope.dataItem.ApplicantInfoAddr[x].Provincial;
                                                        $scope.presentCityDesc = $scope.dataItem.ApplicantInfoAddr[x].City;
                                                        $scope.presentDistDesc = $scope.dataItem.ApplicantInfoAddr[x].District;
                
                                                        $scope.ddlPresentProvinceDS($scope.presentRegDesc);
                                                        $scope.ddlPresentCityDS($scope.presentProvDesc);
                                                        $scope.ddlPresentDistrictDS($scope.presentCityDesc, $scope.presentProvDesc);
                                                    }
                                                }
                
                                                $log.log("$scope.dataItem.ApplicantInfoAddr", $scope.dataItem.ApplicantInfoAddr);
                                            });
                                        }).error(function (err) {
                                        });
                
                                    $('#CountryPresentAddr').data('kendoDropDownList').enable(false);
                                }

                                break;
                            case 3:
                                if($scope.dataItem.ApplicantEducBkgrnd == null || !$scope.dataItem.ApplicantEducBkgrnd.Updated){
                                    var grdEducationEdit = $("#grdEducationEdit").data("kendoGrid");
                                    $scope.dataItem = $scope.originalDataItem;
                                    grdEducationEdit.dataSource.read();
                                }
    
                                break;
                            case 4:
                                if($scope.dataItem.ApplicantPrevEmployment == null || !$scope.dataItem.ApplicantPrevEmployment.Updated){
                                    var grdPrevWorkEdit = $("#grdPrevWorkEdit").data("kendoGrid");
                                    $scope.dataItem = $scope.originalDataItem;
                                    grdPrevWorkEdit.dataSource.read();
                                }
    
                                break;
                            case 5:
                                if($scope.dataItem.ApplicantLicenseExam == null || !$scope.dataItem.ApplicantLicenseExam.Updated){
                                    var grdLicenseEdit = $("#grdLicensesEdit").data("kendoGrid");
                                    $scope.dataItem = $scope.originalDataItem;
                                    grdLicenseEdit.dataSource.read();
                                }
    
                                break;
                        }                    
                    }

                    $scope.onRetrieveApplicationDet = function (dataItem) {
                        var grdApplicantManpowerReq = $("#grdApplication").data("kendoGrid");

                        var grdApplicantManpowerReqDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('ApplicantManpowerReq')
                                    .action('IRetrieveByUID')
                                    .queryString({
                                        uid: dataItem.UID
                                    })
                                    .url
                            },
                            requestEnd: function (e) {
                                $log.log('grdApplication', e);
                                $scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if (e.response.Data.length > 0) {
                                            if (e.response.Data[0].CanAdd === false) {
                                                $('#grdApplication').find('.k-grid-add').addClass('k-state-disabled');
                                            }
                                            else {
                                                $('#grdApplication').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                    }
                                });
                            },
                            schema: {
                                model: recruitment.model.ApplicantManpowerReq
                            }
                        });

                        grdApplicantManpowerReq.setDataSource(grdApplicantManpowerReqDS);
                        grdApplicantManpowerReq.dataSource.read();
                    }
                    
                    $scope.optGender = {
                        dataTextField: 'Text',
                        dataValueField: 'Text',
                        dataSource: {
                            data: recruitment.appEnum.gender.toArray()
                        },
                        autoBind: false,
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    // debugger
                                    $scope.dataItem.Gender = dataItem.Text;
                                    $scope.dataItem.ApplicantInfo.Gender = $scope.dataItem.Gender;
                                    $log.log('$scope.dataItem.ApplicantInfo.Gender', $scope.dataItem.ApplicantInfo.Gender);
                                    $scope.ApplicantInfoUpdated();
                                });
                            }
                        },
                        dataBound: function (e) {
                            $scope.dataItem.ApplicantInfo.Gender = $scope.dataItem.Gender;
                            $log.log('$scope.dataItem.ApplicantInfo.Gender', $scope.dataItem.ApplicantInfo.Gender);
                        }
                    }

                    $scope.optCivilStatus = {
                        dataSource: {
                            data: recruitment.appEnum.civilStatus.toArray()
                        },
                        autoBind: false,
                        placeholder: 'Please Select',
                        dataTextField: 'Text',
                        dataValueField: 'Text',
                        //filter: "contains",
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.CivilStatus = dataItem.Text;
                                    $scope.dataItem.ApplicantInfo.CivilStatus = $scope.dataItem.CivilStatus;
                                    $log.log('$scope.dataItem.ApplicantInfo.CivilStatus', $scope.dataItem.ApplicantInfo.CivilStatus);
                                    $scope.ApplicantInfoUpdated();
                                });
                            }
                        },
                        dataBound: function (e) {
                            $scope.dataItem.ApplicantInfo.CivilStatus = $scope.dataItem.CivilStatus;
                        }
                    }

                    $scope.optBirthdate = {
                        format: 'MMM dd, yyyy',
                        change: function (e) {
                            $scope.ApplicantInfoUpdated();
                        }
                    }

                    $scope.optNationality = {
                        autoBind: false,
                        dataTextField: 'Name',
                        dataValueField: 'UID',
                        filter: "contains",
                        template: '<div>#= Name #</b></div>',
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            sort: [{ field: "ID", dir: "asc" }],
                            transport: {
                                read: $repository
                                    .controller('Nationality')
                                    .action('Retrieve')
                                    .url
                            }
                        }),
                        change: function(){
                            $scope.ApplicantInfoUpdated();
                        },
                        dataBound: function () {
                            if ($scope.dataItem.ApplicantInfo.Nationality === null) {
                                // $repository
                                //     .controller('Nationality')
                                //     .action('RetrieveDefault')
                                //     .get()
                                //     .success(function(e){
                                //         debugger
                                //         $scope.dataItem.ApplicantInfo.Nationality = e.Data
                                //     })
                                this.select(0);
                                // this.trigger("change")
    
    
                            }                  
                            
                        },
                    }

                    $scope.optAppJobSource = {
                        autoBind: false,
                        //optionLabel: {
                        //    Name: "Select Type",
                        //    UID: null
                        //},
                        filter: "contains",
                        dataTextField: "Name",
                        dataValueField: "UID",
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('JobSource')
                                    .action('Retrieve')
                                    .url
                            },
                        }),
                        change: function(){
                            $scope.ApplicantInfoUpdated();
                        }
                    };

                    $scope.optRefereeEdit = {
                        autoBind: false,
                        dataTextField: 'FullName',
                        dataValueField: 'UID',
                        filter: "contains",
                        template: '<div>#= FullName #</b></div>',
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            sort: [{ field: "ID", dir: "asc" }],
                            transport: {
                                read: $repository
                                    .controller('Emp')
                                    .action('Retrieve')
                                    .url
                            }
                        }),
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.$apply(function () {
                                    $scope.dataItem.ApplicantInfo.Referee = dataItem;
                                    $log.log('$scope.dataItem.ApplicantInfo.Referee', $scope.dataItem.ApplicantInfo.Referee);
                                    $scope.ApplicantInfoUpdated();
                                });
                            }
                        }
                    }

                    $scope.optCountryPresentAddr = {
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('Country')
                                    .action('Retrieve')
                                    .url
                            },
                        }),
                        autoBind: false,
                        //placeholder: 'Please Select',
                        dataTextField: 'Name',
                        dataValueField: 'UID',
                        filter: "contains",
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $log.log("dataItem", dataItem);
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        },
                    }

                    $scope.optRegionPresentAddr = {
                        dataSource: new recruitment.CDataSource({//kendo.data.DataSource({
                            //sort: [{ field: "CreatedDate", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('Region')
                                    .action('Retrieve')
                                    .url
                            },
                            requestEnd: function (e) {
                                $("#RegionPresentAddr").data("kendoComboBox")
                                    .value($scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].Region);
                            }
                        }),
                        autoBind: false,
                        //placeholder: 'Please Select',
                        dataTextField: 'Desc',
                        dataValueField: 'Desc',
                        filter: "contains",
                        change: function (e) {
                            $("#ProvincialPresentAddr").data("kendoComboBox").value("");
                            $("#CityPresentAddr").data("kendoComboBox").value("");
                            $("#BarangayPresentAddr").data("kendoComboBox").value("");
    
                            $("#ProvincialPresentAddr").data("kendoComboBox").dataSource.data([]);
                            $("#CityPresentAddr").data("kendoComboBox").dataSource.data([]);
                            $("#BarangayPresentAddr").data("kendoComboBox").dataSource.data([]);
    
                            $scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].Provincial = "";
                            $scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].City = "";
                            $scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].District = "";
    
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $scope.presentRegDesc = dataItem.Desc;
                                $scope.ddlPresentProvinceDS($scope.presentRegDesc);
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        },
                    }

                    $scope.optProvincialPresentAddr = {
                        autoBind: false,
                        dataTextField: 'Desc',
                        dataValueField: 'Desc',
                        filter: "contains",
                        change: function (e) {
                            $("#CityPresentAddr").data("kendoComboBox").value("");
                            $("#BarangayPresentAddr").data("kendoComboBox").value("");
    
                            $("#CityPresentAddr").data("kendoComboBox").dataSource.data([]);
                            $("#BarangayPresentAddr").data("kendoComboBox").dataSource.data([]);
    
                            $scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].City = "";
                            $scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].District = "";
    
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $scope.presentProvDesc = dataItem.Desc;
                                $scope.ddlPresentCityDS($scope.presentProvDesc);
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        },
                    }

                    $scope.optBrgyPresentAddr = {
                        autoBind: false,
                        dataTextField: 'Desc',
                        dataValueField: 'Desc',
                        filter: "contains",
                        change: function (e) {
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $scope.presentDistDesc = dataItem.Desc;
                            }
                        },
                    }

                    $scope.optCityPresentAddr = {
                        autoBind: false,
                        dataTextField: 'Desc',
                        dataValueField: 'Desc',
                        filter: "contains",
                        change: function (e) {
                            $("#BarangayPresentAddr").data("kendoComboBox").value("");
                            $("#BarangayPresentAddr").data("kendoComboBox").dataSource.data([]);
                            $scope.dataItem.ApplicantInfoAddr[$scope.presentAddrIndex].District = "";
    
                            if (e.sender.selectedIndex > -1) {
                                var dataItem = this.dataItem(e.selectedIndex);
                                $scope.presentCityDesc = dataItem.Desc;
                                $scope.ddlPresentDistrictDS($scope.presentCityDesc, $scope.presentProvDesc);
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        },
                    }

                        

                    $scope.ddlPresentProvinceDS = function (regDesc) {
                        var ddlProvincialPresentAddr = $("#ProvincialPresentAddr").data("kendoComboBox");

                        var ddlProvincialPresentAddrDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Province')
                                    .action('GetByRegionDesc')
                                    .queryString({
                                        regDesc: regDesc
                                    })
                                    .url
                            },
                            change: function(e){
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        });

                        ddlProvincialPresentAddr.setDataSource(ddlProvincialPresentAddrDS);
                        ddlProvincialPresentAddr.dataSource.read();
                    }

                    $scope.ddlPresentCityDS = function (provDesc) {
                        var ddlCityPresentAddr = $("#CityPresentAddr").data("kendoComboBox");

                        var ddlCityPresentAddrDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('City')
                                    .action('GetByProvinceDesc')
                                    .queryString({
                                        provDesc: provDesc
                                    })
                                    .url
                            },
                            change: function(e){
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        });

                        ddlCityPresentAddr.setDataSource(ddlCityPresentAddrDS);
                        ddlCityPresentAddr.dataSource.read();
                    }

                    $scope.ddlPresentDistrictDS = function (cityDesc, provDesc) {
                        var ddlDistrictPresentAddr = $("#BarangayPresentAddr").data("kendoComboBox");

                        var ddlDistrictPresentAddrDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('Barangay')
                                    .action('GetBarangayByCityDescAndProvDesc')
                                    .queryString({
                                        cityDesc: cityDesc,
                                        provDesc: provDesc
                                    })
                                    .url
                            },
                            change: function(e){
                                $scope.ApplicantInfoAddrUpdated();
                            }
                        });

                        ddlDistrictPresentAddr.setDataSource(ddlDistrictPresentAddrDS);
                        ddlDistrictPresentAddr.dataSource.read();
                    }

                    $scope.optGrdPrevWorkEdit = { 
                        toolbar: [
                            {
                                name: "create",
                                text: "Add New Record"
                            },
                            'excel'
                        ],
                        dataBound: function (e) {
                            $log.log('optGrdPrevWorkEdit', e);

                            $("#grdPrevWorkEdit tbody tr .k-grid-edit").each(function () {
                                var currentDataItem = $("#grdPrevWorkEdit").data("kendoGrid").dataItem($(this).closest("tr"));

                                //Check in the current dataItem if the row is editable
                                if (currentDataItem.CanUpdate == false) {
                                    $(this).addClass('k-state-disabled');
                                }
                            })

                            //Selects all delete buttons
                            $("#grdPrevWorkEdit tbody tr .k-grid-delete").each(function () {
                                var currentDataItem = $("#grdPrevWorkEdit").data("kendoGrid").dataItem($(this).closest("tr"));

                                //Check in the current dataItem if the row is deletable
                                if (currentDataItem.CanDelete == false) {
                                    $(this).addClass('k-state-disabled');
                                }
                            })
                        },
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    if ($scope.dataItem.ApplicantPrevEmployment == null) {
                                        $repository
                                            .controller("ApplicantPrevEmployment")
                                            .action('IRetrieveByUID')
                                            .queryString({
                                                uid: $scope.dataItem.UID
                                            })
                                            .get()
                                            .success(function (r) {
                                                $scope.dataItem.ApplicantPrevEmployment = r.Data;
                                                e.success(r.Data)
                                                $log.log("$scope.dataItem.ApplicantPrevEmployment", $scope.dataItem.ApplicantPrevEmployment);
                                            })
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.ApplicantPrevEmployment.length,
                                            data: $scope.dataItem.ApplicantPrevEmployment
                                        };
                                        e.success(opt.data);
                                    }

                                },
                                create: function (e) {
                                    // debugger
                                    $scope.dataItem.ApplicantPrevEmployment.push(e.data)
                                    e.success(e.data)
                                    $log.log("$scope.dataItem.ApplicantPrevEmployment", $scope.dataItem.ApplicantPrevEmployment);
                                    $scope.ApplicantWorkInfoUpdated();

                                },
                                update: function (e) {
                                    // debugger
                                    var index = $scope.dataItem.ApplicantPrevEmployment.findIndex(x => x.UID === e.data.UID);
                                    $scope.dataItem.ApplicantPrevEmployment[index] = e.data;
                                    e.success(e.data.models);
                                    $scope.ApplicantWorkInfoUpdated();


                                },
                                destroy: function (e) {
                                    $scope.dataItem.ApplicantPrevEmployment.splice($scope.dataItem.ApplicantPrevEmployment.map(i => i.UID)
                                        .indexOf(e.data.UID),
                                        1);
                                    e.success(e.data.models);
                                },
                            },
                            requestEnd: function (e) {
                                $log.log('grdPrevWorkEdit', e);
                                //$scope.$apply(function () {
                                if (e.hasOwnProperty('response')) {
                                    if(e.response != undefined){
                                        if (e.response.length > 0) {
                                            if (e.response[0].CanAdd === false) {
                                                $('#grdPrevWorkEdit').find('.k-grid-add').addClass('k-state-disabled');
                                            }
                                            else {
                                                $('#grdPrevWorkEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                        else {
                                            //todo
                                            $('#grdPrevWorkEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                        }
                                    }
                                    else{
                                        $('#grdPrevWorkEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                    }
                                }
                                else {
                                    //todo
                                    if ($scope.dataItem.ApplicantInfo.CanUpdate === false) {
                                        $('#grdPrevWorkEdit').find('.k-grid-add').addClass('k-state-disabled');
                                    }
                                    else {
                                        $('#grdPrevWorkEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                    }   
                                }
                                //});
                            },
                            batch: false,
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
                                        Employer: {
                                            name: 'Employer',
                                        },
                                        PositionName: {
                                            name: 'PositionName',
                                        },
                                        Location: {
                                            name: 'Location',
                                        },
                                        StartDate: {
                                            type: 'date',
                                            name: 'StartDate'
                                        },
                                        EndDate: {
                                            type: 'date',
                                            name: 'EndDate'
                                        }
                                    }
                                }
                            }
                        },
                        autoBind: false,
                        sortable: true,
                        reorderable: true,
                        resizable: true,
                        filterable: false,
                        mobile: true,
                        pageable: true,
                        noRecords: {
                            template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        },
                        columns: [
                            {
                                field: "Employer",
                                title: "Employer",
                                width: 135
                            },
                            {
                                field: "PositionName",
                                title: "Position",
                                width: 135
                            },
                            {
                                field: "Location",
                                title: "Location",
                                width: 135
                            },
                            {
                                field: "StartDate",
                                title: "From",
                                template: "#: kendo.toString(kendo.parseDate(StartDate), 'MMM dd, yyyy') #",
                                width: 135
                            },
                            {
                                field: "EndDate",
                                title: "To",
                                template: "#if(EndDate == null) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(EndDate), 'MMM dd, yyyy') ##} #",
                                width: 135
                            },
                            {
                                command: [
                                    "edit",
                                    "destroy"
                                ],
                                title: "&nbsp;",
                                width: 250
                            }
                        ],
                        editable: "inline"
                    }

                    $scope.optGrdEducationEdit = ({ 
                        toolbar: [
                            {
                                name: "create",
                                text: "Add New Record"
                            },
                            'excel'
                        ],
                        dataBound: function (e) {
                            $log.log('optGrdEducationEdit', e);

                            $("#grdEducationEdit tbody tr .k-grid-edit").each(function () {
                                var currentDataItem = $("#grdEducationEdit").data("kendoGrid").dataItem($(this).closest("tr"));

                                //Check in the current dataItem if the row is editable
                                if (currentDataItem.CanUpdate == false) {
                                    $(this).addClass('k-state-disabled');
                                }
                            })

                            //Selects all delete buttons
                            $("#grdEducationEdit tbody tr .k-grid-delete").each(function () {
                                var currentDataItem = $("#grdEducationEdit").data("kendoGrid").dataItem($(this).closest("tr"));

                                //Check in the current dataItem if the row is deletable
                                if (currentDataItem.CanDelete == false) {
                                    $(this).addClass('k-state-disabled');
                                }
                            })
                        },
                        dataSource: {
                            transport: {
                                read: function (e) {
                                    if ($scope.dataItem.ApplicantEducBkgrnd == null || $scope.dataItem.ApplicantEducBkgrnd.length == 0) {
                                        $repository
                                            .controller("ApplicantEducBkgrnd")
                                            .action('IRetrieveByUID')
                                            .queryString({
                                                uid: $scope.dataItem.UID
                                            })
                                            .get()
                                            .success(function (r) {
                                                // debugger
                                                $scope.dataItem.ApplicantEducBkgrnd = r.Data;
                                                e.success(r.Data)
                                                $log.log("$scope.dataItem.ApplicantEducBkgrnd", $scope.dataItem.ApplicantEducBkgrnd);
                                            })
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.ApplicantEducBkgrnd.length,
                                            data: $scope.dataItem.ApplicantEducBkgrnd
                                        };
                                        e.success(opt.data);
                                    }
                                },
                                create: function (e) {
                                    // debugger
                                    $scope.dataItem.ApplicantEducBkgrnd.push(e.data)
                                    e.success(e.data)
                                },
                                update: function(e){
                                    var index = $scope.dataItem.ApplicantEducBkgrnd.findIndex(x => x.UID === e.data.UID);
                                    $scope.dataItem.ApplicantEducBkgrnd[index] = e.data;

                                    e.success(e.data.models);
                                },
                                destroy: function(e){
                                    // debugger
                                    $scope.dataItem.ApplicantEducBkgrnd.splice($scope.dataItem.ApplicantEducBkgrnd.map(i => i.UID)
                                            .indexOf(e.data.UID),
                                            1);
                                    e.success(e.data.models);
                                }
                            },
                            requestEnd: function (e) {
                                $log.log('grdEducationEdit', e);
                                //$scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if(e.response != undefined){
                                            if (e.response.length > 0) {
                                                if (e.response[0].CanAdd === false) {
                                                    $('#grdEducationEdit').find('.k-grid-add').addClass('k-state-disabled');
                                                }
                                                else {
                                                    $('#grdEducationEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                                }
                                            }
                                            else {
                                                //todo
                                                $('#grdEducationEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                        else{
                                            $('#grdEducationEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                        }
                                    }
                                    else {
                                        //todo
                                        $('#grdEducationEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                    }
                                //});
                            },
                            pageSize: 5,
                            batch: false,
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
                                        School: {
                                            name: 'School',
                                        },
                                        SchoolCourse: {
                                            name: 'SchoolCourse',
                                        },
                                        EducLevel: {
                                            name: 'EducLevel',
                                        },
                                        StartDate: {
                                            type: 'date',
                                            name: 'StartDate'
                                        },
                                        EndDate: {
                                            type: 'date',
                                            name: 'EndDate'
                                        },
                                        NoRecognitions: {
                                            type: 'number',
                                            name: 'NoRecognitions'
                                        },
                                        Scholar: {
                                            type: 'boolean',
                                            name: 'Scholar',
                                            defaultValue: false,
                                        },
                                        Remarks: {
                                            type: 'string',
                                            name: 'Remarks'
                                        },
                                        Recognitions: {
                                            name: 'Recognitions',
                                            defaultValue: []
                                        }
                                    }
                                }
                            }
                        },
                        autoBind: false,
                        sortable: true,
                        scrollable: true,
                        pageable: {
                            pageSize: 10
                        },
                        noRecords: {
                            template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        },
                        save: function (e) { //update
                            if ($scope.dataItem.ApplicantEducBkgrnd.some(el => el.UID === e.model.UID)) {
                                var index = $scope.dataItem.ApplicantEducBkgrnd.findIndex(x => x.UID === e.model.UID);
                                $scope.dataItem.ApplicantEducBkgrnd[index] = e.model;
                            }
                            $scope.ApplicantEducBkgUpdated();

                        },
                        columns: [
                            {
                                field: "School.SchoolName",
                                title: "Name of School",
                                width: 150
                            },
                            {
                                field: "SchoolCourse.CourseName",
                                title: "School Course",
                                template: "#if(SchoolCourse == undefined || SchoolCourse == null || SchoolCourse.UID == null || SchoolCourse.UID == '') {##: '' ##} else { ##= SchoolCourse.CourseName ##} #",
                                width: 150
                            },
                            {
                                field: "EducLevel.Name",
                                title: "Educational Level",
                                width: 135
                            },
                            {
                                field: "StartDate",
                                title: "From",
                                template: "#: kendo.toString(kendo.parseDate(StartDate), 'MMM dd, yyyy') #",
                                width: 135
                            },
                            {
                                field: "EndDate",
                                title: "To",
                                template: "#if(EndDate == null) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(EndDate), 'MMM dd, yyyy') ##} #",
                                width: 135
                            },
                            {
                                field: "Recognitions.length",
                                title: "No. of Recognitions",
                                width: 100
                            },
                            {
                                field: "Scholar",
                                title: "Scholar",
                                template: "#: Scholar != true ? 'No' : 'Yes'#",
                                width: 135
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 135
                            },
                            {
                                command: [
                                    "edit",
                                    "destroy"
                                ],
                                title: "&nbsp;",
                                width: 250
                            },
                            //{ command: [{ className: "k-state-disabled", name: "edit", text: "Edit" }, { className: "k-state-disabled", name: "destroy", text: "Delete" }] }
                        ],
                        editable: {
                            mode: "popup",
                            window: {
                                width: "70%",
                            },
                            template: "<div grd-educbkgrd-editor ng-model='dataItem'></div>"
                        } 
                    });

                    $scope.optGrdLicensesEdit = ({
                        toolbar: [
                            {
                                name: "create",
                                text: "Add New Record"
                            },
                            'excel'
                        ],
                        dataBound: function (e) {
                            $log.log('optGrdLicensesEdit', e);
    
                            $("#grdLicensesEdit tbody tr .k-grid-edit").each(function () {
                                var currentDataItem = $("#grdLicensesEdit").data("kendoGrid").dataItem($(this).closest("tr"));
    
                                //Check in the current dataItem if the row is editable
                                if (currentDataItem.CanUpdate == false) {
                                    $(this).addClass('k-state-disabled');
                                }
                            })
    
                            //Selects all delete buttons
                            $("#grdLicensesEdit tbody tr .k-grid-delete").each(function () {
                                var currentDataItem = $("#grdLicensesEdit").data("kendoGrid").dataItem($(this).closest("tr"));
    
                                //Check in the current dataItem if the row is deletable
                                if (currentDataItem.CanDelete == false) {
                                    $(this).addClass('k-state-disabled');
                                }
                            })
                        },
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (e) {
                                    if ($scope.dataItem.ApplicantLicenseExam == null) {
                                        $repository
                                            .controller("ApplicantLicenseExam")
                                            .action('IRetrieveByUID')
                                            .queryString({
                                                uid: $scope.dataItem.UID
                                            })
                                            .get()
                                            .success(function (r) {
                                                for(var i = 0;i < r.Data.length; i++){
                                                    r.Data[i].ExamDate = new Date(r.Data[i].ExamDateYear, r.Data[i].ExamDateMonth)
                                                }
                                                $scope.dataItem.ApplicantLicenseExam = r.Data;
                                                e.success(r.Data)
                                                $log.log("$scope.dataItem.ApplicantLicenseExam", $scope.dataItem.ApplicantLicenseExam);
                                            })
                                    }
                                    else {
                                        var opt = {
                                            total: $scope.dataItem.ApplicantLicenseExam.length,
                                            data: $scope.dataItem.ApplicantLicenseExam
                                        };
                                        e.success(opt.data);
                                    }
                                },
                                create: function (e) {
                                    // debugger
                                    e.data.ExamDateMonth = e.data.ExamDate.getMonth();
                                    e.data.ExamDateYear = e.data.ExamDate.getFullYear();
    
                                    $scope.dataItem.ApplicantLicenseExam.push(e.data)
                                    e.success(e.data)
                                },
                                update: function(e){
                                    var index = $scope.dataItem.ApplicantLicenseExam.findIndex(x => x.UID === e.data.UID);
                                    $scope.dataItem.ApplicantLicenseExam[index] = e.data;
    
                                    e.success(e.data.models);
                                },
                                destroy: function(e){
                                    // debugger
                                    $scope.dataItem.ApplicantLicenseExam.splice($scope.dataItem.ApplicantLicenseExam.map(i => i.UID)
                                            .indexOf(e.data.UID),
                                            1);
                                    e.success(e.data.models);
                                }
                            },
                            requestEnd: function (e) {
                                $log.log('grdLicensesEdit', e);
                                //$scope.$apply(function () {
                                if (e.hasOwnProperty('response')) {
                                    if(e.response != undefined){
                                        if (e.response.length > 0) {
                                            if (e.response[0].CanAdd === false) {
                                                $('#grdLicensesEdit').find('.k-grid-add').addClass('k-state-disabled');
                                            }
                                            else {
                                                $('#grdLicensesEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                        else {
                                            //todo
                                            $('#grdLicensesEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                        }
                                    }
                                    else{
                                        $('#grdLicensesEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                    }
                                }
                                else {
                                    //todo
                                    if ($scope.dataItem.ApplicantInfo.CanUpdate === false) {
                                        $('#grdLicensesEdit').find('.k-grid-add').addClass('k-state-disabled');
                                    }
                                    else {
                                        $('#grdLicensesEdit').find('.k-grid-add').removeClass('k-state-disabled');
                                    }   
                                }
                                //});
                            },
                            pageSize: 5,
                            batch: false,
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
                                            LicenseType: {
                                                name: 'LicenseType',
                                            },
                                            ExamRating: {
                                                type: 'number',
                                                name: 'ExamRating',
                                            },
                                            ExamDate: {
                                                type: 'date',
                                                name: 'ExamDate',
                                            },
                                            LicenseNumber: {
                                                type:'string',
                                                name: 'LicenseNumber'
                                            },
                                            ReleasedDate: {
                                                type: 'date',
                                                name: 'ReleasedDate'
                                            },
                                            ExpirationDate: {
                                                type: 'date',
                                                name: 'ExpirationDate'
                                            },
                                            Remarks: {
                                                type: 'string',
                                                name: 'Remarks'
                                            }
                                        }
                                }
                            }
                        }),
                        save: function (e) { //update
                            debugger
                            if ($scope.dataItem.ApplicantLicenseExam.some(el => el.UID === e.model.UID)) {
                                var index = $scope.dataItem.ApplicantLicenseExam.findIndex(x => x.UID === e.model.UID);
                                $scope.dataItem.ApplicantLicenseExam[index] = e.model;
                            }

                            $scope.ApplicantLicensesUpdated();

                        },
                        autoBind: false,
                        sortable: true,
                        scrollable: true,
                        pageable: {
                            pageSize: 10
                        },
                        noRecords: {
                            template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        },
                        columns: [
                            {
                                field: "LicenseType.Name",
                                title: "License Type",
                                width: 135
                            },
                            {
                                field: "ExamRating",
                                title: "Examination Rating",
                                template: '#=kendo.format("{0:p}", ExamRating / 100)#',
                                width: 135
                            },
                            {
                                field: "ExamDate",
                                title: "Examination Date",     
                                template: "#if(ExamDate == null) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(ExamDate), 'MMMM yyyy') ##} #",                                                                                           
                                width: 135
                            },
                            {
                                field: "LicenseNumber",
                                title: "License Number",
                                width: 135
                            },
                            {
                                field: "ReleasedDate",
                                title: "Released Date",
                                template: "#if(ReleasedDate == null) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(ReleasedDate), 'MMM dd, yyyy') ##} #",                            
                                width: 135
                            },
                            {
                                field: "ExpirationDate",
                                title: "Expiration Date",
                                template: "#if(ExpirationDate == null) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(ExpirationDate), 'MMM dd, yyyy') ##} #",                                                        
                                width: 135
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 135
                            },
                            { 
                                command: [
                                    "edit", 
                                    "destroy"
                                ], 
                                title: "&nbsp;", 
                                width: 250 
                            }
                        ],
                        editable: {
                            title: "Add Licenses",
                            mode: "popup",
                            window: {
                                width: "70%",
                            },
                            template: "<div grd-license-exam-editor ng-model='dataItem'></div>"
                         },
                    });

                    $scope.tsMainOptSubData = {
                        scrollable: false,
                        tabPosition: "top",
                        select: function (e) {
                            var _item = $(e.item).attr('data-value');

                            $log.log('switch', _item);

                            switch (_item) {
                                case 'Interview':
                                    $log.log("Interview");
                                    var grdInterviewScope = $("#grdInterviewScope").data("kendoGrid");
                                    grdInterviewScope.dataSource.read();
                                    break;
                                case 'Exam':
                                    $log.log("Exam", $scope.dataItem.UID);
                                    var grdExamScope = $("#grdExamScope").data("kendoGrid");
                                    grdExamScope.dataSource.read();
                                    break;
                                case 'Onboarding':
                                    $log.log("Onboarding");
                                    var grdOnboardingScope = $("#grdOnboardingScope").data("kendoGrid");
                                    grdOnboardingScope.dataSource.read();
                                    break;
                                case 'Status':
                                    $log.log("Status");
                                    var grdHistoryScope = $("#grdHistoryScope").data("kendoGrid");
                                    grdHistoryScope.dataSource.read();
                                    break;
                                case 'TransferInfo':
                                    $log.log("TransferInfo");
                                    var grdTransferInfoScope = $("#grdTransferInfoScope").data("kendoGrid");
                                    grdTransferInfoScope.dataSource.read();
                                    break;
                                default:
                                    $log.log('default _item', _item);
                                    break;
                            }
                        }
                    }

                    $scope.optGrdApplication = new recruitment.CGrid({//$("#grdApplication").kendoGrid({
                        autoBind: false,
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Application"
                            },
                            "excel",
                            {
                                name: 'grdFilterSearch',
                                template: '<div grd-filter-search></div>'
                            }
                        ],
                        editable: {
                            mode: "popup",
                            confirmation: false,
                            window: {
                                width: "40%",
                            },
                            template: '<div grd-applicant-manpower-editor ng-model="dataItem"></div>'
                        },
                        dataSource: {
                            schema: {
                                model: recruitment.model.ApplicantManpowerReq
                            }
                        },
                        detailTemplate: '<div kendo-tab-strip k-content-urls="[ null, null]" k-options="tsMainOptSubData">' +
                            '<ul class="tab-strip-detailed-grid">' +
                            '<li data-value="Interview" class="k-state-active">Interview</li>' +
                            '<li data-value="Exam">Exam</li>' +
                            '<li data-value="Onboarding">Onboarding Checklist</li>' +
                            '<li data-value="Status">Hiring Stage History</li>' +
                            '<li data-value="TransferInfo">Transfer Information</li>' +
                            // '<li data-value="Status">Attachment</li>' +
                            '</ul>' +
                            '<div tab-container>' +
                            '<div class="card">' +
                                '<div class="card-content">' +
                                    '<div kendo-interview-scope="" ' +
                                    'parent-uid="dataItem.UID">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div tab-container>' +
                            '<div class="card">' +
                                '<div class="card-content">' +
                                    '<div kendo-exam-scope="" ' +
                                    'parent-uid="dataItem.UID">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div tab-container>' +
                            '<div class="card">' +
                                '<div class="card-content">' +
                                    '<div kendo-onboarding-scope="" ' +
                                    'parent-uid="dataItem.UID">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div tab-container>' +
                            '<div class="card">' +
                                '<div class="card-content">' +
                                    '<div kendo-history-scope="" ' +
                                    'parent-uid="dataItem.UID">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div tab-container>' +
                            '<div class="card">' +
                                '<div class="card-content">' +
                                    '<div kendo-transfer-info-scope="" ' +
                                    'parent-uid="dataItem.UID">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div tab-container>' +
                            '<div class="card">' +
                                '<div class="card-content">' +
                                    '<div kendo-attachment-scope="" ' +
                                    'parent-uid="dataItem.UID">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>',
                        columns: [
                            {
                                field: "ManpowerRequest.Code",
                                title: "Request Code",
                                width: 120,
                                template: function (dataItem) {
                                    return '<a request-number class="k-button k-primary" data-ng-click="onViewManpowerReq(dataItem)">' + kendo.htmlEncode(dataItem.ManpowerRequest.Code) + '</a>';
                                },
                            },
                            {
                                field: "ManpowerRequest.Position.Name",
                                title: "Position",
                                template: "#if(ManpowerRequest == null || ManpowerRequest.UID == null) {##: '' ##} else { ##: ManpowerRequest.Position.Name ##} #",
                                //editor: function (container, options) {
                                //    var editor = $("<div>  {{ dataItem.ManpowerRequest.Position.Name }} </div>")
                                //                      .appendTo(container);
                                //},
                                width: 150
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 150
                            },
                            {
                                field: "ApplicantHiringStageLog.HiringStage.Name",
                                title: "Hiring Stage",
                                template: "#if(ApplicantHiringStageLog == null || ApplicantHiringStageLog.HiringStage == null) {##: '' ##} else { ##: ApplicantHiringStageLog.HiringStage.Name ##} #",
                                width: 120
                            },
                            {
                                field: "ApplicantHiringStageLog.Status.Name",
                                title: "Status",
                                template: "#if(ApplicantHiringStageLog == null || ApplicantHiringStageLog.Status == null) {##: '' ##} else { ##: ApplicantHiringStageLog.Status.Name ##} #",
                                width: 120
                            },
                            {
                                field: "ApplicantHiringStageLog.Remarks",
                                template: "#if(ApplicantHiringStageLog == null || ApplicantHiringStageLog.Remarks == null) {##: '' ##} else { ##: ApplicantHiringStageLog.Remarks ##} #",
                                title: "Status Remarks",
                                width: 150
                            },
                            gridUtil.columns.editCommand(),
                            {
                                title: "",
                                width: 100,
                                template: function (e) {
                                    var template;
                                    if (e.CanDelete) {
                                        $scope.controller = 'ApplicantManpowerReq';
                                        $scope.deleteId = 'grdApplicationDelete';
                                        template = "<a id='grdApplicationDelete' class='k-button' ng-click='invokeGrdCustomDelete(dataItem)'><i class='material-icons md-18'>delete</i></a>";
                                    }
                                    else {
                                        template = '<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>';
                                    }
                                    return template;
                                }
                            }
                        ],
                        customSaveChanges: function (e) {
                            if (e.model.isNew()) {
                                //debugger
                                $repository
                                    .controller('ApplicantManpowerReq')
                                    .action('CreateByUID')
                                    .post(JSON.stringify({ uid: $scope.dataItem.UID, entity: e.model }))
                                    .success(function (r) {
                                    });
                            }
                            else {
                                if (e.model.dirty === true) {
                                    $repository
                                        .controller('ApplicantManpowerReq')
                                        .action('Update')
                                        .post(JSON.stringify(e.model))
                                        .success(function (r) {
                                        });
                                }
                            }
                        }
                    });                 

                    $scope.optViewManpowerReq = {
                        title: "",
                        modal: true,
                        visible: false,
                        resizable: false,
                        actions: ["Maximize", "Close"],
                        width: "40%"
                    }

                    $scope.onViewManpowerReq = function (e) {
                        $scope.view_dataItem = e;
                        //$log.log('view_dataItem', $scope.view_dataItem);
    
                        //$scope.$apply(function () {
                        $scope.optViewManpowerReq = {
                            title: $scope.view_dataItem.ManpowerRequest.Code + " - " + $scope.view_dataItem.ManpowerRequest.Position.Name,
                            modal: true,
                            visible: false,
                            resizable: false,
                            actions: ["Maximize", "Close"],
                            width: "40%"
                        }
    
                        $repository
                            .controller("ManpowerRequestEmpStatScope")
                            .action('IRetrieveByUID')
                            .queryString({
                                uid: $scope.view_dataItem.ManpowerRequest.UID,
                            })
                            .get()
                            .success(function (r) {
                                $log.log('r.Data', r.Data);
                                $scope.view_dataItem.ManpowerRequest.ManpowerRequestEmpStatScope = r.Data;
                                // debugger
                                var x = $("#mrf-slots-computation").html();
                                $scope.markUpTooltip('balance-computation-' + $scope.view_dataItem.UID,
                                        kendo.template($("#mrf-slots-computation").html())($scope.view_dataItem.ManpowerRequest));
    
                            });
    
                        //});
                        //$scope.testContent = kendo.template($("#mrf-slots-computation").html())($scope.view_dataItem);
                        //$scope.$apply(function () {
                        //$scope.testContent = '<div>Hello</div>';
                        //});
    
                        $log.log("view_dataItem", $scope.view_dataItem);
                        $scope.viewManpowerReq.setOptions($scope.optViewManpowerReq);
    
                        $scope.viewManpowerReq.center().open();
                    }

                    $scope.onEditSubmit = function () {
                        //debugger
                        $repository
                            .controller('Applicant')
                            .action('Update')
                            .post(JSON.stringify({ entity: $scope.dataItem }))
                            .success(function (r) {
                                $scope.$apply(function () {
                                    $scope.onEditField = true;
                                    $scope.btnBasicInfoName = "Update";
    
                                    $scope.dataItem = r.Data;
                                    $log.log("$scope.dataItem", $scope.dataItem);
                                    $scope.dataItem.DateApplied = kendo.toString(kendo.parseDate($scope.dataItem.DateApplied), 'MMM dd, yyyy');
                                    $scope.dataItem.ApplicantInfo.Birthdate = kendo.toString(kendo.parseDate($scope.dataItem.ApplicantInfo.Birthdate), 'MMM dd, yyyy');
                                    $scope.dataItem.Gender = $scope.dataItem.ApplicantInfo.Gender.toString();
                                    $scope.dataItem.CivilStatus = $scope.dataItem.ApplicantInfo.CivilStatus.toString();
    
                                    $scope.optEditApplicant = {
                                        title: $scope.dataItem.FullName + " - " + $scope.dataItem.Position.Name,
                                        modal: true,
                                        visible: false,
                                        resizable: false,
                                        actions: ["Maximize", "Close"],
                                        width: "80%"
                                    }

                                    $scope.$emit('mainGridRead', $scope.optEditApplicant);

                                });
                                successNotification("Applicant details updated.", "");
    
                            });
                    }

                    $scope.invokeGrdCustomDelete = function (opt) {
                        $log.log('opt', opt);
                        $log.log('controller', $scope.controller);
                        $log.log('id', $scope.deleteId);

                        iziToast.show({
                            theme: 'light',
                            icon: 'fa fa-info',
                            title: '<span GTbold>Delete Entry</span>',
                            messageLineHeight: 19,
                            messageSize: 15,
                            message: '<p>Are you sure you want to delete this entry?</p>',
                            position: 'center',
                            transitionIn: 'flipInX',
                            transitionOut: 'flipOutX',
                            progressBarColor: '#4FC1EA',
                            imageWidth: 70,
                            layout: 1,
                            titleColor: '#4f2d7f',
                            // iconColor: '#4f2d7f',
                            messageColor: '#4f2d7f',
                            backgroundColor: '#fff',
                            // progressBarColor: '#4f2d7f',
                            buttons: [
                                ['<button class="button btn-align is-small dark-btn btn-outlined"><b class="dark-text">OK</b></button>', function (instance, toast) {
                                    var closestGrid = $('#' + $scope.deleteId).closest('.k-grid').data('kendoGrid');
                                    $log.log("closestGrid", closestGrid);

                                    $repository
                                        .controller($scope.controller)
                                        .action('SoftDeleteByUID')
                                        .post(JSON.stringify({ uid: opt.UID }))
                                        .complete(function (r) {
                                            //successNotification("Successfully deleted.", "");
                                            setTimeout(function () {
                                                //Hide Toast
                                                iziToast.hide({}, document.querySelector('.iziToast'));
                                            }, 100);
                                            closestGrid.dataSource.read();
                                        });

                                }, true]
                            ],
                            onClosing: function () {
                            },
                            onClosed: function (instance, toast, closedBy) {
                            },
                            timeout: false,
                            overlay: true
                        });
                    };


                    //end
                }]
            };
        }
    ]);

    
/**
 * 
 * Interview Grid
 * (Manpower Request)
 */
app.directive('kendoInterviewScope',
[
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                parentUid: '=parentUid'
            },
            template: kendo.template($('#grdInterviewScopeTemplate').html(), { useWithBlock: false }),
            controller: [
                '$scope', function ($scope) {

                    $log.log("parentUid", $scope.parentUid);

                    $scope.onInterviewApproverView = function (apprIntervUid) {
                        var approverInterviewDetailsDS = new recruitment.CDataSource({
                            transport: {
                                read: $repository
                                    .controller('ApplicantInterview')
                                    .action('GetApproverDetailsByApprovalInterviewUID')
                                    .queryString({
                                        apprIntervUid: apprIntervUid
                                    })
                                    .url
                            },
                            schema: {
                                model: recruitment.model.ApprovalDetail
                            }
                        });
                        var grdInterviewApproverDetails = $("#grdInterviewApproverDetails").data("kendoGrid");
                        grdInterviewApproverDetails.setDataSource(approverInterviewDetailsDS);
                        grdInterviewApproverDetails.dataSource.read();
                        $scope.InterviewApproverViewWindow.center().open();
                    }

                    $scope.optGrdInterviewApproverDetails = new recruitment.CGrid({
                        columns: [
                            {
                                field: "Approver.FullName",
                                title: 'Approver',
                                width: 150
                            },
                            {
                                field: "ApprovalStatus.Name",
                                title: 'Status',
                                width: 150
                            },
                            {
                                field: "StatusDate",
                                title: 'Status Date',
                                template: "<div>{{ dataItem.StatusDate | date: 'MMM dd, yyyy' }}</div>",
                                width: 150
                            },
                            {
                                field: "Remarks",
                                title: 'Remarks',
                                width: 150
                            },
                        ],
                        //sortable: true,
                        //scrollable: true,
                        //pageable: {
                        //    pageSize: 10
                        //},
                        //noRecords: {
                        //    template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
                        //},
                        autoBind: false,
                        dataSource: {
                            //data: [
                            //    {}
                            //],
                        }
                    });

                    $scope.optInterviewApproverViewWindow = {
                        width: "50%",
                        // height: "90%",
                        actions: ["Close"],
                        title: "Interviewer Details",
                        draggable: true,
                        modal: true,
                        visible: false,
                        scrollable: true,
                        resizable: true,
                        animation: {
                            open: {
                                effects: "fade:in"
                            },
                            close: {
                                effects: "fade:out"
                            }
                        },
                    }

                    $scope.optGrdInterview = new recruitment.CGrid({
                        //autoBind: false,
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Interview"
                            },
                            'excel',
                            {
                                name: 'grdFilterSearch',
                                template: '<div grd-filter-search></div>'
                            }
                        ],
                        editable: {
                            mode: "popup",
                            window: {
                                width: "40%",
                                animation: {
                                    open: {
                                        effects: "fade:in"
                                    },
                                    close: {
                                        effects: "fade:out"
                                    }
                                }
                            },
                            template: '<div grd-applicant-interview-editor ng-model="dataItem" parent-uid="parentUid"></div>',
                        },
                        dataSource: {
                            //repository: {
                            //    controller: 'ApplicantExam',
                            //    action: {
                            //        read: 'IRetrieveByUID',
                            //        create: 'Create',
                            //        update: 'Update',
                            //        destroy: 'SoftDeleteByUID'
                            //    }
                            //    //includeQS: ['cuid'],
                            //},
                            transport: {
                                read: $repository
                                    .controller('ApplicantInterview')
                                    .action('IRetrieveByUID')
                                    .queryString({
                                        uid: $scope.parentUid
                                    })
                                    .url,
                                update: $repository
                                    .controller('ApplicantInterview')
                                    .action('Update')
                                    .url,
                                create: $repository
                                    .controller('ApplicantInterview')
                                    .action('Create')
                                    .url,
                                destroy: $repository
                                    .controller('ApplicantInterview')
                                    .action('SoftDeleteByUID')
                                    .url,
                            },
                            requestEnd: function (e) {
                                $log.log('grdInterviewScope', e);
                                $scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if (e.response.Data.length > 0) {
                                            if (e.response.Data[0].CanAdd === false) {
                                                $('#grdInterviewScope').find('.k-grid-add').addClass('k-state-disabled');
                                            }
                                            else {
                                                $('#grdInterviewScope').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                        else {
                                            $repository
                                                .controller("Applicant")
                                                .action('GetTabAccessByAppManpowerReqUID')
                                                .queryString({
                                                    CanAdd: true,
                                                    CanUpdate: false,
                                                    CanDelete: false,
                                                    ApplicantTabType: 3, //Interview
                                                    AppManpowerReqUID: $scope.parentUid
                                                })
                                                .get()
                                                .success(function (r) {
                                                    $scope.$apply(function () {
                                                        if (r == false) {
                                                            $('#grdInterviewScope').find('.k-grid-add').addClass('k-state-disabled');
                                                        }
                                                        else {
                                                            $('#grdInterviewScope').find('.k-grid-add').removeClass('k-state-disabled');
                                                        }
                                                    });
                                                }).error(function (err) {
                                                });
                                        }
                                    }
                                });
                            },
                            schema: {
                                model: recruitment.model.ApplicantInterview
                            }
                        },
                        columns: [
                            {
                                field: "InterviewType.Name",
                                title: "Interview Type",
                                width: 120
                            },
                            {
                                field: "InterviewStatus.Name",
                                title: "Interview Status",
                                width: 120
                            },
                            {
                                field: "ApprovalStatus.Name",
                                title: "Approval Status",
                                template: '<a data-ng-click="onInterviewApproverView(dataItem.UID)">' +
                                "#if(ApprovalStatus.Name == null || ApprovalStatus.Name == 'undefined') {##: ApprovalStatus.Name = '' ##} " +
                                "else { ##= ApprovalStatus.Name ##} #" + '<span style="vertical-align="middle;" class="ml-2"><i class="material-icons md-18">touch_app</i></span>' + '</a>',
                                width: 120
                            },
                            //{
                            //    field: "InterviewerEmp.FullName",
                            //    title: "Interviewer",
                            //    width: 150
                            //},
                            {
                                field: "ScheduleDate",
                                title: "Schedule Date",
                                template: "#: kendo.toString(kendo.parseDate(ScheduleDate), 'MMM dd, yyyy') #",
                                width: 150
                            },
                            {
                                field: "ScheduleTime",
                                title: "Schedule Time",
                                template: "#= kendo.toString(kendo.parseDate(ScheduleTime), 't') #",
                                width: 100
                            },
                            //{
                            //    field: "IsCancel",
                            //    title: "Cancelled",
                            //    template:
                            //        '<div class="custom-control fill-checkbox custom-control-grid">' +
                            //        '<label class="custom-control fill-checkbox custom-control-grid" for="IsCancel">' +
                            //        '<input ' +
                            //        'name="IsCancel" ' +
                            //        'id="IsCancel" ' +
                            //        'ng-checked="dataItem.IsCancel" ' +
                            //        'class="fill-control-input" ' +
                            //        'type="checkbox" disabled />' +
                            //        '<span class="fill-control-indicator fill-control-kendogrid"></span>' +
                            //        '</label>' +
                            //        '</div>',
                            //    width: 100
                            //},
                            // {
                            //     field: "Remarks",
                            //     title: "Remarks",
                            //     width: 150
                            // },
                            {
                                field: "MeetingRoom.Name",
                                title: "Meeting Room",
                                width: 150
                            },
                            {
                                command: [
                                    {
                                        id: "edit",
                                        name: "edit",
                                        //text: { edit: "Modify", update: "Save", cancel: "Cancel" },
                                        text: { edit: "Modify", update: "Save" },
                                        template: "<a class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>"
                                    }
                                ],
                                title: " ",
                                width: 100
                            }
                        ],
                    });
                }
            ]
        }
    }
]);
/**
* Exam Grid
* (Manpower Request)
*/
app.directive('kendoExamScope',
[
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                parentUid: '=parentUid'
            },
            template: kendo.template($('#grdExamScopeTemplate').html(), { useWithBlock: false }),
            controller: [
                '$scope', function ($scope) {

                    $log.log("parentUid", $scope.parentUid);

                    $scope.optGrdExamApproverDetails = new recruitment.CGrid({
                        columns: [
                            {
                                field: "Approver.FullName",
                                title: 'Approver',
                                width: 150
                            },
                            {
                                field: "ApprovalStatus.Name",
                                title: 'Status',
                                width: 150
                            },
                            {
                                field: "StatusDate",
                                title: 'Status Date',
                                template: "<div>{{ dataItem.StatusDate | date: 'MMM dd, yyyy' }}</div>",
                                width: 150
                            },
                            {
                                field: "Remarks",
                                title: 'Remarks',
                                width: 150
                            },
                        ],
                        autoBind: false,
                        dataSource: {
                            //data: [
                            //    {}
                            //],
                        }
                    });

                    $scope.onExamApproverView = function (apprExamUid) {
                        var approverExamDetailsDS = new recruitment.CDataSource({
                            pageSize: 10,
                            transport: {
                                read: $repository
                                    .controller('ApplicantExam')
                                    .action('GetApproverDetailsByApprovalExamUID')
                                    .queryString({
                                        appExamUid: apprExamUid
                                    })
                                    .url
                            },
                            schema: {
                                model: recruitment.model.ApprovalDetail
                            }
                        });
                        var grdExamApproverDetails = $("#grdExamApproverDetails").data("kendoGrid");
                        grdExamApproverDetails.setDataSource(approverExamDetailsDS);
                        grdExamApproverDetails.dataSource.read();
                        $scope.ExamApproverViewWindow.center().open();
                    }

                    $scope.optExamApproverViewWindow = {
                        width: "50%",
                        // height: "90%",
                        actions: ["Close"],
                        title: "Examiner Details",
                        draggable: true,
                        modal: true,
                        visible: false,
                        scrollable: true,
                        resizable: true,
                        animation: {
                            open: {
                                effects: "fade:in"
                            },
                            close: {
                                effects: "fade:out"
                            }
                        },
                    }

                    $scope.optGrdExam = new recruitment.CGrid({
                        //autoBind: false,
                        toolbar: [
                            {
                                name: "create",
                                text: "Add Exam"
                            },
                            'excel',
                            {
                                name: 'grdFilterSearch',
                                template: '<div grd-filter-search></div>'
                            },
                        ],
                        editable: {
                            mode: "popup",
                            window: {
                                width: "40%",
                                animation: {
                                    open: {
                                        effects: "fade:in"
                                    },
                                    close: {
                                        effects: "fade:out"
                                    }
                                }
                            },
                            template: '<div grd-applicant-exam-editor ng-model="dataItem" parent-uid="parentUid"></div>',
                        },
                        dataSource: {
                            transport: {
                                read: $repository
                                    .controller('ApplicantExam')
                                    .action('IRetrieveByUID')
                                    .queryString({
                                        uid: $scope.parentUid
                                    })
                                    .url,
                                update: $repository
                                    .controller('ApplicantExam')
                                    .action('Update')
                                    .url,
                                create: $repository
                                    .controller('ApplicantExam')
                                    .action('Create')
                                    .url,
                                destroy: $repository
                                    .controller('ApplicantExam')
                                    .action('SoftDeleteByUID')
                                    .url,
                            },
                            requestEnd: function (e) {
                                $log.log('grdExamScope', e);
                                $scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if (e.response.Data.length > 0) {
                                            if (e.response.Data[0].CanAdd === false) {
                                                $('#grdExamScope').find('.k-grid-add').addClass('k-state-disabled');
                                            }
                                            else {
                                                $('#grdExamScope').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                        else {
                                            $repository
                                                .controller("Applicant")
                                                .action('GetTabAccessByAppManpowerReqUID')
                                                .queryString({
                                                    CanAdd: true,
                                                    CanUpdate: false,
                                                    CanDelete: false,
                                                    ApplicantTabType: 4, //Exam
                                                    AppManpowerReqUID: $scope.parentUid
                                                })
                                                .get()
                                                .success(function (r) {
                                                    $scope.$apply(function () {
                                                        if (r == false) {
                                                            $('#grdExamScope').find('.k-grid-add').addClass('k-state-disabled');
                                                        }
                                                        else {
                                                            $('#grdExamScope').find('.k-grid-add').removeClass('k-state-disabled');
                                                        }
                                                    });
                                                }).error(function (err) {
                                                });
                                        }
                                    }
                                });
                            },
                            schema: {
                                model: recruitment.model.ApplicantExam
                            }
                        },
                        columns: [
                            {
                                field: "ExamType.Name",
                                title: "Exam Type",
                                width: 120
                            },
                            {
                                field: "ExamStatus.Name",
                                title: "Exam Status",
                                width: 120
                            },
                            {
                                field: "ApprovalStatus.Name",
                                title: "Approval Status",
                                template: '<a data-ng-click="onExamApproverView(dataItem.UID)">' +
                                "#if(ApprovalStatus.Name == null || ApprovalStatus.Name == 'undefined') {##: ApprovalStatus.Name = '' ##} " +
                                "else { ##= ApprovalStatus.Name ##} #" + '<span style="vertical-align="middle;" class="ml-2"><i class="material-icons md-18">touch_app</i></span>' + '</a>',
                                width: 120
                            },
                            //{
                            //    field: "ExaminerEmp.FullName",
                            //    title: "Examiner",
                            //    width: 150
                            //},
                            {
                                field: "ScheduleDate",
                                title: "Schedule Date",
                                template: "#: kendo.toString(kendo.parseDate(ScheduleDate), 'MMM dd, yyyy') #",
                                width: 150
                            },
                            {
                                field: "ScheduleTime",
                                title: "Schedule Time",
                                template: "#= kendo.toString(kendo.parseDate(ScheduleTime), 't') #",
                                width: 100
                            },
                            //{
                            //    field: "IsCancel",
                            //    title: "Cancelled",
                            //    template:
                            //        '<div class="custom-control fill-checkbox custom-control-grid">' +
                            //        '<label class="custom-control fill-checkbox custom-control-grid" for="IsCancel">' +
                            //        '<input ' +
                            //        'name="IsCancel" ' +
                            //        'id="IsCancel" ' +
                            //        'ng-checked="dataItem.IsCancel" ' +
                            //        'class="fill-control-input" ' +
                            //        'type="checkbox" disabled />' +
                            //        '<span class="fill-control-indicator fill-control-kendogrid"></span>' +
                            //        '</label>' +
                            //        '</div>',
                            //    width: 100
                            //},
                            // {
                            //     field: "Remarks",
                            //     title: "Remarks",
                            //     width: 150
                            // },
                            {
                                field: "MeetingRoom.Name",
                                title: "Meeting Room",
                                width: 150
                            },
                            {
                                command: [
                                    {
                                        id: "edit",
                                        name: "edit",
                                        //text: { edit: "Modify", update: "Save", cancel: "Cancel" },
                                        text: { edit: "Modify", update: "Save" },
                                        template: "<a class='k-button k-grid-edit'><i class='material-icons md-18'>edit</i></a>"
                                    }
                                ],
                                title: " ",
                                width: 100
                            }
                        ],
                    });
                }
            ]
        }
    }
]);
/**
* Application History Grid
* (Manpower Request)
*/
app.directive('kendoHistoryScope',
[
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                parentUid: '=parentUid'
            },
            template: kendo.template($('#grdHistoryScopeTemplate').html(), { useWithBlock: false }),
            controller: [
                '$scope', function ($scope) {

                    $log.log("parentUid", $scope.parentUid);

                    $scope.optGrdHistory = new recruitment.CGrid({
                        autoBind: true,
                        toolbar: [
                            'excel',
                            //{
                            //    name: 'grdFilterSearch',
                            //    template: '<div grd-filter-search></div>'
                            //},
                        ],
                        //editable: {
                        //    mode: "popup",
                        //    window: {
                        //        width: "50%",
                        //        animation: {
                        //            open: {
                        //                effects: "fade:in"
                        //            },
                        //            close: {
                        //                effects: "fade:out"
                        //            }
                        //        }
                        //    },
                        //    template: '<div grd-pos-div-scope-editor ng-model="dataItem"></div>',
                        //},
                        dataSource: {
                            sort: [{ field: "UpdatedOn", dir: "desc" }],
                            transport: {
                                read: $repository
                                    .controller('ApplicantHiringStageLog')
                                    .action('IRetrieveByUID')
                                    .queryString({
                                        uid: $scope.parentUid
                                    })
                                    .url,
                                //update: $repository
                                //    .controller('ApplicantHiringStageLog')
                                //    .action('Update')
                                //    .url,
                                //create: $repository
                                //    .controller('ApplicantHiringStageLog')
                                //    .action('Create')
                                //    .url,
                                //destroy: $repository
                                //    .controller('ApplicantHiringStageLog')
                                //    .action('SoftDeleteByUID')
                                //    .url,
                            },
                            schema: {
                                model: recruitment.model.ApplicantHiringStageLog
                            }
                        },
                        columns: [
                            {
                                field: "HiringStage.Name",
                                title: "Hiring Stage",
                                width: 150
                            },
                            {
                                field: "Status.Name",
                                title: "Status",
                                template: "#if(Status == null || Status == undefined) {##: '' ##} else { ##: Status.Name ##} #",
                                width: 150
                            },
                            {
                                field: "DateHired",
                                title: "Date Hired",
                                template: "#if(DateHired == null || DateHired == undefined) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(DateHired), 'MMM dd, yyyy') ##} #",
                                width: 150
                            },
                            {
                                field: "AssignedStaff",
                                template: function (r) {
                                    var staff = "";
                                    r.AssignedStaff.forEach(function (element) {
                                        //console.log(element);
                                        staff = staff + element.FullName + ", "
                                    });
                                    return staff.substring(0, staff.length - 2);;
                                    //$log.log("AssignedStaff", r.AssignedStaff);
                                },
                                title: "Assigned Staff",
                                width: 150
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 150
                            },
                            {
                                field: "UpdatedBy.FullName",
                                title: "Updated By",
                                width: 150
                            },
                            {
                                field: "UpdatedOn",
                                title: "Updated On",
                                template: "#: kendo.toString(kendo.parseDate(UpdatedOn), 'MMM dd, yyyy h:mm tt') #",
                                width: 150
                            },
                        ],
                    });
                }
            ]
        }
    }
]);
/**
* 
* Onboarding Grid
* (Manpower Request)
*/
app.directive('kendoOnboardingScope',
[
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                parentUid: '=parentUid'
            },
            template: kendo.template($('#grdOnboardingScopeTemplate').html(), { useWithBlock: false }),
            controller: [
                '$scope', function ($scope) {

                    $log.log("parentUid", $scope.parentUid);

                    $scope.optGrdOnboarding = new recruitment.CGrid({
                        //autoBind: false,
                        autoBind: false,
                        editable: {
                            mode: "popup",
                            confirmation: false,
                            window: {
                                width: "40%",
                            },
                            template: '<div grd-applicant-onboarding-checklist-editor ng-model="dataItem" parent-uid="parentUid"></div>'
                        },
                        dataSource: {
                            transport: {
                                read: $repository
                                    .controller('ApplicantOnboardingChecklist')
                                    .action('IRetrieveByUID')
                                    .queryString({
                                        uid: $scope.parentUid
                                    })
                                    .url,
                                update: $repository
                                    .controller('ApplicantOnboardingChecklist')
                                    .action('Update')
                                    .url,
                                create: $repository
                                    .controller('ApplicantOnboardingChecklist')
                                    .action('Create')
                                    .url,
                                destroy: $repository
                                    .controller('ApplicantOnboardingChecklist')
                                    .action('SoftDeleteByUID')
                                    .url,
                            },
                            requestEnd: function (e) {
                                $log.log('grdOnboardingScope', e);
                                $scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if (e.response.Data.length > 0) {
                                            if (e.response.Data[0].CanAdd === false) {
                                                $('#grdOnboardingScope').find('.k-grid-add').addClass('k-state-disabled');
                                            }
                                            else {
                                                $('#grdOnboardingScope').find('.k-grid-add').removeClass('k-state-disabled');
                                            }
                                        }
                                        else {
                                            $repository
                                                .controller("Applicant")
                                                .action('GetTabAccessByAppManpowerReqUID')
                                                .queryString({
                                                    CanAdd: true,
                                                    CanUpdate: false,
                                                    CanDelete: false,
                                                    ApplicantTabType: 5, //Onboarding Checklist
                                                    AppManpowerReqUID: $scope.parentUid
                                                })
                                                .get()
                                                .success(function (r) {
                                                    $scope.$apply(function () {
                                                        if (r == false) {
                                                            $('#grdOnboardingScope').find('.k-grid-add').addClass('k-state-disabled');
                                                        }
                                                        else {
                                                            $('#grdOnboardingScope').find('.k-grid-add').removeClass('k-state-disabled');
                                                        }
                                                    });
                                                }).error(function (err) {
                                                });
                                        }
                                    }
                                });
                            },
                            schema: {
                                model: recruitment.model.ApplicantOnboardingChecklist
                            }
                        },
                        toolbar: [
                            //{
                            //    name: "transfer",
                            //    text: "Transfer",
                            //    template: '<a transfer-applicant role="button" ng-click="onTransferApplicant()" class="k-primary k-button k-button-icontext">Transfer</a>'
                            //},
                            //{
                            //    name: "override",
                            //    text: "Override",
                            //    template: '<a transfer-applicant role="button" ng-click="onOverrideApplicant()" class="k-primary k-button k-button-icontext">Override</a>'
                            //},
                            {
                                name: "create",
                                text: "Add Checklist"
                            },
                            "excel",
                            {
                                name: 'grdFilterSearch',
                                template: '<div grd-filter-search></div>'
                            }
                        ],
                        columns: [
                            {
                                field: "OnboardingRequirement.Name",
                                title: "Requirement",
                                template: '<a GTbrandcolor underline title="#if(OnboardingRequirement.IsRequired === true) { ##: "Required" ## } else { ##: "Not Required" ##} #">' +
                                "#: OnboardingRequirement.Name #" +
                                //'<span style="vertical-align="middle;" class="ml-2"><i class="material-icons md-18">touch_app</i></span>' +
                                '</a>',
                                width: 150
                            },
                            {
                                field: "DateSubmitted",
                                title: "Date Submitted",
                                template: "#if(DateSubmitted == null) {##: '' ##} else { ##: kendo.toString(kendo.parseDate(DateSubmitted), 'MMM dd, yyyy') ##} #",
                                width: 150
                            },
                            {
                                field: "Value",
                                title: "Value",
                                width: 150
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 150
                            },
                            {
                                field: "UpdatedBy.FullName",
                                title: "Updated By",
                                template: "#if(UpdatedBy == null || UpdatedBy.UID == null) {##: '' ##} else { ##: UpdatedBy.FullName ##} #",
                                width: 150
                            },
                            gridUtil.columns.editCommand(),
                            {
                                title: "",
                                width: 100,
                                template: function (e) {
                                    var template;
                                    if (e.CanDelete) {
                                        //$scope.controller = 'ApplicantManpowerReq';
                                        //$scope.deleteId = 'grdApplicationDelete';
                                        template = "<a id='grdDeleteOnb' class='k-button' ng-click='invokeGrdOnbCustomDelete(dataItem)'><i class='material-icons md-18'>delete</i></a>";
                                    }
                                    else {
                                        template = '<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>';
                                    }
                                    return template;
                                }
                            }
                        ],
                    });

                    $scope.invokeGrdOnbCustomDelete = function (opt) {
                        iziToast.show({
                            theme: 'light',
                            icon: 'fa fa-info',
                            title: '<span GTbold>Delete Entry</span>',
                            messageLineHeight: 19,
                            messageSize: 15,
                            message: '<p>Are you sure you want to delete this entry?</p>',
                            position: 'center',
                            transitionIn: 'flipInX',
                            transitionOut: 'flipOutX',
                            progressBarColor: '#4FC1EA',
                            imageWidth: 70,
                            layout: 1,
                            titleColor: '#4f2d7f',
                            // iconColor: '#4f2d7f',
                            messageColor: '#4f2d7f',
                            backgroundColor: '#fff',
                            // progressBarColor: '#4f2d7f',
                            buttons: [
                                ['<button class="button btn-align is-small dark-btn btn-outlined"><b class="dark-text">OK</b></button>', function (instance, toast) {
                                    var closestGrid = $('#grdDeleteOnb').closest('.k-grid').data('kendoGrid');

                                    $repository
                                        .controller('ApplicantOnboardingChecklist')
                                        .action('SoftDeleteByUID')
                                        .post(JSON.stringify({ uid: opt.UID }))
                                        .complete(function (r) {
                                            //successNotification("Successfully deleted.", "");
                                            setTimeout(function () {
                                                //Hide Toast
                                                iziToast.hide({}, document.querySelector('.iziToast'));
                                            }, 100);
                                            closestGrid.dataSource.read();
                                        });

                                }, true]
                            ],
                            onClosing: function () {
                            },
                            onClosed: function (instance, toast, closedBy) {
                            },
                            timeout: false,
                            overlay: true
                        });
                    };
                }
            ]
        }
    }
]);
/**
* 
* Transfer Info Grid
* (Manpower Request)
*/
app.directive('kendoTransferInfoScope',
[
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                parentUid: '=parentUid'
            },
            template: kendo.template($('#grdTransferInfoScopeTemplate').html(), { useWithBlock: false }),
            controller: [
                '$scope', function ($scope) {

                    $log.log("parentUid", $scope.parentUid);

                    $scope.optGrdTransferInfo = new recruitment.CGrid({
                        //autoBind: false,
                        autoBind: false,
                        editable: {
                            title: "Transfer/Override",
                            mode: "popup",
                            confirmation: false,
                            window: {
                                width: "40%",
                                title: "Transfer/Override"
                            },
                            template: "<div grd-applicant-transfer-editor ng-model='dataItem' parent-uid='parentUid'></div>"

                        },
                        dataSource: {
                            transport: {
                                read: $repository
                                    .controller('ApplicantTransferHistory')
                                    .action('IRetrieveByUID')
                                    .queryString({
                                        uid: $scope.parentUid
                                    })
                                    .url,
                                create: $repository
                                    .controller('ApplicantTransferHistory')
                                    .action('Create')
                                    .url,
                            },
                            schema: {
                                model: recruitment.model.ApplicantTransferHistory
                            },
                            requestEnd: function (e) {
                                $log.log('transfer', e);
                                $scope.$apply(function () {
                                    if (e.hasOwnProperty('response')) {
                                        if (e.response.Data.length > 0) {
                                            $('#grdTransferInfoScope').find('.k-grid-add').addClass('k-state-disabled');

                                            //var grdTransferInfoScope = $("#grdTransferInfoScope").data("kendoGrid");
                                            //grdTransferInfoScope.dataSource.read();
                                        }
                                    }
                                    if (e.type == "create") {
                                        setTimeout(function myfunction() {
                                            $("#grdTransferInfoScope").data("kendoGrid").dataSource.read();
                                            $("#grdApplication").data("kendoGrid").dataSource.read();
                                        }, 1000);
                                    }
                                });
                            }
                        },
                        toolbar: [
                            {
                                name: "create",
                                text: "Transfer/Override"
                            },
                            "excel",
                            {
                                name: 'grdFilterSearch',
                                template: '<div grd-filter-search></div>'
                            }
                        ],
                        //customSaveChanges: function (e) {
                        //    e.preventDefault();
                        //    $log.log("save", e);
                        //},
                        columns: [
                            {
                                title: "Employee Code",
                                field: "Employee.Code",
                                template: "#if(Employee == null || Employee.UID == null) {##: '' ##} else { ##= Employee.Code ##} #",
                                width: 150
                            },
                            {
                                field: "TransferType.Name",
                                title: "Type",
                                template: "#if(TransferType == null || TransferType.Name == null) {##: '' ##} else { ##= TransferType.Name ##} #",
                                width: 135
                            },
                            {
                                field: "Remarks",
                                title: "Remarks",
                                width: 135
                            },
                            {
                                field: "TransferredBy.FullName",
                                template: "#if(TransferredBy == null || TransferredBy.FullName == null) {##: '' ##} else { ##= TransferredBy.FullName ##} #",
                                title: "Transferred By",
                                width: 135
                            },
                            {
                                field: "DateTransferred",
                                title: "Date Transferred",
                                template: "#if(DateTransferred == null) {##: '' ##} else { ##= kendo.toString(kendo.parseDate(DateTransferred), 'MMM dd, yyyy') ##} #",
                                width: 135
                            }
                        ],
                    });
                   
                }
            ]
        }
    }
]);
/**
* 
* Attachment Grid
* (Manpower Request)
*/
app.directive('kendoAttachmentScope',
[
    app.Services.Repository, app.Services.Log,
    function ($repository, $log) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                parentUid: '=parentUid'
            },
            template: kendo.template($('#grdAttachmentScopeTemplate').html(), { useWithBlock: false }),
            controller: [
                '$scope', function ($scope) {

                    $log.log("parentUid", $scope.parentUid);
                }
            ]
        }
    }
]);