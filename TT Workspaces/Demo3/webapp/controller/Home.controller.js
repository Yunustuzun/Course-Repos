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
	return Controller.extend("yt.demo3.controller.Home", {

		onInit() {
			console.log("onInit")
		},

		onAfterRendering() {
			// this._generateTable();
			// this._bindChartData();
			// this._generatePF();
			this._fillInitalForm();
		}
		,

		pressExcelModeOnOff(oEvent) {




			var bool = false;

			if (this.getView().byId("simpleFormPaste").getEditable()) {
				oEvent.getSource().setType(sap.m.ButtonType.Success);
				this.getView().byId("simpleFormPaste").setEditable(false);

				bool = false;

			}
			else {
				oEvent.getSource().setType(sap.m.ButtonType.Default);
				this.getView().byId("simpleFormPaste").setEditable(true);

				bool = true;
			}

			var aControls = this.getView().getControlsByFieldGroupId("fgFormInput");

			for (let k = 0; k < aControls.length; k++) {
				const control = aControls[k];
				control.setEditable(bool)
			}

		},
		_fillInitalForm: function (params) {
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "formModel");

			this._setEventPastHandler();
		},
		_setEventPastHandler: function (params) {

			window.addEventListener("paste", this._pasteHandler.bind(this))
		},
		_pasteHandler: function (params1, params2) {
			var tobePasted = params1.clipboardData.getData("text/plain");
			tobePasted = tobePasted.replace("\n")
			tobePasted = tobePasted.split("\t")


			var oModel = this.getView().getModel("formModel");

			var oFormData = {
				SupplierName: "",
				Street: "",
				HouseNumber: "",
				ZIPCode: "",
				City: "",
				Country: "",
			};
			// for (let k = 0; k < tobePasted.length; k++) {
			// 	const element = tobePasted[k];
			// 	// oModel.getData();
			// }
			oFormData.SupplierName = tobePasted[0];
			oFormData.Street = tobePasted[1];
			oFormData.HouseNumber = tobePasted[2];
			oFormData.ZIPCode = tobePasted[3];
			oFormData.City = tobePasted[4];
			oFormData.Country = tobePasted[5];

			oModel.setData(oFormData);
			// tobePasted

		},
		_generatePF: function (params) {

			var oModel = new JSONModel();

			var flowData = {
				lanes: [
					{
						"id": "0",
						"icon": "sap-icon://order-status",
						"label": "Sipariş",
						"position": 0
					},
					{
						"id": "1",
						"icon": "sap-icon://payment-approval",
						"label": "Fatura",
						"position": 1
					},
					{
						"id": "3",
						"icon": "sap-icon://payment-approval",
						"label": "Muhasebe",
						"position": 2
					}

				],
				nodes: [

					{
						"id": "1",
						"lane": "1",
						"title": "Müşteri Onayı",
						"titleAbbreviation": "MÜ O",
						"state": "Positive",
						"stateText": "OK status",
						"focused": true,
						"texts": [
							"Deneme Text"
						],
						"children": [3]
					},
					{
						"id": "2",
						"lane": "1",
						"title": "Satın Alma Onayı",
						"titleAbbreviation": "SA O.",
						"state": "Negative",
						"stateText": "tamam değil",
						"focused": false,
						"texts": null,
						"children": [
							{
								"nodeId": 3
							}

						],
						"highlighted": false
					}
					,
					{
						"id": "3",
						"lane": "3",
						"title": "Satın Alma Onayı",
						"titleAbbreviation": "SA O.",
						"children": null,
						"state": "Positive",
						"stateText": "tamam değil",
						"focused": false,
						"texts": null
					},
					{
						"id": "4",
						"lane": "0",
						"title": "Müşteri Onayı",
						"titleAbbreviation": "MÜ O",
						"state": "Positive",
						"stateText": "OK status",
						"focused": true,
						"texts": [
							"Deneme Text"
						],
						"children": [
							{
								"nodeId": 3,
								"connection": "Line"
							}
						]
					},
				]
			}

			oModel.setData(flowData);

			this.getView().setModel(oModel, "pfModel");
		},
		_bindChartData: function () {

			var oModel = new JSONModel({
				data: [
					['Task', 'Hours per Day'],
					['İş', 11],
					['Yemek', 10],
					['Oyun', 2],
					['Televizyon', 2],
					['Yüzme', 7]
				],
				options: {
					title: 'My Daily Activities'
				}
			});

			this.getView().setModel(oModel, "chartModel");

		},
		_generateTable() {

			var oDataModel = new sap.ui.model.odata.v2.ODataModel("http://smartcappd00.sap.tt-tim.tr:8000/sap/opu/odata/sap/ZDEMO3_SRV/");

			sap.ui.getCore().setModel(oDataModel);

			oDataModel.attachMetadataLoaded(function (params) {
				this.getView().setModel(oDataModel);
			}.bind(this));
			oDataModel.setUseBatch(true);
			oDataModel.setDeferredGroups(["group1"]);

			oDataModel.read("/ZFIELDSSET", {
				groupId: "group1",
			});

			oDataModel.read("/ZMARASET", {
				groupId: "group1",
			});

			oDataModel.submitChanges({
				success: this._setTableData.bind(this),
				error: function (oError) {

				},
			})
		},
		_setTableData(oData, oResponse) {


			var oPanel = this.getView().byId("mainPanel");
			var aFields = oData.__batchResponses[0].data.results;
			var aMara = oData.__batchResponses[1].data.results;
			var oTable = new Table("demoTable",
				{
					visibleRowCount: 10
				}
			);

			var oTableModel = new JSONModel({
				columns: aFields,
				items: aMara
			}

			);

			oTable.setModel(oTableModel, "demoModel");


			// for (let k = 0; k < aFields.length; k++) {
			// 	const field = aFields[k];

			// 	var oColumn = new Column({ label: field.Keyfi })
			// 	oColumn.setTemplate(new Text({

			// 		text: "{demoModel>" + field.Keyfi + "}"

			// 	}))
			// 	oTable.addColumn(oColumn)
			// }


			// var oRow = new Row({});
			// for (let j = 0; j < aFields.length; j++) {
			// 	const oFields = aFields[j];

			// 	oRow.addCell(new Text({
			// 		text: "demoModel>" + oFields.Keyfi
			// 	}))
			// }


			// 	var oColumn = new Column({ label: field.Keyfi })
			// 	oColumn.setTemplate(new Text({

			// 		text: "{demoModel>" + field.Keyfi + "}"

			// 	}))

			// v

			// var oText = new Text({
			// 	text: "{demoModel>Keyfi}"
			// });

			// oColumn.setTemplate(oText)

			oTable.bindColumns('demoModel>/columns', function (id, Context) {

				var keyfi = Context.getObject().Keyfi;
				var oText = new Text({
					text: "{demoModel>" + keyfi + "}"
				});

				return new Column({
					label: "{demoModel>Descr}",
					template: oText
				});

			}
			);

			// var oRow = new Row({});

			// oRow.setTemplate()
			oTable.bindRows(
				{
					path: 'demoModel>/items',
					// template: oRows
				}
			);

			// for (let m = 0; m < aMara.length; m++) {
			// 	const oMara = aMara[m];

			// 	for (let j = 0; j < aFields.length; j++) {
			// 		const oFields = aFields[j];

			// 		var cellValue = oMara[oFields.Keyfi];
			// 		var oRow = new Row({});

			// 		oRow.addCell(new Text({ text: cellValue }))
			// 	}
			// 	oTable.addRow(oRow);
			// 	// oCell = 
			// }


			oPanel.addContent(oTable);


		}

	});
})