import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity, Switch, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DanceSettings = () => {
  const navigation = useNavigation();
  const [moves, setMoves] = useState(['Star', 'Body roll', 'Clap', 'Spin', 'Jump']);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceoverEnabled, setVoiceoverEnabled] = useState(false);
  const [rewindSeconds, setRewindSeconds] = useState(5);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMoveChange = (text, index) => {
    const newMoves = [...moves];
    newMoves[index] = text;
    setMoves(newMoves);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectSeconds = (value) => {
    setRewindSeconds(value);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.exitButtonText}>✖</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Umbrella - Rihanna</Text>
      </View>

      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContentContainer}
          snapToInterval={100}
          decelerationRate="fast"
          contentOffset={{ x: 50, y: 0 }}
        >
          {moves.map((move, index) => (
            <View key={index} style={styles.move}>
              <TextInput
                style={styles.moveText}
                value={move}
                onChangeText={(text) => handleMoveChange(text, index)}
                editable
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.videoWrapper}>
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.videoContainer}
        >
          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.playButton}>
            <Text style={styles.playButtonText}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.timeline}>
        <View style={[styles.segment, { backgroundColor: '#8e44ad' }]} />
        <View style={[styles.segment, { backgroundColor: '#e74c3c' }]} />
        <View style={[styles.segment, { backgroundColor: '#8e44ad' }]} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

        <View style={styles.voiceoverContainer}>
          <Text style={styles.voiceoverText}>Voiceover</Text>
          <Switch
            value={voiceoverEnabled}
            onValueChange={(value) => setVoiceoverEnabled(value)}
            trackColor={{ false: '#777', true: '#8e44ad' }}
          />
        </View>

        <View style={styles.rewindContainer}>
          <Text style={styles.rewindText}>Rewind Seconds</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
            <Text style={styles.dropdownButtonText}>{rewindSeconds}s</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent visible={isDropdownVisible} animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
            <View style={styles.dropdownMenu}>
              {[5, 10, 15].map((value) => (
                <TouchableOpacity key={value} style={styles.dropdownItem} onPress={() => handleSelectSeconds(value)}>
                  <Text style={styles.dropdownItemText}>{value}s</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#141c2e', // Purple to Blue gradient
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginTop: '10%',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: '#2d3b5b',
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    color: '#fff', // Light pink
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitButton: {
    position: 'absolute',
    left: 15,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#fff', // White cross for contrast
    fontSize: 24,
  },
  carouselContainer: {
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  carouselContentContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  move: {
    backgroundColor: '#8e44ad', // Purple
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  moveText: {
    color: '#fff', // Light pink
    fontSize: 18,
    fontWeight: '600',
  },
  videoWrapper: {
    alignItems: 'center',
    marginVertical: 5,
  },
  videoContainer: {
    width: 220,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#34495e',
    overflow: 'hidden',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
    borderRadius: 50,
  },
  playButtonText: {
    color: '#fff', // Light pink
    fontSize: 30,
  },
  timeline: {
    flexDirection: 'row',
    height: 5,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  segment: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  controls: {
    alignItems: 'center',
    marginTop: 15,
  },
  startButton: {
    backgroundColor: '#8e44ad', // Purple
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: '600',
  },
  voiceoverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  voiceoverText: {
    color: '#fff', // Light pink
    fontSize: 16,
    marginRight: 10,
  },
  rewindContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rewindText: {
    color: '#fff', // Light pink
    fontSize: 16,
    marginRight: 10,
  },
  dropdownButton: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  dropdownButtonText: {
    color: '#fff', // Light pink
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Darker overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: '#2c3e50', // Dark blue-gray
    borderRadius: 8,
    paddingVertical: 10,
    width: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#fff', // Light pink
    fontSize: 16,
  },
});

export default DanceSettings;
