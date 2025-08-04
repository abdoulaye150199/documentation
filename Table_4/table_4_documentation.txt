# Table 4: Méthodes de tableaux et utilitaires

Cette section détaille les méthodes courantes de manipulation de tableaux en TypeScript, ainsi que des utilitaires de type et de vérification. Ces outils sont essentiels pour travailler efficacement avec des collections de données.

## Opérateurs de type et de vérification

### Typeof

L'opérateur `typeof` en JavaScript (et donc en TypeScript) retourne une chaîne de caractères indiquant le type de l'opérande non évalué. Il est couramment utilisé pour les gardes de type.

```typescript
function afficherType(valeur: any): void {
  console.log(`La valeur ${valeur} est de type: ${typeof valeur}`);
}

afficherType(10); // Output: La valeur 10 est de type: number
afficherType("hello"); // Output: La valeur hello est de type: string
afficherType(true); // Output: La valeur true est de type: boolean
afficherType({}); // Output: La valeur [object Object] est de type: object
afficherType([]); // Output: La valeur  est de type: object
afficherType(null); // Output: La valeur null est de type: object (un bug historique de JavaScript)
afficherType(undefined); // Output: La valeur undefined est de type: undefined

// Utilisation avec les gardes de type
function traiterValeur(valeur: string | number): void {
  if (typeof valeur === "string") {
    console.log(valeur.toUpperCase());
  } else {
    console.log(valeur.toFixed(2));
  }
}

traiterValeur("typescript");
traiterValeur(123.456);
```

### In

L'opérateur `in` vérifie si une propriété existe dans un objet ou dans sa chaîne de prototype. Il est également utilisé comme garde de type pour affiner les types d'objets.

```typescript
interface Voiture {
  marque: string;
  modele: string;
  annee?: number;
}

interface Moto {
  marque: string;
  cylindree: number;
}

function estVoiture(vehicule: Voiture | Moto): vehicule is Voiture {
  return "modele" in vehicule;
}

const maVoiture: Voiture = { marque: "Toyota", modele: "Corolla" };
const maMoto: Moto = { marque: "Honda", cylindree: 600 };

if (estVoiture(maVoiture)) {
  console.log(`C'est une voiture: ${maVoiture.modele}`);
} else {
  console.log(`C'est une moto: ${maMoto.cylindree}`);
}

// Vérification de propriété optionnelle
const voitureAvecAnnee: Voiture = { marque: "BMW", modele: "X5", annee: 2020 };
if ("annee" in voitureAvecAnnee) {
  console.log(`Année de la voiture: ${voitureAvecAnnee.annee}`);
}
```

### Instanceof

L'opérateur `instanceof` vérifie si un objet est une instance d'une classe spécifique ou d'une classe qui hérite de celle-ci. C'est une garde de type très utile pour les hiérarchies de classes.

```typescript
class Animal {
  nom: string;
  constructor(nom: string) { this.nom = nom; }
}

class Chien extends Animal {
  aboyer(): void { console.log("Woof!"); }
}

class Chat extends Animal {
  miauler(): void { console.log("Meow!"); }
}

function faireParler(animal: Animal): void {
  if (animal instanceof Chien) {
    animal.aboyer();
  } else if (animal instanceof Chat) {
    animal.miauler();
  } else {
    console.log(`${animal.nom} ne fait pas de bruit connu.`);
  }
}

const monChien = new Chien("Buddy");
const monChat = new Chat("Whiskers");
const monAnimal = new Animal("Inconnu");

faireParler(monChien);
faireParler(monChat);
faireParler(monAnimal);
```

## Méthodes de tableaux

### Foreach

La méthode `forEach()` exécute une fonction fournie une fois pour chaque élément du tableau. Elle ne retourne rien (`void`).

```typescript
const nombres = [1, 2, 3, 4, 5];

console.log("Utilisation de forEach:");
nombres.forEach((nombre, index) => {
  console.log(`L'élément à l'index ${index} est ${nombre}`);
});

let somme = 0;
nombres.forEach(nombre => {
  somme += nombre;
});
console.log(`Somme des nombres: ${somme}`); // Output: 15
```

### LastIndexOf

La méthode `lastIndexOf()` retourne le dernier index auquel un élément donné peut être trouvé dans le tableau, ou -1 s'il n'est pas présent. La recherche s'effectue à l'envers à partir de l'index de départ spécifié.

```typescript
const fruits = ["pomme", "banane", "orange", "pomme", "kiwi"];

