/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/types/ZINT_TRIAL_TYPES/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});