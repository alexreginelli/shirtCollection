const mongoose = require("mongoose");
const express = require("express");
const Shirt = require("./models/shirt");

//create the Express app
const app = express();
const dbURI = "mongodb+srv://alex:Password1234@romashirt.zqjoz2a.mongodb.net/ShirtCollection?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

/**
 * rooting
 */

app.get("/", (request, response) => {
    response.render("index", { title: "Home" });
});

app.get("/collection", (request, response) => {
    Shirt.find()
        .then((result) => response.render("collection", { title: "Collection", shirts: result }))
        .catch((error) => console.log(error));
})

app.get("/create", (request, response) => {
    response.render("create", { title: "Create" });
});

app.post("/collection", (request, response) => {
    const shirt = new Shirt(request.body);
    shirt.save()
        .then((result) => { response.redirect("/collection") })
        .catch((error) => console.log(error));
});

app.get("/:id", (request, response) => {
    const id = request.params.id;
    Shirt.findById(id)
        .then(result => response.render("shirt", { shirt: result, title: "Shirt" }))
        .catch((error) => console.log(error));
});

app.delete("/:id", (request, response) => {
    const id = request.params.id;
    Shirt.findByIdAndDelete(id)
        .then((result) => { response.json({ redirect: "/collection" }) })
        .catch((error) => console.log(error));
});

app.post("/:id", (request, response) => {
    const shirt = new Shirt(request.body);
    const newShirt = { title: shirt.title, description: shirt.description }
    const id = { _id: shirt.id };
    Shirt.findOneAndUpdate(id, newShirt)
        .then((result) => {
            Shirt.findById(id)
                .then(result => response.render("shirt", { shirt: result, title: "Single shirt detail" }))
        })
        .catch((error) => console.log(error));
});


//404 page
app.use((request, response) => {
    response.status(404).render("404", { title: "Error" });
});