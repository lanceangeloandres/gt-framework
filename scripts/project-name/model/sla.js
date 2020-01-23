
(function () {
    recruitment.model['SLA'] = inheritsFromModel(null, {
        modelName: 'SLA',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Days: {
                name: 'Days',
                type: 'number',
                defaultValue: 0
            },
            JobLevelGroup: {
                name: 'JobLevelGroup',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Order': 'Please Select'
                }
            }
        }
    });
})();