console.log(fruits.lastIndexOf("pomme")); // Output: 3
console.log(fruits.lastIndexOf("orange")); // Output: 2
console.log(fruits.lastIndexOf("raisin")); // Output: -1

// Recherche à partir d'un index spécifique
console.log(fruits.lastIndexOf("pomme", 2)); // Output: 0 (recherche à partir de l'index 2 vers le début)
```

### Every

La méthode `every()` teste si tous les éléments d'un tableau passent le test implémenté par la fonction fournie. Elle retourne un booléen.

```typescript
const ages = [18, 20, 22, 19, 25];

const tousMajeurs = ages.every(age => age >= 18);
console.log(`Tous les âges sont-ils majeurs? ${tousMajeurs}`); // Output: true

const tousPairs = ages.every(age => age % 2 === 0);
console.log(`Tous les âges sont-ils pairs? ${tousPairs}`); // Output: false

const tableauVide: number[] = [];
console.log(tableauVide.every(x => x > 0)); // Output: true (pour un tableau vide, every retourne toujours true)
```

### Unshift

La méthode `unshift()` ajoute un ou plusieurs éléments au début d'un tableau et retourne la nouvelle longueur du tableau.

```typescript
const fruits = ["banane", "orange"];
console.log(`Tableau initial: ${fruits}`);

const nouvelleLongueur1 = fruits.unshift("pomme");
console.log(`Après unshift("pomme"): ${fruits}, Nouvelle longueur: ${nouvelleLongueur1}`);
// Output: Après unshift("pomme"): pomme,banane,orange, Nouvelle longueur: 3

const nouvelleLongueur2 = fruits.unshift("kiwi", "mangue");
console.log(`Après unshift("kiwi", "mangue"): ${fruits}, Nouvelle longueur: ${nouvelleLongueur2}`);
// Output: Après unshift("kiwi", "mangue"): kiwi,mangue,pomme,banane,orange, Nouvelle longueur: 5
```

### Sort

La méthode `sort()` trie les éléments d'un tableau en place et retourne le tableau trié. Le tri par défaut est alphabétique pour les chaînes et par ordre croissant pour les nombres (avec une fonction de comparaison).

```typescript
const noms = ["Charlie", "Alice", "Bob"];
noms.sort();
console.log(`Noms triés: ${noms}`); // Output: Noms triés: Alice,Bob,Charlie

const nombres = [40, 1, 5, 200];
nombres.sort((a, b) => a - b); // Tri numérique croissant
console.log(`Nombres triés (croissant): ${nombres}`); // Output: Nombres triés (croissant): 1,5,40,200

nombres.sort((a, b) => b - a); // Tri numérique décroissant
console.log(`Nombres triés (décroissant): ${nombres}`); // Output: Nombres triés (décroissant): 200,40,5,1

interface Produit {
  nom: string;
  prix: number;
}

const produits: Produit[] = [
  { nom: "Laptop", prix: 999 },
  { nom: "Souris", prix: 25 },
  { nom: "Clavier", prix: 75 }
];

produits.sort((a, b) => a.prix - b.prix); // Tri par prix
console.log("Produits triés par prix:", produits);
```

### Splice

La méthode `splice()` modifie le contenu d'un tableau en supprimant des éléments existants et/ou en ajoutant de nouveaux éléments. Elle retourne un tableau contenant les éléments supprimés.

```typescript
const fruits = ["pomme", "banane", "orange", "kiwi", "mangue"];
console.log(`Tableau initial: ${fruits}`);

// Supprimer 2 éléments à partir de l'index 2
const elementsSupprimes1 = fruits.splice(2, 2);
console.log(`Après suppression: ${fruits}, Éléments supprimés: ${elementsSupprimes1}`);
// Output: Après suppression: pomme,banane,mangue, Éléments supprimés: orange,kiwi

// Ajouter des éléments à partir de l'index 1, sans supprimer
const elementsSupprimes2 = fruits.splice(1, 0, "raisin", "cerise");
console.log(`Après ajout: ${fruits}, Éléments supprimés: ${elementsSupprimes2}`);
// Output: Après ajout: pomme,raisin,cerise,banane,mangue, Éléments supprimés: 

// Remplacer des éléments
const elementsSupprimes3 = fruits.splice(2, 1, "ananas");
console.log(`Après remplacement: ${fruits}, Éléments supprimés: ${elementsSupprimes3}`);
// Output: Après remplacement: pomme,raisin,ananas,banane,mangue, Éléments supprimés: cerise
```

### Filter

La méthode `filter()` crée un nouveau tableau avec tous les éléments qui passent le test implémenté par la fonction fournie.

```typescript
const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const nombresPairs = nombres.filter(nombre => nombre % 2 === 0);
console.log(`Nombres pairs: ${nombresPairs}`); // Output: [2, 4, 6, 8, 10]

