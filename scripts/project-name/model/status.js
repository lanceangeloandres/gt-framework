(function () {
    recruitment.model['Status'] = inheritsFromModel(null, {
        modelName: 'Status',
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
                    required: false
                }
            },
            InActive: {
                type: 'boolean',
                name: 'InActive',
                defaultValue: false,
                validation: {}
            },
            IsForOnboardingChecklist: {
                type: 'boolean',
                name: 'IsForOnboardingChecklist',
                defaultValue: false,
                validation: {}
            },
            IsForDashboard: {
                type: 'boolean',
                name: 'IsForDashboard',
                defaultValue: false,
                validation: {}
            }
        }
    });
})();