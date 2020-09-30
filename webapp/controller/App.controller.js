sap.ui.define(["private/sandbox/controller/BaseController"], function (BaseController) {
    "use strict";

    function onInit() {
        this.getView().addStyleClass("sapUiSizeCompact");
    }

    return BaseController.extend("private.sandbox.controller.App", {
        onInit: onInit
    });
});
