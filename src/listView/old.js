import React,{useRef, useState,useEffect, useCallback} from 'react'
import {VirtualizedList,  View, StyleSheet,  Dimensions , Text, Image, TouchableOpacity } from 'react-native'



let APIURL = 'https://api.makemyhouse.com/';
import axios from 'axios';
 
 
import ImageContainer from './ImageContainer';
const Width = Dimensions.get('window').width;  
const Height = Dimensions.get('window').height;  

var project = new Array();  
export default ListView =({ navigation }) => {   
         

  const [token,setToken] = useState('549a41a70b1036ab93eeaaf92e139544');
  const [loader, setLoader] = useState(true);
  // const [project,setproject] = useState([]) 
  const [page,setPage] = useState(1);
  const [continueLoading,setContinuesLoading] = useState(false);
    useEffect(()=>{
        setPage(1);
        Trendingapicall()
    },[]);
    const Trendingapicall = async () => {
        setLoader(true); 
        let url = `${APIURL}public/projects?page=${page}&limit=9&mode=app&token=${token}`
        try {
            console.log("trendingapical func url:",url)
            const response = await axios.get(url);
            setLoader(false); 
            // console.log(response.data)
            response.data.map((item,index)=>{
                project.push(item)
            });
            
        } catch (error) { 
            console.log(error);
        }finally{
            setPage(page+1); 
        }
    };
 
    const infiniteScrolling = async ()=>{ 
        if(continueLoading){
            return;
        }
        
        let url = `${APIURL}public/projects?page=${page}&limit=9&mode=app`;
        console.log("infinite func url:",url)
        try {
            setContinuesLoading(true);
            const response = await axios.get(url); 
            console.log(response.data.length); 
           
            response.data.map((item,index)=>{
                project.push(item)
            });
        } catch (error) {
             console.log("ContinueLoading...",error.message);
        }
        finally{
            setPage(page+1);
            setContinuesLoading(false);
        }
    }
 
    // VirtualizedList
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }

    // redner footer element 
    const renderFooter = () => {
        return continueLoading ? (
          <View style={{ padding: 10, justifyContent:'center', alignContent:'center', alignItems:'center',height:260,  }}>
                <View style={{width:'100%',height:'100%',backgroundColor:'#ddd'}}>
                </View>                
          </View>
        ) : null;
    };
      
    
    const renderItem = useCallback(({item,index}) => (
        <View key={index+1} style={{width:'100%',minHeight:90,backgroundColor:'#f1f1f1',borderRadius:9,overflow:'hidden', borderWidth:1,
        borderColor:'#eeeee4',
        shadowColor: '#ddd',  
        elevation: 11, 
        shadowOffset:{width:8,height:8},
        shadowOpacity:0.34,
        shadowRadius:3,
        marginBottom:12
        }}>          
        <View style={{width:'100%',minHeight:10,backgroundColor:'#fec107',padding:6,flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:12, color:'#131313'}}>Customize Now @Just Rs.1200/-</Text>
            <Text style={{fontSize:12, color:'#fff'}}>60% OFF</Text>
        </View>
        <View style={{padding:6}}>
            <ImageContainer navigation={navigation} index={index} data={item.image.img} projectId={item.projectID}/>
        </View>
        <View style={{width:'100%',minHeight:10,backgroundColor:'#fec107'}}> 
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{padding:6,width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:13, color:'#ffff'}}>SQFT</Text>   
                </View>
                <View style={{padding:6,width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderBottomWidth:0,borderColor:"#dee3e0",borderEndWidth:0}}>
                    <Text style={{fontSize:13, color:'#fff'}}>FLOORS</Text>  
                </View>
                <View style={{padding:6,width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderBottomWidth:0,borderColor:"#dee3e0"}}>
                    <Text style={{fontSize:13, color:'#fff'}}>DIRECTION</Text>  
                </View>
                <View style={{padding:6, width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:13, color:'#fff'}}>BEDROOM</Text>  
                </View> 
            </View>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{padding:10, width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:14, color:'#131313'}}>{item.carpet_area}</Text>   
                </View>
                <View style={{padding:10,width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderBottomWidth:0,borderColor:"#dee3e0",borderEndWidth:0}}>
                    <Text style={{fontSize:14, color:'#131313'}}>{item.floors}</Text>  
                </View>
                <View style={{padding:10,width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderBottomWidth:0,borderColor:"#dee3e0",}}>
                    <Text style={{fontSize:14, color:'#131313'}}>{item.direction}</Text>  
                </View>
                <View style={{padding:10, width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:14, color:'#131313'}}>{item.bedroom}</Text>  
                </View> 
            </View>
        </View>
    </View>
    ), []); 
    

  return (
    <View>
            <View style={{height:60,width:'100%',padding:8,backgroundColor:'#f1f1f1',borderBottomColor:'#212121',borderBottomWidth:1,flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>    
              <Text style={{fontSize:16,color:"#000"}}>Project List</Text>
            </View>
         
          {
            project&& 
            <VirtualizedList
                windowSize={2} 
                initialNumToRender={2}
                data={project}
                
                renderItem={renderItem}
                keyExtractor={(item,index) => index}
                getItemCount={getItemCount}
                getItem={getItem}
                onEndReached={infiniteScrolling}
                onEndReachedThreshold={0.7}
                ListFooterComponent={renderFooter}
                style={{
                    backgroundColor:'#f0f0f0',
                    padding:8
                }}
                showsHorizontalScrollIndicator={false} 
                snapToAlignment={'start'}
                snapToInterval={260}
                decelerationRate={'fast'}

            />
          }
         
    </View> 
  )
}

const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 200,
      backgroundColor: '#DDDDDD',
      padding: 20,
    },
    slide: {
      width:'100%',
      height:'100%',  
      paddingRight:0,paddingEnd:0
    },
  });