var modelBase = {
    UID: '00000000-0000-0000-0000-000000000000',
    createdOn: new Date(),
    modifiedOn: '',
    validationInfo: { a: 2 },
    injectFromPArray: function (pArr) {

        if (pArr !== undefined && pArr !== null) {
            var _retVal = {};

            for (var _j = 0; _j < pArr.length; _j++) {
                var data = pArr[_j].Prop + '=' + pArr[_j].Value;
                data = data.split("=");
                addProperty(_retVal, data[0], data[1]);
            }

            return _retVal;
        }

        function addProperty(iObj, name, value) {
            value = value.trim();
            value = value.replace(/(\r\n|\n|\r)/gm, "");
            
            var a = name.indexOf(".");

            // if no posible navigation prop then direct assign
            if (a == -1) {
                iObj[name] = value;
            } else {
                var name1 = name.split(".")[0];
                //"DefaultKeyValues[]".indexOf('[]') === -1 ? 'a' : 'b'
                //"b"


                var name2 = name.substr(name.indexOf(".")).trimLeft('.');


                // keyValues
                if (name1.indexOf('[]') !== -1) {
                    if (iObj[name1.replace('[]', '')] === undefined) {
                        iObj[name1.replace('[]', '')] = [];
                    }

                    var isJsonExpr = name2.indexOf('{') == 0;

                    if (isJsonExpr) {
                        name2 = name2.replace('@val', '"' + value.toString() + '"');

                        var _obj = JSON.parse(name2);

                        iObj[name1.replace('[]', '')].push(_obj);
                    }
                } else {
                    if (iObj[name1] === undefined)
                        iObj[name1] = {};

                    if (name2.indexOf('{') == 0) {
                        try {
                            iObj[name1] = JSON.parse(name2);
                        } catch (e) {
                            iObj[name1] = 'Cannot Parse ' + name2;
                        }
                    } else {
                        addProperty(iObj[name1], name2, value);
                    }
                }
            }
        }

        return [];
    },
    isValid: function () {
        console.log('model.IsValid()');
        return this.validationInfo;
    },
    getKendoModel: function () {

    }
}

function inheritsFromModel(validationInfo, kendoModel) {
    var obj = Object.create(modelBase);

    if (validationInfo !== undefined && validationInfo !== null)
        obj.validationInfo = validationInfo;

    if (kendoModel !== undefined && kendoModel !== null) {
        obj.kendoModel = kendoModel;
    }
    obj.createClass = kendo.data.Model.define(kendoModel);

    return obj;
}