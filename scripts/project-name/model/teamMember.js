(function () {
    recruitment.model['TeamMember'] = inheritsFromModel(null, {
        modelName: 'TeamMember',
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
            TeamMemberEmpScope: {
                name: 'TeamMemberEmpScope',
                defaultValue: []
            },
            InActive: {
                name: 'InActive',
                type: 'bool',
                defaultValue: false
            },
            //Active: {
            //    name: 'Active',
            //    type: 'bool',
            //    defaultValue: false
            //},
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