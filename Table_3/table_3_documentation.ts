# Table 3: Types et fonctions avancées

Cette section explore les types et fonctions avancées de TypeScript, incluant les types union, never, les fonctions génériques, les types d'objets et les méthodes de manipulation de données.

## Types de base et avancés

### Le type FUNCTION

En TypeScript, le type `Function` représente toutes les fonctions. Cependant, il est généralement préférable d'utiliser des signatures de fonction plus spécifiques pour une meilleure sécurité de type.

```typescript
// Type Function générique (moins recommandé)
let maFonction: Function;
maFonction = function(x: number) { return x * 2; };
maFonction = (a: string, b: string) => a + b;

// Types de fonction spécifiques (recommandé)
type FonctionAddition = (a: number, b: number) => number;
type FonctionSalutation = (nom: string) => string;

const additionner: FonctionAddition = (a, b) => a + b;
const saluer: FonctionSalutation = (nom) => `Bonjour ${nom}`;

console.log(additionner(5, 3)); // Output: 8
console.log(saluer("Alice")); // Output: Bonjour Alice

// Interface pour décrire une fonction
interface CalculateurInterface {
  (operande1: number, operande2: number): number;
}

const multiplier: CalculateurInterface = (a, b) => a * b;
console.log(multiplier(4, 7)); // Output: 28
```

### Surcharge de méthode et fonction

La surcharge de fonction permet de définir plusieurs signatures pour une même fonction, offrant différentes façons de l'appeler selon les types et le nombre d'arguments.

```typescript
// Surcharge de fonction
function traiterDonnees(donnees: string): string;
function traiterDonnees(donnees: number): number;
function traiterDonnees(donnees: boolean): boolean;
function traiterDonnees(donnees: string | number | boolean): string | number | boolean {
  if (typeof donnees === "string") {
    return donnees.toUpperCase();
  } else if (typeof donnees === "number") {
    return donnees * 2;
  } else {
    return !donnees;
  }
}

console.log(traiterDonnees("hello")); // Output: HELLO
console.log(traiterDonnees(5)); // Output: 10
console.log(traiterDonnees(true)); // Output: false

// Surcharge de méthode dans une classe
class Convertisseur {
  convertir(valeur: string): number;
  convertir(valeur: number): string;
  convertir(valeur: string | number): string | number {
    if (typeof valeur === "string") {
      return parseInt(valeur, 10);
    } else {
      return valeur.toString();
    }
  }
}

const conv = new Convertisseur();
console.log(conv.convertir("123")); // Output: 123
console.log(conv.convertir(456)); // Output: "456"
```

### Boolean

Le type `boolean` représente les valeurs logiques `true` et `false`. TypeScript offre une vérification de type stricte pour les booléens.

```typescript
let estActif: boolean = true;
let estComplete: boolean = false;

function verifierStatut(actif: boolean): string {
  return actif ? "Actif" : "Inactif";
}

console.log(verifierStatut(estActif)); // Output: Actif

// Conversion en boolean
let valeurTruthy: boolean = Boolean("texte non vide");
let valeurFalsy: boolean = Boolean("");

console.log(valeurTruthy); // Output: true
console.log(valeurFalsy); // Output: false

// Opérateurs logiques
let a: boolean = true;
let b: boolean = false;

console.log(a && b); // Output: false
console.log(a || b); // Output: true
console.log(!a); // Output: false
```

### Enum

Les énumérations permettent de définir un ensemble de constantes nommées, rendant le code plus lisible et maintenable.

