import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface WarningModal {
  visible: boolean,
  message: string,
  onClose: () => void,
  onConfirm: () => void
}

export default function WarningModal({ visible, message, onClose, onConfirm }: WarningModal) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Uyarı</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.buttonConfirm}>
              <Text style={styles.buttonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

