import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const Dashboard = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data
  const user = {
    name: 'Bilal Abboud',
    email: 'bilal@example.com',
    role: 'Admin',
    // Using placeholder image instead of img_xmlid_2.png
    avatar: { uri: 'https://via.placeholder.com/150' }
  };

  // Mock dashboard data
  const stats = [
    { title: 'Employees', value: '42', icon: 'people', color: '#4CAF50' },
    { title: 'Pending Tasks', value: '12', icon: 'assignment', color: '#FF9800' },
    { title: 'Upcoming Events', value: '5', icon: 'event', color: '#2196F3' },
    { title: 'Messages', value: '8', icon: 'message', color: '#9C27B0' },
  ];

  // Recent activities
  const activities = [
    { id: 1, title: 'New employee onboarded', time: '2 hours ago' },
    { id: 2, title: 'Payroll processed', time: 'Yesterday' },
    { id: 3, title: 'Team meeting scheduled', time: '1 day ago' },
    { id: 4, title: 'Performance review completed', time: '2 days ago' },
  ];

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'employees', label: 'Employees', icon: 'people' },
    { id: 'attendance', label: 'Attendance', icon: 'schedule' },
    { id: 'payroll', label: 'Payroll', icon: 'payments' },
    { id: 'reports', label: 'Reports', icon: 'bar-chart' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateTo = (screen: string) => {
    setActiveTab(screen);
    console.log(`Navigating to ${screen}`);
  };

  const handleLogout = () => {
    router.replace('/LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#3b82f6" barStyle="light-content" />
      <View style={styles.container}>
        {/* Sidebar */}
        {isSidebarOpen && (
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              {/* Using placeholder logo */}
              <View style={styles.logoPlaceholder}>
                <MaterialIcons name="business" size={32} color="#fff" />
              </View>
              <Text style={styles.appName}>SlasHR</Text>
            </View>
            
            <ScrollView style={styles.navContainer}>
              {navItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.navItem,
                    activeTab === item.id && styles.activeNavItem
                  ]}
                  onPress={() => navigateTo(item.id)}
                >
                  <MaterialIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={activeTab === item.id ? '#3b82f6' : '#555'} 
                  />
                  <Text style={[
                    styles.navText,
                    activeTab === item.id && styles.activeNavText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Main Content */}
        <View style={[
          styles.mainContent, 
          { width: isSidebarOpen ? '75%' : '100%' }
        ]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
              <MaterialIcons 
                name={isSidebarOpen ? "menu-open" : "menu"} 
                size={28} 
                color="#333" 
              />
            </TouchableOpacity>
            
            <View style={styles.headerRight}>
              <View style={styles.notificationIcon}>
                <Ionicons name="notifications" size={24} color="#333" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.profileContainer}>
                <Image 
                  source={user.avatar} 
                  style={styles.profileImage} 
                />
                <View style={styles.profileText}>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileRole}>{user.role}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Dashboard Content */}
          <ScrollView style={styles.content}>
            <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
            <Text style={styles.subtitle}>Here's what's happening today</Text>
            
            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={[styles.statCard, { backgroundColor: stat.color }]}>
                  <View style={styles.statIcon}>
                    <MaterialIcons name={stat.icon as any} size={30} color="#fff" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </View>
              ))}
            </View>
            
            {/* Recent Activities */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activities</Text>
              <View style={styles.activitiesContainer}>
                {activities.map(activity => (
                  <View key={activity.id} style={styles.activityItem}>
                    <View style={styles.activityIndicator} />
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activityTime}>{activity.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            
            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}>
                    <FontAwesome name="user-plus" size={24} color="#fff" />
                  </View>
                  <Text style={styles.actionText}>Add Employee</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: '#2196F3' }]}>
                    <MaterialCommunityIcons name="file-document" size={24} color="#fff" />
                  </View>
                  <Text style={styles.actionText}>Generate Report</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: '#FF9800' }]}>
                    <Ionicons name="calendar" size={24} color="#fff" />
                  </View>
                  <Text style={styles.actionText}>Schedule Event</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f4f8',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  appName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  navContainer: {
    paddingTop: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  activeNavItem: {
    backgroundColor: '#eef6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  navText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#555',
  },
  activeNavText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    position: 'relative',
    marginRight: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff5252',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ddd', // Placeholder background
  },
  profileText: {
    marginRight: 10,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileRole: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 16,
    color: '#fff',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  activitiesContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
    marginTop: 5,
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '32%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Dashboard;