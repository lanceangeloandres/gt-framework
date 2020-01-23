﻿(function () {
    recruitment.model['ApplicantStatus'] = inheritsFromModel(null, {
        modelName: 'ApplicantStatus',
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
            IsForHiredDate : {
                type: 'boolean',
                name: 'IsForHiredDate',
                defaultValue: false,
                validation: {}
            },
            IsDefault : {
                type: 'boolean',
                name: 'IsDefault',
                defaultValue: false,
                validation: {}
            },
            IsForDashboard : {
                type: 'boolean',
                name: 'IsForDashboard',
                defaultValue: false,
                validation: {}
            }
        }
    });
})();