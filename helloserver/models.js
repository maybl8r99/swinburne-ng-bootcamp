"use strict";

const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
	ingredient:{
		type:String,
		required:true,
		unique:true,
		trim:true
	},
	uom: String,
	amount: Number
});

module.exports = {
	Ingredients : mongoose.model('ingredients',IngredientSchema);
} 
