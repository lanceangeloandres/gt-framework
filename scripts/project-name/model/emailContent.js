(function () {
    recruitment.model['EmailContent'] = inheritsFromModel(null, {
        modelName: 'EmailContent',
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
            Subject: {
                type: 'string',
                name: 'Subject',
                validation: {
                    required: true
                }
            },
            Body: {
                type: 'string',
                name: 'Body',
                validation: {
                    required: false
                }
            },
            EmailContentType: {
                name: 'EmailContentType',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Description': 'Please Select'
                }
            },
            EmailContentTypeAction: {
                name: 'EmailContentTypeAction',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Description': 'Please Select'
                }
            },
            Recipient: {
                name: 'Recipients',
                defaultValue: []
            },
            CarbonCopy: {
                name: 'CarbonCopy',
                defaultValue: []
            },
            BlindCarbonCopy: {
                name: 'CarbonCopy',
                defaultValue: []
            },
        }
    });
})();