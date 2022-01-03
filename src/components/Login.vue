<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
        <h2>Login</h2>
      </v-col>
      <v-col class="mb-5" cols="12">
            <v-text-field
              v-model="email"
              :counter="10"
              label="Email"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :counter="10"
              label="Password"
              required
            ></v-text-field>

          <v-btn
            class="mr-4"
            @click="signUp()"
          >
            Sign Up
          </v-btn>
          <v-btn 
            class="mr-4"
            @click="login()"
          >
            Login
          </v-btn>
          <v-btn 
            class="mr-4"
            @click="loginFromGoogle()"
          >
            Login Google
          </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import dbConexion from '../firebase'
  import { collection  } from 'firebase/firestore/lite';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

    const auth = getAuth();
    
    const provider = new GoogleAuthProvider();
    const colecion = collection(dbConexion, 'usuarios');

  export default {
    name: 'Login',

    data: () => ({
      email:null,
      password:null,
    }),
    mounted(){
      console.log(colecion);
    },
    methods:{
        signUp(){
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorCode);
                    console.log(errorMessage);
                });
        },
        login(){
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                     console.log(errorCode);
                    console.log(errorMessage);
                });
        },
        loginFromGoogle(){
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...
                    console.log(token);
                    console.log(user);
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                    console.log(errorCode);
                    console.log(errorMessage);
                    console.log(email);
                    console.log(credential);
                });
        }
    }
  }
</script>
