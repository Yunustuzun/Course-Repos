sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
	"use strict";

	var Item = Element.extend("yt.demo1.control.Value", { metadata : {
		properties : {
			value : {type : "string", group : "Misc", defaultValue : ""},
		}
	}});

	Item.prototype.setValue = function(value) {
		this.setProperty("value", value, true);
		this.getParent().getParent().update();
	};

	return Item;

});