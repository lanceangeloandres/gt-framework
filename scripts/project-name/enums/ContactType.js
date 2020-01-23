//var _contactType = new contactType();
recruitment.appEnum.contactType = {
	PersonalContactNumber : 'Personal Contact Number',
	HomeContactNumber : 'Home Contact Number',
	CompanyEmail : 'Company Email',
	PersonalEmail : 'Personal Email',
	CompanyLocalNumber : 'Company Local Number',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'PersonalContactNumber', 
			   Text: 'Personal Contact Number',
			   Data: 1
			}, {
			   Value: 'HomeContactNumber', 
			   Text: 'Home Contact Number',
			   Data: 2
			}, {
			   Value: 'CompanyEmail', 
			   Text: 'Company Email',
			   Data: 3
			}, {
			   Value: 'PersonalEmail', 
			   Text: 'Personal Email',
			   Data: 4
			}, {
			   Value: 'CompanyLocalNumber', 
			   Text: 'Company Local Number',
			   Data: 5
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'PersonalContactNumber', 
			   Text: 'Personal Contact Number',
			   Data: 1
			}, {
			   Value: 'HomeContactNumber', 
			   Text: 'Home Contact Number',
			   Data: 2
			}, {
			   Value: 'CompanyEmail', 
			   Text: 'Company Email',
			   Data: 3
			}, {
			   Value: 'PersonalEmail', 
			   Text: 'Personal Email',
			   Data: 4
			}, {
			   Value: 'CompanyLocalNumber', 
			   Text: 'Company Local Number',
			   Data: 5
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				