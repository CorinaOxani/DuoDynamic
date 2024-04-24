import React, {useState, useEffect} from 'react';
import { StyleSheet, Alert, View, Text, Image, TextInput, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import { iconStyles} from '../styles/icon';
import { proiecteStyles} from '../styles/proiecte';
import { styles } from '../styles/button';
import { footerStyles} from '../styles/footer_header';
import { separatorStyles} from '../styles/separator';
import { containerStyles} from '../styles/container';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import moment from 'moment';

function ProiecteScreen({ route, navigation }){
   const userInfo = route.params?.userInfo;
   const [projects, setProjects] = useState([]);

const fetchProjects = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/getProjects');
      const json = await response.json();
      if (response.ok) {
        setProjects(json.data); // Asumăm că 'data' este array-ul cu proiecte
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

const applyToProject = () => {
  // Presupunând că ai `projectId` și `userId` disponibile în componentă
  const payload = {
    projectId: 'id-ul-proiectului',
    userId: 'id-ul-utilizatorului'
  };

  axios.post('http://192.168.1.115:5000/applyToProject', payload)
    .then(response => {
      // Logica de succes - actualizează interfața utilizatorului
      Alert.alert(response.data.message);
      // Poți de asemenea să actualizezi starea locală pentru a reflecta schimbările
    })
    .catch(error => {
      // Logica de eroare
      Alert.alert('Error', error.response.data.message);
    });
};

  useEffect(() => {
    fetchProjects();
  }, []);

   return (
     <View style={containerStyles.container}>
       <View style={footerStyles.header}>
         <TouchableOpacity onPress={() => navigation.navigate("AdaugaProiect")}>
                <Image
                      source={require('../photo/add-button.png')}
                      style={iconStyles.antetIcon}
                />
         </TouchableOpacity>
         <Text style={footerStyles.headerTitle}>Proiecte</Text>
         <TouchableOpacity >
                <Image
                      source={require('../photo/menu.png')}
                      style={iconStyles.antetIcon}
                />
         </TouchableOpacity>
       </View>
       <TextInput style={footerStyles.searchBar} placeholder="Search" />


          <FlatList
              data={projects}
              keyExtractor={(item) => item._id.toString()} // Presupunem că fiecare proiect are un _id unic
              renderItem={({ item }) => (
                <View>

         <Image
                        style={proiecteStyles.image}
                  source={item.image === '' ? require('../photo/no_photo.jpg') : { uri: item.image }}
                      />
         <Text style={proiecteStyles.eventTitle}>{item.projectName}</Text>
          <View style={separatorStyles.separator} />
         <View >
           <Text style={proiecteStyles.text}>Description:</Text>
           <Text style={proiecteStyles.descriptionText}>{item.description}</Text>
         </View>

         <View style={separatorStyles.separator} />
         <View style={proiecteStyles.AvailableContainer}>

         <Text style={proiecteStyles.text}>Available spots: {item.spots}/{item.spots}</Text>
         <TouchableOpacity onPress={applyToProject} style={styles.button}>
           <Text style={proiecteStyles.applayText}>APPLY</Text>
         </TouchableOpacity>
         </View>
          <View style={separatorStyles.separator} />


         <View style={proiecteStyles.infoContainer}>
          <Text style={proiecteStyles.text}>Info:</Text>
           <Text  style={proiecteStyles.infoText}>Event organizer: {item.organizer}</Text>
           <Text  style={proiecteStyles.infoText}>Email: {item.email}</Text>
           <Text  style={proiecteStyles.infoText}>Phone: {item.mobile}</Text>
           <Text  style={proiecteStyles.infoText}>Organization: {item.organization}</Text>
           <Text  style={proiecteStyles.infoText}>Country: {item.country}</Text>
           <Text  style={proiecteStyles.infoText}>Address: {item.address}</Text>
           <Text  style={proiecteStyles.infoText}>Start Date: {moment(item.startDate).format('MMMM Do YYYY')}</Text>
           </View>
 <View style={separatorStyles.separator} />
         </View>
   )}
        style={proiecteStyles.content}
      />

       <View style={footerStyles.footer}>

               <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Profile", { userInfo: userInfo })} >
                      <Image
                            source={require('../photo/om_circle.png')}
                            style={iconStyles.footerIcon}
                      />
                      <Text style={proiecteStyles.footerText}>Profile</Text>
               </TouchableOpacity>



         <TouchableOpacity style={proiecteStyles.row}  onPress={() => navigation.navigate("Organizations", { userInfo: userInfo })}>
                <Image
                      source={require('../photo/home_circle.png')}
                      style={iconStyles.footerIcon}
                />
                <Text style={proiecteStyles.footerText}>Organizations</Text>
         </TouchableOpacity>


         <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Proiecte", { userInfo: userInfo })}>
                <Image
                      source={require('../photo/leaf_circle.png')}
                      style={iconStyles.footerIcon}
                />
                <Text style={proiecteStyles.footerText}>Projects</Text>
          </TouchableOpacity>
       </View>

     </View>
   );
 };



export default ProiecteScreen;
