//var _applicantTabType = new applicantTabType();
recruitment.appEnum.applicantTabType = {
	Information : 'Information',
	Application : 'Application',
	Interview : 'Interview',
	Exam : 'Exam',
	Onboarding : 'Onboarding',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'Information', 
			   Text: 'Information',
			   Data: 1
			}, {
			   Value: 'Application', 
			   Text: 'Application',
			   Data: 2
			}, {
			   Value: 'Interview', 
			   Text: 'Interview',
			   Data: 3
			}, {
			   Value: 'Exam', 
			   Text: 'Exam',
			   Data: 4
			}, {
			   Value: 'Onboarding', 
			   Text: 'Onboarding',
			   Data: 5
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Information', 
			   Text: 'Information',
			   Data: 1
			}, {
			   Value: 'Application', 
			   Text: 'Application',
			   Data: 2
			}, {
			   Value: 'Interview', 
			   Text: 'Interview',
			   Data: 3
			}, {
			   Value: 'Exam', 
			   Text: 'Exam',
			   Data: 4
			}, {
			   Value: 'Onboarding', 
			   Text: 'Onboarding',
			   Data: 5
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				