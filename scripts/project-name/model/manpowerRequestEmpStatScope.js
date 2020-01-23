
(function () {
    recruitment.model['ManpowerRequestEmpStatScope'] = inheritsFromModel(null, {
        modelName: 'ManpowerRequestEmpStatScope',
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
            ApprovedNumOfSlots: {
                name: 'ApprovedNumOfSlots',
                type: 'number',
                defaultValue: 0
            },
            CurrentOccupiedNumOfSlots: {
                name: 'CurrentOccupiedNumOfSlots',
                type: 'number',
                defaultValue: 0
            },
            RemainingNumOfSlots: {
                name: 'RemainingNumOfSlots',
                type: 'number',
                defaultValue: 0
            }
        }
    });
})();