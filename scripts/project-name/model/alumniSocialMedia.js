(function () {
    recruitment.model['AlumniSocialMedia'] = inheritsFromModel(null, {
        modelName: 'AlumniSocialMedia',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            SocialMedia: {
                name: 'SocialMedia',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            Value: {
                type: 'string',
                name: 'Value',
                validation: {
                    required: false
                }
            },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {
                    required: false
                }
            }
        }
    });
})();