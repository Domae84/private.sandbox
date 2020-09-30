/**
 * Generischer Controller mit diversen Grundfunktionen
 *
 * @module controller/BaseController
 * @extends sap.ui.core.mvc.Controller
 */
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/Fragment",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
        "sap/m/Dialog",
        "sap/m/Text"
    ],
    function (
        Controller,
        History,
        Fragment,
        MessageToast,
        MessageBox,
        Dialog,
        Text
    ) {
        "use strict";

        // Public Section
        //***************************************************************************************

        /**
         * Ruf den onInit Callback des BaseControllers auf.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @override
         * @listens {init}
         * @public
         */
        function onInit() {
            const oI18nModel = this.getModel("i18n");
            this.oUtilModel = this.getModel("util");
            this.oI18nBundle = oI18nModel.getResourceBundle();
        }

        /**
         * Navigiert einen Schritt zurück.
         *
         * Falls es keinen gültigen Hash gibt, wird zur Startseite navigiert.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @listens {press}
         * @param {string} sRoute - Die Route, zu der navigiert werden soll
         * @public
         */
        function onNavBack(oEvent, sRoute) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
            const sFinalRoute = sRoute ? sRoute : "Overview";

            if (sPreviousHash !== undefined) {
                this.getRouter().navTo(sFinalRoute);
                return;
            }
            this.getRouter().navTo("Overview");
        }

        /**
         * Validiert eine Form bzw. ein FormControl ob es gefüllt ist.
         *
         * Dies bezieht sich auf obligatorische Felder in einem Formular.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @listens {change}
         * @param {sap.ui.base.Event} oEvent - Standard SAPUI5 Event-Objekt
         * @public
         */
        function onValidate(oEvent) {
            this.oValidator.validate(oEvent.getSource());
        }

        /**
         * Ruft die Methode cancelDialogAction im DialogHelper Modul auf.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @listens {press}
         * @param {string} sDialogName - Der Dialogname, von dem Dialog, welcher geschlossen
         * werden soll
         * @public
         */
        function onCancelDialogAction(sDialogName) {
            this.getDialogHelper().cancelDialogAction(sDialogName, this);
        }

        /**
         * Gibt das genutzte Router-Objekt zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @returns {sap.ui.core.routing.Router} - Das SAPUI5-Router Objekt
         * @public
         */
        function getRouter() {
            return this.getOwnerComponent().getRouter();
        }

        /**
         * Gibt das I18n-ResourceBundle zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @returns {sap.base.i18n.ResourceBundle} - Das I18n-ResourceBundle
         * @public
         */
        function getI18nBundle() {
            return this.getModel("i18n").getResourceBundle();
        }

        /**
         * Gibt das Model auf Basis des übergebenen Namen zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} [sName] - Der Name des Models
         * @returns {sap.ui.model.Model} - Das Model
         * @public
         */
        function getModel(sName) {
            return this.getOwnerComponent().getModel(sName);
        }

        /**
         * Gibt das View-Model zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} [sName]     - Der Modelname
         * @returns {sap.ui.model.Model} - Das View-Model
         * @public
         */
        function getViewModel(sName) {
            if (sName) {
                return this.getView().getModel(sName);
            }
            return this.getView().getModel("viewModel");
        }

        /**
         * Gibt das DialogHelperModul zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @return {pm.nani.webaa-admin.util.DialogHelper} - Das DialogHelper-Modul
         *@public
         */
        function getDialogHelper() {
            return this.getOwnerComponent().getDialogHelper();
        }

        /**
         * Gibt den Message Manager der Anwendung zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @returns {sap.ui.core.message.MessageManager} - Das MessageManager-Objekt
         * @public
         */
        function getMessageManager() {
            return sap.ui.getCore().getMessageManager();
        }

        /**
         * Liefert den Binding-Pfad der aktuellen View zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @returns {string} - Der Binding-Pfad
         * @public
         */
        function getViewContextPath() {
            return this.getView().getBindingContext().getPath();
        }

        /**
         * Liefert das Authorization-Helper Objekt zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @returns {Object} - Das Authorization-Helper-Objekt
         * @public
         */
        function getAuthorizationHelper() {
            return this.getOwnerComponent()["oAuthorizationHelper"];
        }

        /**
         * Referenziert ein neues View-Model im Controller.
         *
         * Das View-Model dient zum Zwischenspeichern von Informationen zur weiteren Verwendung im jeweiligen
         * Controller.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {sap.ui.model.json.JSONModel} oViewModel - Das View-Model
         * @public
         */
        function setViewModel(oViewModel) {
            this.getView().setModel(oViewModel, "viewModel");
        }

        /**
         * Versetzt die Anwendung in den Busy-State und wieder zurück.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {boolean} bBusy - Busy
         * @public
         */
        function setAppBusy(bBusy) {
            this.oUtilModel.setProperty("/busy/app", bBusy);
        }

        /**
         * Navigiert zur übergebenen Route.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sRoute - Die Route, zu der navigiert werden soll
         * @param {Object} [oParams] - Die optionalen URL-Parameter
         * @public
         */
        function navToView(sRoute, oParams) {
            this.getRouter().navTo(sRoute, oParams);
        }

        /**
         * Zeigt das übergebene Target an.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sTarget - Der name des Targets, welches angezeigt werden soll
         * @public
         */
        function displayTarget(sTarget) {
            this.getRouter().getTargets().display(sTarget);
        }

        /**
         * Einfacher Escape-Handler für das "escape-Pressed" Event.
         *
         * Funktion die verhindert, dass der Dialog geschlossen wird, sobald man Escape drückt.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @listens {escapePressed}
         * @param {Promise} [oPromise] - Das implizite Promise-Objekt
         * @public
         */
        function escapePressed(oPromise) {
            oPromise.reject();
        }

        /**
         * Zeigt einen MessageToast mit einer Erfolgsmeldung an.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sMessageId - I18N ID
         * @param {array} [aArgs] - Argumente vom Text ({0})
         * @public
         */
        function displaySuccessToast(sMessageId, aArgs) {
            MessageToast.show(this.oI18nBundle.getText(sMessageId, aArgs), {
                duration: 2000
            });
        }

        /**
         * Zeigt eine MessageBox mit einer Erfolgsmeldung an.
         *
         * Es können "Ja" und "Nein" Aktionen definiert werden.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sMessage - Nachricht
         * @param {string} sTitle - Titel der Box
         * @param {function} fnOnClose - Close Funktion
         * @param {string} sIcon - Typ der Box (Success, Warning, Error etc.)
         * @public
         */
        function displaySuccessBox(sMessage, sTitle, fnOnClose, sIcon = "SUCCESS") {
            MessageBox.success(sMessage, {
                icon: sIcon,
                title: sTitle,
                actions: ["YES", "NO"],
                onClose: fnOnClose,
                contentWidth: "400px"
            });
        }

        /**
         * Zeigt eine MessageBox mit einer Erfolgsmeldung an.
         *
         * Es können "Ja" und "Nein" Aktionen definiert werden.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sMessage - Nachricht
         * @param {string} sTitle - Titel der Box
         * @param {function} fnOnClose - Close Funktion
         * @public
         */
        function displayConfirmBox(sMessage, sTitle, fnOnClose) {
            MessageBox.confirm(sMessage, {
                title: sTitle,
                onClose: fnOnClose,
                contentWidth: "400px"
            });
        }

        /**
         * Zeigt eine MessageBox mit einer Warnung an.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sMessage - Nachricht
         * @param {string} sTitle - Titel der Box
         * @param {function} fnOnClose - Close Funktion
         * @param {string} sConfirmAction - Bestätigungs-Aktion("YES", "OK")
         * @public
         */
        function displayAlert(sMessage, sTitle, fnOnClose, sConfirmAction) {
            MessageBox.warning(sMessage, {
                title: sTitle,
                emphasizedAction: sap.m.MessageBox.Action.OK,
                onClose: fnOnClose ? fnOnClose : null,
                actions: sConfirmAction ? [sConfirmAction, "CANCEL"] : "OK"
            });
        }

        /**
         * Zeigt eine MessageBox mit einer Warnung an.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sMessage - Nachricht
         * @param {string} sTitle - Titel der Box
         * @public
         */
        function displayErrorWithoutActions(sMessage, sTitle) {
            const oDialog = new Dialog({
                title: sTitle,
                type: "Message",
                state: "Error",
                content: new Text({
                    text: sMessage
                }),
                escapeHandler: (oPromise) => oPromise.reject()
            });

            oDialog.open();
        }

        /**
         * Kopiert einen Text in die Zwischenablage.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string} sText - Der Text der kopiert werden soll
         * @return {(string|boolean)} - Der kopierte Text oder im Fehlerfall: false.
         * @public
         */
        function copyToClipboard(sText) {
            if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                const textarea = document.createElement("textarea");
                textarea.textContent = sText;
                textarea.style.position = "fixed";
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand("copy");
                } catch (ex) {
                    return false;
                } finally {
                    document.body.removeChild(textarea);
                }
            }
            return "";
        }

        /**
         * Aktualisiert das Element-Binding für die aktuelle View.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @public
         */
        function refreshViewBinding() {
            this.getView().getElementBinding().refresh(true);
        }

        /**
         * Fügt Model-Eigenschaften zu einem Array hinzu oder entfernt diese.
         *
         * @memberOf module:controller/BaseController
         * @instance
         * @param {string[]} aChangeValues - Werte die geändert werden sollen
         * @param {string[]} aModelValues - Aktuellen Werte
         * @param {boolean} bAdd - Sollen die Werte hinzugefügt werden?
         * @returns {string[]} aModelValues - Die aktualisierten Werte
         * @public
         */
        function setPropertyBasedOnArray(aChangeValues, aModelValues, bAdd) {
            if (bAdd) {
                return aModelValues.concat(aChangeValues);
            }
            for (let sChangeValue of aChangeValues) {
                const iIndex = aModelValues.findIndex((sModelValue) => sModelValue === sChangeValue);
                if (iIndex !== -1) aModelValues.splice(iIndex, 1);
            }
            return aModelValues;
        }

        return Controller.extend("private.sandbox.controller.BaseController", {
            onInit: onInit,
            onNavBack: onNavBack,
            onValidate: onValidate,
            onCancelDialogAction: onCancelDialogAction,
            getRouter: getRouter,
            getI18nBundle: getI18nBundle,
            getModel: getModel,
            getViewModel: getViewModel,
            getDialogHelper: getDialogHelper,
            getMessageManager: getMessageManager,
            getViewContextPath: getViewContextPath,
            getAuthorizationHelper: getAuthorizationHelper,
            setViewModel: setViewModel,
            setAppBusy: setAppBusy,
            navToView: navToView,
            displayTarget: displayTarget,
            escapePressed: escapePressed,
            displaySuccessToast: displaySuccessToast,
            displaySuccessBox: displaySuccessBox,
            displayConfirmBox: displayConfirmBox,
            displayAlert: displayAlert,
            displayErrorWithoutActions: displayErrorWithoutActions,
            copyToClipboard: copyToClipboard,
            refreshViewBinding: refreshViewBinding,
            setPropertyBasedOnArray: setPropertyBasedOnArray
        });
    }
);
