import React, { useState, useEffect } from 'react';
import { View, Alert, Image, TextInput, TouchableOpacity, Button, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles} from '../styles/logo';
import { containerStyles} from '../styles/container';
import {login_page_styles} from '../styles/login_page';
import { footerStyles} from '../styles/FooterText';
import { linkStyles} from '../styles/link';
import { proiecteStyles} from '../styles/proiecte';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

 function AdaugaProiectScreen({ route, navigation }) {
 const userInfo = route.params?.userInfo;
  const [startDate, setStartDate] = useState(new Date());
   const [dateVerify, setDateVerify]=useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
   const [organizationName, setOrganizationName] = useState('');

  const [name, setProjectName] = useState(''); //aici tin variabila
  const [nameVerify, setNameVerify]=useState(false); //aici o verific daca corespunde sau nu formatului pe care il vreau

  const [spots, setSpots] = useState('');
   const [spotsVerify, setSpotsVerify]=useState(false);

  const [description, setDescription] = useState('');
   const [descriptionVerify, setDescriptionVerify]=useState(false);

  const [organizer, setOrganizer] = useState('');
  const [organizerVerify, setOrganizerVerify]=useState(false);

  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify]=useState(false);

  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify]=useState(false);

  const [organization, setOrganization] = useState('');
  const [organizationVerify, setOrganizationVerify]=useState(false);

  const [country, setCountry] = useState('');
  const [countryVerify, setCountryVerify]=useState(false);

  const [address, setAddress] = useState('');
  const [addressVerify, setAddressVerify]=useState(false);

  const [isLoading, setIsLoading] = useState(false); // Declaration of isLoading state

//   useEffect(() => {
//     const fetchOrganizationDetails = async () => {
//       try {
//
//         const response = await axios.get('http://10.0.2.2:5000/current-organization');  console.log("######");
//         setOrganizationName(response.data.orgName); // Actualizează conform structurii răspunsului tău
//       } catch (error) {
//         console.error('Failed to fetch organization details:', error);
//         Alert.alert("Error", "Failed to load organization data.");
//       }
//     };
//
//     fetchOrganizationDetails();
//   }, []);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        if (!userInfo || !userInfo._id) {
          throw new Error('User information is missing.');
        }

        const oID = userInfo._id; // Obține `_id` din detaliile utilizatorului
        console.log('Fetched orgID:', oID); // Log orgID

        const response = await axios.get(`http://10.0.2.2:5000/current-organization?_id=${oID}`);
        console.log('Organization response:', response.data);
        if (response.data && response.data.orgName) {
          setOrganizationName(response.data.orgName);
          setOrganizationVerify(true); // Setează organizationVerify la true
          console.log('Organization name set:', response.data.orgName);
        } else {
          console.log('Organization name not found in response:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch organization details:', error.message);
        console.error('Error details:', error);
        Alert.alert("Error", "Failed to load organization data.");
      }
    };

    fetchOrganizationDetails();
  }, [userInfo]);

//functie adaugare poza
const [image,setImage]=useState('')
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

const updateProject=()=>{
const formdata={
  projectName:projectName,
  spots,
  description,
  organizer,
  email,
  mobile,
  organization,
  country,
  address,
  startDate,
  image
}
axios.post("http://192.168.1.115:5000/update-project",formdata).then(res=>console.log(res))
}

//functie care adauga datele in baza de date cand dai submit
 async function handleSubmit() {
 const projectData={ projectName:name, spots, description, organizer, email, mobile, organization:organizationName, country, address, startDate, image}  ;

 if(nameVerify && spotsVerify && descriptionVerify && organizerVerify && emailVerify && mobileVerify && organizationVerify && countryVerify && addressVerify){
    axios.post("http://192.168.100.34:5000/addProject", projectData)
    .then(res=>{
    console.log(res.data);
        if(res.data.status=='ok')
        {
            Alert.alert("Project added successfully!")
        }else{
            Alert.alert(JSON.stringify(res.data));
        }

    })
    .catch(e=>console.log(e));
 }
 else
 {
    Alert.alert("Fill mandatory details!")
 }
}

