/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/order/ZINT_TRIAL_ORDER/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});