(function () {
    recruitment.model['ManpowerRequestRemarks'] = inheritsFromModel(null, {
        modelName: 'ManpowerRequestRemarks',
        id: "UID",
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Remarks: {
                name: 'Remarks',
                type: 'string',
                defaultValue: 'Please Select'
            },
            ManpowerRequest: {
                name: 'ManpowerRequest',
                defaultValue: {
                    'UID': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            DateSubmitted: {
                name: 'DateSubmitted',
                type: 'date',
                defaultValue: 'Please Select'
            },
            RemarksCategory: {
                name: 'RemarksCategory',
                defaultValue: {
                    'UID': 'Please Select',
                    'Name': 'Please Select'
                }
            },
            SubmittedBy: {
                name: 'SubmittedBy',
                defaultValue: {
                    'UID': 'Please Select',
                    'FullName': 'Please Select'
                }
            },
        }
    });
})();