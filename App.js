
import React,{isValidElement,useState} from'react';
import{StyleSheet,Text,View,Switch,Image, Animated}from'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

import Geolocation from '@react-native-community/geolocation';



export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyA58tTIS0WtLt_mu5CIvZhyXW3NVn9ulTY",
    authDomain: "reactnative-auth-69f42.firebaseapp.com",
    projectId: "reactnative-auth-69f42",
    storageBucket: "reactnative-auth-69f42.appspot.com",
    messagingSenderId: "957064025985",
    appId: "1:957064025985:web:d7778ffb24bfd2ddc8fa80"
  };
  
  let app;
  app = firebase.initializeApp(firebaseConfig);

  // To select data from firebase every time data has changed !
  firebase.database().ref('coords').on('value', (data) => {
    console.log(data.toJSON());
  })


  //geolocation part for switch off
  var getUserCurrentLocation1 = () => {
    let latitude, longitude,speed

    Geolocation.getCurrentPosition(
        info => {
            const { coords } = info

            latitude = coords.latitude
            longitude = coords.longitude
            speed = coords.speed

            // To Update a user
          firebase.database().ref('coords/location').update({
          lat: latitude,
          long: longitude,
          spd: speed,
          location: 'banglore',
          switch:'off'
          });

           console.log(  'user has switched OFF Insurance Coverage at ' + '('+latitude + ',' +longitude + ')')
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 4000,
            maximumAge: 3600000
        }
    )
  }

  //geolocation part for switch on
  var getUserCurrentLocation2 = () => {
    let latitude, longitude,speed

    Geolocation.getCurrentPosition(
        info => {
            const { coords } = info

            latitude = coords.latitude
            longitude = coords.longitude
            speed = coords.speed

             // To Update a user
          firebase.database().ref('coords/location').update({
            lat: latitude,
            long: longitude,
            spd: speed,
            location: 'banglore',
            switch:'on'
            });

           console.log(  'user has switched ON Insurance Coverage at ' + '('+latitude + ',' +longitude + ')')
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 4000,
            maximumAge: 3600000
        }
    )
  }

  


  //fadein and out part

  const opacity = useState(new Animated.Value(1))[0]

  function fadeInImg() {
    Animated.timing(opacity,{
      toValue:1,
      duration:500,
      useNativeDriver:true
    }).start()

  }

  function fadeOutImg() {
    Animated.timing(opacity,{
      toValue:0,
      duration:500,
      useNativeDriver:true
    }).start()
    
  }



//toggle part
  const[isEnabled,setIsEnabled]=useState(true);
  const[text,setText]=useState('Press the toggle to switch off insurance ');

  
  const toggleSwitch=()=>{
    if(isEnabled){
      fadeOutImg();
      setText('Insurance Coverage is OFF');
      getUserCurrentLocation1();
      
   }else{
      fadeInImg();
      setText('Insurance Coverage is ON');
      getUserCurrentLocation2();
      
   }
    setIsEnabled(previousState=>!previousState)
 }
  return(
   <View style={styles.container}>

    
    <Animated.Image
      source={require('./ins.png')}  style={[ {width: 200, height: 200,opacity}  ]} /> 
    
     <Image source={require('./car.png')}  style={{width: 140, height: 140, }}/> 
     
     

     <Text style={{fontWeight:'bold',margin:40,fontSize:20}}>{text}</Text>

      <Switch
       style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }} 
       trackColor={{false:'grey',true:'green'}}
       thumbColor={isEnabled?'#f4f3f4':'#f4f3f4'}
       ios_backgroundColor='grey'
       onValueChange={toggleSwitch}
       value={isEnabled}
        
       />

     

   </View>

  );

  }

  const styles =StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#96b3f2',
    alignItems:'center',
   justifyContent:'center',
 },
            
            
});