import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

class App extends React.Component {

    componentWillMount() {

        // To Configure react native app with cloud of Google Firebase database !
       
        const firebaseConfig = {
          apiKey: "AIzaSyA58tTIS0WtLt_mu5CIvZhyXW3NVn9ulTY",
          authDomain: "reactnative-auth-69f42.firebaseapp.com",
          projectId: "reactnative-auth-69f42",
          storageBucket: "reactnative-auth-69f42.appspot.com",
          messagingSenderId: "957064025985",
          appId: "1:957064025985:web:d7778ffb24bfd2ddc8fa80"
        };
        
        
        app = firebase.initializeApp(firebaseConfig)
        

        // To select data from firebase every time data has changed !
        firebase.database().ref('coords').on('value', (data) => {
            console.log(data.toJSON());
        })

        // To Await 5 seconds to insert a new user
        setTimeout(() => {
            firebase.database().ref('coords/location').set(
                {
                    location: 'bombay',
                    latitude: 19.0760,
                    longitude: 73.8777
                }
            ).then(() => {
                console.log('INSERTED !');
                
            }).catch((error) => {
                console.log(error);
            });
        }, 1000);

        // To Update a user
        firebase.database().ref('coords/location').update({
            location: 'banglore'
        });

        // To Remove a user
        firebase.database().ref('users/004').remove();

    }

    render() {
        return (
            <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Welcome To ------
                    {'\n'}Our Google Firebase Database !
                </Text>
            </View>
        )
    }
}

export default App;