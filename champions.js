var jf = require('jsonfile')
var request = require('request')

var API_KEY = process.env.RIOT_KEY
var ENDPOINT = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=tags'

var mage_champs = 'data/mage_champs.json'

request.get(ENDPOINT + '&api_key=' + API_KEY, function(err, res, body) {
	if(!err && res.statusCode === 200) {
		console.log('Successful call to champion endpoint!')
		var raw_data = JSON.parse(body)
		var champs = raw_data['data']
		extractMages(champs);
	} else {
		console.log(err)
	}
}) 

function extractMages(champs) {
	var mages = [];
	for(champ in champs) {
		champion = champs[champ]
		for(var i = 0; i < champion.tags.length; i++) {
			if(champion.tags[i] == 'Mage') {
				mages.push({
					name: champion.name,
					id: champion.id,
					key: champion.key
				})
			}
		}
	}

	jf.writeFileSync(mage_champs, mages)
}