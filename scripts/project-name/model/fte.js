
(function () {
    recruitment.model['FTE'] = inheritsFromModel(null, {
        modelName: 'FTE',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            SubClient : {
                name: 'SubClient',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Division: {
                name: 'Division',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Department: {
                name: 'Department',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Section: {
                name: 'Section',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            //JobLevel: {
            //    name: 'JobLevel',
            //    defaultValue: {
            //        'UID': null,
            //        'Name': 'Please Select',
            //    }
            //},
            Position: {
                name: 'Position',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select',
                    'JobLevel': 'Please Select'
                }
            },
            ApprovedFTEBalance: {
                name: 'ApprovedFTEBalance',
                type: 'number',
                defaultValue: 0
            },
            CurrentFTEBalance: {
                name: 'CurrentFTEBalance',
                type: 'number',
                defaultValue: 0
            },
            RemainingFTEBalance: {
                name: 'RemainingFTEBalance',
                type: 'number',
                defaultValue: 0
            },
            FTEEmpStatScope: {
                name: 'FTEEmpStatScope',
                defaultValue: []
            },
            //SubmissionDate: {
            //    name: 'SubmissionDate',
            //    type: 'string',
            //    defaultValue: 'Please Select'
            //},
            Remarks: {
                name: 'Remarks',
                type: 'string',
                defaultValue: null
            },
        }
    });
})();