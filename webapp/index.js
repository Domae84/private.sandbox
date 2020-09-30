sap.ui.define([
    "sap/ui/core/ComponentContainer",
    "sap/m/Shell"
], function (ComponentContainer, Shell) {
    "use strict";
    new Shell({
        app: new ComponentContainer({
            name: "private.sandbox",
            settings: {
                id: "sandbox"
            },
            async: true
        })
    }).placeAt("content");
});