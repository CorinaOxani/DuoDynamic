import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert, StyleSheet, ScrollView, Switch } from 'react-native';
import { styles } from '../styles/button';
import { logoStyles } from '../styles/logo';
import { containerStyles } from '../styles/container';
import { userProfileStyles } from '../styles/userProfile';
import { login_page_styles } from '../styles/login_page';
import { linkStyles } from '../styles/link';
import { proiecteStyles} from '../styles/proiecte';
import ImagePicker from 'react-native-image-crop-picker';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [image,setImage]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const selectPhoto=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64:true,
      freeStyleCropEnabled:true
    }).then(image => {
      console.log(image);
      const data=`data:${image.mime};base64,${image.data}`
      setImage(data);

    });
  }
  async function handleSubmit() {
    console.log('Submitting registration');
    if (!name || !email || !mobile || !password || !country || !city || !profileDescription || !image) {
      console.log('Validation failed: Missing fields');
      showAlert('All fields are required.');
      return;
    }
    if (!/^[A-Z]/.test(name)) {
      console.log('Validation failed: Name must start with a capital letter');
      showAlert('Name must start with a capital letter.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log('Validation failed: Invalid email format');
      showAlert('Email must contain @ and a domain.');
      return;
    }
    if (profileDescription.length < 35) {
      console.log('Validation failed: Profile description too short');
      showAlert('Profile description must be at least 35 characters long.');
      return;
    }

    setIsLoading(true);

    const userData = {
      name,
      email,
      mobile,
      password,
      country,
      city,
      profileDescription,
      image,
    };

    try {
      const response = await fetch('http://10.0.2.2:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Registration successful');
        setSuccessMessage('Registration successful. Redirecting to login...');
        setTimeout(() => {
          props.navigation.navigate("Login");
        }, 3000);  // Wait for 3 seconds before navigating
      } else {
        console.log('Registration failed: Server returned non-ok status');
        showAlert('Registration failed. Please try again.');
      }
    } catch (apiError) {
      console.error('Error:', apiError);
      showAlert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function showAlert(message) {
    Alert.alert("Registration Error", message, [
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

  if (successMessage) {
    return (
      <View style={containerStyles.successContainer}>
        <Text style={containerStyles.successText}>{successMessage}</Text>
      </View>
    );
  }

  return (
    <View >
      <ScrollView >
      <View style={containerStyles.container}>
        <Image source={require('../photo/logo.jpg')} style={logoStyles.logo} />
        <Text style={login_page_styles.welcomeText}>Let's get started!</Text>
        <TextInput style={login_page_styles.input} onChangeText={setName} value={name} placeholder="Name" />
        <TextInput style={login_page_styles.input} onChangeText={setEmail} value={email} placeholder="Email" keyboardType="email-address" />
        <TextInput style={login_page_styles.input} onChangeText={setMobile} value={mobile} placeholder="Mobile" keyboardType="numeric" />
        <TextInput
        style={login_page_styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={!passwordVisible}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Text>Unhide Password</Text>
        <Switch
          value={passwordVisible}
          onValueChange={(newValue) => setPasswordVisible(newValue)}
        />
        </View>
        <TextInput style={login_page_styles.input} onChangeText={setCountry} value={country} placeholder="Country" />
        <TextInput style={login_page_styles.input} onChangeText={setCity} value={city} placeholder="City" />
        <TextInput style={login_page_styles.input} onChangeText={setProfileDescription} value={profileDescription} placeholder="Tell us about yourself (min 35 characters)"/>
        <Text style={login_page_styles.welcomeText}>Click on icon to select an avatar </Text>
        <TouchableOpacity onPress={selectPhoto}>
          <Image
            style={userProfileStyles.imageAvatar}
            source={image === '' ? require('../photo/profile-icon.png') : { uri: image }}
          />
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <View style={linkStyles.signUpContainer}>
          <Text style={linkStyles.signUpText}>
            You already have an account?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={linkStyles.signUpButtonText}>Sign In!</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
  
};


export default RegisterScreen;
