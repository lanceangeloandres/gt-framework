
(function () {
    recruitment.model['School'] = inheritsFromModel(null, {
        modelName: 'School',
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
            Description: {
                type: 'string',
                name: 'Description'
            },
            SchoolCourse: {
                name: 'SchoolCourse',
                defaultValue: []
            },
            InActive: {
                type: 'boolean',
                name: 'InActive',
                defaultValue: false,
                validation: {}
            }
        }
    });
})();