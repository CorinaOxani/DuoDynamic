import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity,ActivityIndicator, TextInput, Button, Text } from 'react-native';
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles} from '../styles/logo';
import { containerStyles} from '../styles/container';
import {login_page_styles} from '../styles/login_page';
import { footerStyles} from '../styles/FooterText';
import { linkStyles} from '../styles/link';

function LoginScreen(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Declaration of isLoading state


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email must contain @ and a domain.');
      return;
    }

    setError('');
    setIsLoading(true); // Start loading process

    try {
      const response = await fetch('http://10.0.2.2:5000/login-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.ok) {
        console.log('Login successful:', json);
        props.navigation.navigate("Proiecte"); //trebuie modificat aici cu screen ul home pentru un user logat
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // End loading process
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
              <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
                <Text style={linkStyles.signUpButtonText}>Sign Up!</Text>
              </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;
