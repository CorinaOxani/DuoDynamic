import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { iconStyles } from '../styles/icon';
import { proiecteStyles } from '../styles/proiecte';
import { styles } from '../styles/button';
import { footerStyles } from '../styles/footer_header';
import { separatorStyles } from '../styles/separator';
import { containerStyles } from '../styles/container';
import axios from 'axios';

function OrganizationsScreen({ route, navigation }) {
  const userInfo = route.params?.userInfo;
  const [allUsers, setAllUsers] = useState([]);
  const [noUsersMessage, setNoUsersMessage] = useState('');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/allUsers');
      const { users, organizations } = response.data;

      // Combine users and organizations into one array and exclude the current logged-in user
      const filteredUsers = [
        ...users.filter(user => user._id !== userInfo._id),
        ...organizations.filter(org => org._id !== userInfo._id)
      ];

      if (filteredUsers.length > 0) {
        setAllUsers(filteredUsers);
      } else {
        setNoUsersMessage('No users or organizations found.');
      }
    } catch (error) {
      console.error('Error fetching users and organizations:', error);
      setNoUsersMessage('Error fetching users and organizations.');
    }
  };

  return (
    <View style={containerStyles.container}>
      <View style={footerStyles.header}>
        <TouchableOpacity>
          <Image
            source={require('../photo/add-button.png')}
            style={iconStyles.antetIcon}
          />
        </TouchableOpacity>
        <Text style={footerStyles.headerTitle}>Users and Organizations</Text>
        <TouchableOpacity>
          <Image
            source={require('../photo/menu.png')}
            style={iconStyles.antetIcon}
          />
        </TouchableOpacity>
      </View>
      <TextInput style={footerStyles.searchBar} placeholder="Search" />

      {allUsers.length === 0 && noUsersMessage ? (
        <View style={proiecteStyles.noProjectsContainer}>
          <Text style={proiecteStyles.noProjectsText}>{noUsersMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={allUsers}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                style={proiecteStyles.image}
                source={item.image ? { uri: item.image } : require('../photo/no_photo.jpg')}
              />
              <Text style={proiecteStyles.eventTitle}>
                {item.orgName ? `Organization ${item.orgName}` : item.name}
              </Text>
              <View style={separatorStyles.separator} />
              <View>
                <Text style={proiecteStyles.text}>Description:</Text>
                <Text style={proiecteStyles.descriptionText}>{item.profileDescription}</Text>
              </View>
              <View style={separatorStyles.separator} />
              <View style={proiecteStyles.infoContainer}>
                <Text style={proiecteStyles.text}>Info:</Text>
                <Text style={proiecteStyles.infoText}>Email: {item.email}</Text>
                <Text style={proiecteStyles.infoText}>Phone: {item.mobile}</Text>
                <Text style={proiecteStyles.infoText}>Country: {item.country}</Text>
                <Text style={proiecteStyles.infoText}>City: {item.city}</Text>
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

export default OrganizationsScreen;
