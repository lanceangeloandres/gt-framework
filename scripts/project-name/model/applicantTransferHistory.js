
(function () {
    recruitment.model['ApplicantTransferHistory'] = inheritsFromModel(null, {
        modelName: 'ApplicantTransferHistory',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {}
            },
            DateTransferred: {
                type: 'date',
                name: 'DateTransferred',
                validation: {}
            }, 
            Employee: {
                name: 'Employee',
                defaultValue: {
                    'UID': null,
                    'FullName': 'Please Select'
                },
            },
            TransferredBy: {
                name: 'TransferredBy',
                defaultValue: {
                    'UID': null,
                    'FullName': 'Please Select'
                },
            },
            TransferType: {
                name: 'TransferType',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select'
                },
                editable: false
            },
            ApplicantManpowerReq: {
                name: 'ApplicantManpowerReq',
                defaultValue: {
                    'UID': null,
                    'ManpowerRequest': 'Please Select',
                    'Applicant': 'Please Select',
                    'Remarks': '',
                    'ApplicantHiringStageLog': 'Please Select'
                },
                editable: false
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
            //ApplicantHiringStageLog: {
            //    name: 'ApplicantHiringStageLog',
            //    defaultValue: {
            //        'UID': null,
            //        'ApplicationStatus': 'Please Select',
            //        'Status': 'Please Select',
            //        'Remarks': 'Please Select',
            //        'DateHired': 'Please Select'
            //    }
            //},
            //ApplicantRequiredField: {
            //    name: 'ApplicantRequiredField',
            //    defaultValue: {
            //        'UID': null,
            //        'LastName': 'Please Select',
            //        'FirstName': 'Please Select',
            //        'MiddleName': 'Please Select',
            //        'NickName': 'Please Select',
            //        'Birthdate': 'Please Select',
            //        'Gender': 'Please Select',
            //        'CivilStatus': 'Please Select',
            //        'Nationality': 'Please Select',
            //        'ApplicantPresentAddress': 'Please Select',
            //        'ApplicantPersonalCont': 'Please Select',
            //        'ApplicantPersonalEmail': 'Please Select',
            //        'ApplicantCompanyEmail': 'Please Select',
            //        'EmployeeStatus': 'Please Select',
            //        'EmployeeGroup': 'Please Select',
            //        'Currency': 'Please Select',
            //        'TaxType': 'Please Select',
            //        'TaxExemption': 'Please Select',
            //        'PaymentType': 'Please Select'
            //    }
            //}
        }
    });
})();