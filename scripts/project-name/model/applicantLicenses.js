(function () {
    recruitment.model['ApplicantLicenses'] = inheritsFromModel(null, {
        modelName: 'ApplicantLicenses',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            LicenseType: {
                name: 'LicenseType',
            },
            ExamRating: {
                type: 'number',
                name: 'ExamRating',
            },
            ExamDate: {
                type: 'date',
                name: 'ExamDate',
            },
            ExamDateMonth: {
                type: 'number',
                name: 'ExamDateMonth',
            },
            ExamDateYear: {
                type: 'number',
                name: 'ExamDateYear',
            },
            LicenseNumber: {
                type:'string',
                name: 'LicenseNumber'
            },
            ReleasedDate: {
                type: 'date',
                name: 'ReleasedDate'
            },
            ExpirationDate: {
                type: 'date',
                name: 'ExpirationDate'
            },
            Remarks: {
                type: 'string',
                name: 'Remarks'
            }
        }
    });
})();
