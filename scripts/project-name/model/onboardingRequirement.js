(function () {
    recruitment.model['OnboardingRequirement'] = inheritsFromModel(null, {
        modelName: 'OnboardingRequirement',
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
            Description: {
                type: 'string',
                name: 'Description',
                validation: {
                    required: true
                }
            },
            Key: {
                name: 'Key',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Description': 'Please Select'
                }
            },
            IsRequired: {
                type: 'boolean',
                name: 'IsRequired',
                defaultValue: false,
                validation: {}
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