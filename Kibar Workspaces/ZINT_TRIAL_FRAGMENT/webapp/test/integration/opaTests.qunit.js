/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/fragment/ZINT_TRIAL_FRAGMENT/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});