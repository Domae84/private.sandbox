(function () {
    "use strict";
    sap.ui.define(["sap/ui/model/SimpleType", "sap/ui/model/ValidateException"], function (
        SimpleType,
        ValidateException
    ) {
        return SimpleType.extend("private.sandbox.util.types.Email", {
            parseValue: function (sValue, sInternalValue) {
                return sValue;
            },
            formatValue: function (sValue, sInternalType) {
                return sValue;
            },
            validateValue: function (sValue) {
                if (sValue === "test")
                    throw new ValidateException(`${sValue} ist keine gültige Email!`);
                debugger;
            }
        });
    });
})();
