//var _employmentStatus = new employmentStatus();
recruitment.appEnum.employmentStatus = {
	None : 'None',
	Active : 'Active',
	Resigned : 'Resigned',
	Hold : 'Hold',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'None', 
			   Text: 'None',
			   Data: 0
			}, {
			   Value: 'Active', 
			   Text: 'Active',
			   Data: 1
			}, {
			   Value: 'Resigned', 
			   Text: 'Resigned',
			   Data: 2
			}, {
			   Value: 'Hold', 
			   Text: 'Hold',
			   Data: 3
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Active', 
			   Text: 'Active',
			   Data: 1
			}, {
			   Value: 'Resigned', 
			   Text: 'Resigned',
			   Data: 2
			}, {
			   Value: 'Hold', 
			   Text: 'Hold',
			   Data: 3
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				