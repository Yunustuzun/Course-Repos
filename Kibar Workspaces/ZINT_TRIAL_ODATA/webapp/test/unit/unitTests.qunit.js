/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/odata/ZINT_TRIAL_ODATA/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});