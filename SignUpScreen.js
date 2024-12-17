import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { supabase } from './supabaseClient';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Create Account Function
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, username, date_of_birth: dob },
      },
    });

if (error) {
    Alert.alert('Sign Up Failed', error.message);
  } else {
    Alert.alert('Success', 'Account created. Please log in.');
    navigation.navigate('Profile', { name }); // Pass name to ProfileScreen
  }
  };

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Create New Account</Text>

        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#aaa"
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#aaa"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center' },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 20, borderRadius: 8, width: '90%', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  input: { 
    width: '100%', 
    padding: 10, 
    backgroundColor: '#222', 
    borderRadius: 8, 
    marginBottom: 15, 
    color: '#fff', 
    borderWidth: 1, 
    borderColor: '#555',
  },
  button: { backgroundColor: '#6c5ce7', paddingVertical: 15, borderRadius: 8, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footerText: { color: '#ddd', marginTop: 20 },
  link: { color: '#aaa', textDecorationLine: 'underline' },
});
