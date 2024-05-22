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
  const [userInfo, setUserInfo] = useState(route.params?.userInfo);
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState({});
  const [noUsersMessage, setNoUsersMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter(user =>
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.orgName && user.orgName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/allUsers');
      const { users, organizations } = response.data;

      const combinedUsers = [
        ...users.filter(user => user._id !== userInfo._id),
        ...organizations.filter(org => org._id !== userInfo._id)
      ];

      if (combinedUsers.length > 0) {
        setAllUsers(combinedUsers);
        fetchProjectsForUsers(combinedUsers);
      } else {
        setNoUsersMessage('No users or organizations found.');
      }
    } catch (error) {
      console.error('Error fetching users and organizations:', error);
      setNoUsersMessage('Error fetching users and organizations.');
    }
  };
  const handleLogout = () => {
    // Clear user information
    setUserInfo(null);
  
    // Reset navigation to go back to the Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const fetchProjectsForUsers = async (users) => {
    try {
      const userIds = users.map(user => user._id);
      console.log("Fetching projects for userIds:", userIds); // Adăugare log
      const response = await axios.post('http://10.0.2.2:5000/getProjectsForUsers', { userIds });
      console.log("Received projects by user:", response.data.projectsByUser); // Adăugare log
      setAllProjects(response.data.projectsByUser);
    } catch (error) {
      console.error('Error fetching projects for users:', error);
    }
  };

  const renderProjects = (projects) => (
    <View>
      {projects.map((project, index) => (
        <View key={index}>
          <Text style={proiecteStyles.projectTitle}>{project.projectName}</Text>
          <Text style={proiecteStyles.projectDescription}>{project.description}</Text>
        </View>
      ))}
    </View>
  );

  const renderUserItem = ({ item }) => {
    const projects = allProjects[item._id] || [];
    console.log("Rendering user item:", item.name || item.orgName); // Adăugare log
    console.log("Projects for this user:", projects); // Adăugare log

    return (
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
{/*         {projects.length > 0 && ( */}
{/*           <View> */}
{/*             <Text style={proiecteStyles.projectSectionTitle}> */}
{/*               {item.userType === 'organization' ? 'Organized Projects' : 'Participating Projects'}: */}
{/*             </Text> */}
{/*             {renderProjects(projects)} */}
{/*           </View> */}
{/*         )} */}
{/*         <View style={separatorStyles.separator} /> */}
      </View>
    );
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
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={require('../photo/logout.png')}
            style={iconStyles.antetIcon}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={footerStyles.searchBar}
        placeholder="Search"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />

      {filteredUsers.length === 0 && noUsersMessage ? (
        <View style={proiecteStyles.noProjectsContainer}>
          <Text style={proiecteStyles.noProjectsText}>{noUsersMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderUserItem}
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
