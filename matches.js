var jf = require('jsonfile')
var request = require('request')
var MongoService = require('./mongo_service')

var match_511_nums = 'data/5.11/RANKED_SOLO/NA.json'
var match_514_nums = 'data/5.14/RANKED_SOLO/NA.json'

var matches_511_path = 'data/5.11/511_match_data.json'
var matches_514_path = 'data/5.14/514_match_data.json'

var match_511_list = jf.readFileSync(matches_511_path)
var match_514_list = jf.readFileSync(matches_514_path)

var NA_ENDPOINT = 'https://na.api.pvp.net/api/lol/na/v2.2/match/'
var API_KEY = process.env.RIOT_KEY

// Fetch Match Data for 5.11/5.14 Ranked Matches

jf.readFile(match_511_nums, function(err, data) {
	if(err) {
		console.log(err)
	} else {
		getMatchData(data, 2758)
	}
})

function getMatchData(match_list, index) {
	if(index < match_list.length) {
		request.get(NA_ENDPOINT + match_list[index] + '?api_key=' + API_KEY, function(err, res, body) {
			if(!err && res.statusCode === 200) {
				console.log('Succesful API Call, recieved match data for match: ' + match_list[index])
				// MongoService.insert(JSON.parse(body), function(err, result) {
				// 	console.log('yay')
				// })

				match_511_list.push(JSON.parse(body))

				setTimeout(function() {
					getMatchData(match_list, index+1)
				}, 1200)
			} else {

				jf.writeFile(matches_511_path, match_511_list, function(err) {
					console.log('Saved fetched matches to file')
				})

				jf.writeFile('match_fetch_error.txt', index, function(err) {
					console.log('Wrote to error log.')
				})

				getMatchData(match_list, index)
			}
		})
	} else {
		console.log('Done getting match data.')
		jf.writeFile(matches_511_path, match_511_list, function(err) {
			if(err) {
				console.log(err)
			} else {
				console.log('Saved match data to file.')
			}
		})
	}	

}




