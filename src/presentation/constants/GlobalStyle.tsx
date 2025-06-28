import { StyleSheet } from 'react-native';
import { Colors } from './Colors'; 

const GlobalStyles = StyleSheet.create({
  safeAreaStyles:{
    flex:1,
    backgroundColor:Colors.White,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    height: 'auto',
    width: '80%',
    marginTop: 10,
  },
  instructionContainer:{
      width: "90%", 
      flex: 0,
      marginBottom: 0, 
      paddingBottom: 0 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dashboardContainer: {
    height: 50,
    marginLeft:20,
    justifyContent: 'center',
    alignItems: 'flex-start'
 },
  bottomContainer:{
    backgroundColor:Colors.White,
    borderTopWidth:1,
    borderColor:Colors.Grey,
    width:"100%",
    height:"10%",
    alignItems:'center',
    bottom:0,
  },
  containerInput: {
    marginTop: 32,
  },
  registrationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 10,
  },
  containerInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputBox: {
    width: '15%',
    height: 54,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.Grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  breakLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  linkContainer: {
    height: 81,
    marginTop: 20,
  },
  termsContainer:{
    flexDirection:'row',
    marginTop:10,
    marginBottom:30,
  },
  singleIcon: {
    height: 48,
    width: "22%",
    borderColor: Colors.Purple,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryBox:{
    height:56,
    width:62,
    borderRightWidth:1,
    borderColor:Colors.Grey,
    position:'absolute',
    left:0,
    top:-66,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  nameInputPair:{
    width:'48%',
  },
  halfInputContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
  },
  circleContainer:{
    marginTop:40,
    marginBottom:120,
    height:220,
    width:220,
    borderRadius:130,
    borderWidth:15,
    alignItems:'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10,
  },
  drawerIcon:{
    color:Colors.Black,
  },
  icon:{
    fontSize:20, 
    color:Colors.DeepGrey,
    right:"4%",
    top:-45,
    position:'absolute',
  },
  imageContainerBig:{
    height:200,
    width:200,
    borderRadius:100,
    borderWidth:9,
    backgroundColor:Colors.PurpleBack,
    borderColor: Colors.PurpleBorder,
  },
  logoContainerMedium:{
    height:60,
    width:60,
    borderRadius:60,
    backgroundColor:Colors.Orange,
    borderWidth:7,
    borderColor: Colors.OrangeBorder,
  },
  gradientContainer: {
    height: 22,
    borderRadius: 4,
  },
  magicButton: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalWrapper: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: Colors.White,
    width: '100%',
    padding: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonSpacer: {
    height: 15,
  },
  progressBarContainer:{
    height: 22, 
    width: '100%', 
    backgroundColor: Colors.White, 
    borderRadius: 4, 
    borderWidth:1,
    borderColor:Colors.DeepPurple,
  },
  instructionBox: {
    marginTop:10,
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    width: '100%',
    shadowColor: Colors.Black,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SocialConnectionBox:{
    height:64,
    justifyContent:'center',
    borderRadius:8, 
    borderWidth:2, 
    borderColor:Colors.Grey, 
    backgroundColor:Colors.White,
  },

  loadingText:{
    textAlign:'center',
    fontWeight:'600',
    fontSize:15,
    marginBottom:10,
    color:Colors.Orange,
  }
  ,
  specialText: {
    fontWeight:'500',
    fontSize:14,
    color: Colors.White,
    marginLeft:5,
    lineHeight:20
  },
  headerText: {
    fontSize: 30,
    fontWeight:'600',
    color: Colors.Black,
    lineHeight: 36,
  },
  subHeaderText: {
    fontWeight:'500',
    fontSize: 16,
    color: Colors.Black,
    lineHeight: 28,
  },
  buttonText: {
    fontWeight:'700',
    fontSize: 20,
    lineHeight:26
 },
  createAccount: {
    fontWeight:'700',
    fontSize: 14,
    color: Colors.Orange,
    lineHeight: 19.6,
    marginLeft: 10,
  },
  noAccount: {
    fontWeight:'500',
    fontSize: 14,
    color: Colors.Black,
    lineHeight: 19.6,
    opacity: 0.6,
  },
  inputText: {
    fontWeight:'700',
    fontSize: 30,
  },
  bigText:{
    fontSize:34,
    fontWeight:'800',
    color:Colors.Black,
    lineHeight:41.5,
  },
  inputHandlerText:{
    color: 'red',
    fontSize: 12, 
    fontWeight:'400',
    margin:10, 
    textAlign:'center'
  },
  mediumText:{
    fontSize:20,
    lineHeight:28,
    fontWeight:'500',
    color:Colors.DarkGrey,
  },
  plainText:{
    fontWeight:'400',
    fontSize:16,
  },
  orLogin: {
    fontWeight:'500',
    fontSize: 12,
    color: Colors.Back,
    lineHeight: 16.8,
    opacity: 0.6,
  },
  forgotText: {
    color: Colors.Orange,
    fontWeight:'600',
    fontSize: 14,
    lineHeight: 19.6,
  },
  rememberText: {
    color: Colors.Black,
    fontWeight:'600',
    fontSize: 14,
    lineHeight: 19.6,
    marginTop: 10,
    marginBottom: 10,
  },
  drawerText:{
    fontWeight:'500',
    fontSize:13,
    lineHeight:18,
    color:Colors.Black,
    marginLeft:10,

  },
  hexText:{
    fontWeight:'400',
    fontSize:24,
    lineHeight:32
  },
  socialConnectText:{
    fontWeight:'500',
    fontSize: 14,
    color: Colors.BlackAlter,
    lineHeight: 25,
    marginLeft:10,
    justifyContent:'center'
  },
  logo:{
    height:24,
    width:132,
    marginBottom:30,
  },
  logoMedium:{
    height:210,
    width:300,
  },
  logoBig:{
    width:'110%',
    height:400,
  },
  line: {
    width: "32%",
    height: 1,
    backgroundColor: Colors.Black,
  },
  img: {
    height: 18,
    width: 18,
  },
  imgSocialConnect:{
    height:24,
    width:24,
    borderRadius:2,
  },
  imgSmallest:{
    height:20,
    width:20,
  },
  profileImg:{
    height:40,
    width:40,
    borderRadius:40,
    overflow:'hidden',
    marginRight:10
  },
  dropDown:{
    marginTop:-20,
    right:"-90%",
    top:-25,
    height:18,
    width:18
  },
  connectButton:{
        marginLeft:10,
        borderRadius:8,
        backgroundColor:Colors.Orange,
        width:120,
        justifyContent:'center',
        alignItems:'center',
        height:22
    },

});

export default GlobalStyles;