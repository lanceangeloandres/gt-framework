(function () {
    recruitment.model['JobQualification'] = inheritsFromModel(null, {
        modelName: 'JobQualification',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Value: {
                type: 'string',
                name: 'Value',
                validation: {
                    required: true
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