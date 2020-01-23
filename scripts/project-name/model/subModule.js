(function () {
    recruitment.model['SubModule'] = inheritsFromModel(null, {
        modelName: 'SubModule',
        id: "UID",
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            InActive: {
                type: 'bool',
                defaultValue: false
            },
            Name: {
                type: 'string',
                name: 'Name',
                validation: {
                    required: true
                }
            }
        }
    });
})();