const mots = ["apple", "banana", "grape", "kiwi", "orange"];
const motsLongs = mots.filter(mot => mot.length > 5);
console.log(`Mots de plus de 5 caractères: ${motsLongs}`); // Output: ["banana", "orange"]

interface Utilisateur {
  nom: string;
  actif: boolean;
}

const utilisateurs: Utilisateur[] = [
  { nom: "Alice", actif: true },
  { nom: "Bob", actif: false },
  { nom: "Charlie", actif: true }
];

const utilisateursActifs = utilisateurs.filter(user => user.actif);
console.log("Utilisateurs actifs:", utilisateursActifs);
```

### Shift

La méthode `shift()` supprime le premier élément d'un tableau et retourne cet élément. Cette méthode modifie la longueur du tableau.

```typescript
const fruits = ["pomme", "banane", "orange"];
console.log(`Tableau initial: ${fruits}`);

const premierFruit = fruits.shift();
console.log(`Élément supprimé: ${premierFruit}, Tableau restant: ${fruits}`);
// Output: Élément supprimé: pomme, Tableau restant: banane,orange

const deuxiemeFruit = fruits.shift();
console.log(`Élément supprimé: ${deuxiemeFruit}, Tableau restant: ${fruits}`);
// Output: Élément supprimé: banane, Tableau restant: orange

const dernierFruit = fruits.shift();
console.log(`Élément supprimé: ${dernierFruit}, Tableau restant: ${fruits}`);
// Output: Élément supprimé: orange, Tableau restant: 

const tableauVide: string[] = [];
const resultatVide = tableauVide.shift();
console.log(`Shift sur tableau vide: ${resultatVide}`); // Output: Shift sur tableau vide: undefined
```

### Reduce

La méthode `reduce()` exécute une fonction de rappel (reducer) sur chaque élément du tableau, de gauche à droite, afin de réduire le tableau à une seule valeur.

```typescript
const nombres = [1, 2, 3, 4, 5];

// Somme de tous les nombres
const somme = nombres.reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante, 0);
console.log(`Somme: ${somme}`); // Output: 15

// Concaténation de chaînes
const mots = ["Hello", "World", "TypeScript"];
const phrase = mots.reduce((acc, mot) => acc + " " + mot);
console.log(`Phrase: ${phrase}`); // Output: Hello World TypeScript

