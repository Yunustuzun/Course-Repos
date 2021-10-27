/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZINT_TRIAL_BINDING2/ZINT_TRIAL_BINDING2/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
