
(function () {
    recruitment.model['ApplicantInterview'] = inheritsFromModel(null, {
        modelName: 'ApplicantInterview',
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
            InterviewType: {
                name: 'InterviewType',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            InterviewStatus: {
                name: 'InterviewStatus',
                defaultValue: {
                    'Name': 'Please Select',
                    'UID': null,
                }
            },
            //InterviewerEmp: {
            //    name: 'InterviewerEmp',
            //    defaultValue: {
            //        'Name': 'Please Select',
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
            Interviewer: {
                name: 'Interviewer',
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