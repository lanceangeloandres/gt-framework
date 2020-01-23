(function () {
    recruitment.model['TeamMemberEmpScope'] = inheritsFromModel(null, {
        modelName: 'TeamMemberEmpScope',
        id: "UID",
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Active: {
                type: 'bool',
                defaultValue: false
            },
            Emp: {
                name: 'Emp',
                defaultValue: {
                    'UID': 'Please Select',
                    'FullName': 'Please Select',
                    'Position': 'Please Select'
                },
                validation: {
                    required: true
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
        }
    });
})();