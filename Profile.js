import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("Sophia Moves"); // Default fallback name

  // Fetch name from AsyncStorage or route params
  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setName(storedName);
        } else if (route.params?.name) {
          setName(route.params.name);
          await AsyncStorage.setItem('userName', route.params.name); // Save for persistence
        }
      } catch (error) {
        console.error("Failed to load name:", error);
      }
    };
    loadName();
  }, [route.params?.name]);

  const posts = [
    { likes: '42k', views: 500 },
    { likes: '10k', views: 250 },
    { likes: '1k', views: 50 },
    { likes: '5k', views: 300 },
    { likes: '8k', views: 400 },
    { likes: '15k', views: 600 },
  ];

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postThumbnail}>
        <Image source={require('./assets/background.png')} style={styles.videoCoverImage} />
      </View>
      <View style={styles.postStats}>
        <View style={styles.postStatItem}>
          <Text style={styles.postStatText}>{String(item.views)}</Text>
          <FontAwesome name="star" size={14} color="white" />
        </View>
        <View style={styles.postStatItem}>
          <Text style={styles.postStatText}>{item.likes}</Text>
          <FontAwesome name="heart" size={14} color="white" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.usernameContainer}>
          <Text style={styles.headerTitle}>@{name.replace(/\s+/g, '')}</Text>
          <FontAwesome name="check-circle" size={18} color="dodgerblue" style={styles.checkIcon} />
        </View>
        <TouchableOpacity style={styles.dotsIcon}>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profileImagePlaceholder}>
          <Image source={require('./assets/person.png')} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.followInfo}>
          <Text style={styles.followText}>123 Following</Text>
          <Text style={styles.followText}>12k Followers</Text>
          <Text style={styles.followText}>128 Dances</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>18 | Hiphop dancer since 2012 @ Boston Dance Academy</Text>
          <Image source={require('./assets/award.png')} style={styles.badgeImage} />
        </View>
      </View>

      {/* Posts Grid */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.postsGrid}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Ionicons name="person" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  usernameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: { marginLeft: 8 },
  dotsIcon: { position: 'absolute', right: 16 },
  profileInfo: { alignItems: 'center', paddingVertical: 16 },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'dodgerblue',
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  name: { color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  followInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  followText: { color: 'white', fontSize: 16 },
  bioContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  bio: { color: '#bbb', fontSize: 14, flex: 1 },
  badgeImage: { width: 40, height: 40, borderRadius: 20 },
  postsGrid: { paddingHorizontal: 0, paddingTop: 20 },
  postContainer: { flex: 1, aspectRatio: 0.56, margin: 4, backgroundColor: '#333' },
  videoCoverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  postStatItem: { flexDirection: 'row', alignItems: 'center' },
  postStatText: { color: 'white', fontSize: 12, marginRight: 4 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#222',
  },
  addButton: {
    backgroundColor: '#c433cc',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ProfileScreen;
