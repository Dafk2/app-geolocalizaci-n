const inquirer = require("inquirer");

const showInterface = async () => {
  const choices = [
      {
         type:'list',
         name:'option',
         message:'Select an option', 
         choices: [
             { value: 1, name: '1. Buscar ciudad' },
             { value: 2, name: '2. historial' },
             { value: 3, name: '3. Salir' },
         ]
      }
  ]

  const { option } = await inquirer.prompt(choices)

  return option;
}

const pause = async () =>  {
  const enter = [
     { 
        type:'input',
        name:'enter',
        message:'Enter para continuar' 
    }
  ] 

  await inquirer.prompt(enter)
}

const readInput = async (message) => {
    const choices = [
        {
            type:'input',
            name:'read',
            message,
            
            validate(value) {
               if(value.length === 0) {
                  return 'Increse un valor' 
               }

               return true;
            }
        }
    ]
    
    const { read } = await inquirer.prompt(choices)
    return read;
}

const listOfCities = async (citys) => {
    
    const choices = citys.map((city, i) => {
      let indexe = `${i + 1}`;
        
      return {
        value: city.id,
        name: `${indexe} ${city.name}.` 
      }
    })

    choices.unshift({
        value: `0 cancel`,  
    })

    const option = [
        {
            type: 'list',
            name:  'citys_list',
            message: 'Selecciona el lugar',
            choices
        }
    ]
    
    const { citys_list } = await inquirer.prompt(option)

    return citys_list;
}


module.exports = {
    showInterface,
    pause,
    readInput,
    listOfCities,
}