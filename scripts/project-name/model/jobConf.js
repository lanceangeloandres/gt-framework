(function () {
    recruitment.model['JobConf'] = inheritsFromModel(null, {
        modelName: 'JobConf',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            //Description: {
            //    type: 'string',
            //    name: 'Description',
            //    validation: {
            //        required: true
            //    }
            //},
            //Responsibilities: {
            //    type: 'string',
            //    name: 'Responsibilities',
            //    validation: {
            //        required: true
            //    }
            //},
            //Qualification: {
            //    type: 'string',
            //    name: 'Qualification',
            //    validation: {
            //        required: true
            //    }
            //},
            //PreferredQualification: {
            //    type: 'string',
            //    name: 'PreferredQualification',
            //    validation: {
            //        required: true
            //    }
            //},
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
                    'Code': 'Please Select'
                }
            }, 
            IsHasChangePosDesignation: {
                type: 'boolean',
                name: 'IsHasChangePosDesignation',
                defaultValue: false,
                validation: {}
            },
            JobDescription: {
                name: 'JobDescription',
                defaultValue: []
            },
            JobPrefQualification: {
                name: 'JobPrefQualification',
                defaultValue: []
            },
            JobQualification: {
                name: 'JobQualification',
                defaultValue: []
            },
            JobResponsibilities: {
                name: 'JobResponsibilities',
                defaultValue: []
            }
        }
    });
})();