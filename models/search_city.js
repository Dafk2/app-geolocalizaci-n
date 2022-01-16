const fs = require('fs');
const axios = require('axios');

class SearhCity {
    history = [];
    pathDb = './db/data.json'     
    
    constructor() {
       this.readDb();      
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

        } catch (err) {
            console.log('Ningún resultado coincidió con su búsqueda \nVerifica tu conexion a internet') 
        }
    }
    
    async weatherCity (lat, long) {
        
        try {
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{  
                   appid:process.env.OPENWEATHER_KEY,
                   units:'metric',
                   lang:'es',
                   lat, 
                   long 
                }
            }) 
              
            // Here I will have the response of the request.
            const res = await instance.get();
              
            const { weather, main } = res.data        
           
            return {
               desc:weather[0].description,
               min:main.temp_min,
               max:main.temp_max,
               temp:main.temp
            }
        } 
        
        catch (err) {
              console.log('Internal server error')
              console.log(err)
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