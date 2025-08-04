# Table 1: Concepts de base TypeScript

Cette section explore les concepts fondamentaux de TypeScript, essentiels pour bâtir des applications robustes et maintenables. Nous aborderons des sujets allant de la gestion des constructeurs aux interfaces, en passant par les classes génériques et les types littéraux.

## Constructeur, méthode, this

En TypeScript, le constructeur est une méthode spéciale d'une classe qui est appelée lors de la création d'une nouvelle instance de cette classe. Il est utilisé pour initialiser les propriétés de l'objet. Le mot-clé `this` fait référence à l'instance actuelle de la classe.

### Exemple de Constructeur, méthode, this

```typescript
class Personne {
  nom: string;
  age: number;

  constructor(nom: string, age: number) {
    this.nom = nom;
    this.age = age;
  }

  saluer(): void {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}

const personne1 = new Personne("Alice", 30);
personne1.saluer(); // Output: Bonjour, je m'appelle Alice et j'ai 30 ans.
```

## Constructeur privé

Un constructeur privé empêche l'instanciation directe d'une classe de l'extérieur. Cela est souvent utilisé pour implémenter le modèle de conception Singleton, où une seule instance de la classe est autorisée.

### Exemple de Constructeur privé

```typescript
class Singleton {
  private static instance: Singleton;

  private constructor() { }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  afficherMessage(): void {
    console.log("Ceci est une instance unique.");
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // Output: true 
instance1.afficherMessage();
```

## Private, public

TypeScript utilise les modificateurs d'accès `public` et `private` pour contrôler la visibilité des membres d'une classe. Par défaut, tous les membres sont `public`.

- `public`: Les membres sont accessibles de n'importe où.
- `private`: Les membres sont accessibles uniquement à l'intérieur de la classe où ils sont définis.

### Exemple de Private, public

```typescript
class CompteBancaire {
  public titulaire: string;
  private solde: number;

  constructor(titulaire: string, soldeInitial: number) {
    this.titulaire = titulaire;
    this.solde = soldeInitial;
  }

  deposer(montant: number): void {
    this.solde += montant;
    console.log(`Dépôt de ${montant}. Nouveau solde: ${this.solde}`);
  }

  getSolde(): number {
    return this.solde;
  }
}

const monCompte = new CompteBancaire("Jean Dupont", 1000);
console.log(monCompte.titulaire); // Accessible (public)
// console.log(monCompte.solde); // Erreur: la propriété 'solde' est privée
monCompte.deposer(500);
console.log(`Solde actuel: ${monCompte.getSolde()}`);
```

## Interface et classe concrète

Une `interface` en TypeScript définit un contrat sur la forme que doivent avoir les objets. Une `classe concrète` est une implémentation de cette interface, fournissant le code pour les méthodes définies dans l'interface.

### Exemple d'Interface et classe concrète

```typescript
interface Forme {
  calculerAire(): number;
  calculerPerimetre(): number;
}

class Cercle implements Forme {
  rayon: number;

  constructor(rayon: number) {
    this.rayon = rayon;
  }

  calculerAire(): number {
    return Math.PI * this.rayon * this.rayon;
  }

  calculerPerimetre(): number {
    return 2 * Math.PI * this.rayon;
  }
}

class Rectangle implements Forme {
  largeur: number;
  hauteur: number;

  constructor(largeur: number, hauteur: number) {
    this.largeur = largeur;
    this.hauteur = hauteur;
  }

  calculerAire(): number {
    return this.largeur * this.hauteur;
  }

  calculerPerimetre(): number {
    return 2 * (this.largeur + this.hauteur);
  }
}

const monCercle = new Cercle(5);
console.log(`Aire du cercle: ${monCercle.calculerAire()}`);
console.log(`Périmètre du cercle: ${monCercle.calculerPerimetre()}`);

const monRectangle = new Rectangle(4, 6);
console.log(`Aire du rectangle: ${monRectangle.calculerAire()}`);
console.log(`Périmètre du rectangle: ${monRectangle.calculerPerimetre()}`);
```

## Initialisation courte dans le constructeur

TypeScript permet une syntaxe raccourcie pour déclarer et initialiser des propriétés de classe directement dans le constructeur en utilisant les modificateurs d'accès (`public`, `private`, `protected`).

### Exemple d'Initialisation courte dans le constructeur

```typescript
class Produit {
  constructor(public nom: string, private prix: number) { }

  afficherDetails(): void {
    console.log(`Produit: ${this.nom}, Prix: ${this.prix}€`);
  }
}

const livre = new Produit("Le Seigneur des Anneaux", 25);
livre.afficherDetails();
// console.log(livre.prix); // Erreur: la propriété 'prix' est privée
```

## Classe générique

Les classes génériques permettent de créer des classes qui peuvent fonctionner avec différents types de données, sans sacrifier la sécurité de type. Elles sont très utiles pour créer des structures de données réutilisables.

### Exemple de Classe générique

