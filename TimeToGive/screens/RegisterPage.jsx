import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles} from '../styles/logo';
import { containerStyles} from '../styles/container';
import {login_page_styles} from '../styles/login_page';
import { footerStyles} from '../styles/FooterText';
import { linkStyles} from '../styles/link';
import axios from 'axios';

const RegisterScreen = (props) => {
  console.log(props);
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);

  function handleSubmit(){
    const userData={
      name: name,
      email,
      mobile,
      password
    };
    axios
    .post("http://192.168.1.107:5001/register", userData)
    .then((res)=>console.log(res.data))
    .catch(e => console.log(e));
  }

  return (
    <View style={containerStyles.container}>
      <Image
       source={require('../photo/logo.jpg')}
                   style={logoStyles.logo}
      />
      <Text style={login_page_styles.welcomeText}>Let's get started!</Text>
      <TextInput
        style={login_page_styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={login_page_styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={login_page_styles.input}
        onChangeText={setMobile}
        value={mobile}
        placeholder="Mobile"
        keyboardType="numeric"
      />
      <TextInput
        style={login_page_styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <View>
      <TouchableOpacity style={styles.button} onPress={() =>handleSubmit()}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      </View>

       <View style={linkStyles.signUpContainer}>
         <Text style={linkStyles.signUpText}>
             You already have an account?
         </Text>
         <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
            <Text style={linkStyles.signUpButtonText}>Sign In!</Text>
         </TouchableOpacity>
            </View>
    </View>
  );
};

export default RegisterScreen;
