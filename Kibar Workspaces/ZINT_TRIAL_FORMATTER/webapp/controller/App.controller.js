sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("int.trial.formatter.ZINT_TRIAL_FORMATTER.controller.App", {
		onInit: function () {

		},
		onAfterRendering: function () {

			var oModel = new JSONModel({
				company: [{
					name: "Deloite",
					createDate: new Date(),
					averageSale: 1100.1,
					sector: {
						name: "Finance",
						total: "100",
						unit: "$"
					}
				}, {
					name: "Coca Cola",
					createDate: new Date(),
					averageSale: 1200.231,
					sector: {
						name: "Drink",
						total: "70",
						unit: "€"
					}
				}, {
					name: "Pınar Gıda",
					createDate: new Date(),
					averageSale: 1100,
					sector: {
						name: "Food",
						total: "200",
						unit: "$"
					}
				}, {
					name: "IBM",
					createDate: new Date(),
					averageSale: 1300,
					sector: {
						name: "IT",
						total: "130",
						unit: "€"
					}
				}]

			});
			this.getView().setModel(oModel, "companyModel");
		},
		formatStatus: function (amount) {
			if (amount > 1200) {
				return "Success";
			}
			else
			{
				return "Error";
			}
		}
	});
});