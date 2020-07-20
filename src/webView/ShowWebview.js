import React from 'react';  
import { WebView } from 'react-native-webview';

class ShowWebview extends React.Component {

    render() {
        return( <WebView source = {{ uri: this.props.navigation.getParam("websiteLink") }} /> );
    }
}

export default ShowWebview;