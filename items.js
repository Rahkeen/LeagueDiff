var jf = require('jsonfile')
var request = require('request')

// TODO: make use of request query params rather than hard coding them in endpoint string

var API_KEY = process.env.RIOT_KEY
var ENDPOINT = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&'
var versions = {'5.11': '5.11.1', '5.14': '5.14.1'}

var old_item_datapath = 'data/5.11/old_items.json'
var new_item_datapath = 'data/5.14/new_items.json'

// GET 5.11 item data and save it (currently saving to a json file)
 
request.get(ENDPOINT + '&version=' + versions['5.11'] + '&api_key=' + API_KEY, function(err, res, body) {
	if(!err && res.statusCode === 200) {
		console.log('Fetched 5.11 Item Data')
		data = JSON.parse(body)
		items = data['data']
		jf.writeFile(old_item_datapath, items, function(err) {
			if(err) {
				console.log(err)
			} else {
				console.log('Succesfully saved 5.11 Item Data')
			}
		})
	}
})

// GET 5.14 item data and save it (currently saving to a json file)

request.get(ENDPOINT + '&version=' + versions['5.14'] + '&api_key=' + API_KEY, function(err, res, body) {
	if(!err && res.statusCode === 200) {
		console.log('Fetched 5.14 Item Data')
		data = JSON.parse(body)
		items = data['data']
		jf.writeFile(new_item_datapath, items, function(err) {
			if(err) {
				console.log(err)
			} else {
				console.log('Succesfully saved 5.14 Item Data')
			}
		})
	}
})

