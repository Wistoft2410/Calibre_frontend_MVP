import React from 'react';

const access_key = "TEST123";
const serverName = require('../../../appSettings/db.json');
    
    
export const updateData = (dataType, data, user) => {
    fetch(serverName.app.db + 'editUser.php', { 
        method: 'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
          "access_token": access_key,
          "userID" : user,
          "data": data,
          "dataType": dataType,
        })
    })
    .then((response) => response.json())
        .then((responseJson) =>{
          console.log(responseJson);
        })
        .catch((error)=>{
            console.error(error);
        });
    }
 

