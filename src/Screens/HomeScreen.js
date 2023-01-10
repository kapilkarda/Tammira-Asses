import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Image, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostApi, AddPostApi } from '../components/actions/HomeAction';
import Modal from "react-native-modal";
import { Images } from '../Utils/Images';

let RespHeight = Dimensions.get('window').height;

export const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    //***** This is for getting response from reducer *****//
    const getHomepostData = useSelector((state) => state.homeRedu.HOME_LIST_RES);
    const getAddPostData = useSelector((state) => state.homeRedu.ADD_POST_RES);

    const [postsArray, setPostsArray] = useState([]);
    const [isPostModalVisible, setIsPostModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //***** This is for calling api on page load *****//
    useEffect(() => {
        getPostsList();
    }, [])

    //***** This is get post api function *****//
    const getPostsList = () => {
        dispatch(GetPostApi());
    }

    //***** This useEffect will call when we get the post from api *****//
    useEffect(() => {
        if (getHomepostData) {
            setPostsArray(getHomepostData)
        }
    }, [getHomepostData])

    //***** This useEffect will call after adding new post *****//
    useEffect(() => {
        let newArray = postsArray
        if (getAddPostData) {
            const newObj = getAddPostData
            newArray.unshift(newObj)
            dispatch({ type: 'GetPostLists', payload: newArray });
            dispatch({ type: 'AddPost', payload: '' });
        }
    }, [getAddPostData])

    //***** This is the FlatList design *****//
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemMainView}>
                <Text numberOfLines={1} style={styles.titleTextStyle}>Title:- {item.title}</Text>
                <Text style={styles.descriptionTextStyle}>Description:- {item.body}</Text>
            </View>
        )
    }

    //***** This function is for closing the modal *****//
    const closeModal = () => {
        setIsPostModalVisible(false);
    }

    //***** This function will call on Submit button *****//
    const submitPostApi = () => {
        let heighest = 0;
        let newId = 0
        for (let i = 0; i < postsArray.length; i++) {
            if (postsArray[i].userId > heighest) {
                heighest = postsArray[i].userId,
                    newId = postsArray[i].id
            }
        }
        if (title == "") {
            Alert.alert('Please enter title');
        } else if (body == "") {
            Alert.alert('Please enter body');
        } else {
            const payload = {
                title: title,
                body: body,
                userId: heighest + 1,
                id: newId
            }
            dispatch(AddPostApi(payload));
            setIsPostModalVisible(false);
            setBody('');
            setTitle('');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listMainView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentOffset={{ x: 0, y: 0 }}
                    data={postsArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
            <TouchableOpacity onPress={() => setIsPostModalVisible(true)} style={styles.postBtnStyle}>
                <Text style={styles.addPostTextStyle}>Add Post</Text>
            </TouchableOpacity>
            <Modal
                isVisible={isPostModalVisible}
                hasBackdrop={true}
                animationIn='slideInUp'
                style={styles.modalStyle}
                onBackdropPress={() => closeModal()}
            >
                <View style={styles.modalDesignMainView}>
                    <TouchableOpacity
                        onPress={() => closeModal()}
                        style={{ alignSelf: 'flex-end' }}>
                        <Image source={Images.closeIcon} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.topMargin}>
                        <Text>Title</Text>
                        <TextInput
                            placeholder='Enter title'
                            style={styles.textInputStyle}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.topMargin}>
                        <Text>Body</Text>
                        <TextInput
                            placeholder='Enter body'
                            style={styles.textInputStyle}
                            value={body}
                            onChangeText={(text) => setBody(text)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => submitPostApi()}
                        style={styles.submitBtnStyle}>
                        <Text style={styles.addPostTextStyle}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listMainView: {
        height: RespHeight - 200,
        width: '100%',
        paddingHorizontal: 10
    },
    itemMainView: {
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        borderRadius: 10
    },
    titleTextStyle: {
        textTransform: 'capitalize'
    },
    descriptionTextStyle: {
        marginTop: 5
    },
    postBtnStyle: {
        padding: 20,
        width: '95%',
        backgroundColor: '#2596be',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    addPostTextStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalStyle: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    modalDesignMainView: {
        height: RespHeight / 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    textInputStyle: {
        height: 50,
        backgroundColor: '#e6e6e6',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 5
    },
    submitBtnStyle: {
        padding: 20,
        width: '100%',
        backgroundColor: '#2596be',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '20%'
    },
    closeIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    topMargin: {
        marginTop: 15
    }


})