(function () {
    recruitment.model['ApplicantManpowerReqHired'] = inheritsFromModel(null, {
        modelName: 'ApplicantManpowerReqHired',
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
            DateApplied: {
                name: 'DateApplied',
                type: 'date'
            },
            Applicant: {
                name: 'Applicant',
                defaultValue: {
                    'UID': null,
                    'FullName': 'Please Select',
                    'ApplicantEducBkgrnd': 'Please Select',
                    'ApplicantExam': 'Please Select',
                    'Position': 'Please Select',
                    'ApplicantInfo': 'Please Select',
                    'ApplicantInfoAddr': 'Please Select',
                    'ApplicantInfoCont': 'Please Select',
                    'ApplicantInterview': 'Please Select',
                    'ApplicantManpowerReq': 'Please Select',
                    'ApplicantOnboardingChecklist': 'Please Select',
                    'ApplicantPrevEmployment': 'Please Select'
                }
            },
            ApplicantHiringStageLog: {
                name: 'ApplicantHiringStageLog',
                defaultValue: {
                    'UID': null,
                    'HiringStage': 'Please Select',
                    'Status': 'Please Select',
                    'Remarks': 'Please Select',
                    'DateHired': 'Please Select'
                }
            },
            ApplicantTransferHistory: {
                name: 'ApplicantTransferHistory',
                defaultValue: {
                    'UID': null,
                    'TransferType': 'Please Select',
                    'ApplicantManpowerReq': 'Please Select',
                    'Remarks': null,
                    'DateTransferred': 'Please Select',
                    'Employee': 'Please Select'
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