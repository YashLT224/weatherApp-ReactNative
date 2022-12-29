import React ,{useState,useEffect}from 'react'
import {View,Text,StyleSheet,ImageBackground,Dimensions,StatusBar} from 'react-native'
import Search from './Searchbar'
import {haze,rainy,snow,sunny} from '../assets/bgImages'
const Weather = ({ weatherData ,fetchWeatherData}) => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const { weather,
        name,
        main: { temp, humidity },     
} = weatherData;
const speed=weatherData.wind.speed
 const [{ main }] = weather;
console.log(temp)
useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
}, [weatherData])
function getBackgroundImg(weather) {
    if(weather === 'Snow') return snow
    if(weather === 'Clear') return sunny
    if(weather === 'Rain') return rainy
    if(weather === 'Haze') return haze
    return haze;   
}
let textColor = backgroundImage !== sunny ? 'white' : 'black'
    return (
        <View style={styles.container}>
           <ImageBackground source={backgroundImage}style={styles.backgroundImg} resizeMode='cover'>
               <Search fetchWeatherData={fetchWeatherData}/>
               <View style={{alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold'}}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor,}}>{temp} °C</Text>
                </View>
                <View style={styles.extraInfo}>

<View style={styles.info}>
    <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
    <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
</View>

<View style={styles.info}>
    <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
    <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
</View>

</View>
           </ImageBackground>
        </View>
    )
}

export default Weather
 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent:'center'
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 60,
    },
    extraInfo: {
         flexDirection: 'row',
        marginTop: 50,
         justifyContent: 'space-around',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems:'center',
    }
});