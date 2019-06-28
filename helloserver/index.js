"use strict";
// Node.JS/Express Bootcamp
// Conducted By: Reuben Wee
//
//
// Duration: 5 hours
//
// Created on: 20190620
// Updated on: 20190628
//
//
// ======= START INITIALIZATION

const express = require('express');
const app = express();
let port = 3000;
let host = '127.0.0.1';  // <- if you want to host it to other machines, change this to 0.0.0.0

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myingredients01',{
	useNewUrlParser:true,
	useFindAndModify:false,
	useCreateIndex:true
});
let db = mongoose.connection;

const mIngredients = require('./models').Ingredients;

// ========= DONE STANDARD INITIALIZATION

// ========= LET'S START ACCEPTING CRUD REQUESTS
// CRUD = Create, Read, Update, Delete

app.get('/',(req,res)=>{
	// GET = Read
	// For this read, let's load ALL the ingredients
	mIngredients.find().then(alldata=>{
		res.json({
			status:'OK',
			action:'READ',
			data: alldata
		});
	}).catch(err=>{
		res.json({
			status:'FAIL',
			action:'READ',
			error:err
		});
	});
});

app.post('/',(req,res)=>{
	// POST = Create New
	// For this, let's add a new ingredient to the database
	let rawIngredient = req.body;
	let newIngredient = new mIngredients(rawIngredient);
	newIngredient.save().then(savedData=>{
		res.json({
			status:'OK',
			action:'CREATE',
			data:savedData
		});
	}).catch(err=>{
		res.json({
			status:'FAIL',
			action:'CREATE',
			error:err
		});
	});
});

app.put('/:id',(req,res)=>{
	// PUT = Update Existing
	// Let's get the ID of the record from the URL parameter "id"
	let existingid = req.params.id;

	// Let's get the updated data from the body of the request
	let newIngredient = req.body;

	mIngredients.findByIdAndUpdate({_id:existingid}, newIngredient).then(savedData=>{
		res.json({
			status:'OK',
			action:'UPDATE',
			data:savedData
		});
	}).catch(err=>{
		res.json({
			status:'FAIL',
			action:'UPDATE',
			error:err
		});
	});
});

app.delete('/:id',(req,res)=>{
	// DELETE = Delete Existing
	// Let's get the ID of the record from the URL parameter "id"
	let existingid = req.params.id;
	
	mIngredients.deleteMany({_id:existingid}).then(deletedData=>{
		res.json({
			status:'OK',
			action:'DELETE',
			data:deletedData
		});
	}).catch(err=>{
		res.json({
			status:'FAIL',
			action:'DELETE',
			error:err
		});
	});
});

// ========= DONE ACCEPTING CRUD REQUEST


db.once('open',()=>{
	app.listen(port,host,()=>{
		console.log(`server listening on port ${port}`)
	});
});
db.on('error',console.error.bind(console,'connection error:'));
