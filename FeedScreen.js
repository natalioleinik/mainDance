import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const TOOLBAR_HEIGHT = 80; // Increased height of the toolbar

//feed screen for scrolling
const FeedScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([
        { id: '1', username: '@EmilyQueen', tag: 'Hip-hop', imageUrl: 'https://media.gettyimages.com/id/1441015419/video/woman-dancing-outdoors-for-social-media.jpg?s=640x640&k=20&c=nPQsOoW4cKHbRX_awj7W6OrEYOIoaSyw0vgFVl8XHjE=' },
        { id: '2', username: '@MaxDance', tag: 'Contemporary', imageUrl: 'https://images.pexels.com/videos/2795742/free-video-2795742.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        // Add more posts as needed
    ]);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            {/* Fullscreen Image */}
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

            {/* Overlay for Username and Tag */}
            <View style={styles.overlay}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.tag}>{item.tag}</Text>
            </View>

            {/* Action Buttons on the Right */}
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="bookmark-outline" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tryButton}>
                    <Text style={styles.tryButtonText}>Try</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                snapToInterval={height - TOOLBAR_HEIGHT} // Adjusted to fill only available screen space
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                pagingEnabled
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
                    <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person-circle-outline" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    postContainer: {
        width: width,
        height: height - TOOLBAR_HEIGHT, // Adjusted height to exclude the toolbar area
        position: 'relative',
    },
    postImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 30, // Adjusted position to be higher above the toolbar
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10, // Space between username and tag
    },
    tag: {
        color: 'white',
        fontSize: 14,
        backgroundColor: '#c433cc',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    actionButtons: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignItems: 'center',
    },
    actionButton: {
        marginBottom: 20,
    },
    tryButton: {
        backgroundColor: '#c433cc',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    tryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    bottomNav: {
        height: TOOLBAR_HEIGHT, // Increased height of the toolbar
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10, // Reduced padding to make sure buttons are aligned
        backgroundColor: '#222',

    },
    addButton: {
        backgroundColor: '#c433cc',
        width: 45, // Set width to control the button size
        height: 45, // Set height to keep it circular
        borderRadius: 25, // Half of width/height to make it circular
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5, // Centered with the other buttons
    },
    
});

export default FeedScreen;
