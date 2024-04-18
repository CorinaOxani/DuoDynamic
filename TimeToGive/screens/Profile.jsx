import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { iconStyles } from '../styles/icon';
import { proiecteStyles } from '../styles/proiecte';
import { footerStyles } from '../styles/footer_header';
import { separatorStyles } from '../styles/separator';
import { containerStyles } from '../styles/container';
import { styles } from '../styles/button';

function ProfileScreen({ route, navigation }) {
  const userInfo = route.params?.userInfo;  
  const [editedDescription, setEditedDescription] = useState(route.params?.userInfo.profileDescription || '');
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false);

  const updateDescription = () => {
    const updatedUserInfo = {
      ...route.params.userInfo,
      profileDescription: editedDescription
    };
    
    console.log('Sending updated user info:', updatedUserInfo); // Adaugă acest console.log pentru a afișa informațiile actualizate înainte de trimiterea către server
  
    fetch(`http://10.0.2.2:5000/update-description/${userInfo.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileDescription: editedDescription }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Profile description updated successfully:', data);
      setIsDescriptionEdited(false); 
    })
    .catch(error => {
      console.error('There was a problem updating the profile description:', error);
    });
  };
  

  const handleDescriptionChange = (text) => {
    setEditedDescription(text);
    setIsDescriptionEdited(true); // Marcam descrierea ca editată
  };
  
  return (
    <View style={containerStyles.container}>
      <View style={footerStyles.header}>
        <Text style={footerStyles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Image
            source={require('../photo/menu.png')}
            style={iconStyles.antetIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={proiecteStyles.content}>
        <Image
          source={require('../photo/menu.png')}
          style={proiecteStyles.image}
        />
        <View style={separatorStyles.separator} />
        <View>
          <Text style={proiecteStyles.text}>Description:</Text>
          <TextInput
            style={proiecteStyles.descriptionInput}
            onChangeText={handleDescriptionChange}
            value={editedDescription}
            multiline={true}
          />
          {isDescriptionEdited && ( // Afișăm butonul Save doar dacă descrierea a fost editată
            <TouchableOpacity style={styles.button} onPress={updateDescription}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={separatorStyles.separator} />

        <View style={proiecteStyles.infoContainer}>
          <Text style={proiecteStyles.text}>Info:</Text>
          {/* Verificăm dacă userInfo și userInfo.email există înainte de a încerca să le afișăm */}
          <Text style={proiecteStyles.infoText}>
            Name: {userInfo && userInfo.name ? userInfo.name : 'No name provided'}
          </Text>
          <Text style={proiecteStyles.infoText}>
            Email: {userInfo && userInfo.email ? userInfo.email : 'No email provided'}
          </Text>
          <Text style={proiecteStyles.infoText}>
            Phone: {userInfo && userInfo.mobile ? userInfo.mobile : 'No Phone number provided'}
          </Text>
          <Text style={proiecteStyles.infoText}>
            Country: {userInfo && userInfo.country ? userInfo.country : 'No Country provided'}
          </Text>
          <Text style={proiecteStyles.infoText}>
            City: {userInfo && userInfo.city ? userInfo.city : 'No City provided'}
          </Text>
        </View>

      </ScrollView>

      <View style={footerStyles.footer}>
        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Profile", { userInfo: userInfo })}>
          <Image
            source={require('../photo/om_circle.png')}
            style={iconStyles.footerIcon}
          />
          <Text style={proiecteStyles.footerText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Organizations", { userInfo: userInfo })}>
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

export default ProfileScreen;
