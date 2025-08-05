import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // buraya dikkat
import styles from './styles';

interface Header {
  title: string,
  onAddPress: () => void
}

export default function CustomHeader({ title, onAddPress }: Header) {

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
