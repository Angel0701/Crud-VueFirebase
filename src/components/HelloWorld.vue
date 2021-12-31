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
      </v-col>
      <v-col class="mb-5" cols="12">
            <v-text-field
              v-model="name"
              :counter="10"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastname"
              :counter="10"
              label="Last Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="age"
              :counter="10"
              label="Age"
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="sex"
              :counter="10"
              label="Sex"
              required
            ></v-text-field> -->

            <v-select
              v-model="sex"
              :items="sexList"
              label="Sex"
              required
            ></v-select>
         
            <!-- <v-text-field
              v-model="status"
              :counter="7"
              label="Status"
              required
            ></v-text-field> -->

            <v-select
              v-model="status"
              :items="statusList"
              label="Status"
              required
            ></v-select>

          <v-btn
            class="mr-4"
            @click="addUser()"
          >
            submit
          </v-btn>
          <v-btn >
            clear
          </v-btn>
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row cols="12" align-content="center">
          <v-simple-table >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Last Name
                  </th>
                  <th class="text-left">
                    Age
                  </th>
                  <th class="text-left">
                    Sex
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-left">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in usuarios"
                  :key="item.id"
                >
                  <td>{{ item.data.name }}</td>
                  <td>{{ item.data.lastname }}</td>
                  <td>{{ item.data.age }}</td>
                  <td>{{ item.data.sex }}</td>
                  <td>{{ item.data.status }}</td>
                  <td>
                    <v-icon left
                      @click="updateUser(item.id)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon left
                      @click="deleteUser(item.id)"
                    >
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dbConexion from '../firebase'
  import { addDoc, collection, getDocs, doc, setDoc, deleteDoc  } from 'firebase/firestore/lite';

  const colecion = collection(dbConexion, 'usuarios');

  export default {
    name: 'HelloWorld',

    data: () => ({
      name:null,
      lastname:null,
      age:null,
      sex:null,
      status:null,
      sexList:["Female","Male"],
      statusList:["Active","Inactive"],
      usuarios:[],
      getUserId:'',
    }),
    mounted(){
      this.getUserList();
    },
    methods:{
      getUserList(){
        this.usuarios=[];
        getDocs(colecion).then( 
              (r) => r.docs.map( (item) => this.usuarios.push({id:item.id, data:item.data()})));
      },
      addUser(){
        addDoc(colecion,{name:this.name, lastname:this.lastname, age:this.age, sex:this.sex, status:this.status}).then( 
          this.getUserList)
      },
      updateUser(id){
        this.getUserId = doc(collection(dbConexion, 'usuarios'),id);
        console.log(id)
        console.log('============')
        console.log(this.getUserId)
        setDoc(this.getUserId,{name:this.name, lastname:this.lastname, age:this.age, sex:this.sex, status:this.status}).then( 
          this.getUserList)
      },
      deleteUser(id){
        this.getUserId = doc(collection(dbConexion, 'usuarios'),id);
        console.log('============')
        console.log(this.getUserId)
        deleteDoc(this.getUserId).then( 
          this.getUserList);
      }
    }
  }
</script>
