(function () {
    recruitment.model['SchoolCourse'] = inheritsFromModel(null, {
        modelName: 'SchoolCourse',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            CourseCode: {
                type: 'string',
                name: 'CourseCode',
                validation: {
                    required: true
                }
            },
            CourseName: {
                type: 'string',
                name: 'CourseName',
                validation: {
                    required: true
                }
            },
            Description: {
                type: 'string',
                name: 'Description',
                validation: {
                    required: false
                }
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