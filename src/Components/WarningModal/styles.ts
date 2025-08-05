import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  buttonCancel: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  buttonConfirm: {
    backgroundColor: '#3A5A40',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});
