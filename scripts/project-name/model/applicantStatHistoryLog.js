(function () {
    recruitment.model['ApplicantHiringStageLog'] = inheritsFromModel(null, {
        modelName: 'ApplicantHiringStageLog',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            HiringStage: {
                name: 'HiringStage',
                defaultValue: {
                    'Name': 'Please Select',
                    'Description': 'Please Select',
                    'InActive': 'Please Select',
                    'Status': 'Please Select',
                    'IsForOnboardingChecklist': 'Please Select',
                    'UID': null,
                }
            },
            Status: {
                name: 'Status',
                defaultValue: {
                    'Name': 'Please Select',
                    'Description': 'Please Select',
                    'InActive': 'Please Select',
                    'ApplicationStatus': 'Please Select',
                    'IsForOnboardingChecklist': 'Please Select',
                    'UID': null,
                }
            },
            UpdatedBy: {
                name: 'UpdatedBy',
                defaultValue: {
                    'FullName': 'Please Select',
                    'UID': null,
                }
            },
            UpdatedOn: {
                type: 'date',
                name: 'UpdatedOn',
                defaultValue: false,
                validation: {}
            },
            DateHired: {
                type: 'date',
                name: 'DateHired',
                defaultValue: false,
                validation: {}
            },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {
                    required: false
                }
            },
        }
    });
})();