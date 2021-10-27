sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller,MessageToast) {
	"use strict";

	return Controller.extend("int.trial.first.ZINT_TRIAL_FIRST.controller.App", {
		onInit: function () {

		},
		onPress: function (evt) {
			MessageToast.show(evt.getSource().getText() + " Pressed");
		}
	});
});