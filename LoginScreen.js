// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { supabase } from './supabaseClient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error, data: { user } } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert(
        'Login Failed',
        'Account not found. Redirecting to Create New Account.',
        [{ text: 'OK', onPress: () => navigation.navigate('SignUpScreen') }]
      );
    } else {
      const userName = user?.email?.split('@')[0] || 'User';
      navigation.navigate('Home', { name: userName });
    }
  };

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.link}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center' },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20, borderRadius: 8, width: '90%', alignItems: 'center' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  input: { width: '100%', padding: 10, backgroundColor: '#333', borderRadius: 8, marginBottom: 15, color: '#fff' },
  button: { backgroundColor: '#8a297d', paddingVertical: 15, borderRadius: 8, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footerText: { color: '#ddd', marginTop: 20 },
  link: { color: '#aaa', textDecorationLine: 'underline' },
});
