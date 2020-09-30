sap.ui.define(
    [
        "private/sandbox/controller/BaseController",
        "private/sandbox/util/modules/Validator",
        "private/sandbox/util/types/Email"
    ],
    function (BaseController, Validator) {
        "use strict";

        function onInit() {
            this.oValidator = new Validator(this.getModel("i18n"));
            // sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);
        }

        function onValidate() {
            const oInput = this.byId("emailInput");
            this.oValidator.validate(oInput);
        }

        return BaseController.extend("private.sandbox.controller.CustomTypes", {
            onInit: onInit,
            onValidate: onValidate
        });
    }
);
