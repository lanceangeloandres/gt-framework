
(function () {
    recruitment.model['ApplicantExam'] = inheritsFromModel(null, {
        modelName: 'ApplicantExam',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            Remarks: {
                type: 'string',
                name: 'Remarks',
                validation: {}
            },            
            ApplicantManpowerReq: {
                name: 'ApplicantManpowerReq',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            ApprovalStatus: {
                name: 'ApprovalStatus',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            ExamType: {
                name: 'ExamType',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            ExamStatus: {
                name: 'ExamStatus',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            //ExaminerEmp: {
            //    name: 'ExaminerEmp',
            //    defaultValue: {
            //        'FullName': 'Please Select',
            //        'UID': null,
            //    }
            //},
            ScheduleDate: {
                type: 'date',
                name: 'ScheduleDate',
                validation: {}
            },
            ScheduleTime: {
                type: 'date',
                name: 'ScheduleTime',
                validation: {}
            },
            Examiner: {
                name: 'Examiner',
                defaultValue: []
            },
            MeetingRoom: {
                name: 'MeetingRoom',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            }
            //IsCancel: {
            //    type: 'bool',
            //    name: 'IsCancel',
            //    validation: {}
            //},
        }
    });
})();