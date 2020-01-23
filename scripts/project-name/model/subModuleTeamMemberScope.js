(function () {
    recruitment.model['SubModuleTeamMemberScope'] = inheritsFromModel(null, {
        modelName: 'SubModuleTeamMemberScope',
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
            SubModule: {
                name: '',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select'
                }
            },
            TeamMember: {
                name: '',
                defaultValue: {
                    'UID': null,
                    'Name': 'Please Select',
                    'InActive': false,
                    'TeamMemberEmpScope': []
                }
            },
            InActive: {
                name: 'InActive',
                type: 'bool',
                defaultValue: false
            },
            TeamMemberEmpScopeCount: {
                name: 'TeamMemberEmpScopeCount',
                type: 'number',
                defaultValue: 0
            }
        }
    });
})();