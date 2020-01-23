
(function () {
    recruitment.model['FTEEmpStatScope'] = inheritsFromModel(null, {
        modelName: 'FTEEmpStatScope',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            EmpStatus: {
                name: 'EmpStatus',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                }
            },
            ApprovedBalance: {
                name: 'ApprovedFTEBalance',
                type: 'number',
                defaultValue: 0
            },
            CurrentBalance: {
                name: 'CurrentFTEBalance',
                type: 'number',
                defaultValue: 0
            },
            RemainingBalance: {
                name: 'RemainingFTEBalance',
                type: 'number',
                defaultValue: 0
            },
        }
    });
})();