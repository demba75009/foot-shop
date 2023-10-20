import {createContext, useState}  from "react"

const userJSON = localStorage.getItem('user');

let user = []

if (userJSON) {
  // Désérialisez la chaîne JSON en un objet JavaScript
   user = [JSON.parse(userJSON)];

  // Maintenant, "user" contient votre user précédemment stocké dans le localStorage
} else {
  // Le user n'a pas été trouvé dans le localStorage, vous pouvez initialiser un nouveau user ici si nécessaire
  user = []

}

export const  userContext = createContext(user) 