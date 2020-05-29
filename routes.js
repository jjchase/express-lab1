// import the required modules
const express = require("express");

// create an instance of the Express Router
const cart = express.Router();

// config variables
const cartEndpointURI = "/cart";

// mock data
const cartItems = [
    {
        id: 1,
        product: "TV",
        price: 200,
        quantity: 1
    },
    {
        id: 2,
        product: "Candy",
        price: 2,
        quantity: 5
    },
    {
        id: 3,
        product: "Xbox",
        price: 250,
        quantity: 2
    }
];
let nextId = cartItems.length + 1;

// *****************
// REST endpoints
// *****************

// GET all items from pantryInventory
cart.get(cartEndpointURI, (request, response) => {
    response.status(200);
    response.json(cartItems);
})

// GET items by id query param
cart.get(`${cartEndpointURI}/:id`, (request, response) => {
    const id = parseInt(request.params.id);
    // find the item that matches this id
    const cartItem = cartItems.find((item) => item.id === id);
    // if we have an item from our pantryInventory array that matches this id
    if (cartItem) {
        response.sendStatus(200);
        response.json(cartItem);
    } else {
        // we don't an item by this id
        response.sendStatus(404);
        response.send(`No item with id: ${id}`);
    }
})

// POST add items to pantryInventory
cart.post(cartEndpointURI, (request, response) => {
    // declare a variable for the pantryItem that we will add to our array, from the JSON body of the request
    const newCartItem = request.body;
    // add a unique id
    newCartItem.id = nextId;
    // prepare our nextId, for the next post request
    nextId++;
    // add this newPantryItem to pantryInventory
    cartItems.push(newCartItem);
    // for the response
    response.status(201);
    response.json(newCartItem);
})

// PUT
cart.put(`${cartEndpointURI}/:id`, (request, response) => {
    // store the id from the query params in a variable
    let id = parseInt(request.params.id);
    // store the updated item as a variable
    let updatedItem = request.body;
    updatedItem.id = id;
    // find the index of the item with this id
    let foundIndex = cartItems.findIndex((item) => item.id === id);
    // if don't have an item at this index
    if (foundIndex === -1) {
        // set a response code of 204
        response.status(404);
        response.send(`No item with id: ${id}`);
    } else {
        // we need to update the item in our array at this index
        response.sendStatus(200);
        cartItems.splice(foundIndex, 1, updatedItem);
        response.json(cartItems);
    }
})

// DELETE delete an item from the pantryInventory, by id
cart.delete(`${cartEndpointURI}/:id`, (request, response) => {
    // store the id that the user is requesting to be deleted
    let id = parseInt(request.params.id);
    // find the index of the item in the cartInventory that has this id property
    let foundIndex = cartItems.findIndex((item) => item.id === id);
    // if we have found an item with this id
    if (foundIndex > -1) {
        // delete the requested item by id, at the foundIndex
        cartItems.splice(foundIndex, 1);
        // send the updated cartItems
        response.json(cartItems);
    } else {
        // we don't have any items with this id
        // set a status code
        response.status(204);
        // send a message
        response.send(`No item with id: ${id}`);
    }
})



module.exports = { cart };
