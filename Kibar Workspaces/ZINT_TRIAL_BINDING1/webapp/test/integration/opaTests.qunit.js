/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/binding1/ZINT_TRIAL_BINDING1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});