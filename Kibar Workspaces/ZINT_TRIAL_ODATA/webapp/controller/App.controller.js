sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("int.trial.odata.ZINT_TRIAL_ODATA.controller.App", {
		onInit: function () {

		},
		handleButtonPress: function (oEvent) {
			var buttonText = oEvent.getSource().getText();
			var selectedItem = this.getView().byId("mainList").getSelectedItem();

			if (selectedItem === null) {
				MessageBox.show("Kalem seçilmedi");
			}
			var vbeln = selectedItem.getBindingContext().getObject().Vbeln;
			this.defaultModel = this.getView().getModel();

			switch (buttonText) {
			case "Create":
				this.createOperation(vbeln);
				break;
			case "Delete":
				this.deleteOperation(vbeln);
				break;
			case "Update":
				this.updateOperation(vbeln);
				break;
			default:
			}

		},

		createOperation: function (vbeln) {

			this.defaultModel.create("/SalesHeaderSet", {
				Vbeln: vbeln
			}, {
				success: function () {
					MessageBox.show("Yaratma İşlemi başarıyla yapıldı");
				},
				error: this.myErrorHandler
			});
		},
		updateOperation: function (vbeln) {

			var delurl = "/SalesHeaderSet(Vbeln='" + vbeln + "')";
			this.defaultModel.update(delurl, {
				Vbeln: vbeln
			}, {
				success: function () {
					MessageBox.show("Güncelleme İşlemi başarıyla yapıldı");
				},
				error: this.myErrorHandler
			});
		},
		deleteOperation: function (vbeln) {

			var delurl = "/SalesHeaderSet(Vbeln='" + vbeln + "')";

			this.defaultModel.remove(delurl, {
				success: function () {
					MessageBox.show("Silme İşlemi başarıyla yapıldı");
				},
				error: this.myErrorHandler
			});
		},
		myErrorHandler: function (response) {
			var message = JSON.parse(response.responseText).error.message.value    ;
			MessageBox.show(message);
		}
	});
});