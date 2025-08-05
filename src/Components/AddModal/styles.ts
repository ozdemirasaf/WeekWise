import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  textArea: {
    height: 100,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  buttonClose: {
    backgroundColor: '#b51e00',
    flex: 1,
    padding: 7,
    borderRadius: 10,
  },

  buttonSave: {
    backgroundColor: '#3A5A40',
    flex: 1,
    padding: 7,
    borderRadius: 10,
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});
