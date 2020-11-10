sap.ui.define(["private/sandbox/controller/BaseController"], function (BaseController) {
    "use strict";

    function onChange(oEvent) {
        const oUtilModel = this.getModel("util");
        const sKey = oEvent.getParameter("item").getKey();
        oUtilModel.setProperty("/customFilter/jsonTable", sKey === "json");
    }

    return BaseController.extend("private.sandbox.controller.CustomFilter", {
        onChange: onChange
    });
});