```typescript
// Enum numérique
enum Couleur {
  Rouge,
  Vert,
  Bleu
}

let couleurFavorite: Couleur = Couleur.Vert;
console.log(couleurFavorite); // Output: 1
console.log(Couleur[1]); // Output: Vert

// Enum avec valeurs personnalisées
enum StatutCommande {
  EnAttente = "EN_ATTENTE",
  Traitee = "TRAITEE",
  Expediee = "EXPEDIEE",
  Livree = "LIVREE"
}

function traiterCommande(statut: StatutCommande): void {
  switch (statut) {
    case StatutCommande.EnAttente:
      console.log("Commande en attente de traitement");
      break;
    case StatutCommande.Traitee:
      console.log("Commande traitée");
      break;
    case StatutCommande.Expediee:
      console.log("Commande expédiée");
      break;
    case StatutCommande.Livree:
      console.log("Commande livrée");
      break;
  }
}

traiterCommande(StatutCommande.Expediee);

// Enum const (optimisé à la compilation)
const enum Direction {
  Haut = "HAUT",
  Bas = "BAS",
  Gauche = "GAUCHE",
  Droite = "DROITE"
}

let mouvement = Direction.Haut; // Sera remplacé par "HAUT" à la compilation
```

### String

Le type `string` représente les données textuelles. TypeScript offre de nombreuses fonctionnalités pour travailler avec les chaînes de caractères.

```typescript
let nom: string = "Alice";
let message: string = `Bonjour ${nom}`;

// Template literals
let age: number = 30;
let presentation: string = `
  Nom: ${nom}
  Âge: ${age}
  Statut: ${age >= 18 ? "Majeur" : "Mineur"}
`;

console.log(presentation);

// Méthodes de string
let texte: string = "  TypeScript est génial  ";
console.log(texte.trim()); // Output: TypeScript est génial
console.log(texte.toUpperCase()); // Output:   TYPESCRIPT EST GÉNIAL  
console.log(texte.includes("Script")); // Output: true

// String literals types
type Theme = "clair" | "sombre" | "auto";
let themeActuel: Theme = "sombre";

function appliquerTheme(theme: Theme): void {
  console.log(`Application du thème: ${theme}`);
}

appliquerTheme(themeActuel);
```

### Type union

Les types union permettent à une variable d'être de plusieurs types différents, offrant une flexibilité tout en maintenant la sécurité de type.

```typescript
type StringOuNombre = string | number;

function afficherValeur(valeur: StringOuNombre): void {
  if (typeof valeur === "string") {
    console.log(`Chaîne: ${valeur.toUpperCase()}`);
  } else {
    console.log(`Nombre: ${valeur.toFixed(2)}`);
  }
}

afficherValeur("hello"); // Output: Chaîne: HELLO
afficherValeur(42.567); // Output: Nombre: 42.57

// Union avec des types d'objets
interface Chien {
  type: "chien";
  aboyer(): void;
}

interface Chat {
  type: "chat";
  miauler(): void;
}

type Animal = Chien | Chat;

function faireDuBruit(animal: Animal): void {
  switch (animal.type) {
    case "chien":
      animal.aboyer();
      break;
    case "chat":
      animal.miauler();
      break;
  }
}

const monChien: Chien = {
  type: "chien",
  aboyer() { console.log("Woof!"); }
};

faireDuBruit(monChien);
```

### Type never

Le type `never` représente le type de valeurs qui ne se produisent jamais. Il est utilisé pour les fonctions qui ne retournent jamais ou les branches de code inaccessibles.

```typescript
// Fonction qui ne retourne jamais
function erreurFatale(message: string): never {
  throw new Error(message);
}

// Fonction avec boucle infinie
function boucleInfinie(): never {
  while (true) {
    console.log("Cette boucle ne se termine jamais");
  }
}

// Utilisation avec les types union pour l'exhaustivité
type Forme = "cercle" | "rectangle" | "triangle";

function calculerAire(forme: Forme): number {
  switch (forme) {
    case "cercle":
      return Math.PI * 5 * 5;
    case "rectangle":
      return 10 * 20;
    case "triangle":
      return 0.5 * 10 * 15;
    default:
      // Cette ligne garantit que tous les cas sont couverts
      const _exhaustiveCheck: never = forme;
      return _exhaustiveCheck;
  }
}

// Fonction de garde de type
function estNombre(valeur: unknown): valeur is number {
  return typeof valeur === "number";
}

function traiterValeur(valeur: unknown): void {
  if (estNombre(valeur)) {
    console.log(valeur.toFixed(2)); // TypeScript sait que valeur est un number
  } else {
    // Dans cette branche, valeur ne peut jamais être un number
    const jamaisUnNombre: never = valeur as never;
  }
}
```

