import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Button, Text } from 'react-native';
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles} from '../styles/logo';
import { containerStyles} from '../styles/container';
import {login_page_styles} from '../styles/login_page';
import { footerStyles} from '../styles/FooterText';
import { linkStyles} from '../styles/link';

function LoginScreen(props){
console.log(props);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // logica de autentificare
    console.log('Email:', email);
    console.log('Password:', password);
    props.navigation.navigate("Login");
  };

 const handleSignUp = () => {
    // logica de a merge spre inregistrare daca nu ai un cont
    console.log('Navigating to Sign Up screen');
  };
  return (
    <View style={containerStyles.container}>
      <Image
            source={require('../photo/logo.jpg')}
            style={logoStyles.logo}
      />
      <Text style={login_page_styles.welcomeText}>Welcome back!</Text>
      <TextInput
        style={login_page_styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={login_page_styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <View>
       <TouchableOpacity style={styles.button} onPress={handleLogin}>
               <Text style={styles.buttonText}>LOGIN</Text>
             </TouchableOpacity>
      </View>
       <View style={linkStyles.signUpContainer}>
              <Text style={linkStyles.signUpText}>
                If you don't have an account,
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={linkStyles.signUpButtonText} onPress={()=>props.navigation.navigate("Register")}>Sign Up!</Text>
              </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;
