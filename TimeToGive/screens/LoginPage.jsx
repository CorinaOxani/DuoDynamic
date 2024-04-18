import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, TextInput, Button, Text, Switch, Alert } from 'react-native';
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles } from '../styles/logo';
import { containerStyles } from '../styles/container';
import { login_page_styles } from '../styles/login_page';
import { footerStyles } from '../styles/FooterText';
import { linkStyles } from '../styles/link';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOrganization, setIsOrganization] = useState(false);
  const [orgID, setOrgID] = useState('');
  const [userInfo, setUserInfo] = useState(null);  // Stare nouă pentru stocarea informațiilor utilizatorului

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Email and password are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showAlert('Email must contain @ and a domain.');
      return;
    }
    if (isOrganization && !orgID) {
      showAlert('RO/CUI is required for organizations.');
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = {
        email,
        password,
        ...(isOrganization && { orgID })
      };

      const response = await fetch('http://10.0.2.2:5000/login-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const json = await response.json();

      if (response.ok) {
        console.log('Login successful:', json);
        setUserInfo(json); // Salvarea informațiilor utilizatorului
        props.navigation.navigate("Profile", { userInfo: json }); // Trimiterea informațiilor utilizatorului la următoarea pagină
      } else {
        showAlert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  function showAlert(message) {
    Alert.alert("Login Error", message, [
      { text: "OK" }
    ]);
  }

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Text>Are you logging in as an organization?</Text>
        <Switch
          value={isOrganization}
          onValueChange={(newValue) => setIsOrganization(newValue)}
        />
      </View>
      {isOrganization && (
        <TextInput
          style={login_page_styles.input}
          onChangeText={setOrgID}
          value={orgID}
          placeholder="RO/CUI"
        />
      )}
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
