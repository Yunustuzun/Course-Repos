/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/mvc1/ZINT_TRIAL_MVC1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});