### Extends

Le mot-clé `extends` est utilisé dans plusieurs contextes en TypeScript : héritage de classes, contraintes de types génériques, et types conditionnels.

```typescript
// Héritage de classe
class Vehicule {
  constructor(public marque: string) {}
  
  demarrer(): void {
    console.log("Le véhicule démarre");
  }
}

class Voiture extends Vehicule {
  constructor(marque: string, public modele: string) {
    super(marque);
  }
  
  demarrer(): void {
    console.log(`La ${this.marque} ${this.modele} démarre`);
  }
}

// Contraintes de types génériques
interface AvecId {
  id: number;
}

function obtenirParId<T extends AvecId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const utilisateurs = [
  { id: 1, nom: "Alice", email: "alice@example.com" },
  { id: 2, nom: "Bob", email: "bob@example.com" }
];

const utilisateur = obtenirParId(utilisateurs, 1);
console.log(utilisateur?.nom); // Output: Alice

// Types conditionnels
type EstTableau<T> = T extends any[] ? true : false;

type Test1 = EstTableau<string[]>; // true
type Test2 = EstTableau<number>; // false

// Extraction de types
type ElementDeTableau<T> = T extends (infer U)[] ? U : never;

type TypeElement = ElementDeTableau<string[]>; // string
```

### Fonction générique

Les fonctions génériques permettent de créer des fonctions réutilisables qui peuvent travailler avec différents types tout en maintenant la sécurité de type.

```typescript
// Fonction générique simple
function identite<T>(arg: T): T {
  return arg;
}

let resultatString = identite<string>("hello");
let resultatNumber = identite<number>(42);
let resultatAuto = identite("auto"); // Type inféré automatiquement

// Fonction générique avec contraintes
interface AvecLongueur {
  length: number;
}

function afficherLongueur<T extends AvecLongueur>(arg: T): T {
  console.log(`Longueur: ${arg.length}`);
  return arg;
}

afficherLongueur("hello"); // OK
afficherLongueur([1, 2, 3]); // OK
// afficherLongueur(123); // Erreur: number n'a pas de propriété length

// Fonction générique avec plusieurs types
function echanger<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

let paire = echanger(["hello", 42]);
console.log(paire); // Output: [42, "hello"]

// Fonction générique avec keyof
function obtenirPropriete<T, K extends keyof T>(obj: T, cle: K): T[K] {
  return obj[cle];
}

const personne = { nom: "Alice", age: 30, actif: true };
const nom = obtenirPropriete(personne, "nom"); // Type: string
const age = obtenirPropriete(personne, "age"); // Type: number
```

### Type object

