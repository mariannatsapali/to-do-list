//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Create new or connect mongoDB database ~ Default localhost : 27017
mongoose.connect("mongodb+srv://mariannatsapali:ckAEKY5URqcALQyV@cluster0.jzxo7qg.mongodb.net/toDoListDB");

//Database item schema
const itemsSchema = {
  name: String
};

//Database list schema
const listSchema = {
  name: String,
  items: [itemsSchema]
}

//Database item model
const Item = mongoose.model(
  "item", itemsSchema // <"Singular form">, <schemaName>
);

//Database list model
const List = mongoose.model(
  "list", listSchema // <"Singular form">, <schemaName>
);

//Create new items for the Database
const i1 = new Item({
  name: "Welcome to your ToDoList!"
});

const i2 = new Item({
  name: "Hit the '+' button to add a new item."
});

const i3 = new Item({
  name: "<-- Hit this in order to delete a specific item."
});

const defaultItems = [i1, i2, i3];


app.get("/", function(req, res) {

  Item.find({}, function(err, allItems) {
    if (allItems.length === 0) {
      //Insert items into collection
      Item.insertMany(defaultItems, function(err) {
        if (err)
          console.log(err);
        else
          console.log("Default items are added to the database succesfully!")
      });
    }
      res.render("list", {
        listTitle: "Today",
        newListItems: allItems
      });
      if (err)
        console.log(err);
  })

});



app.post("/", function(req, res) {

  const itemValue = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemValue
  });

  if (listName == "Today") { //If new item is added to default list
    newItem.save();
    res.redirect("/");
  } else { //If new item is added to a custom list
    List.findOne({
      name: listName
    }, function(err, listFound) {

      listFound.items.push(newItem);
      listFound.save();
      res.redirect("/" + listName);
    })
  }
});




app.post("/delete", function(req, res) {

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemId, function(err ) {
      if (err)
        console.log(err);
      else {
        res.redirect("/");
        console.log("Item is deleted succesfully!");
      }
    })
  }
  else{
    List.findOneAndUpdate(
    {name :listName}  ,
    {$pull:{items:{_id:checkedItemId}}},
    function(err, listFound){
      if(!err){
        res.redirect("/"+listName);
      }
    }

    )
  }

})




app.get("/:customName", function(req, res) {
  const customName = _.capitalize(req.params.customName);
  List.findOne({
    name: customName
  }, function(err, listFound) { //Checks if the list already exists
    if (!err) {
      if (listFound) //Show existing list
        res.render("list", {
          listTitle: listFound.name,
          newListItems: listFound.items
        })
      else { //Create a new list
        const newList = new List({
          name: customName,
          items: defaultItems
        });
        newList.save();
        res.redirect("/" + customName);
      }
    } else {
      console.log(err);
    }
  })
});




app.get("/about", function(req, res) {
  res.render("about");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started has started!");
});
