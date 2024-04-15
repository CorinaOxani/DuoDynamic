import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { iconStyles} from '../styles/icon';
import { proiecteStyles} from '../styles/proiecte';
import { styles } from '../styles/button';
import { footerStyles} from '../styles/footer_header';
import { separatorStyles} from '../styles/separator';
import { containerStyles} from '../styles/container';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

function ProiecteScreen(props){

const [proiecte, setProiecte] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://192.168.1.115:5000/getProjects');
        setProiecte(response.data);
      } catch (error) {
        console.error('Error in taking over the projects from the database:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <View style={containerStyles.container}>
      <View style={footerStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate("AdaugaProiect")}>
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

     <ScrollView style={proiecteStyles.content}>
       {Array.isArray(proiecte) && proiecte.map((proiect, index) => (
         <View key={proiect._id} style={{ ...proiecteStyles.projectContainer }}>
          {/*  <Image
             source={proiect.image ? { uri: proiect.image } : require('../photo/no_photo.jpg')}
             style={proiecteStyles.image}
           /> */}
           <Text style={proiecteStyles.eventTitle}>{proiect.projectName}</Text>

           <View style={separatorStyles.separator} />

           <View>
             <Text style={proiecteStyles.text}>Description:</Text>
             <Text style={proiecteStyles.descriptionText}>{proiect.description}</Text>
           </View>

           <View style={separatorStyles.separator} />

           <View style={proiecteStyles.infoContainer}>
             <Text style={proiecteStyles.infoText}>Event organizer: {proiect.organizer}</Text>
             <Text style={proiecteStyles.infoText}>Email: {proiect.email}</Text>
             <Text style={proiecteStyles.infoText}>Phone: {proiect.mobile}</Text>
             <Text style={proiecteStyles.infoText}>Organization: {proiect.organization}</Text>
             <Text style={proiecteStyles.infoText}>Country: {proiect.country}</Text>
             <Text style={proiecteStyles.infoText}>Address: {proiect.address}</Text>
             <Text style={proiecteStyles.infoText}>StartDate: {proiect.startDate}</Text>
           </View>

           <View style={separatorStyles.separator} />s

           <TouchableOpacity style={styles.button}>
             <Text style={proiecteStyles.applayText}>APPLY</Text>
           </TouchableOpacity>

           <View style={separatorStyles.separator} />
         </View>
       ))}
     </ScrollView>


      <View style={footerStyles.footer}>

              <TouchableOpacity style={proiecteStyles.row} onPress={() => props.navigation.navigate("Profile")} >
                     <Image
                           source={require('../photo/om_circle.png')}
                           style={iconStyles.footerIcon}
                     />
                     <Text style={proiecteStyles.footerText}>Profile</Text>
              </TouchableOpacity>



        <TouchableOpacity style={proiecteStyles.row}  onPress={() => props.navigation.navigate("Organizations")}>
               <Image
                     source={require('../photo/home_circle.png')}
                     style={iconStyles.footerIcon}
               />
               <Text style={proiecteStyles.footerText}>Organizations</Text>
        </TouchableOpacity>


        <TouchableOpacity style={proiecteStyles.row} onPress={() => props.navigation.navigate("Proiecte")}>
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