Le type `object` représente tous les types non-primitifs (tout ce qui n'est pas `number`, `string`, `boolean`, `symbol`, `null`, ou `undefined`).

```typescript
// Type object générique
let obj: object;
obj = { nom: "Alice" };
obj = [1, 2, 3];
obj = new Date();
// obj = "string"; // Erreur: string est un type primitif

// Types d'objets plus spécifiques
type Utilisateur = {
  nom: string;
  age: number;
  email?: string;
};

let utilisateur: Utilisateur = {
  nom: "Bob",
  age: 25
};

// Type Record pour créer des types d'objets
type DictionnaireUtilisateurs = Record<string, Utilisateur>;

const utilisateurs: DictionnaireUtilisateurs = {
  "user1": { nom: "Alice", age: 30 },
  "user2": { nom: "Bob", age: 25 }
};

// Partial, Required, Readonly
type UtilisateurPartiel = Partial<Utilisateur>; // Toutes les propriétés optionnelles
type UtilisateurRequis = Required<Utilisateur>; // Toutes les propriétés requises
type UtilisateurLectureSeule = Readonly<Utilisateur>; // Toutes les propriétés en lecture seule

const partiel: UtilisateurPartiel = { nom: "Charlie" };
const lectureSeule: UtilisateurLectureSeule = { nom: "David", age: 35 };
// lectureSeule.age = 40; // Erreur: Cannot assign to 'age' because it is a read-only property
```

### Alias ou type personnalisé

Les alias de type permettent de créer de nouveaux noms pour des types existants, rendant le code plus lisible et maintenable.

```typescript
// Alias de type simple
type ID = string | number;
type Nom = string;

// Alias pour des types d'objets
type Point = {
  x: number;
  y: number;
};

type Ligne = {
  debut: Point;
  fin: Point;
};

// Alias pour des types de fonction
type Gestionnaire = (event: string) => void;
type Validateur<T> = (valeur: T) => boolean;

// Utilisation des alias
let identifiant: ID = "user123";
let position: Point = { x: 10, y: 20 };

const validerEmail: Validateur<string> = (email) => {
  return email.includes("@");
};

// Alias conditionnels
type MessageOuErreur<T> = T extends string ? string : Error;

type Test1 = MessageOuErreur<string>; // string
type Test2 = MessageOuErreur<number>; // Error

// Alias récursifs
type ArbreJson = string | number | boolean | null | ArbreJson[] | { [key: string]: ArbreJson };

const donnees: ArbreJson = {
  nom: "racine",
  enfants: [
    { nom: "enfant1", valeur: 42 },
    { nom: "enfant2", enfants: ["a", "b", "c"] }
  ]
};
```

### Type objet anonyme

Les types d'objets anonymes permettent de définir la structure d'un objet directement sans créer d'interface ou d'alias de type.

```typescript
// Objet anonyme dans une variable
let configuration: {
  theme: string;
  langue: string;
  notifications: boolean;
} = {
  theme: "sombre",
  langue: "fr",
  notifications: true
};

// Objet anonyme dans les paramètres de fonction
function traiterUtilisateur(user: {
  nom: string;
  age: number;
  preferences?: {
    theme: string;
    notifications: boolean;
  };
}): void {
  console.log(`Traitement de l'utilisateur ${user.nom}`);
  if (user.preferences) {
    console.log(`Thème: ${user.preferences.theme}`);
  }
}

traiterUtilisateur({
  nom: "Alice",
  age: 30,
  preferences: {
    theme: "clair",
    notifications: false
  }
});

// Objet anonyme comme type de retour
function creerReponse(): {
  statut: number;
  message: string;
  donnees?: any;
} {
  return {
    statut: 200,
    message: "Succès"
  };
}

// Index signature dans un objet anonyme
let dictionnaire: {
  [cle: string]: number;
} = {
  pommes: 5,
  oranges: 3,
  bananes: 8
};
```

### Type de retour de fonction

TypeScript peut inférer automatiquement le type de retour des fonctions, mais il est aussi possible de le spécifier explicitement.

```typescript
// Type de retour inféré
function additionner(a: number, b: number) {
  return a + b; // Type de retour inféré: number
}

// Type de retour explicite
function multiplier(a: number, b: number): number {
  return a * b;
}

// Type de retour union
function diviser(a: number, b: number): number | string {
  if (b === 0) {
    return "Division par zéro impossible";
  }
  return a / b;
}

// Extraction du type de retour avec ReturnType
type TypeRetourAddition = ReturnType<typeof additionner>; // number
type TypeRetourDivision = ReturnType<typeof diviser>; // number | string

// Fonction avec type de retour générique
function creerTableau<T>(longueur: number, valeurParDefaut: T): T[] {
  return new Array(longueur).fill(valeurParDefaut);
}

