//react-native
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from '../styles/Categories.js';

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesArray: this.props.categoriesArray,
            selectedCategory: this.props.selectedCategory
        }
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <FlatList 
                    extraData={this.state}
                    keyboardShouldPersistTaps={'handled'} 
                    showsVerticalScrollIndicator={false} 
                    style={{ flex: 1, width: "100%", paddingTop: 15 }}
                    data={this.state.categoriesArray}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.cardContainer} onPress={()=>this.selectCategory(item)}>
                            <Image
                                source={item.image}
                                style={styles.cardImg}
                            />
                            {
                                item.isSelected ?
                                <Image
                                    source={require('../assets/icons/home/selected.png')}
                                    style={styles.selectedImg}
                                />
                                :
                                null  
                            }
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    selectCategory = (item) => {
        if(!item.isSelected)
        this.props.selectCategory(item.name);
    }
}

export default Categories;