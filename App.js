import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {

  const ip = 'http://192.168.151.179:5000';
  const [emaildata , setEmailData] = useState();
  const [userinfo,setuserInfo] = useState(null);
  const [loading,setLoading] = useState(false);

  const [query,setQuery] = useState('');

  const show = () => {
    console.log(query);
  }

  const handlefetch = async () => {
    console.log('fetching...');
    setLoading(true);
    const response = await fetch(`https://a56f-2401-4900-5036-6d79-6564-43fd-b1ea-2866.ngrok-free.app/login/${query}`,{
      method : 'GET',
      headers : {
        'Content-Type': 'application/json' // Inform the server that you're sending JSON data
      }
    });
    const data = await response.json();
    setEmailData(data);
    console.log('fetched!!')
    setLoading(false);
  }

  const handleLogin = async () => {
    console.log('Loggin');
    const response = await fetch('login');
  }


  return (
    <SafeAreaView style={{ padding: 0, backgroundColor:'#f5f5f5',height:'100%',flex:1 }}>
      <View style={{width:'100%',height:'auto',padding:20}}>
        <Text style={{fontSize:25,fontWeight:300,marginTop:20}}>Email Assistant</Text>
        
        <TouchableOpacity style={{width:170,height:50,backgroundColor:'black',borderRadius:8,marginTop:10,alignItems:'center',justifyContent:'center'}} onPress={() => {setQuery('important'),handlefetch()}}>
          <Text style={{color:'white',fontSize:15}}>Fetch Account</Text>
        </TouchableOpacity>
      </View>

      {/* This is Area for Meetings check */}
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboard}>
          <View style={{width:'100'}}>
            <Text style={{fontSize:15,color:'white',fontWeight:'bold',marginTop:20,marginLeft:20,fontSize:20}}>Meetings</Text>
          </View>
            <Text style={{marginLeft:20,marginTop:10,color:'white',fontSize:18,fontWeight:200}}>5 Meetings Today</Text>
            <View style={{width:'100%',alignItems:'flex-end',padding:20,marginTop:10}}>
              <TouchableOpacity style={{width:100,height:40,backgroundColor:'white',borderRadius:6,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'black',fontWeight:'bold'}}>Check</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={{paddingLeft:20}}>
        <Text style={{fontSize:22,fontWeight:300}}>Emails Today</Text>
      </View>
      <View style={{width:'100%',height:'auto',padding:15,gap:10}}>
        <View style={{width:'100%',height:60,backgroundColor:'white',borderRadius:8,paddingHorizontal:30,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
          <TouchableOpacity style={{}} onPress={() => {setQuery('important'),handlefetch()}}><Text style={{fontWeight:'bold', color:'red', fontSize:16}}>Important</Text></TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => {setQuery('inbox'),handlefetch()}}><Text style={{fontWeight:'bold', color:'red', fontSize:16}}>Inbox</Text></TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => {setQuery('social'),handlefetch()}}><Text style={{fontWeight:'bold', color:'red', fontSize:16}}>Social</Text></TouchableOpacity>
        </View>

        <View style={{width:'100%',height:'100%'}}>
          {loading ?
          <View style={{alignItems:'center',justifyContent:'center', marginTop:50}}>
            <ActivityIndicator size={50} color={'green'}></ActivityIndicator>
            <Text style={{fontSize:13,textAlign:'center', marginTop:20,fontWeight:'bold'}}>Loading And Analysing The Emails</Text>
          </View> :
          <FlatList data={emaildata} style={{height:'100%',flex:1}}
          renderItem={({item}) => 
            <View style={{width:'100%',height:300,backgroundColor:'white',borderRadius:8,padding:20,marginTop:10}}>
              <Text>From : {item.From}</Text>
              <Text>To : {item.To}</Text>
              <Text>Subject : {item.Subject}</Text>
              <Text numberOfLines={6}>Summary : {item.Body}</Text>
              <View style={{flexDirection:'row', gap:10,width:'100%'}}>
              <View style={{marginTop:20, width:100,height:30,backgroundColor:'pink', alignItems:'center', justifyContent:'center',borderRadius:4 }}><Text style={{fontWeight:'light', color:'#B80F08'}}>{item.Meeting.isMeeting && (item.Meeting.meetingData.Time != null) ? 'Meeting' : 'No Meeting'}</Text></View>
              <View style={{marginTop:20, width:100,height:30,backgroundColor:'#3ACBE8', alignItems:'center', justifyContent:'center',borderRadius:4}}><Text style={{fontWeight:'light', color:'#0160C9'}}>Links</Text></View>
              </View>
            </View>
        }
          keyExtractor={item => item.id}/>}
        </View>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardContainer:{
    width:'100%',
    height:200,
    padding:10,
    alignItems:'center',
    justifyContent:'center'
  },
  dashboard:{
    width:'97%',
    height:'97%',
    backgroundColor:'green',
    borderRadius:8,
  }
});
