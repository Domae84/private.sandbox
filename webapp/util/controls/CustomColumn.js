sap.ui.define(
    [
        "sap/m/Column",
        "sap/m/Popover",
        "sap/m/Input",
        "sap/ui/core/icon",
        "sap/m/HBox",
        "sap/m/Label",
        "sap/ui/model/Filter",
        "sap/ui/core/Fragment"
    ],
    function (Column, Popover, Input, Icon, HBox, Label, Filter, Fragment) {
        const oCustomColumn = Column.extend("CustomColumn", {
            metadata: {
                properties: {
                    bindingProperty: "string"
                }
            },
            onclick: async function (oEvent) {
                if (!this._oPopover) {
                    this._oPopover = await Fragment.load({
                        name: "private.sandbox.view.fragments.FilterPopup"
                    });
                    this.addDependent(this._oPopover);
                    const oInput = this._oPopover.getContent()[0].getItems()[2];
                    oInput.attachSubmit(this.onSubmitFilter, this);
                }
                this._oPopover.openBy(this);
            }
        });

        oCustomColumn.prototype.onSubmitFilter = function (oEvent) {
            const oItemsBinding = this.getParent().getBinding("items");
            const aFilters = oItemsBinding.aFilters;
            const sNewValue = oEvent.getParameter("value");
            const sBindingPath = this.getProperty("bindingProperty");
            const oFilter = new Filter(sBindingPath, "Contains", sNewValue);
            const bHasCurrentFilter = aFilters.some((oFilter) => oFilter.sPath === sBindingPath);

            if (bHasCurrentFilter) {
                const iIndex = aFilters.findIndex((oFilter) => oFilter.sPath === sBindingPath);
                aFilters[iIndex] = oFilter;
            } else {
                aFilters.push(oFilter);
            }
            oItemsBinding.filter(aFilters);
            this._oPopover.close();
        };
        return oCustomColumn;
    }
);
