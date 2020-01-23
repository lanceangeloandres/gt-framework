(function () {
    recruitment.model['HiringStage'] = inheritsFromModel(null, {
        modelName: 'HiringStage',
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
            Description: {
                type: 'string',
                name: 'Description',
                validation: {
                    required: false
                }
            },
            IsDefault: {
                type: 'boolean',
                name: 'IsDefault',
                defaultValue: false,
                validation: {}
            },
            IsTransferred: {
                type: 'boolean',
                name: 'IsTransferred',
                defaultValue: false
            },
            IsForHiredDate: {
                type: 'boolean',
                name: 'IsForHiredDate',
                defaultValue: false
            },
            InActive: {
                type: 'boolean',
                name: 'InActive',
                defaultValue: false,
                validation: {}
            },
            IsForTransfer: {
                type: 'boolean',
                name: 'IsForTransfer',
                defaultValue: false
            },
            IsApplicationOnboardingChecklist: {
                type: 'boolean',
                name: 'IsApplicationOnboardingChecklist',
                defaultValue: false,
                validation: {}
            },
            IsWithAssignedEmp: {
                type: 'boolean',
                name: 'IsWithAssignedEmp',
                defaultValue: false,
                validation: {}
            },
            IsForDashboard: {
                type: 'boolean',
                name: 'IsForDashboard',
                defaultValue: false,
                validation: {}
            },
            Status: {
                name: 'Status',
                defaultValue: []
            },
            HiringStageExcludeTabAccess: {
                name: 'HiringStageExcludeTabAccess',
                defaultValue: []
            },
            WithStatusLst: {
                name: 'WithStatusLst',
                type: 'boolean'
            },
            IsWithAssignedEmp: {
                name: 'IsWithAssignedEmp',
                type: 'boolean',
                defaultValue: false
            },
            AssignedEmp: {
                name: 'AssignedEmp',
                defaultValue: []
            }
        }
    });
})();