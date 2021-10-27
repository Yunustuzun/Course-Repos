/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/formatter/ZINT_TRIAL_FORMATTER/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});