// Compter les occurrences d'éléments
const fruits = ["pomme", "banane", "pomme", "orange", "banane", "pomme"];
const compteFruits = fruits.reduce((acc: { [key: string]: number }, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("Compte des fruits:", compteFruits);
// Output: Compte des fruits: { pomme: 3, banane: 2, orange: 1 }
```

### Join

La méthode `join()` crée et retourne une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau. Le séparateur entre les éléments est spécifié en argument.

```typescript
const elements = ["pomme", "banane", "orange"];

const chaine1 = elements.join(); // Séparateur par défaut: virgule
console.log(`Chaîne par défaut: ${chaine1}`); // Output: pomme,banane,orange

const chaine2 = elements.join("-");
console.log(`Chaîne avec tiret: ${chaine2}`); // Output: pomme-banane-orange

const chaine3 = elements.join(" ");
console.log(`Chaîne avec espace: ${chaine3}`); // Output: pomme banane orange

const chaine4 = elements.join("");
console.log(`Chaîne sans séparateur: ${chaine4}`); // Output: pommebananeorange
```

### ReduceRight - reduceLeft

`reduceRight()` est similaire à `reduce()`, mais elle traite les éléments du tableau de droite à gauche. `reduceLeft` n'est pas une méthode standard de JavaScript/TypeScript; il s'agit probablement d'une confusion avec `reduce` qui opère de gauche à droite.

```typescript
const nombres = [1, 2, 3, 4, 5];

// Reduce (de gauche à droite)
const sommeGauche = nombres.reduce((acc, val) => acc + val, 0);
console.log(`Somme (gauche à droite): ${sommeGauche}`); // Output: 15

// ReduceRight (de droite à gauche)
const chaineInverse = nombres.reduceRight((acc, val) => acc + String(val), "");
console.log(`Chaîne inverse: ${chaineInverse}`); // Output: 54321

// Exemple de traitement de droite à gauche
const operations = [
  (x: number) => x + 1,
  (x: number) => x * 2,
  (x: number) => x - 3
];

// Appliquer les opérations de droite à gauche
const resultat = operations.reduceRight((acc, fn) => fn(acc), 10); // (10 - 3) * 2 + 1 = 15
console.log(`Résultat des opérations de droite à gauche: ${resultat}`); // Output: 15
```

### Concat

La méthode `concat()` est utilisée pour fusionner deux ou plusieurs tableaux. Cette méthode ne modifie pas les tableaux existants, mais retourne un nouveau tableau.

```typescript
const tableau1 = [1, 2];
const tableau2 = [3, 4];
const tableau3 = [5, 6];

const nouveauTableau = tableau1.concat(tableau2, tableau3);
console.log(`Nouveau tableau: ${nouveauTableau}`); // Output: [1, 2, 3, 4, 5, 6]
console.log(`Tableau 1 original: ${tableau1}`); // Output: Tableau 1 original: 1,2

// Concaténation avec des valeurs individuelles
const fruits = ["pomme", "banane"];
const nouveauxFruits = fruits.concat("orange", "kiwi");
console.log(`Nouveaux fruits: ${nouveauxFruits}`); // Output: ["pomme", "banane", "orange", "kiwi"]
```

### Some

La méthode `some()` teste si au moins un élément du tableau passe le test implémenté par la fonction fournie. Elle retourne un booléen.

```typescript
const nombres = [1, 2, 3, 4, 5];

const contientPair = nombres.some(nombre => nombre % 2 === 0);
console.log(`Contient un nombre pair? ${contientPair}`); // Output: true

const contientGrandNombre = nombres.some(nombre => nombre > 10);
console.log(`Contient un nombre > 10? ${contientGrandNombre}`); // Output: false

interface Tache {
  description: string;
  complete: boolean;
}

const taches: Tache[] = [
  { description: "Faire les courses", complete: false },
  { description: "Préparer le dîner", complete: true },
  { description: "Lire un livre", complete: false }
];

const auMoinsUneTacheComplete = taches.some(tache => tache.complete);
console.log(`Au moins une tâche est-elle complète? ${auMoinsUneTacheComplete}`); // Output: true
```

### Pop

La méthode `pop()` supprime le dernier élément d'un tableau et retourne cet élément. Cette méthode modifie la longueur du tableau.

```typescript
const fruits = ["pomme", "banane", "orange"];
console.log(`Tableau initial: ${fruits}`);

const dernierFruit = fruits.pop();
console.log(`Élément supprimé: ${dernierFruit}, Tableau restant: ${fruits}`);
// Output: Élément supprimé: orange, Tableau restant: pomme,banane

const deuxiemeDernierFruit = fruits.pop();
console.log(`Élément supprimé: ${deuxiemeDernierFruit}, Tableau restant: ${fruits}`);
// Output: Élément supprimé: banane, Tableau restant: pomme

const premierFruit = fruits.pop();
console.log(`Élément supprimé: ${premierFruit}, Tableau restant: ${fruits}`);
// Output: Élément supprimé: pomme, Tableau restant: 

const tableauVide: string[] = [];
const resultatVide = tableauVide.pop();
console.log(`Pop sur tableau vide: ${resultatVide}`); // Output: Pop sur tableau vide: undefined
```

### Number

Le type `number` en TypeScript représente les nombres à virgule flottante (selon la norme IEEE 754). Il inclut les entiers et les décimaux.

```typescript
let age: number = 30;
let prix: number = 99.99;
let temperature: number = -5;

// Opérations arithmétiques
let somme = age + prix;
let produit = age * temperature;

// Méthodes de l'objet Number
console.log(Number.isFinite(123)); // Output: true
console.log(Number.isNaN(NaN)); // Output: true
console.log(Number.parseInt("123.45")); // Output: 123
console.log(Number.parseFloat("123.45")); // Output: 123.45

// Formatage de nombres
let grandNombre: number = 123456.789;
console.log(grandNombre.toFixed(2)); // Output: "123456.79"
console.log(grandNombre.toExponential(1)); // Output: "1.2e+5"
console.log(grandNombre.toLocaleString("fr-FR")); // Output: 123 456,789

// Utilisation avec des types union
function afficherQuantite(quantite: number | string): void {
  if (typeof quantite === "number") {
    console.log(`Quantité numérique: ${quantite}`);
  } else {
    console.log(`Quantité textuelle: ${quantite}`);
  }
}

afficherQuantite(100);
afficherQuantite("vingt");
```


