import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default function PasswordResetSuccess() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.notification}>
          {/* Success Icon */}
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.message}>
              Successfully reset your password. Save it and use it to log in!
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              accessibilityLabel="Close notification"
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Image
                source={require('@/assets/images/img_close.svg')}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#f3f4f6', // light gray (like bg-gray-100)
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  container: {
    width: '100%',
    maxWidth: width - 32,
    marginBottom: 24,
    alignSelf: 'center',
  },
  notification: {
    backgroundColor: '#2b6171', // example for bg-global-3 (adjust if needed)
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  message: {
    flex: 1,
    color: '#f0f9ff', // text-global-5 light color
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    borderRadius: 4,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
