import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // buraya dikkat

export default function CustomHeader({ title, onAddPress }) {
  
        const navigation = useNavigation();
    
    return (
    <View style={styles.container}>
      {navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.left}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Orta: Başlık */}
      <Text style={styles.title}>{title}</Text>

      {/* Sağ: Ekle ikonu */}
      <TouchableOpacity onPress={onAddPress} style={styles.right}>
        <Feather name="plus-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  left: {
    padding: 4,
  },
  right: {
    padding: 4,
  },
});
