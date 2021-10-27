sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("int.trial.mvc1.ZINT_TRIAL_MVC1.controller.App", {
		onInit: function () {
		},
		onAfterRendering:function () {
			var oModel = new JSONModel({
				name: "MVC Application"
			});
			this.getView().setModel(oModel, "firstModel");
		},
		changeLabel1: function () {
			this.getView().getModel("firstModel").setProperty("/name", "UI5 Application");
		},
		changeLabel2: function () {
			this.getView().getModel("firstModel").setProperty("/name", "Web Application");
		}
	});
});