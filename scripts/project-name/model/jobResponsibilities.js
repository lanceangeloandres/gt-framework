(function () {
    recruitment.model['JobResponsibilities'] = inheritsFromModel(null, {
        modelName: 'JobResponsibilities',
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