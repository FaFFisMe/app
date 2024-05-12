import { StyleSheet, Text, View , Image, TextInput, Alert ,Keyboard , Dimensions} from 'react-native'
import React, {useState , useEffect} from 'react'
import logo from "../assets/frame-46.png"
import { useNavigation } from "@react-navigation/native";
import {ENDPOINT_LOGIN} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({}) => {
    const navigation = useNavigation();
    const [fdata, setFdata] = useState({
        Username: '',
        Password: ''
    })
    const Sendtobackend = () => {
        if (fdata.Username == '' || fdata.Password == '') {
            alert('All fields are required');
            return;
        }
        else {
            fetch(ENDPOINT_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json()).then(
                    data => {
                        if (data == null) {
                            alert('Login Failed');
                        }
                        else {
                            try {
                                AsyncStorage.setItem('username',fdata.Username);
                                AsyncStorage.setItem('api_key',data[0])
                                navigation.navigate('Homescreen');
                            }
                            catch (error) {
                                console.error('Error storing API key:', error);
                             }
                        }
                    }
                )
        }
    }
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const container1 = {
        width: 375,
        height: 355,
        paddingBottom: 21,
        marginTop: keyboardIsVisible ? Dimensions.get('window').height * -0.2 : 100,
        alignItems: "center",  
    };
    return (
    <View style={styles.container}>
        <View style={container1}>
            <View style={styles.s1}>
                <Image style={styles.logo} source={logo}/>
                <Text style={styles.small1}>KPI Dashboard Realtime</Text>
            </View>
            <View style={styles.s2}>
                <Text style={styles.head1}>Login</Text>
                <Text style={styles.head2}>Sign In to continue</Text>
                <View style={styles.formgroup}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.input}
                        placeholder='Enter your username'
                        onChangeText={(text) => setFdata({ ...fdata, Username: text.trim() })}
                    />
                </View>
                <View style={styles.formgroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input}
                        placeholder='Enter your password'
                        secureTextEntry={true}
                        
                        onChangeText={(text) => setFdata({ ...fdata, Password: text})}
                    />
                </View>
                <Text style={styles.button1} onPress={() => Sendtobackend()}>Login</Text>
            </View>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: '#001C30',
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
    },
    small1: {
        fontSize: 25,
        color: '#ddd',
        fontWeight: '800',
    },
    h1 :{
        fontSize: 30,
    },
    s2 :{
        display: 'flex',
        backgroundColor: '#176B97',
        width: '90%',
        height: '105%',
        borderRadius:30,
        padding: 20,
    },
    fp: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    logo: {
        height: 150,
        width: 350,
        resizeMode: 'contain',
    },
    head1: {
        fontSize: 30,
        color: '#DAFFFB',
        textAlign: 'center',
        fontWeight: '500',
    },
    head2: {
        fontSize: 20,
        color: '#DAFFFB',
        textAlign: 'center',
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
        marginBottom: 3,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    link:{
        color: '#F50057',
        fontSize: 15,
    },
    button1: {
        backgroundColor: '#FF320D',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        fontSize: 20,
        minWidth: 150,
        textAlign: 'center',
        margin: 10,
    }
})