```typescript
class Boite<T> {
  contenu: T;

  constructor(contenu: T) {
    this.contenu = contenu;
  }

  getContenu(): T {
    return this.contenu;
  }
}

const boiteDeNombres = new Boite<number>(123);
console.log(boiteDeNombres.getContenu()); // Output: 123

const boiteDeTextes = new Boite<string>("Bonjour le monde");
console.log(boiteDeTextes.getContenu()); // Output: Bonjour le monde
```

## Fill

Le concept de "Fill" n'est pas un concept TypeScript natif en soi, mais il peut faire référence à la méthode `fill()` des tableaux JavaScript, qui est couramment utilisée en TypeScript pour remplir un tableau avec une valeur statique.

### Exemple de Fill

```typescript
const tableauDeZeros: number[] = new Array(5).fill(0);
console.log(tableauDeZeros); // Output: [0, 0, 0, 0, 0]

const tableauDeStrings: string[] = new Array(3).fill("test");
console.log(tableauDeStrings); // Output: ["test", "test", "test"]
```

## Interface et classe abstraite

- Une `interface` définit un contrat sans implémentation. Elle ne peut pas contenir de code exécutable.
- Une `classe abstraite` peut contenir des implémentations de méthodes, ainsi que des méthodes abstraites (sans implémentation) qui doivent être implémentées par les classes dérivées. On ne peut pas instancier une classe abstraite directement.

### Exemple d'Interface et classe abstraite

```typescript
interface Dessinable {
  dessiner(): void;
}

abstract class FormeGeometrique {
  abstract getNom(): string;

  afficherDescription(): void {
    console.log(`Ceci est une forme géométrique: ${this.getNom()}`);
  }
}

class CercleConcret extends FormeGeometrique implements Dessinable {
  getNom(): string {
    return "Cercle";
  }

  dessiner(): void {
    console.log("Dessin d'un cercle.");
  }
}

const monCercleConcret = new CercleConcret();
monCercleConcret.afficherDescription();
monCercleConcret.dessiner();
```

## Decorator factory

Un "decorator factory" est une fonction qui retourne une expression de décorateur. Cela permet de configurer le décorateur au moment de son application.

### Exemple de Decorator factory

```typescript
function Logger(prefix: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${prefix} - Appel de la méthode ${propertyKey} avec les arguments: ${JSON.stringify(args)}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class Calculatrice {
  @Logger("DEBUG")
  addition(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculatrice();
calc.addition(5, 3); // Output: DEBUG - Appel de la méthode addition avec les arguments: [5,3]
                     // Output: 8
```

## Attribut en lecture seule dans une interface

Les interfaces peuvent définir des propriétés en lecture seule en utilisant le mot-clé `readonly`. Une fois qu'une propriété `readonly` est initialisée, sa valeur ne peut plus être modifiée.

### Exemple d'Attribut en lecture seule dans une interface

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Erreur: Cannot assign to 'x' because it is a read-only property.
console.log(p1.x, p1.y);
```

## Chaînage optionnel

Le chaînage optionnel (`?.`) permet d'accéder aux propriétés d'un objet potentiellement `null` ou `undefined` sans provoquer d'erreur. Si l'un des éléments de la chaîne est `null` ou `undefined`, l'expression entière retourne `undefined`.

### Exemple de Chaînage optionnel

```typescript
interface Utilisateur {
  nom: string;
  adresse?: {
    rue: string;
    ville?: string;
  };
}

const user1: Utilisateur = { nom: "Alice" };
const user2: Utilisateur = { nom: "Bob", adresse: { rue: "Main St" } };
const user3: Utilisateur = { nom: "Charlie", adresse: { rue: "Oak Ave", ville: "Springfield" } };

console.log(user1.adresse?.ville); // Output: undefined
console.log(user2.adresse?.ville); // Output: undefined
console.log(user3.adresse?.ville); // Output: Springfield
```

## Override

Le mot-clé `override` en TypeScript (à partir de la version 4.3) est utilisé pour indiquer explicitement qu'une méthode dans une classe dérivée est destinée à remplacer une méthode de la classe de base. Cela aide à prévenir les erreurs dues à des fautes de frappe ou à des signatures de méthode incorrectes.

### Exemple d'Override

```typescript
class Animal {
  faireSon(): void {
    console.log("L'animal fait un son.");
  }
}

class Chien extends Animal {
  override faireSon(): void {
    console.log("Le chien aboie.");
  }
}

const monChien = new Chien();
monChien.faireSon(); // Output: Le chien aboie.
```

## Héritage entre interfaces

Les interfaces peuvent hériter d'autres interfaces, ce qui permet de réutiliser des définitions de types et de créer des hiérarchies de types plus complexes.

### Exemple d'Héritage entre interfaces

```typescript
interface Forme2D {
  largeur: number;
  hauteur: number;
}

interface RectangleColorie extends Forme2D {
  couleur: string;
}

