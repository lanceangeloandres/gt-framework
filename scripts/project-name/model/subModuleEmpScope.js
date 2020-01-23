(function () {
    recruitment.model['SubModuleEmpScope'] = inheritsFromModel(null, {
        modelName: 'SubModuleEmpScope',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Emp: {
                name: 'Emp',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'Position': 'Please Select',
                    'Code': 'Please Select'
                }
            },
            UserRoleType: {
                type: 'string',
                name: 'UserRoleType',
                defaultValue: null,
                validation: {
                    required: true
                }
            },
            InActive: {
                name: 'InActive',
                type: 'bool',
                defaultValue: false
            }
        }
    });
})();