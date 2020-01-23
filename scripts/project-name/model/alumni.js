(function () {
    recruitment.model['Alumni'] = inheritsFromModel(null, {
        modelName: 'Alumni',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Emp: {
                name: 'Emp',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': 'Please Select',
                }
            },
            ClientEmp: {
                name: 'ClientEmp',
                defaultValue: {
                    'SeparatedOn': 'Please Select'
                }
            },
            SubClient: {
                name: 'SubClient',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Division: {
                name: 'Division',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Department: {
                name: 'Department',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Section: {
                name: 'Section',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            Position: {
                name: 'Position',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Code': 'Please Select',
                    'JobLevel': 'Please Select'
                }
            },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {
                    required: false
                }
            },
            AlumniSocialMedia: {
                name: 'AlumniSocialMedia',
                defaultValue: []
            }
        }
    });
})();