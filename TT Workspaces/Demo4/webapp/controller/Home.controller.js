sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/format/NumberFormat",
	'sap/m/List',
	'sap/m/StandardListItem',
	'sap/m/Label',
	'sap/m/Text',
	'sap/ui/table/Table',
	'sap/ui/table/Column',
	'sap/ui/table/Row',
], function (Controller, MessageBox, Filter, Operator, JSONModel, DateFormat, NumberFormat, List, StandardListItem, Label, Text, Table, Column, Row) {
	"use strict";
	return Controller.extend("yt.demo4.controller.Home", {

		onInit() {
			console.log("onInit")
		},

		onAfterRendering() {
		},
		onInputNameChange(oEvent) {

			var request_Data = {
				matnr: oEvent.getSource().getValue()
			}

			// http://10.248.65.181:8000/sap/bc/abap/apis_demo?action=GETMAKTX


			jQuery.ajax({
				// xhrFields: {
				// 	withCredentials: true
				// },
				type: "GET",
				url: "http://10.248.65.181:8000/sap/bc/abap/apis_demo?action=GETMAKTX",
				dataType: 'json',
				data: { data: JSON.stringify(request_Data) },
				success: function (result) {

					var responseText = "";

					for (let k = 0; k < result.items.length; k++) {
						const r = result.items[k].maktx;
						responseText = responseText + " " + r;
					}
					MessageBox.success(responseText);
				}.bind(this),
				error: function (xhr,response,param3) {
					MessageBox.error(xhr.responseJSON.mesaj);
				}
			})

		},
		// _setJqeuryAuth(xhr) {
		// 	// xhr.setRequestHeader("Authorization", "Basic " + btoa("YTUZUN" + ":" + "19051988"));
		// },
		// var request_Data = {
		// 	matnr: "103344"
		// }
		// jQuery.ajax({
		// 	// xhrFields: {
		// 	// 	withCredentials: true
		// 	// },
		// 	type: "GET",
		// 	url: "http://10.248.65.181:8000/sap/bc/abap/apis",
		// 	dataType: 'json',
		// 	data: { data: JSON.stringify(request_Data) },
		// 	success: function (result) {
		// 		this.oBusyDialog.close();
		// 		console.log("Success response for" + result);
		// 	}.bind(this),
		// 	error: function (params) {

		// 	}
		// })

	});
})