(function () {
    recruitment.model['HiringStageExcludeTabAccess'] = inheritsFromModel(null, {
        modelName: 'HiringStageExcludeTabAccess',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            ApplicantTabType: {
                name: 'ApplicantTabType',
                type: 'string',
                //defaultValue: 'Please Select',
                validation: {
                    required: true
                }
            },
            GridAction: {
                name: 'GridAction',
                type: 'string',
                //defaultValue: 'Please Select',
                validation: {
                    required: true
                }
            },
        }
    });
})();