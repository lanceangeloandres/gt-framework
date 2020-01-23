//var _recognitionType = new recognitionType();
recruitment.appEnum.recognitionType = {
	Honor : 'Honor',
	Award : 'Award',
	Rank : 'Rank',
	Certificate : 'Certificate',

	toArray: function (noNone) {
		if (noNone === undefined || noNone === null) {
			noNone = false;
		}

		var _all = [
			{
			   Value: 'Honor', 
			   Text: 'Honor',
			   Data: 1
			}, {
			   Value: 'Award', 
			   Text: 'Award',
			   Data: 2
			}, {
			   Value: 'Rank', 
			   Text: 'Rank',
			   Data: 3
			}, {
			   Value: 'Certificate', 
			   Text: 'Certificate',
			   Data: 4
			}, 			
		];

		var _noZeroVal = [
		{
			   Value: 'Honor', 
			   Text: 'Honor',
			   Data: 1
			}, {
			   Value: 'Award', 
			   Text: 'Award',
			   Data: 2
			}, {
			   Value: 'Rank', 
			   Text: 'Rank',
			   Data: 3
			}, {
			   Value: 'Certificate', 
			   Text: 'Certificate',
			   Data: 4
			}, 
		];

		return noNone ? _noZeroVal : _all;
	}
};

				