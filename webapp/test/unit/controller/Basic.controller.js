/*global QUnit*/

sap.ui.define([
	"tutorial/basic/ba1/Basic/controller/Basic.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Basic Controller");

	QUnit.test("I should test the Basic controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});