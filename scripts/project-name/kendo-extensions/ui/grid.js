(function () {
    function CGrid(customOpt) {
        //var _emptyMsg = 'No Entry Found';

        if (customOpt !== undefined) {
            for (var _k in customOpt) {
                this[_k] = customOpt[_k];
            }

            this.pageable = true;

            if (customOpt.sortable == undefined || customOpt.sortable == null) {
                this.sortable = true;
            } else {
                this.sortable = customOpt.sortable;
            }
            this.selectable = true;
            this.navigatable = true;
            this.autoBind = customOpt.autoBind !== undefined ? customOpt.autoBind : true;
            this.reorderable = true;
            this.resizable = true;
            this.noRecords = true;

            this.noRecords = {
                template: '<div class="k-grid-norecords ng-scope"><div class="k-grid-norecords-template" style="text-align:center;">No Entry Found</div></div>'
            };

            //if (customOpt.gridEmptyMessage !== undefined &&
            //    customOpt.gridEmptyMessage !== null &&
            //    customOpt.gridEmptyMessage.trim() !== '') {
            //    _emptyMsg = customOpt.gridEmptyMessage;
            //}

            //this.filterable = true;
            //this.columnMenu = true;


            this.excel = {
                allPages: true,
                filterable: false
            };
            if (customOpt.excel != null && customOpt.excel !== undefined) {
                if (customOpt.excel.fileName != null && customOpt.excel.fileName !== undefined) {
                    this.excel.fileName = customOpt.excel.fileName;
                }
            }

            if (customOpt.excelExport != null && customOpt.excelExport !== undefined) {
                this.excelExport = customOpt.excelExport;
            } else {
                this.excelExport = function (e) {
                    var sheet = e.workbook.sheets[0];

                    for (var c = 0; c < sheet.columns.length; c++) {
                        if (this.columns[c].template != undefined &&
                            this.columns[c].template != null &&
                            typeof this.columns[c].template != "function" &&
                            this.columns[c].field != undefined &&
                            this.columns[c].field != null &&
                            this.columns[c].field !== "") {

                            var template = kendo.template(this.columns[c].template
                                .replace(/<\s*\w.*?>/g, '')
                                .replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, ''));
                            console.log('template', this.columns[c].template

                                .replace(/<\s*\w.*?>/g, '')
                                .replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, '')

                                //.replace(/<!--(.*?)-->/gm, "")
                                ///*replace value of attrs*/.replace(/="(.*?)"/gm, "")
                                ///*replace html markup */.replace(/<[\s\S]*?>/g, "")
                                ///*replace whitespaces */.replace(/\s/g, '')
                                //.replace(/<\s*\w.*?>/g, '')
                                //.replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, '')
                            );
                            delete sheet.columns[c].width;
                            sheet.columns[c].autoWidth = true;

                            for (var r = 0; r < sheet.rows.length; r++) {
                                var row = sheet.rows[r];
                                if (r === 0) {
                                    if (this.columns[c].headerTemplate != undefined &&
                                        this.columns[c].headerTemplate != null) {
                                        if (this.columns[c].headerTemplate !== "") {
                                            row.cells[c].value = this.columns[c].headerTemplate
                                                .replace(/<\s*\w.*?>/g, '')
                                                .replace(/<\s*\/\s*\w\s*.*?>|<\s*br\s*>/g, '');
                                        }
                                    }
                                } else {
                                    row.cells[c].value = template(e.data[r - 1]);
                                }
                            }
                        } else if (this.columns[c].field == undefined ||
                            this.columns[c].field == null ||
                            this.columns[c].field === "") {

                        }
                    }
                }
            }


            this.toolbar = [];
            this.editable = customOpt.editable;

            if ($.type(customOpt.pageable) === 'boolean') {
                this.pageable = customOpt.pageable;
            }

            if ($.type(customOpt.navigatable) === 'boolean') {
                this.navigatable = customOpt.navigatable;
            }

            if ($.type(customOpt.selectable) === 'boolean') {
                this.selectable = customOpt.selectable;
            }

            if ($.type(customOpt.pageable) === 'object') {
                for (var _p in customOpt.pageable) {
                    this.pageable[_p] = customOpt.pageable[_p];
                }
            }

            if ($.type(customOpt.toolbar) === 'array') {
                var _defaultCreate = {
                    name: 'create',
                    text: 'Add Record'
                };

                //var _defaultSave = {
                //    name: 'save',
                //    text: 'Save'
                //};

                var _defaultExcel = {
                    name: 'excel',
                    text: 'Export'
                };

                for (var i = 0; i < customOpt.toolbar.length; i++) {
                    var _toolbar = customOpt.toolbar[i];

                    if ($.type(_toolbar) === 'string') {
                        switch (_toolbar) {
                            case 'search':
                                this.toolbar.push({
                                    name: 'grdSearch',
                                    template: '<input grd-search="" placeholder="Search keyword" />'
                                });
                                break;
                            case 'create':
                                this.toolbar.push(_defaultCreate);
                                break;
                            //case 'save':
                            //    this.toolbar.push(_defaultSave);
                            //    break;
                            case 'excel':
                                this.toolbar.push(_defaultExcel);
                                break;
                            case 'template':
                                this.toolbar.push({
                                    name: 'downloadTemplate',
                                    template: '<div download-template></div>'
                                });
                                break;
                            case 'upload':
                                this.toolbar.push({
                                    name: 'uploadTemplate',
                                    template: '<button batch-upload action="Insert"></button>'
                                });
                                break;
                            default:
                                break;

                        }
                    } else {
                        if (_toolbar.name !== undefined) {
                            switch (_toolbar.name) {
                                case 'create':
                                    this.toolbar.push({
                                        name: _defaultCreate.name,
                                        text: _toolbar.text !== "" && _toolbar.text != null
                                            ? _toolbar.text
                                            : _defaultCreate.text
                                    });
                                    break;
                                //case 'save':
                                //    this.toolbar.push({
                                //        name: _defaultSave.name,
                                //        text: _toolbar.text !== "" && _toolbar.text != null
                                //            ? _toolbar.text
                                //            : _defaultSave.text
                                //    });
                                //    break;
                                case 'search':
                                    this.toolbar.push({
                                        name: 'grdSearch',
                                        template: '<input grd-search="" placeholder="Search keyword" />'
                                    });
                                    break;
                                case 'upload':
                                    var _batchType = _toolbar.batchType;
                                    var _batchAction = _toolbar.batchAction || 'Insert';
                                    var _waitBatch = true;
                                    var _noTemplate = _toolbar.noTemplate || false;

                                    if (_toolbar.action !== undefined && _toolbar.action !== null) {
                                        if (_toolbar.action.trim().toLowerCase() === "insert" ||
                                            _toolbar.action.trim().toLowerCase() === "update") {
                                            _batchAction = _toolbar.action.trim();
                                        }
                                    }

                                    var _attr = {
                                        'batch-upload': '',
                                        'action': _batchAction,
                                        'no-template': _noTemplate
                                    };

                                    if (_toolbar.waitBatch !== undefined && _toolbar.waitBatch !== null) {
                                        _waitBatch = _toolbar.waitBatch;
                                    }

                                    if (_batchType !== undefined && _batchType !== null) {
                                        _attr['batch-type'] = _batchType;
                                        _attr['wait-batch'] = _waitBatch;
                                    }

                                    this.toolbar.push({
                                        name: 'uploadTemplate',
                                        template: $('<button />')
                                            .attr(_attr)
                                            .prop('outerHTML')
                                    });
                                    break;
                                case 'template':
                                    this.toolbar.push({
                                        name: 'downloadTemplate',
                                        template: '<div download-template ' +
                                        (
                                            _toolbar.controller !== undefined &&
                                                _toolbar.controller !== null &&
                                                _toolbar.controller !== ''
                                                ? ('ctrl="' + _toolbar.controller + '"')
                                                : ''
                                        ) +
                                        ' level="' +
                                        _toolbar.level +
                                        '"></div>'
                                    });
                                    break;
                                default:
                                    this.toolbar.push(_toolbar);
                                    break;
                            }
                        }
                    }
                }
            }

            if (customOpt.autoBind !== undefined) {
                this.autoBind = customOpt.autoBind;
            }


            //if (customOpt.withKeyboardShortcut !== undefined) {
            //    if (customOpt.withKeyboardShortcut) {
            //        this.edit = function (e) {

            //            var commandCellUpdate = e.container.find("td:nth-last-child(2)");
            //            var btnUpdate =
            //                $(
            //                    '<a class="k-button k-grid-update" style="min-width:16px;"><span class="k-icon k-update"></span></a>');

            //            e.sender.editable.validatable = new recruitment.CValidator(e.container);

            //            e.sender.unbind("save");
            //            e.sender.bind("save",
            //                function (sc) {
            //                    sc.preventDefault();
            //                    _handleGridUI.disable(btnUpdate);
            //                    var deferred = $.Deferred();
            //                    $.when(e.sender.dataSource.sync()).done(function () {
            //                        _handleGridUI.enable(btnUpdate);
            //                    },
            //                        function () {
            //                            _handleGridUI.enable(btnUpdate);
            //                        });
            //                    if (customOpt.save !== undefined) {
            //                        customOpt.save();
            //                    }
            //                });

            //            commandCellUpdate.empty();
            //            commandCellUpdate.append(btnUpdate);

            //            var commandCellCancel = e.container.find("td:last");
            //            commandCellCancel.empty();

            //            var btnCnl = $('' +
            //                '<a class="k-button ' +
            //                'k-grid-cancel" ' +
            //                'style="min-width:16px;"><span class="k-icon k-cancel"></span>' +
            //                '</a>');

            //            shortcut.add('ESC',
            //                function () {
            //                    btnCnl.click();
            //                });

            //            commandCellCancel.append(btnCnl);
            //            _prepareForm(e, btnUpdate);
            //        };
            //    }
            //} else {
            //    this.edit = function (e) {
            //        //if (!e.model.CanUpdate) {
            //        //    e.container.data("kendoWindow").title('View Entry');
            //        //    $("div.k-edit-buttons")[0].innerHTML = '';
            //        //    console.log('form', $("div.k-popup-edit-form"));
            //        //} else {
            //        var entryName = null;
            //        if (customOpt.editable != null && customOpt.editable != undefined) {
            //            if (customOpt.editable.window != null && customOpt.editable.window != undefined) {
            //                if (customOpt.editable.window.title != undefined) {
            //                    entryName = customOpt.editable.window.title;
            //                }
            //            }
            //        }
            //        if (e.model.isNew()) {
            //            e.container.data("kendoWindow").title('Add New ' + (entryName != null ? entryName : 'Entry'));
            //            $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-update'></span>Save";
            //        } else {
            //            e.container.data("kendoWindow").title('Update ' + (entryName != null ? entryName : 'Entry'));
            //            $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-update'></span>Update";
            //        }
            //        //}
            //        e.sender.editable.validatable = new recruitment.CValidator(e.container);

            //        e.sender.unbind("save");
            //        e.sender.bind("save",
            //            function (sc) {
            //                console.log('sc', sc);
            //                sc.preventDefault();
            //                if (customOpt.customSaveChanges != undefined && customOpt.customSaveChanges != null) {
            //                    if ($.type(customOpt.customSaveChanges) === 'function')
            //                        customOpt.customSaveChanges(sc);
            //                } else {
            //                    _handleGridUI.disable($('a.k-grid-update'));;
            //                    $.when(e.sender.dataSource.sync()).then(function () {
            //                        _handleGridUI.enable($('a.k-grid-update'));
            //                        //e.model.set('IsDirty', false);
            //                        e.sender.dataSource.read();//TODO Sucessful Update then Edit and cancel (Temporary fixed)
            //                        console.log("success @ when", e.model);
            //                    },
            //                        function () {
            //                            _handleGridUI.enable($('a.k-grid-update'));
            //                            console.log("failed @ when");
            //                        });
            //                }
            //            });
            //        console.log('e', e);
            //        _prepareForm(e);
            //    };
            //}

            if (customOpt.editable === "inline") {
                this.edit = function (e) {
                    var commandCellUpdate = e.container.find("td:nth-last-child(2)");

                    //e.model.set('DirtyUID', Guid.NewGuid());
                    console.log("grid edit e", e);

                    var btnUpdate =
                        $('<a class="k-button k-grid-update"><i class="material-icons">check</i ></a>');

                    e.sender.editable.validatable = new recruitment.CValidator(e.container);

                    e.sender.unbind("save");
                    e.sender.bind("save",
                        function (sc) {
                            sc.preventDefault();

                            _handleGridUI.disable(btnUpdate);
                            var deferred = $.Deferred();
                            $.when(e.sender.dataSource.sync()).done(function () {
                                _handleGridUI.enable(btnUpdate);

                                // jett was here
                                if (customOpt.save != null && customOpt.save !== undefined) {
                                    if ($.type(customOpt.save) === 'function') {
                                        customOpt.save(e.model);
                                    }
                                }
                                // yel was here
                                else if (customOpt.update != null && customOpt.update !== undefined) {
                                    if ($.type(customOpt.update) === 'function') {
                                        customOpt.update(e.model);
                                    }
                                }
                            },
                                function () {
                                    _handleGridUI.enable(btnUpdate);


                                });
                            if (customOpt.save !== undefined) {
                                customOpt.save();
                            }
                        });

                    commandCellUpdate.empty();
                    commandCellUpdate.append(btnUpdate);

                    var commandCellCancel = e.container.find("td:last");
                    commandCellCancel.empty();

                    var btnCnl = $('' +
                        '<a class="k-button ' +
                        'k-grid-cancel" ' +
                        '><i class="material-icons">close</i></span>' +
                        '</a>');

                    //if (customOpt.withKeyboardShortcut !== undefined) {
                    //    if (customOpt.withKeyboardShortcut) {
                    //shortcut.add('ESC',
                    //    function () {

                    //        btnCnl.click();
                    //    });
                    //    }
                    //}

                    commandCellCancel.append(btnCnl);
                    _prepareForm(e, btnUpdate);
                };
            } else {
                this.edit = function (e) {
                    //if (!e.model.CanUpdate) {
                    //    e.container.data("kendoWindow").title('View Entry');
                    //    $("div.k-edit-buttons")[0].innerHTML = '';
                    //    console.log('form', $("div.k-popup-edit-form"));
                    //} else {
                    //console.log("Model", e);
                    var entryName = null;
                    if (customOpt.editable != null && customOpt.editable != undefined) {
                        if (customOpt.editable.window != null && customOpt.editable.window != undefined) {
                            if (customOpt.editable.window.title != undefined) {
                                entryName = customOpt.editable.window.title;
                            }

                            var _action = "";
                            if (e.model.isNew()) {
                                //e.container.data("kendoWindow").title('Add New ' + (entryName != null ? entryName : 'Entry'));
                                e.container.data("kendoWindow").title((entryName != null ? entryName : 'Add New Entry'));
                                $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-i-check'></span>Save";
                                _action = "created";
                            } else {
                                e.container.data("kendoWindow").title('Update ' + (entryName != null ? entryName : 'Entry'));
                                $("a.k-grid-update")[0].innerHTML = "<span class='k-icon k-i-check'></span>Update";
                                _action = "updated";
                            }
                        }
                    }
                    //}
                    e.sender.editable.validatable = new recruitment.CValidator(e.container);

                    e.sender.unbind("save");
                    e.sender.bind("save",
                        function (sc) {
                            sc.preventDefault();

                            if (customOpt.customSaveChanges != undefined && customOpt.customSaveChanges != null) {
                                if ($.type(customOpt.customSaveChanges) === 'function')
                                    customOpt.customSaveChanges(sc);
                                //yel was here
                                $.when(e.sender.dataSource.read()).then(function () {
                                    _handleGridUI.disable($('a.k-grid-update'));
                                    console.log("success @ when");
                                    //successNotification("Successfully " + _action + ".", "");
                                },
                                    function () {
                                        _handleGridUI.enable($('a.k-grid-update'));
                                        console.log("failed @ when");
                                    });
                            } else {
                                _handleGridUI.disable($('a.k-grid-update'));

                                $.when(e.sender.dataSource.sync()).then(function () {
                                    _handleGridUI.enable($('a.k-grid-update'));
                                    console.log("success @ when");
                                    // successNotification.show("Successfully " + _action + ".", "", true);
                                    // successNotification("Successfully " + _action + ".", "");
                                    // jett was here
                                    if (customOpt.save != null && customOpt.save !== undefined) {
                                        if ($.type(customOpt.save) === 'function') {
                                            customOpt.save(e.model); //yel was here (added e.model return)
                                            console.log('e.model save', e.model);
                                            //return e.model;
                                        }
                                    }
                                    // yel was here
                                    else if (customOpt.update != null && customOpt.update !== undefined) {
                                        if ($.type(customOpt.update) === 'function') {
                                            customOpt.update(e.model);
                                            console.log('e.model updated', e.model);
                                            //return e.model;
                                        }
                                    }

                                },
                                    function () {
                                        _handleGridUI.enable($('a.k-grid-update'));
                                        console.log("failed @ when");
                                    });
                            }
                        });

                    _prepareForm(e);
                };
            }

            this.dataSource = new recruitment.CDataSource(customOpt.dataSource);
            if (customOpt.columns !== undefined) {
                this.columns = customOpt.columns;
            }

            //this.cancel = function (e) {
            //    e.preventDefault();
            //    this.dataSource.cancelChanges();
            //    console.log('ewan', e.model);
            //    errorNotification.hide();
            //}
        }

        this.prepareForm = function (parent, btnUpdate) {
            _prepareForm(parent, btnUpdate);
        }

        function _prepareForm(parent, btnUpdate) {
            var kOptionElements = [];
            var isOnEdit = !parent.model.isNew();

            var formElements = $(parent.container).find('input, [kendo-combo-box], [kendo-drop-down-list]').toArray();
            formElements.forEach(function (item) {
                if ($(item).is('[kendo-combo-box]') || $(item).is('[kendo-drop-down-list]')) {
                    var elem = $(item).data("kendoComboBox") || $(item).data("kendoDropDownList");
                    if (elem.dataSource.data().length == 0) kOptionElements.push(elem);
                }
                $(item).change(function (e) {
                    parent.model.set('IsDirty', Guid.NewGuid());
                });
            });

            if (kOptionElements.length > 0) {
                var ctr = 0;
                var btn = btnUpdate === undefined || btnUpdate === null ? $('a.k-grid-update') : btnUpdate;
                //_handleGridUI.disable(btn); // commented on 11/2/2015 by enteng

                kOptionElements.forEach(function (elm) {
                    if (elm.options.cascadeFrom === "" || elm.options.cascadeFrom === undefined) {
                        $.when(elm.dataSource.read()).done(function () {
                            ++ctr;
                            if (ctr === kOptionElements.length) {
                                //OPEN OPTIONS IF BY DEFAULT
                                if (customOpt !== undefined) {
                                    if (customOpt.editorSettings !== undefined) {
                                        if (customOpt.editorSettings.optionOpenByDefault) {
                                            var firstOption = kOptionElements[0];
                                            firstOption.open();
                                        }
                                    }
                                }
                                _handleGridUI.enable(btn);
                            }
                            CheckItemExist(elm);
                        });
                    } else {
                        elm.bind("dataBound", CheckItemExist);
                    }
                });
            }

            function CheckItemExist(elm) {
                if (elm.selectedIndex == -1 && isOnEdit) {
                    var itemName = GetDataItemProperty(elm, parent.model);
                    if (itemName !== undefined) {
                        var tooltip = $(elm.element).kendoTooltip({
                            content: itemName + " does not exist in this list.",
                            position: "right",
                        }).data("kendoTooltip");
                        tooltip.show($(elm.input));
                    }
                }
            }

            //HANDLE FORMS CANCELLED/CLOSED
            //var formContainer = parent.container.data("kendoWindow");
            //if (formContainer !== undefined) {
            //    formContainer.one("close",
            //        function() {
            //            console.log('formContainer', parent.sender.dataSource);
            //            //parent.sender.dataSource.cancelChanges();
            //            errorNotification.hide();
            //        });
            //} else {
            //    var btnCancel = $("a.k-grid-cancel.k-button");
            //    if (btnCancel !== undefined) {
            //        //btnCancel.click(function(e) {
            //        //    //parent.sender.dataSource.cancelChanges();
            //        //    errorNotification.hide();
            //        //});
            //    }
            //}
        }

        function GetDataItemProperty(e, model) {
            var _kNgModel = $(e.element).attr("k-ng-model");

            if (_kNgModel !== undefined) {
                var opt = $(e.element).attr("k-ng-model").split('.');
                var ref = opt.length > 0 ? opt[1] : opt[0];

                if (model[ref] !== undefined)
                    return model[ref][e.options.dataTextField];
                return undefined;
            }

            return 'Item';
        }

        var _handleGridUI = {
            disable: function (e) {
                $(e).addClass('k-state-disabled');
                $(e).css({ 'pointer-events': 'none' });
                //console.log("Disabled", e);
            },
            enable: function (e) {
                $(e).removeClass('k-state-disabled');
                $(e).css({ 'pointer-events': '' });
                //console.log("Enabled", e);
            }
        };


        this.dataBound = function (e, controlEditDelete) {
            controlEditDelete = typeof controlEditDelete !== 'undefined'
                ? controlEditDelete
                : true;

            //gridEmptyMessage(e.sender, _emptyMsg);

            if (controlEditDelete) {
                var editBtn = e.sender.element.find('tbody tr .k-grid-edit');
                var deleteBtn = e.sender.element.find('tbody tr .k-grid-delete');

                editBtn.each(function () {
                    var item = e.sender.dataItem($(this).closest("tr"));

                    if (item.CanUpdate !== undefined) {
                        if (!item.CanUpdate) {
                            //$(this).remove();
                            $(this).replaceWith(
                                '<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                        }
                    }
                });

                deleteBtn.each(function () {
                    var item = e.sender.dataItem($(this).closest("tr"));
                    //if (item.Source !== undefined)
                    //    if (item.Source !== PayrollConfig.RequestSource) {
                    //        $(this).replaceWith('<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                    //    }
                    //}

                    if (item.CanDelete !== undefined) {
                        if (!item.CanDelete) {
                            //if (false) {
                            //$(this).remove();
                            $(this).replaceWith(
                                '<span class="k-icon k-i-lock" style="position:relative; left: 8px;"></span>');
                            //console.log('databound called', this);
                        }
                    }
                });
            }
            //if (customOpt.dataBound != undefined && customOpt.dataBound != null) {
            //    customOpt.dataBound(e);
            //}

            //https://www.telerik.com/forums/deleting-last-remaining-row-on-kendo-grid-on-the-last-page-does-not-go-to-the-previous-page
            if (this.dataSource.view().length === 0) {
                var currentPage = this.dataSource.page();
                if (currentPage > 1) {
                    this.dataSource.page(currentPage - 1);
                }
            }
        };
    }

    recruitment.CGrid = CGrid;
})(recruitment);