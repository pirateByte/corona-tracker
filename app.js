var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));


//routes

app.get("/", function (req, resp) {
    var unirest = require("unirest");

    var req = unirest("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php");

    req.query({
        "country": "India"
    });

    req.headers({
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "eb94692874msh456a7f50d3bd497p1b78e3jsn7fdd9fdd324d"
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        var data = JSON.parse(res.body);
        console.log(data["latest_stat_by_country"]);
        resp.render("index", { data: data });
    });

});



app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Server on!!!");
});