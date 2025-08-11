import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDrawerItem, setActiveDrawerItem] = useState('Home');
  
  const posts = [
    { 
      id: '1', 
      type: 'Shout-out', 
      user: 'Amina Alawi', 
      time: '6 days ago', 
      content: 'Employee of the Month: Yasser Amrani!\nAt SLASHR, we believe that excellence deserves recognition.',
      image: 'https://placehold.co/375x366?text=Employee+of+the+Month\nDecember',
      tags: ['Jaylynn Cote', 'Jael Calhoun', 'Rey Willis', 'Abram Bush']
    },
    { 
      id: '2', 
      type: 'Announcement', 
      user: 'HR Department', 
      time: '1 day ago', 
      content: 'New Year Party: Join us on December 31st at the Grand Ballroom for our annual New Year celebration!',
      image: 'https://placehold.co/375x200?text=New+Year+Party',
      tags: ['All Employees']
    },
  ];

  const drawerSections = [
    {
      items: [
        { id: 'home', name: 'Home', icon: '≡' },
        { id: 'values', name: 'Company values', icon: '◆' },
        { id: 'resource', name: 'Resource Center', icon: '☰' },
        { id: 'badges', name: 'Badges', icon: '★' },
      ]
    },
    {
      title: "Personal",
      items: [
        { id: 'attendance', name: 'Attendance', icon: '∎' },
        { id: 'presence', name: 'Presence', icon: '⌖' },
        { id: 'letters', name: 'Letters', icon: '✉' },
      ]
    },
    {
      title: "Manager",
      items: [
        { id: 'presence_requests', name: 'Presence requests', icon: '✓' },
        { id: 'attendance_reports', name: 'Attendance reports', icon: '▣' },
      ]
    }
  ];

  const drawerItems = [
    { id: 'settings', name: 'Settings', icon: '⚙' },
    { id: 'logout', name: 'Logout', icon: '→' },
  ];

  const quickAccessItems = [
    { id: '1', title: 'Attendance', subtitle: 'Check in', icon: '✓' },
    { id: '2', title: 'Badge', subtitle: 'Company', icon: '★' },
    { id: '3', title: 'Request', subtitle: 'a Leave', icon: '∎' },
    { id: '4', title: 'Org', subtitle: 'Chart', icon: '▣' },
    { id: '5', title: 'Find a', subtitle: 'Colleague', icon: '⦿' },
    { id: '6', title: 'Generate', subtitle: 'Letter', icon: '✉' },
    { id: '7', title: 'Company', subtitle: 'Documents', icon: '☰' },
    { id: '8', title: 'Send', subtitle: 'Feedback', icon: '◆' },
  ];

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleDrawerItemPress = (itemName) => {
    setActiveDrawerItem(itemName);
    setDrawerOpen(false);
  };

  const DrawerItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.drawerItem,
        activeDrawerItem === item.name && styles.activeDrawerItem
      ]}
      onPress={() => handleDrawerItemPress(item.name)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.drawerIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.drawerItemText}>{item.name}</Text>
      {activeDrawerItem === item.name && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  const PostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: 'https://placehold.co/46x46?text=AA' }} style={styles.postAvatar} />
        <View style={styles.postInfo}>
          <Text style={styles.postUser}>
            {item.user} posted a <Text style={styles.postType}>{item.type}</Text>
          </Text>
          <View style={styles.postMeta}>
            <Text style={styles.postTime}>{item.time}</Text>
            <Text style={styles.postAudience}>@ Everyone</Text>
          </View>
        </View>
        <View style={styles.postOptions}>
          <View style={styles.optionDot} />
          <View style={styles.optionDot} />
          <View style={styles.optionDot} />
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.tagsContainer}>
        {item.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Image source={{ uri: 'https://placehold.co/32x32?text=' + tag.charAt(0) }} style={styles.tagAvatar} />
            <Text style={styles.tagName}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.postActions}>
        <View style={styles.actionItem}>
          <Text style={styles.actionIcon}>❤</Text>
          <Text style={styles.actionText}>4,650 likes</Text>
        </View>
        <View style={styles.actionItem}>
          <Text style={styles.actionIcon}>✍</Text>
          <Text style={styles.actionText}>57 comments</Text>
        </View>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#1E2A39" barStyle="light-content" />
        
        {/* Drawer Overlay */}
        {drawerOpen && (
          <TouchableOpacity 
            style={styles.drawerOverlay} 
            onPress={toggleDrawer}
            activeOpacity={1}
          />
        )}
        
        {/* Navigation Drawer */}
        <View style={[
          styles.drawer,
          { transform: [{ translateX: drawerOpen ? 0 : -width * 0.8 }] }
        ]}>
          {/* Drawer Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.logoContainer}>
              <Text style={styles.lmsText}>LMS</Text>
              <View style={styles.orgContainer}>
                <Text style={styles.orgText}>ORGANISATION</Text>
                <Text style={styles.orgText}>E-RESSOURCES</Text>
                <Text style={styles.orgText}>HUMANES</Text>
              </View>
            </View>
            
            <View style={styles.userContainer}>
              <Image 
                source={{ uri: 'https://placehold.co/100x100?text=MB' }} 
                style={styles.drawerAvatar} 
              />
              <View style={styles.userInfo}>
                <Text style={styles.drawerName}>Manal BATTACHE</Text>
                <Text style={styles.drawerRole}>Workplace Manager</Text>
              </View>
            </View>
          </View>
          
          {/* Drawer Body */}
          <View style={styles.drawerBody}>
            
            {/* Drawer Items */}
            <ScrollView style={styles.drawerItemsContainer} showsVerticalScrollIndicator={false}>
              {/* Sections */}
              {drawerSections.map((section, index) => (
                <View key={index}>
                  {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
                  {section.items.map((item) => (
                    <DrawerItem key={item.id} item={item} />
                  ))}
                  <View style={styles.sectionDivider} />
                </View>
              ))}
              
              {/* Individual items */}
              {drawerItems.map((item) => (
                <DrawerItem key={item.id} item={item} />
              ))}
            </ScrollView>
            
            {/* Drawer Footer */}
            
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Status Bar */}
          <View style={styles.statusBar}>
            <TouchableOpacity onPress={toggleDrawer}>
              <View style={styles.menuIcon}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
              </View>
            </TouchableOpacity>
            <Text style={styles.time}>9:41</Text>
            <View style={styles.statusIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.icon}>✉</Text>
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.icon}>?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Access Bar */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.quickAccess}
          >
            {quickAccessItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.quickAccessItem}>
                <View style={styles.quickAccessIcon}>
                  <Text style={styles.quickAccessIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.quickAccessTitle}>{item.title}</Text>
                <Text style={styles.quickAccessSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Post Prompt */}
          <View style={styles.mindContainer}>
            <Image source={{ uri: 'https://placehold.co/40x40?text=M' }} style={styles.avatar} />
            <Text style={styles.mindText}>What's on your mind today?</Text>
          </View>

          {/* Posts Section */}
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostItem item={item} />}
            keyExtractor={item => item.id}
            style={styles.postsContainer}
          />

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            {['Work', 'Home', 'Profile'].map((item) => (
              <TouchableOpacity key={item} style={styles.navItem}>
                <View style={styles.navIcon}>
                  <Text style={styles.navIconText}>
                    {item === 'Work' ? '≡' : item === 'Home' ? '⌂' : '⦿'}
                  </Text>
                </View>
                <Text style={[
                  styles.navText,
                  item === 'Home' && styles.activeNavText
                ]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
  },
  mainContent: {
    flex: 1,
    overflow: 'hidden',
  },
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: '#044a53ff',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
  drawerHeader: {
    padding: 25,
    paddingTop: 50,
    justifyContent:'center',
    borderBottomColor: '#2B6171',
    borderBottomWidth: 1,
  },
  logoContainer: {
    marginBottom: 25,
  },
  lmsText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center',
  },
  orgContainer: {
    paddingLeft: 90,
  },
  orgText: {
    color: '#96e5fd',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#96e5fd',
  },
  userInfo: {
    marginLeft: 15,
  },
  drawerName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  drawerRole: {
    color: '#96e5fd',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },
  drawerEmail: {
    color: '#b0b0b0',
    fontSize: 12,
    marginTop: 5,
  },
  drawerBody: {
    flex: 1,
    paddingTop: 10,
  },
  
  drawerItemsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: '#ecececff',
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#2B6171',
    marginVertical: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 2,
    position: 'relative',
  },
  activeDrawerItem: {
    backgroundColor: '#2B6171',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#2b617104',
  },
  drawerIcon: {
    fontSize: 20,
    color: 'white',
  },
  drawerItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  activeIndicator: {
    width: 5,
    height: 40,
    backgroundColor: '#96e5fd',
    position: 'absolute',
    right: 0,
    borderRadius: 3,
  },
  drawerFooter: {
    padding: 20,
    alignItems: 'center',
    borderTopColor: '#2B6171',
    borderTopWidth: 1,
  },
  companyText: {
    color: '#96e5fd',
    fontSize: 12,
    fontWeight: '500',
  },
  statusBar: {
    height: 90,
    backgroundColor: '#044a53ff',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 22,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  time: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  iconButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  quickAccess: {
    height: 190,
    paddingVertical: 12,
    backgroundColor: '#044a53ff',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  quickAccessItem: {
    width: 70,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quickAccessIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'white',
    marginBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessIconText: {
    fontSize: 19,
    color: 'white',
  },
  quickAccessTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  quickAccessSubtitle: {
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },
  mindContainer: {
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: '#3a3535ff',
  },
  mindText: {
    color: '#1E2A39',
    fontSize: 16,
    fontWeight: '500',
  },
  postsContainer: {
    backgroundColor: '#f5f5f5',
    paddingBottom: 10,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  postAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#3c3e41ff',
  },
  postInfo: {
    flex: 1,
  },
  postUser: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  postType: {
    color: '#1E2A39',
    fontWeight: '700',
  },
  postMeta: {
    flexDirection: 'row',
    marginTop: 5,
  },
  postTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#626262',
  },
  postAudience: {
    fontSize: 12,
    fontWeight: '500',
    color: '#626262',
    marginLeft: 10,
  },
  postOptions: {
    height: 18,
    justifyContent: 'space-between',
  },
  optionDot: {
    width: 4,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  postContent: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    lineHeight: 22,
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 366,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#363636ff',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    minHeight: 50, // Added minimum height
  },
  tag: {
    backgroundColor: '#1E2A39',
    borderRadius: 20,
    paddingVertical: 10, // Increased vertical padding
    paddingHorizontal: 15, // Increased horizontal padding
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 12, // Increased bottom margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  tagAvatar: {
    width: 32, // Increased size
    height: 32, // Increased size
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#96e5fd',
  },
  tagName: {
    color: 'white',
    fontSize: 14, // Increased font size
    fontWeight: '700', // Bold font weight
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  bottomNav: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#1e2a3905',
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconText: {
    fontSize: 30,
    color: 'black',
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
  },
  activeNavText: {
    fontWeight: '700',
    color: '#1E2A39',
  },
});

export default HomeScreen;