import express from "express";

let congFigViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = congFigViewEngine;