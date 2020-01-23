
(function () {
    recruitment.model['ApplicantOnboardingChecklist'] = inheritsFromModel(null, {
        modelName: 'ApplicantOnboardingChecklist',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {}
            },
            Value: {
                type: 'string',
                name: 'Value',
                validation: {}
            },
            DateSubmitted: {
                type: 'date',
                name: 'DateSubmitted',
                validation: {}
            },
            UpdatedBy: {
                name: 'UpdatedBy',
                defaultValue: {
                    'UID': null,
                    'FullName': 'Please Select'
                },
                editable: false
            },
            OnboardingRequirement: {
                name: 'OnboardingRequirement',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Description': 'Please Select',
                    'IsRequired': 'Please Select',
                    'InActive': 'Please Select',
                    'Key': 'Please Select',
                },
            },
            ApplicantManpowerReq: {
                name: 'ApplicantManpowerReq',
                defaultValue: {
                    'UID': null,
                    'ManpowerRequest': 'Please Select',
                    'Remarks': 'Please Select',
                    'Applicant': 'Please Select',
                    'ApplicantHiringStageLog': 'Please Select',
                    'ApplicantHiringStage': 'Please Select',
                    'DateApplied': 'Please Select'
                }
            }
        }
    });
})();