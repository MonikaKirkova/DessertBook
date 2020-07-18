var unirest = require("unirest");

var req = unirest("GET", "https://tasty.p.rapidapi.com/recipes/list");

req.query({
	"tags": "under_30_minutes",
	"from": "0",
	"sizes": "20"
});

req.headers({
	"x-rapidapi-host": "tasty.p.rapidapi.com",
	"x-rapidapi-key": "d6b934c9cemshef312ee16d07ddfp1d42eajsnd9cf1f50c3b4",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});