
(function () {
    recruitment.model['ApplicantManpowerReq'] = inheritsFromModel(null, {
        modelName: 'ApplicantManpowerReq',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {}
            },
            ManpowerRequest: {
                name: 'ManpowerRequest',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Position': 'Please Select',
                },
                editable: false
            },
            ApplicantHiringStageLog: {
                name: 'ApplicantHiringStageLog',
                defaultValue: {
                    'UID': null,
                    'HiringStage': 'Please Select',
                    'Status': 'Please Select',
                    'Remarks': null,
                    'DateHired': 'Please Select',
                    'AssignedStaff': []
                }
            },
            ApplicantConfig: {
                name: 'ApplicantConfig',
                defaultValue: {
                    'UID': null,
                    'CompanyEmail': 'Please Select',
                    'EmployeeStatus': 'Please Select',
                    'EmployeeGroup': 'Please Select',
                    'Currency': 'Please Select',
                    'TaxType': 'Please Select',
                    'TaxExemption': 'Please Select',
                    'PaymentType': 'Please Select'
                }
            }
        }
    });
})();