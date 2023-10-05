import {createContext, useState}  from "react"

const panierJSON = localStorage.getItem('panier');

let panier = []

if (panierJSON) {
  // Désérialisez la chaîne JSON en un objet JavaScript
   panier = JSON.parse(panierJSON);

  // Maintenant, "panier" contient votre panier précédemment stocké dans le localStorage
} else {
  // Le panier n'a pas été trouvé dans le localStorage, vous pouvez initialiser un nouveau panier ici si nécessaire
  panier = []

}

export const  PanierContext = createContext(panier) 