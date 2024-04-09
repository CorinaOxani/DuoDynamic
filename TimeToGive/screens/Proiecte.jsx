import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { iconStyles} from '../styles/icon';
import { proiecteStyles} from '../styles/proiecte';
import { styles } from '../styles/button';
import { footerStyles} from '../styles/footer_header';
import { separatorStyles} from '../styles/separator';
import { containerStyles} from '../styles/container';
import ImagePicker from 'react-native-image-crop-picker';

function ProiecteScreen(props){
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
        <Image
          source={require('../photo/no_photo.jpg')}
          style={proiecteStyles.image}
        />
        <Text style={proiecteStyles.eventTitle}>Forest Clean</Text>
         <View style={separatorStyles.separator} />
        <View >
          <Text style={proiecteStyles.text}>Description:</Text>
          <Text style={proiecteStyles.descriptionText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</Text>
        </View>

        <View style={separatorStyles.separator} />
        <View style={proiecteStyles.AvailableContainer}>
        <Text style={proiecteStyles.text}>Available spots: 3/27</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={proiecteStyles.applayText}>APPLY</Text>
        </TouchableOpacity>
        </View>
         <View style={separatorStyles.separator} />


        <View style={proiecteStyles.infoContainer}>
         <Text style={proiecteStyles.text}>Info:</Text>
          <Text  style={proiecteStyles.infoText}>Event organizer: </Text>
          <Text  style={proiecteStyles.infoText}>Email: </Text>
          <Text  style={proiecteStyles.infoText}>Phone: </Text>
          <Text  style={proiecteStyles.infoText}>Organization: </Text>
          <Text  style={proiecteStyles.infoText}>Country: </Text>
          <Text  style={proiecteStyles.infoText}>Region: </Text>
          <Text  style={proiecteStyles.infoText}>StartDate: </Text>
<View style={separatorStyles.separator} />
        </View>
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
