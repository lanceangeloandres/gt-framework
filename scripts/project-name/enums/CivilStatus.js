//var _civilStatus = new civilStatus();
recruitment.appEnum.civilStatus = {
	Single : 'Single',
	Married : 'Married',
	Widowed : 'Widowed',
	Separated : 'Separated',
	Divorced : 'Divorced',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'Single', 
			   Text: 'Single',
			   Data: 1
			}, {
			   Value: 'Married', 
			   Text: 'Married',
			   Data: 2
			}, {
			   Value: 'Widowed', 
			   Text: 'Widowed',
			   Data: 3
			}, {
			   Value: 'Separated', 
			   Text: 'Separated',
			   Data: 4
			}, {
			   Value: 'Divorced', 
			   Text: 'Divorced',
			   Data: 5
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Single', 
			   Text: 'Single',
			   Data: 1
			}, {
			   Value: 'Married', 
			   Text: 'Married',
			   Data: 2
			}, {
			   Value: 'Widowed', 
			   Text: 'Widowed',
			   Data: 3
			}, {
			   Value: 'Separated', 
			   Text: 'Separated',
			   Data: 4
			}, {
			   Value: 'Divorced', 
			   Text: 'Divorced',
			   Data: 5
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				