const monRectangleColorie: RectangleColorie = {
  largeur: 10,
  hauteur: 20,
  couleur: "bleu"
};

console.log(monRectangleColorie);
```

## Getters et setters

Les accesseurs (`getters`) et les mutateurs (`setters`) permettent de contrôler l'accès aux propriétés d'une classe. Ils sont définis comme des méthodes mais sont accédés comme des propriétés.

### Exemple de Getters et setters

```typescript
class CercleAvecPropriete {
  private _rayon: number;

  constructor(rayon: number) {
    this._rayon = rayon;
  }

  get rayon(): number {
    return this._rayon;
  }

  set rayon(nouveauRayon: number) {
    if (nouveauRayon <= 0) {
      console.error("Le rayon doit être positif.");
      return;
    }
    this._rayon = nouveauRayon;
  }

  get aire(): number {
    return Math.PI * this._rayon * this._rayon;
  }
}

const monCercleProp = new CercleAvecPropriete(10);
console.log(`Rayon initial: ${monCercleProp.rayon}`);
console.log(`Aire initiale: ${monCercleProp.aire}`);

monCercleProp.rayon = 12;
console.log(`Nouveau rayon: ${monCercleProp.rayon}`);
console.log(`Nouvelle aire: ${monCercleProp.aire}`);

monCercleProp.rayon = -5; // Tentative d'affectation invalide
```

## Interface comme type de fonction

Les interfaces peuvent décrire des types de fonctions, ce qui est utile pour définir la signature de fonctions qui doivent être implémentées ou passées en argument.

### Exemple d'Interface comme type de fonction

```typescript
interface Comparateur {
  (a: number, b: number): boolean;
}

let comparerNombres: Comparateur;
comparerNombres = function (a: number, b: number): boolean {
  return a > b;
};

console.log(comparerNombres(10, 5)); // Output: true
console.log(comparerNombres(3, 7)); // Output: false
```

## Fonction générique (Keyof)

Les fonctions génériques permettent de créer des fonctions qui peuvent opérer sur une variété de types tout en maintenant la sécurité de type. L'opérateur `keyof` produit un type union de littéraux de chaîne ou numériques représentant les noms de propriétés d'un type donné.

### Exemple de Fonction générique (Keyof)

```typescript
function obtenirPropriete<T, K extends keyof T>(obj: T, cle: K): T[K] {
  return obj[cle];
}

const utilisateur = { nom: "Alice", age: 30 };

const nomUtilisateur = obtenirPropriete(utilisateur, "nom");
console.log(nomUtilisateur); // Output: Alice

const ageUtilisateur = obtenirPropriete(utilisateur, "age");
console.log(ageUtilisateur); // Output: 30

// const proprieteInexistante = obtenirPropriete(utilisateur, "adresse"); // Erreur de compilation
```

## Attributs et méthodes optionnels dans une interface

Les interfaces peuvent définir des propriétés et des méthodes optionnelles en utilisant le symbole `?` après le nom du membre. Cela signifie que ces membres peuvent être présents ou absents dans les objets qui implémentent l'interface.

### Exemple d'Attributs et méthodes optionnels dans une interface

```typescript
interface Configuration {
  theme: string;
  modeSombre?: boolean;
  initialiser?(): void;
}

const config1: Configuration = {
  theme: "clair"
};

const config2: Configuration = {
  theme: "sombre",
  modeSombre: true,
  initialiser() {
    console.log("Configuration initialisée.");
  }
};

console.log(config1.modeSombre); // Output: undefined
config2.initialiser?.(); // Appelle initialiser si elle existe
```

## Tuple

Un tuple est un type de tableau qui connaît le nombre d'éléments qu'il contient et les types de chaque élément à des positions spécifiques. Les tuples sont utiles pour représenter des paires de valeurs ou des listes de taille fixe avec des types hétérogènes.

### Exemple de Tuple

```typescript
let coordonnees: [number, number];
coordonnees = [10, 20];

console.log(coordonnees[0]); // Output: 10
console.log(coordonnees[1]); // Output: 20

let personneInfo: [string, number, boolean];
personneInfo = ["Bob", 25, true];

console.log(`${personneInfo[0]} a ${personneInfo[1]} ans et est actif: ${personneInfo[2]}`);
```

## Literal

Les types littéraux permettent de définir des types qui sont des valeurs exactes (littérales) plutôt que des types plus larges comme `string` ou `number`. Ils sont souvent utilisés avec les unions de types pour créer des ensembles de valeurs prédéfinies.

### Exemple de Literal

```typescript
type Direction = "nord" | "sud" | "est" | "ouest";

let maDirection: Direction;
maDirection = "nord";
// maDirection = "haut"; // Erreur: Type '"haut"' is not assignable to type 'Direction'.

function definirStatut(statut: "succes" | "echec"): void {
  console.log(`Statut: ${statut}`);
}

definirStatut("succes");
// definirStatut("en_attente"); // Erreur
```


