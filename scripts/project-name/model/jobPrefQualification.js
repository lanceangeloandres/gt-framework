(function () {
    recruitment.model['JobPrefQualification'] = inheritsFromModel(null, {
        modelName: 'JobPrefQualification',
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