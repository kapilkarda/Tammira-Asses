import { Alert } from 'react-native';
import { API } from '../../Utils/BaseUrl';

let tempArray = []

//***** Posts Get Api *****//
export const GetPostApi = () => {
    return async dispatch => {
        fetch(`${API.BASE}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                tempArray = [];
                for(let i = 0; i < 10; i++){
                    tempArray.push({title:res[i].title, body: res[i].body, userId: i + 1})
                }
                dispatch({ type: 'GetPostLists', payload: tempArray });
            })
            .catch(e => {
                if (e.message !== 'error is not defined') {
                    if (e.message === 'Network request failed') {
                        Alert.alert('No Internet Connection');
                    } else {
                        Alert.alert(e.message);
                    }
                }
            });
    };
};

//***** Add Post Api *****//
export const AddPostApi = (request) => {
    return async dispatch => {
        fetch(`${API.BASE}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
            .then(res => res.json())
            .then(res => {
                dispatch({ type: 'AddPost', payload: res });
            })
            .catch(e => {
                if (e.message !== 'error is not defined') {
                    if (e.message === 'Network request failed') {
                        Alert.alert('No Internet Connection');
                    } else {
                        Alert.alert(e.message);
                    }
                }
            });
    };
};