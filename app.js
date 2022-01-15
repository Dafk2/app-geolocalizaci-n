console.clear()
const dotenv = require('dotenv').config()

const { showInterface, pause, readInput, listOfCities } = require("./helpers/inquirer");
const SearhCity = require('./models/search_city');

const main = async () => {
  let opt = '';
  
  const searhCity = new SearhCity();
  
  do {
    opt = await showInterface();
    
    switch (opt) {
        case 1:
          // readCity
          const city = await readInput('Ciudad:')
          
          // cityNames = [{}] arr of Citys
          const citysName = await searhCity.searchCityMethod(city) 
          
          // Interface to select an option from the results of cityName
          // listCiytId will return the id of the city because it is what the interface returns when selecting the value
          const listCiytId = await listOfCities(citysName)
          
          if (listCiytId === '0') continue;
          
          const selectCity = citysName.find(city => city.id === listCiytId);
  
          // save to database
          await searhCity.historyCity(selectCity.name)
          
        break;
        
        // Show history
        case 2:
          const history = await searhCity.readDb();
          console.log(history)
        break;
    }
    
    if(opt !== 0) { await pause() };
  
  } while (opt !== 0);
}

main();
