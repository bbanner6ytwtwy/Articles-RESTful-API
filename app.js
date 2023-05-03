const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://bbanner6061:jiEzbODemcq3UHnM@cluster0.3z540m9.mongodb.net/wikiDB');
const postSchema = mongoose.Schema({title: String, content: String, category: String})
const Article = new mongoose.model("Article", postSchema);
app.get("/", (req, res)=>{
   res.sendFile(__dirname + "./index.html")
})
app
    .route("/articles")
    .get((req, res) => {
        async function find() {
            const retrieve = await Article.find({});
            res.send(retrieve)
        }
        find()
    })
    .post((req, res) => {
        const name = _.capitalize(req.body.title);
        const info = _.capitalize(req.body.content);
        const category = _.capitalize(req.body.category);
        const newPost = new Article({title: name, content: info, category: category})

        newPost.save()
        res.send("successfully created article")
    })
    // .delete((req, res) => {
    //     async function erase() {
    //         const terminate = await Article.deleteMany()
    //     }
    //     erase()
    //     res.send("all articles erased ☠️💀")
    // })
app
    .route("/articles/:category/:title")
    .get((req, res) => {
        const name = _.capitalize(req.params.title);
        const category= _.capitalize(req.params.category);
        async function findIn() {
            const retrieve = await Article.find({title: name}, {category: category});
            console.log(retrieve)
            retrieve === null
                ? res.send("Not stored in DB")
                : res.send(retrieve);
        }
        findIn()

    })
    .put((req, res) => {
        const name = req.params.title;
        async function findIn() {
            const retrieve = await Article.findOneAndReplace({
                title: name
            }, {
                title: req.body.title,
                content: req.body.content
            });
            console.log(retrieve)
            retrieve === null
                ? res.send("Not stored in DB")
                : res.send("Successfully replaced article");
        }
        findIn()

    })
    .patch((req, res) => {
        const name = req.params.title;
        async function findIn() {
            const retrieve = await Article.updateOne({
                title: name
            }, {
                title: req.body.title,
                content: req.body.content
            });
            console.log(retrieve)
            retrieve === null
                ? res.send("Not stored in DB")
                : res.send("Successfully changed article");
        }
        findIn()

    })
    .delete((req, res) => {
        const name = req.params.title;
        async function findIn() {
            const retrieve = await Article.deleteOne({title: name});
            console.log(retrieve)
            retrieve === null
                ? res.send("Not stored in DB")
                : res.send("Successfully deleted article");
        }
        findIn()

    })

    app
    .route("/articles/:category")
    .get((req, res) => {
        const category = _.capitalize(req.params.category);
        async function findIn() {
            const retrieve = await Article.find({category: category});
            console.log(retrieve)
            retrieve === null
                ? res.send("Not stored in DB")
                : res.send(retrieve);
        }
        findIn()

    })
app.listen("3000", () => {
    console.log("WE WORKIN fancy, you're mama a monkey....")
})