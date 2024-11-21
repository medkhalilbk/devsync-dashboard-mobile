import { StyleSheet } from 'react-native';

// Example dark theme colors
const colors = {
  background: '#121212',
  text: '#EAEAEA',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  border: '#333333',
  cardBackground: '#1E1E1E',
  buttonBackground: '#6200EE',
  buttonText: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    flexDirection:"column",
    justifyContent:"space-between"
  },
  buttonContainer:{
marginBottom:0
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.buttonBackground,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: colors.text,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textHeader:{
    fontSize:24,
    color:"white", 
    fontWeight:"900",
    textAlign:"center",
  } , 
  labelText:{
    marginTop:50,
    color:colors.secondary, 
  },
  sloganText:{
    color:colors.secondary,
    textAlign:"center", 
    marginTop:5
  }
});

export default styles;
