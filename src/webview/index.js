import { View, Text, Linking, BackHandler, useRef, TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';

import React from 'react'

export default function WebViewScreen() {
     
    const handleExternalLink = (request) => {
        const url = request.url;
        // Check if URL is external using regex or URL library
        if (url) {
          // Open link in native browser
          Linking.openURL(url);
          return false; // prevent default WebView navigation
        } else {
          // Allow navigation within WebView
          return true;
        }
      };
     
  return (
    <View
        style={{width:'100%',height:'100%',flex:1, backgroundColor:'red'}}
    >
        {/* <TouchableOpacity onPress={backAction} style={{width:'100%',height:30,backgroundColor:'red'}}>
                    <Text>go back</Text>
        </TouchableOpacity> */}

            <WebView     
                onError={console.error.bind(console, 'error')}
                javaScriptEnabled={true}
                source={{ uri: `https://www.makemyhouse.com/` }}  style={{ flex: 1, height:'100%',width:'100%' }} 
                injectedJavaScript={`
                (function(){
                    var attachEvent = function(elem, event, callback) {
                    event = event.replace(/^on/g, '');
                    if ( 'addEventListener' in window ) {
                        elem.addEventListener(event, callback, false);
                    } else if ( 'attachEvent' in window ) {
                        elem.attachEvent('on'+event, callback);
                    } else {
                        var registered = elem['on' + event];
                        elem['on' + event] = registered ? function(e) {
                        registered(e);
                        callback(e);
                        } : callback;
                    }
                    return elem;
                    }
                    var all_links = document.querySelectorAll('a[href]');
                    if ( all_links ) {
                    for ( var i in all_links ) {
                        if ( all_links.hasOwnProperty(i) ) {
                        attachEvent(all_links[i], 'onclick', function(e){
                            if ( ! new RegExp( '^https?:\/\/' + location.host, 'gi' ).test( this.href ) ) {
                            // handle external URL
                            e.preventDefault();
                            window.location = this.href;
                            }
                        });
                        }
                    }
                    }
                })();
                `}
            /> 
         
    </View>
  )
}