const tableauNombres = creerTableau(5, 0); // Type: number[]
const tableauStrings = creerTableau(3, ""); // Type: string[]
```

### Find

La méthode `find` est une méthode de tableau qui retourne le premier élément qui satisfait une condition donnée.

```typescript
interface Produit {
  id: number;
  nom: string;
  prix: number;
  categorie: string;
}

const produits: Produit[] = [
  { id: 1, nom: "Laptop", prix: 999, categorie: "Électronique" },
  { id: 2, nom: "Livre", prix: 15, categorie: "Éducation" },
  { id: 3, nom: "Chaise", prix: 89, categorie: "Mobilier" }
];

// Find avec une fonction de prédicat
const produitTrouve = produits.find(p => p.prix > 100);
console.log(produitTrouve); // { id: 1, nom: "Laptop", prix: 999, categorie: "Électronique" }

// Find peut retourner undefined
const produitIntrouvable = produits.find(p => p.prix > 2000);
console.log(produitIntrouvable); // undefined

// Fonction de recherche générique
function rechercherParPropriete<T, K extends keyof T>(
  tableau: T[],
  propriete: K,
  valeur: T[K]
): T | undefined {
  return tableau.find(item => item[propriete] === valeur);
}

const produitParNom = rechercherParPropriete(produits, "nom", "Livre");
console.log(produitParNom);

// Avec type guard
function estProduitElectronique(produit: Produit): boolean {
  return produit.categorie === "Électronique";
}

const produitElectronique = produits.find(estProduitElectronique);
if (produitElectronique) {
  console.log(`Produit électronique trouvé: ${produitElectronique.nom}`);
}
```

### Type objet imbriqué

Les types d'objets imbriqués permettent de définir des structures de données complexes avec plusieurs niveaux de propriétés.

```typescript
interface Adresse {
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;
}

interface Contact {
  telephone?: string;
  email: string;
}

interface Entreprise {
  nom: string;
  secteur: string;
  adresse: Adresse;
  contact: Contact;
  employes: {
    nom: string;
    poste: string;
    salaire: {
      montant: number;
      devise: string;
    };
    competences: string[];
  }[];
}

const entreprise: Entreprise = {
  nom: "TechCorp",
  secteur: "Technologie",
  adresse: {
    rue: "123 Rue de la Tech",
    ville: "Paris",
    codePostal: "75001",
    pays: "France"
  },
  contact: {
    telephone: "+33 1 23 45 67 89",
    email: "contact@techcorp.com"
  },
  employes: [
    {
      nom: "Alice Dupont",
      poste: "Développeuse Senior",
      salaire: {
        montant: 65000,
        devise: "EUR"
      },
      competences: ["TypeScript", "React", "Node.js"]
    },
    {
      nom: "Bob Martin",
      poste: "Chef de projet",
      salaire: {
        montant: 75000,
        devise: "EUR"
      },
      competences: ["Gestion de projet", "Scrum", "Leadership"]
    }
  ]
};

// Accès aux propriétés imbriquées
console.log(entreprise.adresse.ville);
console.log(entreprise.employes[0].salaire.montant);

// Type pour accéder aux propriétés imbriquées
type AdresseEntreprise = Entreprise["adresse"];
type SalaireEmploye = Entreprise["employes"][0]["salaire"];
```

### Fn sans retour : void - undefined

En TypeScript, les fonctions peuvent ne pas retourner de valeur explicite. Les types `void` et `undefined` sont utilisés pour ces cas.

```typescript
// Fonction void - ne retourne rien d'utile
function afficherMessage(message: string): void {
  console.log(message);
  // return; // Optionnel
}

// Fonction qui retourne explicitement undefined
function obtenirValeurOptionnelle(condition: boolean): string | undefined {
  if (condition) {
    return "valeur";
  }
  return undefined; // Explicite
}