function handleName(e)
{
 const nameP=e.nativeEvent.text;
 setProjectName(nameP);
 setNameVerify(false);
 if (nameP.length>1)
 {
    setNameVerify(true);
 }
}

function handleSpots(e)
{
 const spotsP=e.nativeEvent.text;
 setSpots(spotsP);
 setSpotsVerify(false);
 if (parseInt(spotsP, 10) >= 5)
 {
    setSpotsVerify(true);
 }
}

function handleOrganization(e)
{
 const oP=e.nativeEvent.text;
 setOrganization(oP);
 setOrganizationVerify(false);
 if(oP.length>1)
 {
    setOrganizationVerify(true);
 }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function handleCountry(e)
{
 countryP=e.nativeEvent.text;
 const capitalized = capitalizeFirstLetter(countryP);
 countryP=capitalized;
 setCountry(countryP);
 setCountryVerify(false);
 if(countryP=="Romania" || countryP=="Germany" || countryP=="Italy" || countryP=="Spain" || countryP=="Poland" || countryP=="Lower Countries" || countryP=="Belgium" || countryP=="Czech Republic" ||countryP=="Greece" || countryP=="Sweden" || countryP=="Portugal" || countryP=="Hungary" || countryP=="Austria" || countryP=="Bulgaria" || countryP=="Denmark" || countryP=="Finland" || countryP=="Slovakia" || countryP=="Ireland" || countryP=="Croatia" ||countryP=="Lithuania" || countryP=="Slovenia" || countryP=="Latvia" || countryP=="Estonia" || countryP=="Cyprus" || countryP=="Luxemburg" || countryP=="Malta" )
 {
    setCountryVerify(true);
 }
}

function handleAddress(e)
{
 const addressP=e.nativeEvent.text;
 setAddress(addressP);
 setAddressVerify(false);
 if(addressP.length>1)
 {
    setAddressVerify(true);
 }
}

function handleDescription(e)
{
 const descriptionP=e.nativeEvent.text;
 setDescription(descriptionP);
 setDescriptionVerify(false);
 if(descriptionP.length>15)
 {
    setDescriptionVerify(true);
 }
}

function handleOrganizer(e)
{
 const orgP=e.nativeEvent.text;
 setOrganizer(orgP);
 setOrganizerVerify(false);
 if(orgP.length>1)
 {
    setOrganizerVerify(true);
 }
}

function handleEmail(e)
{
 const emailP=e.nativeEvent.text;
 setEmail(emailP);
 setEmailVerify(false);
 if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(emailP))
 {
    setEmail(emailP);
    setEmailVerify(true);
 }
}

function handleMobile(e)
{
 const mobileP=e.nativeEvent.text;
 setMobile(mobileP);
 setMobileVerify(false);
 if(/0{1}7{1}[0-9]{8}/.test(mobileP))
 {
    setMobile(mobileP);
    setMobileVerify(true);
 }
}
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
    <View style={{paddingLeft: '5%', paddingRight:'5%', flex: 1,backgroundColor: '#fff',}}>
