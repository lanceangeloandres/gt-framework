//var _gender = new gender();
recruitment.appEnum.gender = {
	Male : 'Male',
	Female : 'Female',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'Male', 
			   Text: 'Male',
			   Data: 1
			}, {
			   Value: 'Female', 
			   Text: 'Female',
			   Data: 2
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Male', 
			   Text: 'Male',
			   Data: 1
			}, {
			   Value: 'Female', 
			   Text: 'Female',
			   Data: 2
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				