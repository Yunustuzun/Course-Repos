/* global Chart,$*/
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
	'yt/demo1/lib/chart',
	// 'sap/ui/table/Table',
	// 'sap/ui/table/ColumnHeader',
], function (Controller, MessageBox, Filter, Operator, JSONModel, DateFormat, NumberFormat, List, StandardListItem, Label,
	Text,

	// Table, ColumnHeader
	ChartJS
) {
	"use strict";
	return Controller.extend("yt.demo1.controller.Home", {

		_googleChart: function (params) {
			this.getView().setModel(new JSONModel({
				data: [
					['Task', 'Hours per Day'],
					['Denen', 11],
					['Eat', 2],
					['Commute', 2],
					['Watch TV', 2],
					['Sleep', 7]
				],
				options: {
					title: 'My Daily Activities'
				}
			}), "googleChart");
		},
		onInit() {

			console.log("onInit")
			// this._chartRenderx();
			this._googleChart();
		},

		onHandleOdataGet() {

			var oDataModel = new
				sap.ui.model.odata.v2.ODataModel("http://smartcappd00.sap.tt-tim.tr:8000/sap/opu/odata/sap/ZDEMO1_SRV/");
			var parameters = {
				Vbeln: "91732913",
				Erdat: null,
				Ernam: "sadas",
				Audat: "1231"
			}

			oDataModel.setUseBatch(false);
			oDataModel.remove("/ZVBAKSet('91732913')", {
				urlParameters: {
					// "$expand": "dependentDealersSet"
				},
				success: function (oData, oResponse) {
					console.log(oData);
					console.log(oResponse);

				}.bind(this),
				error: function (oError) {
					console.log(oError);
				}
			});

		},
		_typeFormattingExamples() {

			var oDateInstance = DateFormat.getDateInstance({ pattern: "dd-MM-yyyy" });
			var oTimeIstance = DateFormat.getTimeInstance({ pattern: "HH/mm/ss" });

			var dateString = oDateInstance.format(new Date());
			var timeString = oTimeIstance.format(new Date());

			var floatInstance = sap.ui.core.format.NumberFormat.getFloatInstance(
				{
					minFractionDigits: 1,
					maxFractionDigits: 2,
					maxIntegerDigits: 3
				}
			);

			var sampleNumberx = 1232.2544234;
			var sampleNumbery = 232.12;
			var sampleNumberz = 331122.2;

			var numberStringx = floatInstance.format(sampleNumberx)
			var numberStringy = floatInstance.format(sampleNumbery)
			var numberStringz = floatInstance.format(sampleNumberz)


			var oModel = new JSONModel({
				demoDate: dateString,
				demoTime: timeString,
				demoNumberx: numberStringx,
				demoNumbery: numberStringy,
				demoNumberz: numberStringz
			});
			var oLocale = new sap.ui.core.Locale("tr-tr");
			var floatInstancex = sap.ui.core.format.NumberFormat.getFloatInstance(oLocale);


			var x = "12,12313";

			var y = floatInstancex.parse(x);

			console.log("Sonuç  : " + y)
			this.getView().setModel(oModel, "firstModel");
		},


		onItemSelected() {
			console.log("item clicked")
		},
		_bindingExamples() {

			var oModel = new JSONModel({
				sector: {
					name: "Yanlış Binding"
				},
				customer: {
					company: [
						{
							name: "Deloite",
							createDate: new Date(),
							averageSale: 11000.1,
							sector: {
								name: "Finance",
								total: "100",
								unit: "$"
							},
							country: [
								{
									name: "Turkey",
									code: "TR"
								},
								{
									name: "France",
									code: "FR"
								},
								{
									name: "Spain",
									code: "SP"
								}
							]
						},
						{
							name: "Coca Cola",
							createDate: new Date(),
							averageSale: 12000.231,
							sector: {
								name: "İçecek",
								total: "70",
								unit: "€"
							},
							country: [
								{
									name: "Turkey",
									code: "TR"
								},
								{
									name: "France",
									code: "FR"
								},
								{
									name: "Spain",
									code: "SP"
								}
							]
						},
						{
							name: "Pınar Gıda",
							createDate: new Date(),
							averageSale: 11000,
							sector: {
								name: "Gıda",
								total: "200",
								unit: "$"
							},
							country: [
								{
									name: "Turkey",
									code: "TR",
								},
								{
									name: "Spain",
									code: "SP"
								}
							]
						},
						{
							name: "IBM",
							createDate: new Date(),
							averageSale: 11000,
							sector: {
								name: "Bilişim",
								total: "130",
								unit: "€"
							},
							country: [
								{
									name: "France",
									code: "FR"
								},
								{
									name: "Spain",
									code: "SP"
								}
							]
						}

					]
				}
			});
			this.getView().setModel(oModel, "secondModel");

			var oVBox = this.getView().byId("vboxBindingExamples");


			var templateStandarListItem = new StandardListItem({
				title: "{secondModel>sector/name}",
				description: "{secondModel>sector/total}"
			});

			// -------------------------
			var oList = new List(
				{
					items: {
						path: "secondModel>/customer/company",
						mode: sap.ui.model.BindingMode.OneWay,
						template: templateStandarListItem
					}
				}
			)
			oVBox.addItem(oList);

			// ---------------------
			oVBox.addItem(new Label({
				text: "Sektörler 5"
			}));
			var oList1 = new List();
			oList1.bindAggregation("items",
				{
					path: "secondModel>/customer/company",
					template: templateStandarListItem
				}
			)
			oVBox.addItem(oList1);

			// ---------------------	
			oVBox.addItem(new Label({
				text: "Sektörler 6"
			}));
			var oList2 = new List();
			oList2.bindAggregation("items",
				{
					path: "secondModel>/customer/company",
					factory: function (sId, oContext) {


						// return new sap.m.StandardListItem({
						// 	title: oContext.getProperty("name"),
						// 	description : oContext.getProperty("sector/name")
						// })

						// Tarih, Saat , Float , Number

						var sector = oContext.getProperty("sector");
						var companyName = oContext.getProperty("name")

						var oUIControl = new sap.m.ObjectListItem(sId, {
							title: companyName,
							intro: {
								path: "secondModel>createDate",
								type: "sap.ui.model.type.Date",
								formatOptions: { style: 'short' }
							},
							number: {
								parts: [
									{ path: "secondModel>averageSale" },
									{ path: "secondModel>sector/unit" }
								],


								type: "sap.ui.model.type.Currency",
								formatOptions: {
									maxFractionDigits: '3',
									groupingSeparator: '.',
									decimalSeparator: ',',
									minFractionDigits: '2'
								}
							},


							numberUnit: { path: "secondModel>sector/unit" }
						});
						oUIControl.setType(sap.m.ListType.Active);
						oUIControl.attachPress(this.onItemSelected, this);
						return oUIControl;

					}.bind(this)
				}
			)
			oVBox.addItem(oList2);


		},
		_chartRender() {
			this.getView().setModel(new JSONModel({
				dataset1: [
					{ value: 4 },
					{ value: 5 },
					{ value: 4 },
					{ value: 2.5 },
					{ value: 3 },
					{ value: 4 },
					{ value: 3.5 },
					{ value: 4 }
				],
				dataset2: [
					{ value: 2 },
					{ value: 3 },
					{ value: 3 },
					{ value: 5 },
					{ value: 2 },
					{ value: 3 },
					{ value: 4 },
					{ value: 3 }
				],
				options: {
					scaleOverride: false,
					scaleStartValue: 0,
					scaleSteps: 5,
					scaleStepWidth: 1
				}
			}));
		},
		onAfterRendering() {


			this._typeFormattingExamples();
			this._bindingExamples();


		}

		,
		formatAmount(parameter1, parameter2, parameter3) {
			console.log(parameter1);
			console.log(parameter2);


			if (parameter2 === "Gıda") {
				return parameter1 + "$"
			}

			else if (parameter3 === "Coca Cola") {
				return parameter1 + "TL";
			}

			else {
				return parameter1 + "€";
			}

			// parameter = parameter + "€";
			// return parameter;
		}
	});
});