<ScrollView style={{marginTop: 10, marginBottom:10}}>
<View style={proiecteStyles.action}>
    <TextInput
            style={proiecteStyles.textInput}
            onChange={e=>handleName(e)}
            placeholder="Project Name"

          />
          {  name.length<1? null : nameVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
 </View>
 {  name.length<1? null : nameVerify ? null :(
 <Text style={{marginLeft:20, color:'red'}}> Name should be more than 1 character.</Text> )}

<View style={proiecteStyles.action}>
    <TextInput
            style={proiecteStyles.textInput}
            onChange={e=>handleSpots(e)}
            placeholder="Available Spots"
             keyboardType="numeric"

          />
          { spots== ''  ? null : spotsVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
 </View>
 {  spots== ''  ? null : spotsVerify ? null :(
 <Text style={{marginLeft:20, color:'red'}}> Introduce a spot  number. Spots number should be at least 5.</Text> )}

<View style={proiecteStyles.action}>
    <TextInput
            style={proiecteStyles.textInput}
            onChange={e=>handleDescription(e)}
            placeholder="Description"

          />
          { description.length<1? null : descriptionVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
 </View>
  { description.length<1? null : descriptionVerify ? null :(
<Text style={{marginLeft:20, color:'red'}}> Put a proper description, at least 15 characters!.</Text> )}

 <View style={proiecteStyles.action}>
        <TextInput
                style={proiecteStyles.textInput}
               onChange={e=>handleOrganizer(e)}
                placeholder="Organizer Name"

              />
              { organizer.length<1? null : organizerVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
 </View>
  { organizer.length<1? null : organizerVerify ? null :(
<Text style={{marginLeft:20, color:'red'}}> Organizer's name should be more than 1 characters.</Text> )}

 <View style={proiecteStyles.action}>
           <TextInput
            style={proiecteStyles.textInput}
             onChange={e=>handleEmail(e)}
             placeholder="Email"
           />
           { email.length<1? null : emailVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
 </View>
  { email.length<1? null : emailVerify ? null :(
<Text style={{marginLeft:20, color:'red'}}> Email should be something like yourName@email.com</Text> )}

 <View style={proiecteStyles.action}>
           <TextInput
             style={proiecteStyles.textInput}
             onChange={e=>handleMobile(e)}
             placeholder="Mobile"
             keyboardType="numeric"
           />
           { mobile.length<1? null : mobileVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
 </View>
  { mobile.length<1? null : mobileVerify ? null :(
<Text style={{marginLeft:20, color:'red'}}> Introduce a correct phone number!</Text> )}

<View style={proiecteStyles.action}>
  <TextInput
    style={proiecteStyles.textInput}
    value={organizationName} // Utilizează state-ul pentru a seta valoarea
    placeholder="Organization"
    editable={false}
  />
</View>

  <View style={proiecteStyles.action}>
        <TextInput
                style={proiecteStyles.textInput}
                onChange={e=>handleCountry(e)}
                placeholder="Country"

              />
              { country.length<1? null : countryVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
  </View>
   { country.length<1? null : countryVerify ? null :(
<Text style={{marginLeft:20, color:'red'}}> Country should be part of UE.</Text> )}

  <View style={proiecteStyles.action}>
        <TextInput
               style={proiecteStyles.textInput}
                onChange={e=>handleAddress(e)}
                placeholder="Address"

              />
              { address.length<1? null : addressVerify ?( <Image source={require('../photo/yes.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>) : (<Image source={require('../photo/circle.png')}style={{height:15, width:15, flexDirection: 'row', marginTop:6,}}/>)}
</View>
 { address.length<1? null : addressVerify ? null :(
<Text style={{marginLeft:20, color:'red'}}> Address should be more than 1 characters.</Text> )}

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

      <TouchableOpacity onPress={()=>selectPhoto()}>
              <Image
                style={proiecteStyles.image}
          source={image === '' ? require('../photo/no_photo.jpg') : { uri: image }}
              />
      </TouchableOpacity>

</ScrollView >

           <View style={{ justifyContent: 'space-around', flexDirection: 'row'}}>
           <View style={{right:'60%'}}>
             <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
               <Text style={styles.buttonText}>SUBMIT</Text>
             </TouchableOpacity>
           </View>
           <View style={{left:'60%'}}>
             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Proiecte", { userInfo: userInfo })}>
               <Text style={styles.buttonText}>BACK</Text>
             </TouchableOpacity>
           </View>
</View>
    </View>
  );
};


export default AdaugaProiectScreen;