const express = ("express");
const app = Express();
const PORT = 3000;
app.use(express.static('frontend'));// Fixed my pathing
res.sendFile(__dirname + '/frontend/index.html');
