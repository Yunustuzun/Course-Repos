sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/GroupHeaderListItem"
], function (Controller, JSONModel, GroupHeaderListItem) {
	"use strict";

	return Controller.extend("int.trial.order.ZINT_TRIAL_ORDER.controller.App", {
		onInit: function () {

		},
		onAfterRendering: function () {

			var oModel = new JSONModel({
				company: [{
					name: "Deloite",
					createDate: new Date(),
					averageSale: 1100.1,
					country: "France",
					sector: {
						name: "Finance",
						total: "100",
						unit: "$"
					}
				}, {
					name: "Coca Cola",
					createDate: new Date(),
					averageSale: 1200.231,
					country: "USA",
					sector: {
						name: "Drink",
						total: "70",
						unit: "€"
					}
				}, {
					name: "Pınar Gıda",
					createDate: new Date(),
					averageSale: 1300,
					country: "Turkey",
					sector: {
						name: "Food",
						total: "200",
						unit: "$"
					}
				}, {
					name: "Şenpiliç",
					createDate: new Date(),
					averageSale: 1250,
					country: "Turkey",
					sector: {
						name: "Food",
						total: "300",
						unit: "$"
					}
				}, {
					name: "IBM",
					createDate: new Date(),
					country: "USA",
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
			} else {
				return "Error";
			}
		},
		getName: function (oContext) {
			return oContext.getProperty("name");
		},
		getGroupHeader: function (oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			});
		}
	});
});