(function () {
    recruitment.model['ManpowerRequestStatHistoryLog'] = inheritsFromModel(null, {
        modelName: 'ManpowerRequestStatHistoryLog',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            RequestStatus: {
                name: 'RequestStatus',
                defaultValue: {
                    'Name': 'Please Select',                
                    'UID': null,
                }
            },
            UpdatedBy: {
                name: 'UpdatedBy',
                defaultValue: {
                    'FullName': 'Please Select',
                    'UID': null,
                }
            },
            UpdatedOn: {
                type: 'date',
                name: 'UpdatedOn',
                defaultValue: false,
                validation: {}
            }
        }
    });
})();