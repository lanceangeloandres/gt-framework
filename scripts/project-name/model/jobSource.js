(function () {
    recruitment.model['JobSource'] = inheritsFromModel(null, {
        modelName: 'JobSource',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Name: {
                type: 'string',
                name: 'Name',
                validation: {
                    required: true
                }
            },
            JobSourceLink: {
                type: 'string',
                name: 'JobSourceLink',
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