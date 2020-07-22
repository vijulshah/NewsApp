//react-native
import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
//redux
import { connect } from 'react-redux';
import { setUserId, setEmailId, setDisplayName, setPhotoURL } from '../redux/actions/SetUserData.js';
//Plugins
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import RBSheet from "react-native-raw-bottom-sheet";
//imports
import {categoriesArray} from '../components/CategoriesArray.js';
import colors from '../assets/colors.js';
import TopBar from '../components/TopBar.js';
import Swiper from '../components/Swiper.js';
import Categories from '../components/Categories.js';
import ApiKeys from '../configs/ApiKeys.json';
import Endpoints from '../configs/Endpoints.json';
import styles from '../styles/HomePage.js';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            isModalVisible: false,
            categoriesArray: categoriesArray,
            selectedCategory: categoriesArray[0].name,
            pageNo: 1
        }
    }

    componentDidMount = async() => {
        if(await AsyncStorage.getItem("selectedCategory"))
        {
            this.selectCategory(await AsyncStorage.getItem("selectedCategory"));
        }
        else
        {
            this.selectCategory(this.state.selectedCategory);
        }
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                 <TopBar 
                    title = "My feed"
                    navigation = {this.props.navigation}
                    showFilter = {true}
                    showSettings = {true}
                    showRefresh = {true}
                    showCategories = {()=>this.RBSheet.open()}
                    showModal = {()=>this.setState({ isModalVisible: true })}
                    refreshData = {()=>this.refreshData()}
                />
                <View style={{ height: 0.5, width: "100%", backgroundColor: colors.secondaryLight }}></View>
                {
                    this.state.dataSource.length > 0 ?
                    <Swiper 
                        dataSource = {this.state.dataSource}
                        navigation = {this.props.navigation}
                    />
                    :
                    null
                }
                {
                    this.state.isLoading ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={"large"} color={colors.white}/>
                    </View>
                    :
                    null
                }
                {
                    this.state.isModalVisible === true ?
                    <Modal 
                        animationType = {"none"}  
                        transparent = {true}  
                        hardwareAccelerated = {true}
                        visible = {this.state.isModalVisible} 
                        onRequestClose = {()=>this.setState({ isModalVisible: false })}>  
                        <View style={styles.alertContainer}>
                            <View style={styles.alertModal}>  
                                <ScrollView keyboardShouldPersistTaps={'handled'}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.modalProfileContainer}>
                                    <View style={styles.modelUserIconContainer}>
                                        {
                                            this.props.photoURL === "" ?
                                            <Image 
                                                source = {require("../assets/icons/home/default_user.png")}
                                                style = {styles.modalUserIcon}
                                            />
                                            :
                                            <Image 
                                                source = {{ uri: this.props.photoURL }}
                                                style = {styles.modalUserIcon}
                                            />
                                        }
                                    </View>
                                    <View style={{ flex: 1, paddingRight: 10 }}>
                                        <Text style={styles.modalUsername}>{this.props.displayName}</Text>
                                        <Text style={styles.modalUserEmail}>{this.props.emailId}</Text>
                                    </View>
                                </View>
                                <View style={{ height: 1, width: "100%", backgroundColor: colors.primaryLightest}}></View>
                                <TouchableOpacity style={styles.modalCategoryBtn} onPress={()=>this.doLogout()}>
                                    <Image 
                                        source={require("../assets/icons/home/logout_icon.png")}
                                        style={styles.modalCatIcons}
                                    />
                                    <Text style={styles.modalCatText}>Logout</Text>
                                </TouchableOpacity>
                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Thank you for using news up</Text>
                                </View>
                                </ScrollView>
                            </View>  
                        </View>
                    </Modal>
                    : null
                }
                <RBSheet
                    ref={(ref) => {
                        this.RBSheet = ref;
                    }}
                    animationType="fade"
                    height={Dimensions.get('screen').height - 100}
                    openDuration={150}
                    closeOnDragDown={true}
                    customStyles={{
                        draggableIcon: {
                            backgroundColor: colors.secondaryDark
                        },
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: colors.primaryLightest
                        }
                    }}
                    >
                    <Categories 
                        categoriesArray = {this.state.categoriesArray}
                        selectedCategory = {this.state.category}
                        selectCategory = {(category)=>this.selectCategory(category)}
                    />
                </RBSheet>
            </View>
        );
    }

    selectCategory = async(category) => {
        this.setState({ isLoading: true, dataSource: [] });
        this.RBSheet.close();
        await AsyncStorage.setItem("selectedCategory",category);
        let newCatArray = this.state.categoriesArray;
        this.state.categoriesArray.forEach((cat,index)=>{
            if(cat.name === category)
            {
                newCatArray[index].isSelected = true;
            }
            else
            {
                newCatArray[index].isSelected = false;
            }
        });
        this.setState({
            dataSource: [],
            isLoading: true,
            isModalVisible: false,
            pageNo: 1,
            selectedCategory: category,
            categoriesArray: newCatArray
        });
        this.getData(category,1)
    }

    getData = (category,pageNo) => {
        fetch(Endpoints.everythingUrl+category+"&language=en&sortBy=publishedAt&pageSize=15&page="+pageNo
        +"&apiKey="+ApiKeys.newsApiKey,{
            method: "GET"
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            if(data.status === "ok")
            {
                console.log("res",data);
                let dataSource = this.state.dataSource;
                let count = this.state.dataSource ? this.state.dataSource.length : -1;

                data.articles.forEach((article,index,array)=>{
                    count++;
                    if(article.urlToImage)
                    {
                        let articleData = article;
                        articleData.news_id = count;
                        dataSource.push(articleData);
                    }
                    if(count === array.length)
                    {
                        this.setState({ dataSource: dataSource, isLoading: false });
                    }
                });
            }
        })
        .catch((error)=>{
            console.log("error",error);
            this.setState({ isLoading: false });
        });
    }

    refreshData = () => {
        this.setState({
            dataSource: [],
            isLoading: true,
            isModalVisible: false,
            pageNo: 1,
            categoriesArray: this.state.categoriesArray,
            selectCategory: this.state.selectedCategory
        });
        this.getData(this.state.selectedCategory,1);
    }

    doLogout = async() => {
        try 
        {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('selectedCategory');
            this.props.setUserId("");
            this.props.setEmailId("");
            this.props.setDisplayName("");
            this.props.setPhotoURL("");
            this.props.navigation.navigate("LoginSignup");
        } 
        catch(error) 
        {
            console.error(error);
        }
    }
}

const mapStatetoProps = (state) => ({
    userId: state.userData.userId,
    emailId : state.userData.emailId,
    displayName : state.userData.displayName,
    photoURL : state.userData.photoURL
});

export default connect(mapStatetoProps,{ setUserId,setEmailId,setDisplayName,setPhotoURL })(HomePage);