
(function () {
    recruitment.model['Applicant'] = inheritsFromModel(null, {
        modelName: 'Applicant',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            FullName: {
                type: 'string',
                name: 'FullName',
                validation: {}
            },
            ApplicantEducBkgrnd: {
                name: 'ApplicantEducBkgrnd',
                defaultValue: []
            },
            ApplicantExam: {
                name: 'ApplicantExam',
                defaultValue: []
            },
            Position: {
                name: 'Position',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': 'Please Select',
                }
            },
            ApplicantInfo: {
                name: 'ApplicantInfo',
                defaultValue: {
                    //'ApplicantStatus': 'Please Select',
                    'FirstName': 'Please Select',
                    'MiddleName': 'Please Select',
                    'LastName': 'Please Select',
                    'NickName': 'Please Select',
                    'Birthdate': 'Please Select',
                    'Gender': 'Please Select',
                    'CivilStatus': 'Please Select',
                    'Nationality': 'Please Select',
                    'DateHired': 'Please Select',
                    'JobSource': 'Please Select',
                    'IsRehire': false,
                    //'IsCPA': false,
                    //'IsLawyer': false,
                    'IsAgreedOnPrivacyPolicy': false,
                    'Referee': 'Please Select',
                }
            },
            ApplicantInfoAddr: {
                name: 'ApplicantInfoAddr',
                defaultValue: []
            },
            ApplicantInfoCont: {
                name: 'ApplicantInfoCont',
                defaultValue: []
            },
            ApplicantInterview: {
                name: 'ApplicantInterview',
                defaultValue: []
            },
            ApplicantManpowerReq: {
                name: 'ApplicantManpowerReq',
                defaultValue: []
            },
            ApplicantOnboardingChecklist: {
                name: 'ApplicantOnboardingChecklist',
                defaultValue: []
            },
            ApplicantPrevEmployment: {
                name: 'ApplicantPrevEmployment',
                defaultValue: []
            },
            ApplicantTransferHistory: {
                name: 'ApplicantTransferHistory',
                defaultValue: {}
            },
        }
    });
})();