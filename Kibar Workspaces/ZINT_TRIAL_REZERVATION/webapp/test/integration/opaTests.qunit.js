/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/rezervation/ZINT_TRIAL_REZERVATION/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});