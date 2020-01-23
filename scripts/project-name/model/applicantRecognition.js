
(function () {
    recruitment.model['Recognition'] = inheritsFromModel(null, {
        modelName: 'Recognition',
        id: 'UID',
        fields: {
            UID: { type: 'string', editable: false, nullable: true },
            RecognitionName: {
                type: 'string',
                name: 'RecognitionName',
                validation: {}
            },
            RecognitionYear: {
                type: 'number',
                name: 'RecognitionYear',
                validation: {}
            },
            RecognitionType: {
                type: 'number',
                name: 'RecognitionType',
            },
            Remarks: {
                type: 'string',
                name: 'Remarks'
            }
        }
    });
})();