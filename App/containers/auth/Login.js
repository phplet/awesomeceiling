import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

import ButtonRounded from '@appComponents/widgets/ButtonRounded.js';
import BTNBig from '@appComponents/widgets/BTNBig.js';
import styles from '@appStyles/style.js';
import gradient from '@appStyles/gradient.js';
import LinearGradient from 'react-native-linear-gradient';
import config from '@appRoot/config.js';
import { firebase } from '../../stores/firebaseStore';


import { realm , Sequence } from '@appSchema';

var deviceWidth = Dimensions.get('window').width;


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      value: '',
    };
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      // .then(function(result) {
      //   result.getToken(true).then(function(idToken) {})
      //     .catch(function(error) {
      //       AlertIOS.alert(
      //        'Ошибка авторизации',
      //        'Невозможно получить token',
      //       );
      //     });
      // })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        AlertIOS.alert(
         'Ошибка авторизации',
          errorMessage,
        );
      });
  }
  
  validation = () => {
    const { email, password } = this.state;
    if (password.length <= 5) return false;
    if (!validateEmail(email)) return false;
    return true;
  }

  render(){
    const {store} = this.props;
    console.log('store user: ', store.user);
    return(
      <View style={{ flex: 1 }}>
        <ScrollView style={{backgroundColor: '#ffffff'}}>
          <View style={{marginTop: 80, marginBottom: 20}}>
            <Image style={{alignSelf: 'center'}} source={require('@appImages/icon.png')}/>
            <Text style={styles.h1Center}>
              Авторизация
            </Text>
            <Text style={styles.textCenter}>
              Постройте свою идеальную компанию
            </Text>
          </View>
          <View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.textInput}
                placeholder={'email'}
                placeholderTextColor={'#bcc5c9'}
                onChangeText={(value) => this.setState({email: value})}/>
              <TextInput
                style={styles.textInput}
                placeholder={'пароль'}
                secureTextEntry={true}
                placeholderTextColor={'#bcc5c9'}
                onChangeText={(value) => this.setState({password: value})}/>
            </View>
            <BTNBig
              disabled={!this.validation()}
              disabledText={{title: 'Данные введены некорректно', description: ''}}
              onPress={ ()=> this.login() }
              text="Войти" />
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={()=>Actions.register()}>
              <Text style={styles.textCenter}>Еще нет аккаунта?<Text style={{color: '#06bebd'}}> Зарегистрироваться</Text></Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    )
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
