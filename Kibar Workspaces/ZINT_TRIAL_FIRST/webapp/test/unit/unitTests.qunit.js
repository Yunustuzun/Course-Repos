/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/first/ZINT_TRIAL_FIRST/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});