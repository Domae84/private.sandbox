sap.ui.define(["private/sandbox/controller/BaseController"], function (BaseController) {
    "use strict";

    function onNavigateToTopic(oEvent) {
        const oSelectedContext = oEvent.getSource().getBindingContext("util");
        const sRouteName = oSelectedContext.getProperty("route");
        this.getRouter().navTo(sRouteName);
    }

    return BaseController.extend("private.sandbox.controller.Overview", {
        onNavigateToTopic: onNavigateToTopic
    });
});
