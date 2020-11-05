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
                const sRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const bValidEmail = sRegEx.test(String(sValue).toLowerCase());

                if (!bValidEmail) throw new ValidateException(`${sValue} ist keine gültige Email!`);
            }
        });
    });
})();
