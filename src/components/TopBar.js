//react-native
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
//imports
import ApiKeys from '../configs/ApiKeys.json';
import styles from '../styles/TopBar.js';
import colors from '../assets/colors';

class TopBar extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                {
                    this.props.showFilter === true ? 
                    <TouchableOpacity style={[styles.button,{ left: 5 }]} onPress={()=>this.props.showCategories()}>
                        <Image
                            source={require("../assets/icons/topBar/filter_icon.png")}
                            style={styles.filterIcon}
                        />
                    </TouchableOpacity>
                    :
                    null
                }
                {
                    this.props.showRefresh === true ? 
                    <TouchableOpacity style={[styles.button,{ right: 60 }]} onPress={()=>this.props.refreshData()}>
                        <Image
                            source={require("../assets/icons/topBar/refresh_icon.png")}
                            style={styles.settingsIcon}
                        />
                    </TouchableOpacity>
                    :
                    null
                }
                {
                    this.props.showSettings === true ? 
                    <TouchableOpacity style={[styles.button,{ right: 5 }]} onPress={()=>this.props.showModal()}>
                        <Image
                            source={require("../assets/icons/topBar/settings_icon.png")}
                            style={styles.settingsIcon}
                        />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        );
    }
}

export default TopBar;