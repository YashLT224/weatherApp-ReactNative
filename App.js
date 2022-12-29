import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View } from 'react-native';
 import Weather from './components/Weather';
 import SearchBar from './components/Searchbar';
 // get your api key from https://openweathermap.org/current#current_JSON
const API_KEY=" "
export default function App() {

  const [weatherData,setWeatherData]=useState(null);
  const [loaded,setLoaded]=useState(true);


  async function fetchWeatherData(cityName){
    setLoaded(false);
    const API= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    try{
      const response=await fetch(API);
      if(response.status==200){
        
        const data = await response.json();
                setWeatherData(data);
      }else{
        setWeatherData(null);
      }
      setLoaded(true);


    }
    catch(e){
      console.log(error);
    }
  }

  useEffect(()=>{
     fetchWeatherData('mumbai');
     console.log(weatherData)
  },[])

  if(!loaded){
    return(
      <View style={styles.container}>
        <ActivityIndicator color='red' size={36} />
      </View>
    )
  }
  else if(!weatherData){
    return (
      <View style={styles.container}>
          <SearchBar fetchWeatherData={fetchWeatherData}/>
          <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
      </View>
  )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto"  backgroundColor='purple'/>
     
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28
}
});
