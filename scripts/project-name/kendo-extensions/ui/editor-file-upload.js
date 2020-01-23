(function () {
    app.directive('editorFileUpload',
        [
            '$compile',
            function ($compile) {
                return {
                    restrict: 'A',
                    //require: '^kendoEditor',
                    scope: {
                        fileAttachments: '=',
                        //kendoEditorId: '='
                        //dependencyButton: '='
                        id: '@',
                        path: '@',
                        unit: '@'
                    },
                    replace: true,
                    //template: kendo.template($("#grdSearchTemplate").html()),
                    template: '<input name=\"files\" type=\"file\" title="Insert file" accept=".doc,.docx,.xls,.xlsx,.png,.jpeg,.pdf" />',
                    //template: '<input name=\"files\" type=\"file\" kendo-upload k-options=\"optKendoUpload\" />',
                    controler: ['$scope', function ($scope) {
                        //$scope.optKendoUpload =
                    }],
                    link: function (scope, element, attrs) {
                        //element.html(
                        //    "<input name=\"files\" type=\"file\" kendo-upload k-options=\"optKendoUpload\" />");
                        //$compile(element.contents())(scope);
                        var editor = null;
                        var uid;
                        $(element).kendoUpload({

                            async:
                                {
                                    saveUrl: recruitmentConfig.VirtualPath + "/recruitment/SaveUpload",
                                autoUpload: true,
                                batch: true,
                            },
                            upload: function (e)
                            {
                                uid = recruitment.preloader.show("Attaching file");
                                if (attrs.dependencyButton != null &&
                                    attrs.dependencyButton != undefined &&
                                    attrs.dependencyButton !== "") {
                                    console.log("[for-editor-file-upload=\"" + attrs.dependencyButton + "\"]");
                                    $("[for-editor-file-upload=\"" + attrs.dependencyButton + "\"]").addClass("button is-loading");
                                }



                                e.data =
                                    {
                                        //clearanceReqId: parseInt($scope.getClearanceIdForUpload),
                                        //UnitID: parseInt($scope.getUnitIdForUpload),

                                        clearanceReqId: parseInt(scope.id),
                                        LPath: scope.path,
                                        UnitID: scope.unit,

                                    };

                            },
                            //Allow selected file types
                            validation: {
                                allowedExtensions: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx", ".xls", ".xlsx"]
                            },
                            success: function (e) {


                                var file = e.response[0];
                                console.log('this', $(this.element));
                                console.log('parents',
                                    $(this.element)
                                        .parents("table[class='k-widget k-editor k-header k-editor-widget']"));
                                //console.log('file', file);
                                //console.log('$(this.element)', $(this.element));
                                //console.log('$(this.element).parents', $(this.element).parents("table[class='k-widget k-editor k-header k-editor-widget']"));
                                //console.log('$(this.element).parents.find', $(this.element).parents("table[class='k-widget k-editor k-header k-editor-widget']").find("textarea[kendo-editor]"));

                                if (attrs.fileAttachments != null &&
                                    attrs.fileAttachments != undefined &&
                                    attrs.fileAttachments !== "") {
                                    scope.fileAttachments.push(file.UID);
                                }

                                if (editor == null) {
                                    editor =
                                        $(this.element)
                                            .parents("table[class='k-widget k-editor k-header k-editor-widget']")
                                            .find("textarea[kendo-editor]")
                                            .data("kendoEditor");
                                    //if (attrs.kendoEditorId != null &&
                                    //    attrs.kendoEditorId != undefined &&
                                    //    attrs.kendoEditorId !== "") {
                                    //    editor = $('#' + attrs.kendoEditorId)
                                    //        //$(this.element)
                                    //        //    .parents("table[class='k-widget k-editor k-header k-editor-widget']")
                                    //        //    .find("textarea[kendo-editor]")
                                    //        .data("kendoEditor");
                                    //}
                                }


                                var fileArray = [];

                                for (var i in e.response) {

                                    fileArray.push(e.response[i].FileID);

                                    editor.exec("inserthtml",
                                        {
                                            //    value: "<a " +
                                            //        "href=\"" +
                                            //        ticketConfig.VirtualPath +
                                            //        "/Clearance/DownloadFile?id=" +
                                            //        e.response.FileID +
                                            //        "\" title=\"Download this file\">" +
                                            //        e.response.C_Name +
                                            //        "</a>"

                                            value: '<a href="' + recruitmentConfig.VirtualPath + '/recruitment/DownloadFile?id=' + e.response[i].FileID + '">' + e.response[i].C_Name + '</a> ',
                                        });
                                }


                                var fID = fileArray;


                                if (sessionStorage.getItem("bindFileID").length <= 0) {
                                    sessionStorage.setItem("bindFileID", JSON.stringify(fID));

                                } else {



                                    var getBindFileID = JSON.parse(sessionStorage.getItem('bindFileID'));



                                    for (var i in fID) {
                                        getBindFileID.push(fID[i]);

                                    }


                                    sessionStorage.setItem("bindFileID", JSON.stringify(getBindFileID));
                                }






                                console.log(sessionStorage.getItem("bindFileID"));

                                recruitment.preloader.hide(uid);
                                if (attrs.dependencyButton != null &&
                                    attrs.dependencyButton != undefined &&
                                    attrs.dependencyButton !== "") {
                                    $("[for-editor-file-upload=\"" + attrs.dependencyButton + "\"]")
                                        .removeClass("button is-loading");
                                    //$('button[forEditorFileUpload="' + attrs.dependencyButton + '"]').removeClass("button is-loading");
                                }
                            },
                            localization: {
                                select: ""
                            }
                        });

                        $(element).next("span").addClass("k-tool-icon k-icon k-i-file-add");
                        $(element).parents("div.k-dropzone").css("padding", "0");
                        $(element).parent("div.k-upload-button")
                            .css("background", "#f2f2f2")
                            .css("box-shadow", "none")
                            .css("border", "0")
                            .css("cursor", "pointer")
                            .hover(function () {
                                $(this).css("color", "#444")
                                    .css("border-color", "#ebebeb")
                                    .css("background-color", "#ebebeb")
                                    .css("cursor", "pointer");
                            }, function () {
                                $(this).css("color", "")
                                    .css("border-color", "")
                                    .css("background", "#f2f2f2")
                                    .css("cursor", "pointer");
                            });
                        $(element).parents("div.k-upload").css("border", "0");
                        //                        * color: #444; * /
                        ///* border-color: #ebebeb; */
                        ///* background-color: #ebebeb;
                    }
                };
            }
        ]);
})(recruitment);