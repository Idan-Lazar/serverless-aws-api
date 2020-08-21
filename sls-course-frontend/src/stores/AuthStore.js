import { observable, action } from 'mobx';
import Axios from 'axios';
import OverlayStore from './OverlayStore';
import qs from 'querystring'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


const axios = Axios.create({
  baseURL: process.env.REACT_APP_AUTH0,
});
const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}

class AuthStore {
  
  @observable token = Cookies.get('token');
  @observable claims;
  @observable email = Cookies.get('email');;
  @action
  async signIn(email,password,remember) {
    try {
      OverlayStore.setLoadingSpinner(true);
      const result = await axios.post('/oauth/token',qs.stringify({
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        username : email,
        password,
        grant_type: 'password',
        scope: 'openid'
      }),headers);

      this.token = result.data.id_token;
      var decoded = jwt_decode(this.token);
      this.setClaims(decoded)
      if(remember){
        Cookies.set('token', result.data.id_token);
        Cookies.set('email', decoded.email);
      }
      OverlayStore.setLoadingSpinner(false);
    } catch (error) {
      alert('Could not fetch auctions! Check console for more details.');
      console.error(error);
    }
  }
  @action
  async socialSignIn(code) {
    try {
      OverlayStore.setLoadingSpinner(true);
      const result = await axios.post('/oauth/token',qs.stringify({
        client_id: 'ebvnIdewrkmc55kM5swdczoeMQbKG6Ru',
        client_secret : '-4B-0hkQzctIhGTyOmZYeCfiYKBVqkNpd3eWquRb6aNuumJAp_zaVXEjsR-1dNF6',
       redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code',
        code,
        scope: 'openid'
      }),headers);
      this.token = result.data.id_token;
      var decoded = jwt_decode(this.token);
      this.setClaims(decoded)
      Cookies.set('token', result.data.id_token);
      Cookies.set('email', decoded.email);
      OverlayStore.setLoadingSpinner(false);
    } catch (error) {
      alert('Could not fetch auctions! Check console for more details.');
      console.error(error);
    }
  }

  @action
  async signUp(email,password,remember) {
    try {
      OverlayStore.setLoadingSpinner(true);
      const result = await axios.post('/dbconnections/signup',{
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        email,
        password,
        connection: 'Username-Password-Authentication'
      });
      await this.signIn(email,password,remember)
      OverlayStore.setLoadingSpinner(false);
    } catch (error) {
      alert('Could not fetch auctions! Check console for more details.');
      console.error(error);
    }
  }

  @action
  signOut() {
    this.token = null;
    Cookies.remove('token')
    Cookies.remove('email')
    this.email = null
  }

  @action
  setToken(token) {
    this.token = token;
  }

  @action
  setClaims(claims) {
    this.claims = claims;
    this.email = claims.email;
  }
}

export default new AuthStore();