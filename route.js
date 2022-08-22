const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = require("./secret.js")
var itemarray = require("./itemarray.js")

function getToken(obj) {
    return jwt.sign(obj, secret)

}

function validateToken(obj, secret) {
    return jwt.verify(obj, secret)
}

router.post("/register", (req, res) => {

    var authinfo = {
        "token": getToken(req.body),
        "secret": secret
    }

    res.send(authinfo)

})




router.get("/viewitem/:token/:secret", (req, res) => {

    var token = req.params.token
    var secret = req.params.secret
    var auth = validateToken(token, secret)
    console.log(token)
    console.log(secret)
    if (auth) {
        res.send(itemarray)
    } else {
        res.send("invalid details")
    }
})

router.post("/additem", (req, res) => {

    itemarray.push(req.body)


    res.send("item added " + req.body)
})
router.patch("/updateitem", (req, res) => {

    var item = req.body
    var narray = itemarray.filter((e) => {
        e.itemname != item.itemname
    })

    narray.push(item)

    itemarray = narray


    res.send("update item")
})
router.delete("/deleteitem", (req, res) => {

    for (let x in itemarray) {
        if (itemarray[x].itemname == req.body.itemname) {
            delete itemarray[x];
        }
    }


    res.send("delete item")
})

module.exports = router