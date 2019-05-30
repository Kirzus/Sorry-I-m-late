const express = require("express")
const connection = require("../helper/db.js")
const Router = express.Router()

Router.get("/", (req, res) => {
    res.send("I'm on GET '/excuses' ")
})

Router.get("/suggestions", (req, res) => {
    const sql = "SELECT * FROM suggestions"
    connection.query(sql, (err, result) => {
        if (err) throw err
        return res.status(200).send(result)
    })
    // res.send("I'm on GET '/excuses/suggestions' ")
})

// Add suggestions
Router.post("/addSuggestion", (req, res) => {
    console.log("req BODY", req.body)
    const sql = "INSERT INTO suggestions (category, image, excuse, issue, likes) VALUES (?,?,?,?,?)"
    const values = [
        req.body.category,
        req.body.image,
        req.body.excuse,
        req.body.issue,
        req.body.likes
    ]
    connection.query(sql, values, (err, result) => {
        if (err) throw err
        return res.status(200).send(result)
    })
})

// Update suggestions
Router.put("/updateSuggestion", (req, res) => {
  const sql =
    "UPDATE suggestions SET category = ?, excuse = ?, image = ?, issue = ?, likes = ? WHERE idSuggestion = ?";

    const values = [
        // Data to update
        req.body.category,
        req.body.excuse,
        req.body.image,
        req.body.issue,
        req.body.likes,
        // Row to select
        req.body.idSuggestion
    ]
    
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.sendStatus(200).send(result.affectedRows);
    // console.log('Deleted Row(s):', results.affectedRows);
  });
});

// Delete suggestions
Router.delete("/deleteSuggestion", (req, res) => {
    const sql = "DELETE FROM suggestions WHERE idSuggestion = ?"
    const values = [
        req.body.idSuggestion
    ]
    connection.query(sql, values, (err, result) => {
        if (err) throw err
        return res.sendStatus(200).send(result.affectedRows)
        // console.log('Deleted Row(s):', results.affectedRows);
      });
})

module.exports = Router;