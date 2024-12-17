import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState('');

  // Retrieve the name from AsyncStorage or route params when the screen loads
  useEffect(() => {
    const getName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@user_name');
        if (storedName !== null) {
          setName(storedName);
        } else {
          // Fallback to route params if name is not found in AsyncStorage
          const { name = 'Sophia Moves' } = route.params || {};
          setName(name);
        }
      } catch (error) {
        console.error('Error retrieving name:', error);
      }
    };

    getName();
  }, [route.params]);

  // Store the name in AsyncStorage whenever it changes
  const storeName = async (name) => {
    try {
      await AsyncStorage.setItem('@user_name', name);
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  // Handle name change and save it to AsyncStorage
  const handleNameChange = (input) => {
    setName(input);
    storeName(input);
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header with Solid Hot Pink Background */}
      <View style={styles.header}>
        <View style={styles.topRightIcon}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Let's Dance, {name}!</Text>

        {/* Paste Link Section */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Paste link here"
            placeholderTextColor="gray"
          />
          <TouchableOpacity style={styles.imageButton}>
            <MaterialIcons name="image" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Your Favorites:</Text>
        <View style={styles.favoritesContainer}>
          {/* Example Favorite Cards */}
          <FavoriteCard title="In Da Club" artist="50 Cent" tag="Hip-hop" />
          <FavoriteCard title="Levitating" artist="Dua Lipa" tag="Tik tok" />
          <FavoriteCard title="Bad Guy" artist="Billie Eilish" tag="Contemporary" />
          <FavoriteCard title="Blinding Lights" artist="The Weeknd" tag="Tik tok" />
          <FavoriteCard title="Old Town Road" artist="Lil Nas X" tag="Tik tok" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Ionicons name="person" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('DanceSettings')}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { name })}>
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Reusable FavoriteCard component for each dance favorite
const FavoriteCard = ({ title, artist, tag }) => (
  <View style={styles.favoriteCard}>
    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.danceImage} />
    <Text style={styles.danceTitle}>{title}</Text>
    <Text style={styles.danceTag}>{tag}</Text>
    <TouchableOpacity style={styles.tryButton}>
      <Text style={styles.tryButtonText}>Try</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.heartButton}>
      <Ionicons name="heart-outline" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for a sleek modern look
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#c433cc', // Solid hot pink background
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  topRightIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ddd',
  },
  imageButton: {
    padding: 8,
    backgroundColor: '#c433cc', // Neon pink accent
    borderRadius: 20,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 80, // To ensure space above bottom nav
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  favoritesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  favoriteCard: {
    width: '48%',
    backgroundColor: '#1a1a1a', // Dark card background
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  danceImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  danceTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  danceTag: {
    fontSize: 12,
    color: 'white',
    backgroundColor: '#c433cc', // Neon pink tag background
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  tryButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  tryButtonText: {
    color: '#c433cc', // Neon pink text
    fontWeight: 'bold',
    fontSize: 13,
  },
  heartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
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

export default HomeScreen;
