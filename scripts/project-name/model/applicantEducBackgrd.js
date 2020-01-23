
(function () {
    recruitment.model['EducBackgrd'] = inheritsFromModel(null, {
        modelName: 'EducBackgrd',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            SchoolName: {
                type: 'string',
                name: 'SchoolName',
                validation: {}
            },
            SchoolAddress: {
                type: 'string',
                name: 'SchoolAddress',
                validation: {}
            },
            SchoolCourse: {
                type: 'string',
                name: 'SchoolCourse',
            },
            EducLevel: {
                type: 'string',
                name: 'EducLevel'
            },
            StartDate: {
                type: 'date',
                name: 'StartDate'
            },
            EndDate: {
                type: 'date',
                name: 'EndDate'
            },
            NoRecognitions: {
                type: 'number',
                name: 'NoRecognitions'
            },
            Scholar: {
                type: 'boolean',
                name: 'Scholar',
                defaultValue: false,
                validation: {}
            },
            Remarks: {
                type: 'string',
                name: 'Remarks'
            }
        }
    });
})();