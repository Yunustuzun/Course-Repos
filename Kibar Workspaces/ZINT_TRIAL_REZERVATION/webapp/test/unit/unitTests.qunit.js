/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"int/trial/rezervation/ZINT_TRIAL_REZERVATION/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});