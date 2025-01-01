
const searchBtn = document.querySelector('.container-for-searchImg');
const inputBtn = document.querySelector('.js-input');
const errorElem = document.querySelector('.error-msg');
const wholeCon = document.querySelector('.container-whole')


inputBtn.addEventListener('input',function(){
    if(inputBtn.value){
        searchBtn.style.display='block'
        inputBtn.style.width='300px'
    }
    else{
        searchBtn.style.display='none'
        inputBtn.style.width='500px'
    }
})

inputBtn.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){

        inputBtn.style.display = 'block'
        
        fetchWeatherData();
    }
})

searchBtn.addEventListener('click',fetchWeatherData)

 async function fetchWeatherData(){

   
 
    const container = document.querySelector('.container-for-information');
   container.style.display = 'block' 
    const city = inputBtn.value;
    errorElem.innerHTML = '';
    
    if(!city){
        displayError();
        return
    }
   
   
    const apiKey = 'a9bd019e97da8b33390550e99071789a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`
    try{

        const response = await fetch(apiUrl+`&appid=${apiKey}`);
        //console.log(response)
        if(!response.ok){
            displayError()
            throw new error(`can't find`);
            
        } 
                

        const weatherData = await response.json();
        console.log(weatherData)
        
        displayWeatherDetails(weatherData)
    
        
        

    }
    catch(error){
        console.log('not found!')
    }

    
}

function displayWeatherDetails(data){

    const temp = data.main.temp;
    //console.log(temp)
    const cityName = data.name;
    //console.log(cityName)
    const windSpeed = data.wind.speed;
    //console.log(windSpeed);
    const weather = data.weather[0].description;
  //  console.log(weather)

    const humidity = data.main.humidity ;
//    console.log(humidity)
   const weatherId = data.weather[0].id;

    const tempElem = document.querySelector('.celcius');
    tempElem.innerText='';
    tempElem.innerText=`${temp} °c`;

    const cityElem = document.querySelector('.city');
    cityElem.innerText='';
    cityElem.innerText=cityName;

    const humidityElem = document.querySelector('.percent');
    humidityElem.innerText='';
    humidityElem.innerText=`${humidity} %`

    const windElem = document.querySelector('.wind')
    windElem.innerText='';
    windElem.innerText=`${windSpeed} km/hr`

    displayWeatherImg(weatherId,weather)
}

function displayWeatherImg(weatherId,weather){
    console.log(weatherId)
    
    document.querySelector('.weather-condition').innerText = weather;
   
     const imgElem = document.querySelector('.weather-img');
    
     if(weatherId===701){
        imgElem.src = `images/mist.png`;
     }

     switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            imgElem.src = `images/thunder.png`;
            wholeCon.style.backgroundColor='rgb(50, 50, 50)'

            break;

        case (weatherId >= 300 && weatherId < 400):
            imgElem.src = `images/drizzle.png`;
            wholeCon.style.backgroundColor='rgb(173, 216, 230)'

            break;

        case (weatherId >= 500 && weatherId < 600):
            imgElem.src = `images/rain.png`;
            wholeCon.style.backgroundColor=''
            wholeCon.style.backgroundColor='rgb(100, 149, 237)'
            break;

        case (weatherId >= 600 && weatherId < 700):
            imgElem.src = `images/snow.png`;
            wholeCon.style.backgroundColor=''
            wholeCon.style.backgroundColor='yellow'
            break;

        case (weatherId >= 702 && weatherId < 800):
            imgElem.src = `images/overcast.png`;
            wholeCon.style.backgroundColor=''
            wholeCon.style.backgroundColor='gray'
            break;

        case (weatherId === 800):
            imgElem.src = `images/clear sky.png`;
            wholeCon.style.backgroundColor=''
            wholeCon.style.backgroundColor='rgb(135, 206, 235)'
            break;

        default:
            imgElem.src = `images/clear sky.png`; 
            wholeCon.style.backgroundColor=''
            wholeCon.style.backgroundColor='rgb(255, 173, 96)'
    }
}




function displayError(){
    
    errorElem.innerHTML='Enter valid city name ';
    errorElem.style.display = 'block'; 
    const container = document.querySelector('.container-for-information');
    container.style.display='none'
    
    
}
