(function () {
    recruitment.model['SubModuleTeamMemberEmpScope'] = inheritsFromModel(null, {
        modelName: 'SubModuleTeamMemberEmpScope',
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
                    'Position': 'Please Select',
                    'Code': 'Please Select'
                },
                validation: {
                    required: true
                }
            }
        }
    });
})();