sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/format/NumberFormat",
	"sap/m/MessageBox"
], function (Controller, JSONModel , DateFormat, NumberFormat, MessageBox) {
	"use strict";

	return Controller.extend("int.trial.types.ZINT_TRIAL_TYPES.controller.App", {
		onInit: function () {

		},
		onAfterRendering: function () {
			var oDateInstance = DateFormat.getDateInstance({
				pattern: "dd-MM-yyyy"
			});
			var oTimeIstance = DateFormat.getTimeInstance({
				pattern: "HH/mm/ss"
			});

			var dateString = oDateInstance.format(new Date());
			var timeString = oTimeIstance.format(new Date());

			var floatInstance = sap.ui.core.format.NumberFormat.getFloatInstance({
				minFractionDigits: 1,
				maxFractionDigits: 2,
				maxIntegerDigits: 5
			});

			var sampleNumberx = 1232.2544234;
			var sampleNumbery = 232.12;
			var sampleNumberz = 331122.2;

			var numberStringx = floatInstance.format(sampleNumberx);
			var numberStringy = floatInstance.format(sampleNumbery);
			var numberStringz = floatInstance.format(sampleNumberz);

			var oModel = new JSONModel({
				demoDate: dateString,
				demoTime: timeString,
				demoNumberx: numberStringx,
				demoNumbery: numberStringy,
				demoNumberz: numberStringz
			});

			this.getView().setModel(oModel, "firstModel");

		},
		showPopup: function () {
			var oLocale = new sap.ui.core.Locale("tr-tr");
			var floatInstancex = sap.ui.core.format.NumberFormat.getFloatInstance(oLocale);
			var x = "12,12313";
			var y = floatInstancex.parse(x);
			var z = floatInstancex.format(y);
			MessageBox.show(z);
		}

	});
});