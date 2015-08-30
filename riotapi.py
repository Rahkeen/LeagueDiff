import requests
import json
import os 

API_KEY = os.environ.get('RIOT_KEY')

r = requests.get('https://na.api.pvp.net/api/lol/na/v2.2/match/1852538938?api_key=' + API_KEY)

data = r.json()
print(json.dumps(data, indent=4, sort_keys=True))