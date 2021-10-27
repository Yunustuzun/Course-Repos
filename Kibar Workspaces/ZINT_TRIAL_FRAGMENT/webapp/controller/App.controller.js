sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Fragment, JSONModel) {
	"use strict";

	return Controller.extend("int.trial.fragment.ZINT_TRIAL_FRAGMENT.controller.App", {
		onAfterRendering: function () {

			// set data model
			var oData = {
				personel: {
					name: "Ahmet"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},

		onShowMessageToast: function () {
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/personel/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},
		onShowFragment: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("helloDialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "int.trial.fragment.ZINT_TRIAL_FRAGMENT.view.First"
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("helloDialog").open();
			}
		}
	});
});