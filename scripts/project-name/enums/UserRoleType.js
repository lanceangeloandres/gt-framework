//var _userRoleType = new userRoleType();
recruitment.appEnum.userRoleType = {
	Admin : 'Admin',
	Manager : 'Manager',
	Normal : 'Normal',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'Admin', 
			   Text: 'Admin',
			   Data: 1
			}, {
			   Value: 'Manager', 
			   Text: 'Manager',
			   Data: 2
			}, {
			   Value: 'Normal', 
			   Text: 'Normal',
			   Data: 3
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Admin', 
			   Text: 'Admin',
			   Data: 1
			}, {
			   Value: 'Manager', 
			   Text: 'Manager',
			   Data: 2
			}, {
			   Value: 'Normal', 
			   Text: 'Normal',
			   Data: 3
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				