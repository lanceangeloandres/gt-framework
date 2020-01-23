﻿(function () {
    recruitment.model['EmailContentType'] = inheritsFromModel(null, {
        modelName: 'EmailContentType',
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
        }
    });
})();