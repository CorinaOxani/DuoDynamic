import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Button, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles} from '../styles/logo';
import { containerStyles} from '../styles/container';
import {login_page_styles} from '../styles/login_page';
import { footerStyles} from '../styles/FooterText';
import { linkStyles} from '../styles/link';
import { proiecteStyles} from '../styles/proiecte';

 function AdaugaProiectScreen(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setProjectName] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Declaration of isLoading state
  // Adaugă restul variabilelor de stare pentru celelalte câmpuri

  const pickImage = async () => {
    // Permite utilizatorului să selecteze o imagine din galeria telefonului
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProjectImage(result.uri);
    }
  };

  async function handleSubmit() {
    if (!name || !description || !organizer || !email || !mobile || !organization || !country || !region || !startDate) {
      setError('All fields are required.');
      return;
    }
    if (!/^[A-Z]/.test(name) || !/^[A-Z]/.test(organizer) || !/^[A-Z]/.test(organization)) {
      setError('Name must start with a capital letter.');
      return;
    }

        if (!/^[A-Z]/.test(Country) ) {
          setError('Country must start with a capital letter.');
          return;
        }
         if (!/^[A-Z]/.test(Region) ) {
           setError('Region must start with a capital letter.');
           return;
         }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email must contain @ and a domain.');
      return;
    }

    setError('');
    setIsLoading(true); // Start loading process

    const projectData = {
      name,
      description,
      organizer,
      email,
      mobile,
      organization,
      country,
      region,
      startDate,
    };

    try {
      const response = await fetch('http://10.0.2.2:5000/proiecte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        props.navigation.navigate("Proiecte");
      } else {
        setError('Fail. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // End loading process
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || startDate;
      setShowDatePicker(Platform.OS === 'ios'); // pe iOS, ai putea să vrei să afișezi picker-ul constant
      setStartDate(currentDate);
    };
  // Funcție pentru a formata data într-un mod lizibil pentru afișare
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={containerStyles.container}>
<ScrollView style={{marginTop: 10, marginBottom:10}}>
    <TextInput
            style={login_page_styles.input}
            onChangeText={setProjectName}
            value={name}
            placeholder="Project Name"

          />
    <TextInput
            style={login_page_styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"

          />
        <TextInput
                style={login_page_styles.input}
                onChangeText={setOrganizer}
                value={organizer}
                placeholder="Organizer Name"

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
                onChangeText={setOrganization}
                value={organization}
                placeholder="Organization"

              />
        <TextInput
                style={login_page_styles.input}
                onChangeText={setCountry}
                value={country}
                placeholder="Country"

              />
        <TextInput
                style={login_page_styles.input}
                onChangeText={setRegion}
                value={region}
                placeholder="Region"

              />
        <TextInput
                style={login_page_styles.input}
                onChangeText={setCountry}
                value={country}
                placeholder="Country"

              />

       <TouchableOpacity

         style={styles.button}
         onPress={() => setShowDatePicker(true)}>
         <Text style={styles.buttonText}>PICK DATE</Text>
       </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Afișează data selectată sub buton */}
      <Text style={styles.buttonText}>
        Date: {formatDate(startDate)}
      </Text>

</ScrollView >

           <View style={{ justifyContent: 'space-around', flexDirection: 'row'}}>
           <View style={{right:'60%'}}>
             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
               <Text style={styles.buttonText}>SUBMIT</Text>
             </TouchableOpacity>
           </View>
           <View style={{left:'60%'}}>
             <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Proiecte")}>
               <Text style={styles.buttonText}>BACK</Text>
             </TouchableOpacity>
           </View>
</View>
    </View>
  );
};


export default AdaugaProiectScreen;