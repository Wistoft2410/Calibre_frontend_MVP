import { StyleSheet } from "react-native";

const theDeal = StyleSheet.create({
   
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        
      },
      logoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    
      },
      logo: {
        width: 40,
        resizeMode: 'contain',
      }, 
      contentsContainer: {
          backgroundColor: '#e7e8ed',
          width: '85%',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          paddingHorizontal: 10,

      },
      heroContainer: {
            marginTop: 30,
            width: '100%',
            marginLeft: 0,
            paddingLeft: 0,
            paddingBottom: 5,
            borderBottomColor: '#000',
            borderBottomWidth: 2,
           
      },
      hero: {
          color: '#000',
          fontSize: 24,
      },
      textContainer: {
          marginTop: 25,
          height: '60%',
          paddingHorizontal: 10,
      },
      text: {
        marginTop: 20,
        fontSize: 16,
      },
      black: {
        color: '#000',
      },
      green:{
        color: '#00E864',
      },
      blue:{
        color: '#006de9',
      },
      small:{
          fontSize: 12,
      },
      handwritten:{
        fontFamily: 'Snell Roundhand',
        fontSize:20,
        marginTop: 10,
        marginStart: 10,
      },
      actionContainer: {
          marginVertical: 40,
          alignItems: 'center',
          marginBottom: '13%',
          flex: 1,
          justifyContent: 'flex-end'
      },
      action: {
            backgroundColor: '#e7e8ed',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .1,
            shadowRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
      },
      actionText: {
          color: '#000',
          fontSize: 20,
          fontWeight: "700",
      }
})

const signUp = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
      },
      contentsContainer: {
          alignItems: 'center',
          marginTop: '10%',
          width: '100%',
          paddingHorizontal: 30,
      },
      heroContainer: {
        alignSelf: 'center',
        marginTop: '10%',
      },
      hero: {
          color:'green',
          fontSize: 24,
          fontWeight: "700",
      },
      lightGreen:{
        color:"lightgreen"
      },
      bodyContainer: {
          marginTop: 35,
          paddingRight: 50,
      },
      body: {
          color: '#fff',
          fontSize: 20,
          fontWeight: "700",
      },
      actionContainer: {
          alignItems: 'center',
          marginBottom: '13%',
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 50,
          zIndex:-1,
          
      },
      action: {
          alignItems:'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 10,
          marginBottom: 13,
          borderRadius: 100,
          shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .1,
            shadowRadius: 5,
      },
      actionText: {
          color: 'darkgreen',
          fontSize: 20,
          fontWeight: "700",
      },
      inputContainer: {
        marginTop: '70%',
        width: '100%',
        alignItems: 'center',
      },
      Input: {
        height: 60,
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 100,
        paddingHorizontal: 15,
        fontWeight: '600',
        fontSize: 16,
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
        shadowOpacity: .3,
        shadowRadius: 3,
        overflow:'hidden',
        borderColor:"#fff",
        borderWidth:2      
      },
      inputNametag: {
        marginBottom: 10,
        alignSelf: 'flex-start',
      },
      nametag: {
        color: '#fff',
        fontWeight: '600'
      },
      validEmailText:{
        color:'#000',
        marginTop: '2%'
      },
      hidden:{
        display: 'none'
      },
      lowOpacity: {
        opacity: 0.4,
      },
      passwordInfo:{
        width:'100%',
        height: '50%',
        position:'absolute',
        backgroundColor:'#e7e8ed',
        marginTop: '27%',
        borderRadius: 10,
          shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .1,
            shadowRadius: 5,
      },
      passwordInfoHeroContainer:{
        width:'100%',
        flexDirection: 'row',
      },
      passwordInfoHero:{
        paddingVertical: 15,
        color: 'gray'
      },
      passwordInfoBall:{
        width:40,
        height:40,
        borderRadius: 100,
        marginHorizontal: 20,
        marginVertical: 15,
      },
      passwordInfoP:{
        marginVertical: 5,
        marginHorizontal:10,
      },
      maleGender: {
        backgroundColor: '#00D8FF',
        alignItems:'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 100,    
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .5,
            shadowRadius: 5,
      },
      femaleGender: {
        backgroundColor: '#FF009D',
        alignItems:'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
      },
      genderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: "400",
      },
})


export {theDeal, signUp}