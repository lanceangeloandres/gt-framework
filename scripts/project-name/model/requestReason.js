(function () {
    recruitment.model['RequestReason'] = inheritsFromModel(null, {
        modelName: 'RequestReason',
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
            IsForReplacedStaff: {
                type: 'boolean',
                name: 'IsForReplacedStaff',
                defaultValue: false,
                validation: {}
            },
            IsForOtherReason: {
                type: 'boolean',
                name: 'IsForOtherReason',
                defaultValue: false
            }
        }
    });
})();