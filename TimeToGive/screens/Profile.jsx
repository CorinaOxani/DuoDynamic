import React, { useState } from 'react';
import { View, Modal, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { iconStyles } from '../styles/icon';
import { proiecteStyles } from '../styles/proiecte';
import { footerStyles } from '../styles/footer_header';
import { separatorStyles } from '../styles/separator';
import { containerStyles } from '../styles/container';
import { userProfileStyles } from '../styles/userProfile';
import { menuStyles } from '../styles/menu'; 
import { styles } from '../styles/button';
import ImagePicker from 'react-native-image-crop-picker';

function ProfileScreen({ route, navigation }) {
  const userInfo = route.params?.userInfo;
  const [modalVisible, setModalVisible] = useState(false);
  const [editedDescription, setEditedDescription] = useState(userInfo.profileDescription || '');
  const [editedImage, setEditedImage] = useState(userInfo.image || '');
  const [isEdited, setIsEdited] = useState(false);

  // Handle changes in description
  const handleDescriptionChange = (text) => {
      setEditedDescription(text);
      setIsEdited(true);
  };

  // Handle selecting new image
  const selectPhoto = () => {
      ImagePicker.openPicker({
          width: 400,
          height: 200,
          cropping: true,
          includeBase64:true,
          freeStyleCropEnabled:true
      }).then(image => {
        console.log(image);
        const data=`data:${image.mime};base64,${image.data}`
        setEditedImage(data);
        setIsEdited(true);
      }).catch(error => {
          console.error('Error selecting image:', error);
          Alert.alert("Error Selecting Image", error.message);
      });
  };

  // Update user information including image and description
  const updateUserInfo = () => {
      const updatedUserInfo = {
          ...userInfo,
          profileDescription: editedDescription,
          image: editedImage
      };

      fetch(`http://10.0.2.2:5000/update-user/${userInfo.email}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserInfo),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Profile updated successfully:', data);
          setIsEdited(false);
          Alert.alert("Update Successful", "Your profile has been updated.");
      })
      .catch(error => {
          console.error('There was a problem updating the profile:', error);
          Alert.alert("Update Failed", error.toString());
      });
  };
  
  if (userInfo.userType === "organization") {
    return (
      <View style={containerStyles.containerPage}>
      <View style={footerStyles.header}>
        <Text style={footerStyles.headerTitle}>Organization's Profile</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../photo/menu.png')}
            style={{ width: 50, height: 50 }}  
          />
        </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
            >
              <View style={menuStyles.centeredView}>
                <View style={menuStyles.modalView}>
                  <Text style={menuStyles.menuItem}>Settings</Text>
                  <Text style={menuStyles.menuItem}>Logout</Text>
                  <TouchableOpacity
                    style={[menuStyles.button, menuStyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={menuStyles.textStyle}>Close Menu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
      </View>

      <ScrollView style={proiecteStyles.content}>
        <TouchableOpacity onPress={selectPhoto}>
        <Image
          source={editedImage === '' ? require('../photo/no_photo.jpg'):{ uri: editedImage } }
          style={proiecteStyles.image}
        />
        </TouchableOpacity>

         <View style={separatorStyles.separator} />
         <View>
           <Text style={proiecteStyles.text}>Organization Name: {userInfo.name || 'No name provided'}</Text>
         </View>

        <View style={separatorStyles.separator} />
        <View>
          <Text style={proiecteStyles.text}>Description:</Text>
          <TextInput
            style={proiecteStyles.descriptionInput}
            onChangeText={handleDescriptionChange}
            value={editedDescription}
            multiline={true}
          />
        </View>

        <View style={separatorStyles.separator} />

        <View style={proiecteStyles.infoContainer}>
          <Text style={proiecteStyles.text}>Contact Us:</Text>
          <Text style={proiecteStyles.infoText}>Email: {userInfo.email || 'No email provided'}</Text>
          <Text style={proiecteStyles.infoText}>Call Center: {userInfo.mobile || 'No Phone number provided'}</Text>

          {isEdited && (
            <TouchableOpacity style={styles.button} onPress={updateUserInfo}>
              <Text style={styles.buttonText}>Save your changes!</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={footerStyles.footer}>
        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Profile", { userInfo })}>
          <Image
            source={require('../photo/om_circle.png')}
            style={iconStyles.footerIcon}
          />
          <Text style={proiecteStyles.footerText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Organizations", { userInfo })}>
          <Image
            source={require('../photo/home_circle.png')}
            style={iconStyles.footerIcon}
          />
          <Text style={proiecteStyles.footerText}>Organizations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Proiecte", { userInfo })}>
          <Image
            source={require('../photo/leaf_circle.png')}
            style={iconStyles.footerIcon}
          />
          <Text style={proiecteStyles.footerText}>Projects</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  }

  // Return the standard profile layout for other user types
  return (
    <View style={containerStyles.containerPage}>
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
          source={require('../photo/background.jpg')}
          style={proiecteStyles.image}
        />
        <Image
          source={{ uri: userInfo.image }}
          style={userProfileStyles.avatarStyle}
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
          {isEdited && (
            <TouchableOpacity style={styles.button} onPress={updateUserInfo}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={separatorStyles.separator} />

        <View style={proiecteStyles.infoContainer}>
          <Text style={proiecteStyles.text}>Info:</Text>
          <Text style={proiecteStyles.infoText}>Name: {userInfo.name || 'No name provided'}</Text>
          <Text style={proiecteStyles.infoText}>Email: {userInfo.email || 'No email provided'}</Text>
          <Text style={proiecteStyles.infoText}>Phone: {userInfo.mobile || 'No Phone number provided'}</Text>
          <Text style={proiecteStyles.infoText}>Country: {userInfo.country || 'No Country provided'}</Text>
          <Text style={proiecteStyles.infoText}>City: {userInfo.city || 'No City provided'}</Text>
        </View>
      </ScrollView>

      <View style={footerStyles.footer}>
        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Profile", { userInfo })}>
          <Image
           source={require('../photo/home_circle.png')}
            style={iconStyles.footerIcon}
          />
          <Text style={proiecteStyles.footerText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Organizations", { userInfo })}>
          <Image
            source={require('../photo/om_circle.png')}
            style={iconStyles.footerIcon}
          />
          <Text style={proiecteStyles.footerText}>All Users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={proiecteStyles.row} onPress={() => navigation.navigate("Proiecte", { userInfo })}>
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
