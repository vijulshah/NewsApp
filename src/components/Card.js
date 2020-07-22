//react-native
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
//imports
import AsyncStorage from '@react-native-community/async-storage';
import DateConversion from './DateConversion.js';
import styles from '../styles/HomePage.js';

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.item;
        return(
            <View style={styles.card}>
                <View style={{ flex: 1 }}>
                    <Image 
                        source={{ uri: item.urlToImage }}
                        style={styles.articleImg}
                    />
                    <Text style={styles.articleTitle}>{item.title}</Text>
                    <View style={styles.authorContainer}>
                        <Text style={styles.authorText}>author : </Text>
                        {
                            item.author ?
                            <Text style={styles.authorText}>{item.author}</Text>
                            :
                            <Text style={styles.authorText}>unknown</Text>
                        }
                    </View>
                    <Text style={styles.articleDesc}>{item.description}</Text>
                    <Text style={styles.dateText}>{DateConversion.getDateTime(item.publishedAt)}</Text>
                </View>
                <TouchableOpacity style={styles.readFullContainer} onPress={()=>this.goToArticleUrl(item.url)}>
                    <Text style={styles.readFullText}>Tap here to read the full article</Text>
                </TouchableOpacity>
            </View>
        );
    }

    goToArticleUrl = (url) => {
        this.props.navigation.push("ShowWebview",{websiteLink: url});
    }
}

export default Card;