const fs = require('fs');
const axios = require('axios');

class SearhCity {
    history = [];
    pathDb = './db/data.json'     
    
    constructor() {
      
    }

    async searchCityMethod (city = '') {
        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params:{
                  'access_token':process.env.MAPBOX_KEY, 
                  'limit':'4',
                  "language": "en"
                }

            })
            const res = await instance.get();
            
            return res.data.features.map(city => ({
                id:city.id,
                name:city.place_name,
                lgn:city.center[0],
                lat:city.center[1]
            })) 

            // console.log(intace)
        } catch (err) {
            console.log('Ningun resultado coincidio con tu busqueda') 
        }
    }

    saveDb () {
       let file = {
           historyFile: this.history
       }

       fs.writeFileSync(this.pathDb, JSON.stringify(file));       
    }

    readDb () {
       if(!fs.existsSync(this.pathDb)) {
          return;
       }

       const file = fs.readFileSync(this.pathDb, { encoding: 'utf-8' })
       const parseFile = JSON.parse(file);
       
       this.history = parseFile.historyFile;
       
       return parseFile.historyFile;
    }

    async historyCity (city) {
       if(this.history.includes(city.toLowerCase())) {
          return;
       }
        
       this.history.unshift(city.toLowerCase());

       this.saveDb();
    }
}

module.exports = SearhCity; 