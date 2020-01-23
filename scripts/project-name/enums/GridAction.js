//var _gridAction = new gridAction();
recruitment.appEnum.gridAction = {
	Add : 'Add',
	Update : 'Update',
	Delete : 'Delete',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'Add', 
			   Text: 'Add',
			   Data: 1
			}, {
			   Value: 'Update', 
			   Text: 'Update',
			   Data: 2
			}, {
			   Value: 'Delete', 
			   Text: 'Delete',
			   Data: 3
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Add', 
			   Text: 'Add',
			   Data: 1
			}, {
			   Value: 'Update', 
			   Text: 'Update',
			   Data: 2
			}, {
			   Value: 'Delete', 
			   Text: 'Delete',
			   Data: 3
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				