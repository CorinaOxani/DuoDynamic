import React, {useState, useEffect} from 'react';
import { StyleSheet, Alert, View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { iconStyles } from '../styles/icon';
import { proiecteStyles } from '../styles/proiecte';
import { styles } from '../styles/button';
import { footerStyles } from '../styles/footer_header';
import { separatorStyles } from '../styles/separator';
import { containerStyles } from '../styles/container';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import moment from 'moment';

function ProiecteScreen({ route, navigation }) {
   const userInfo = route.params?.userInfo;
   const [projects, setProjects] = useState([]);
   const [refreshProjects, setRefreshProjects] = useState(false);
   const [noProjectsMessage, setNoProjectsMessage] = useState('');

   useEffect(() => {
    console.log("UserInfo in ProiecteScreen:", userInfo); // Verifică structura lui userInfo
    fetchProjects();
  }, [refreshProjects]);

  const fetchProjects = async () => {
    try {
      console.log("Fetching projects...");
      const response = await fetch('http://10.0.2.2:5000/getProjects');
      const json = await response.json();
      console.log("Projects fetched:", json); // Verifică structura răspunsului

      if (response.ok) {
        if (userInfo && userInfo.userType === 'organization') {
          const filteredProjects = json.data.filter(project => project.organization === userInfo.name);
          console.log("Filtered Projects for organization:", filteredProjects); // Verifică proiectele filtrate

          if (filteredProjects.length === 0) {
            setNoProjectsMessage(`There is no project added for organization ${userInfo.name}`);
          } else {
            setNoProjectsMessage('');
          }
          setProjects(filteredProjects);
        } else {
          setProjects(json.data);
        }
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const applyToProject = async (projectId) => {
    const userId = userInfo._id;

    const alreadyApplied = userInfo.personalProjects.some(p => p.projectId === projectId);
    if (alreadyApplied) {
      Alert.alert("Already Applied", "You have already applied to this project.");
      return;
    }

    try {
      const project = projects.find(proj => proj._id === projectId);
      const currentDate = new Date();
      const projectDate = new Date(project.startDate);

      if (projectDate < currentDate) {
        Alert.alert("Project Date Over", "You cannot apply to projects with past start date.");
        return;
      }

      const response = await axios.post(`http://10.0.2.2:5000/apply/${projectId}`, { userId });
      const data = response.data;

      if (data.success) {
        Alert.alert("Success", "You have successfully applied to the project.");
        setRefreshProjects(true);
      } else {
        throw new Error(data.message || "Failed to apply to the project");
      }
    } catch (error) {
      console.error('Error applying to project:', error);
      Alert.alert("Error", error.message || "An error occurred while applying to the project.");
    }
  };

   return (
     <View style={containerStyles.container}>
       <View style={footerStyles.header}>
        {userInfo && userInfo.userType === 'organization' && (
          <TouchableOpacity onPress={() => navigation.navigate("AdaugaProiect", { userInfo })}>
            <Image
              source={require('../photo/add-button.png')}
              style={iconStyles.antetIcon}
            />
          </TouchableOpacity>
        )}
        <Text style={footerStyles.headerTitle}>Proiecte</Text>
        <TouchableOpacity >
          <Image
            source={require('../photo/menu.png')}
            style={iconStyles.antetIcon}
          />
        </TouchableOpacity>
       </View>
       <TextInput style={footerStyles.searchBar} placeholder="Search" />
       {projects.length === 0 && noProjectsMessage ? (
         <View style={proiecteStyles.noProjectsContainer}>
           <Text style={proiecteStyles.noProjectsText}>{noProjectsMessage}</Text>
         </View>
       ) : (
         <FlatList
           data={projects}
           keyExtractor={(item) => item._id.toString()}
           renderItem={({ item }) => (
             <View>
               <Image
                 style={proiecteStyles.image}
                 source={item.image === '' ? require('../photo/no_photo.jpg') : { uri: item.image }}
               />
               <Text style={proiecteStyles.eventTitle}>{item.projectName}</Text>
               <View style={separatorStyles.separator} />
               <View>
                 <Text style={proiecteStyles.text}>Description:</Text>
                 <Text style={proiecteStyles.descriptionText}>{item.description}</Text>
               </View>
               <View style={separatorStyles.separator} />
               <View style={proiecteStyles.AvailableContainer}>
                 <Text style={proiecteStyles.text}>Available spots: {item.availableSpots}/{item.spots}</Text>
                 {userInfo.userType !== 'organization' && ( // Adaugă această verificare
                   <TouchableOpacity onPress={() => applyToProject(item._id)} style={styles.button}>
                     <Text style={proiecteStyles.applayText}>APPLY</Text>
                   </TouchableOpacity>
                 )}
               </View>
               <View style={separatorStyles.separator} />
               <View style={proiecteStyles.infoContainer}>
                 <Text style={proiecteStyles.text}>Info:</Text>
                 <Text style={proiecteStyles.infoText}>Event organizer: {item.organizer}</Text>
                 <Text style={proiecteStyles.infoText}>Email: {item.email}</Text>
                 <Text style={proiecteStyles.infoText}>Phone: {item.mobile}</Text>
                 <Text style={proiecteStyles.infoText}>Organization: {item.organization}</Text>
                 <Text style={proiecteStyles.infoText}>Country: {item.country}</Text>
                 <Text style={proiecteStyles.infoText}>Address: {item.address}</Text>
                 <Text style={proiecteStyles.infoText}>Start Date: {moment(item.startDate).format('MMMM Do YYYY')}</Text>
               </View>
               <View style={separatorStyles.separator} />
             </View>
           )}
           style={proiecteStyles.content}
         />
       )}
       <View style={footerStyles.footer}>
         <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Profile", { userInfo: userInfo })}>
           <Image
             source={require('../photo/home_circle.png')}
             style={iconStyles.footerIcon}
           />
           <Text style={proiecteStyles.footerText}>Profile</Text>
         </TouchableOpacity>
         <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Organizations", { userInfo: userInfo })}>
           <Image
             source={require('../photo/om_circle.png')}
             style={iconStyles.footerIcon}
           />
           <Text style={proiecteStyles.footerText}>All Users</Text>
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
