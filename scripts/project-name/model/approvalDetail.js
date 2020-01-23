(function () {
    recruitment.model['ApprovalDetail'] = inheritsFromModel(null, {
        modelName: 'ApprovalDetail',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            ApprovalStatus: {
                name: 'ApprovalStatus',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': 'Please Select',
                }
            },
            Approver: {
                name: 'Approver',
                defaultValue: {
                    'UID': null,
                    'FullName': 'Please Select',
                }
            },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {
                    required: false
                }
            },
            StatusDate: {
                type: 'date',
                name: 'StatusDate',
                validation: {
                    required: false
                }
            },
        }
    });
})();