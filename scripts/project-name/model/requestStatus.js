(function () {
    recruitment.model['RequestStatus'] = inheritsFromModel(null, {
        modelName: 'RequestStatus',
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
            IsForJobView: {
                type: 'boolean',
                name: 'IsForJobView',
                defaultValue: false,
                validation: {}
            }
        }
    });
})();