
(function () {
    recruitment.model['ManpowerRequest'] = inheritsFromModel(null, {
        modelName: 'ManpowerRequest',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Emp: {
                name: 'Position',
                validation: {},
                defaultValue: {
                    'FullName': 'Please Select',
                    'UID': null,
                }
            },
            Position: {
                name: 'Position',
                validation: {},
                defaultValue: {
                    'Name': 'Please Select',
                    'Code': 'Please Select',
                    'UID': null,

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
                validation: {},
                defaultValue: {
                    'Name': 'Please Select',
                    'Code': 'Please Select',
                    'UID': null
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
            RequestReason: {
                name: 'RequestReason',
                validation: {},
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null
                }
            },
            RequestStatus: {
                name: 'RequestStatus',
                validation: {},
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null
                }
            },
            EmpClassification: {
                name: 'EmpClassification.Name',
                validation: {},
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null
                }
            },
            //EmpStatus: {
            //    name: 'EmpStatus.Name',
            //    validation: {},
            //    defaultValue: {
            //        'Name': 'Please Select',
            //        'UID': null
            //    }
            //},
            IsBudgeted: {
                type: 'boolean',
                name: 'IsBudgeted',
                defaultValue: false,
                validation: {}
            },
            //NumOfSlots: {
            //    name: 'NumOfSlots',
            //    type: 'number',
            //    defaultValue: 0
            //},
            DurationInMonths: {
                name: 'DurationInMonths',
                type: 'number',
                defaultValue: 0
            },
            ReApplyDurationInDays: {
                name: 'ReApplyDurationInDays',
                type: 'number',
                defaultValue: 0
            },
            ExpectedStartDate: {
                name: 'ExpectedStartDate',
                type: 'date',
                defaultValue: null
            },
            ReplacedStaff: {
                name: 'ReplacedStaff',
                defaultValue: []          
            },      
            DisplayedName: {
                name: 'DisplayedName',
                type: 'string'
            },
            ManpowerRequestEmpStatScope: {
                name: 'ManpowerRequestEmpStatScope',
                defaultValue: []
            },
            ApprovedNumOfSlots: {
                name: 'ApprovedNumOfSlots',
                type: 'number',
                defaultValue: 0
            },
            CurrentOccupiedNumOfSlots: {
                name: 'CurrentOccupiedNumOfSlots',
                type: 'number',
                defaultValue: 0
            },
            RemainingNumOfSlots: {
                name: 'RemainingNumOfSlots',
                type: 'number',
                defaultValue: 0
            },
            OtherReason: {
                name: 'OtherReason',
                type: 'string',
                defaultValue: null
            }
        }
    });
})();