// Différence entre void et undefined
let resultatVoid: void = afficherMessage("Hello");
let resultatUndefined: undefined = obtenirValeurOptionnelle(false);

console.log(resultatVoid); // undefined (mais type void)
console.log(resultatUndefined); // undefined (type undefined)

// Fonction avec effet de bord
function modifierTableau(tableau: number[]): void {
  tableau.push(42);
  tableau.sort();
}

const nombres = [3, 1, 4];
modifierTableau(nombres);
console.log(nombres); // [1, 3, 4, 42]

// Callback avec void
type Callback = () => void;

function executerApresDelai(callback: Callback, delai: number): void {
  setTimeout(callback, delai);
}

executerApresDelai(() => {
  console.log("Exécuté après délai");
}, 1000);
```

### Array

Les tableaux en TypeScript peuvent être typés de plusieurs façons et offrent de nombreuses méthodes pour la manipulation de données.

```typescript
// Déclaration de tableaux
let nombres: number[] = [1, 2, 3, 4, 5];
let noms: Array<string> = ["Alice", "Bob", "Charlie"];

// Tableau avec types union
let mixte: (string | number)[] = ["hello", 42, "world", 123];

// Tableau en lecture seule
let nombresLectureSeule: readonly number[] = [1, 2, 3];
// nombresLectureSeule.push(4); // Erreur: Property 'push' does not exist on type 'readonly number[]'

// Tuple (tableau de taille fixe avec types spécifiques)
let coordonnees: [number, number] = [10, 20];
let personneInfo: [string, number, boolean] = ["Alice", 30, true];

// Méthodes de tableau courantes
const fruits = ["pomme", "banane", "orange"];

// Ajout d'éléments
fruits.push("kiwi");
fruits.unshift("fraise");

// Suppression d'éléments
const dernierFruit = fruits.pop();
const premierFruit = fruits.shift();

// Recherche
const indexBanane = fruits.indexOf("banane");
const contientOrange = fruits.includes("orange");

// Transformation
const fruitsEnMajuscules = fruits.map(fruit => fruit.toUpperCase());
const fruitsLongs = fruits.filter(fruit => fruit.length > 5);

console.log(fruitsEnMajuscules);
console.log(fruitsLongs);
```

### Fn avec retour

Les fonctions avec retour en TypeScript peuvent retourner différents types de valeurs, et le système de types garantit la cohérence.

```typescript
// Fonction avec retour simple
function calculerCarre(n: number): number {
  return n * n;
}

// Fonction avec retour conditionnel
function obtenirSalutation(heure: number): string {
  if (heure < 12) {
    return "Bonjour";
  } else if (heure < 18) {
    return "Bon après-midi";
  } else {
    return "Bonsoir";
  }
}

// Fonction avec retour d'objet
function creerUtilisateur(nom: string, age: number): {
  nom: string;
  age: number;
  estMajeur: boolean;
} {
  return {
    nom,
    age,
    estMajeur: age >= 18
  };
}

// Fonction avec retour générique
function premierElement<T>(tableau: T[]): T | undefined {
  return tableau.length > 0 ? tableau[0] : undefined;
}

const premierNombre = premierElement([1, 2, 3]); // Type: number | undefined
const premiereLettre = premierElement(["a", "b", "c"]); // Type: string | undefined

// Fonction avec retour de promesse
async function obtenirDonneesAsync(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Données chargées");
    }, 1000);
  });
}

// Utilisation
obtenirDonneesAsync().then(donnees => {
  console.log(donnees); // Type: string
});

// Fonction avec retour de fonction (higher-order function)
function creerMultiplicateur(facteur: number): (n: number) => number {
  return (n: number) => n * facteur;
}

const doubler = creerMultiplicateur(2);
const tripler = creerMultiplicateur(3);

console.log(doubler(5)); // Output: 10
console.log(tripler(4)); // Output: 12
```

