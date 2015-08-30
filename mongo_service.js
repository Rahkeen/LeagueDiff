var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/test'
var MongoService = {}

/* Example mongodb connect

MongoClient.connect(url, function(err, db) {
	if(err) {
		console.log(err)
	} else {
		console.log('Succesfully connected to test db')
		db.close()
	}
})
*/

MongoService.insert = function(data, done) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			return done(err)
		}

		insertDocument(db, data, function(err, result) {
			if(err) {
				return done(err)
			}
			db.close()
			done(err, result)
		})
	})
}

function insertDocument(db, doc, done) {

	db.collection('matches').insertOne(doc, function(err, result) {
		if(err) {
			return done(err)
		}

		console.log('Inserted document successfully.')
		done(err, result)
	})
}

module.exports = MongoService

