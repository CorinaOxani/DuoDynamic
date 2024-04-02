import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/button';
import { logoStyles } from '../styles/logo';
import { containerStyles } from '../styles/container';
import { login_page_styles } from '../styles/login_page';
import { linkStyles } from '../styles/link';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  
  async function handleSubmit() {
    // Verifică dacă toate câmpurile sunt completate
    if (!name || !email || !mobile || !password) {
      setError('All fields are required.'); // Setează mesajul de eroare
      return; // Opriți executarea ulterioară a funcției
    }
  
    // Verifica dacă numele începe cu o literă mare
    if (!/^[A-Z]/.test(name)) {
      setError('Name must start with a capital letter.');
      return;
    }
  
    // Verifică formatul email-ului
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email must contain @ and a domain.');
      return;
    }
  
  
    setError(''); // Resetează mesajul de eroare dacă toate câmpurile sunt completate
  
    const userData = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };
  
    try {
      const response = await fetch('http://10.0.2.2:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      console.log(data);
      // Aici puteți adăuga logica după succes, de exemplu, navigarea către o altă pagină
    } catch (error) {
      console.error('Error:', error);
    }
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      {/* componenta de eroare */}
      {error ? <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>{error}</Text> : null}
      <View style={linkStyles.signUpContainer}>
        <Text style={linkStyles.signUpText}>
          You already have an account?
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={linkStyles.signUpButtonText}>Sign In!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
};

export default RegisterScreen;
