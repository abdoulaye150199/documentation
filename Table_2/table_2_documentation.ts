# Commandes de Configuration TypeScript

## Installation et Initialisation

### Installation globale de TypeScript
```bash
# Installer TypeScript globalement
npm install -g typescript

# Vérifier la version installée
tsc --version
```

### Création d'un nouveau projet
```bash
# Initialiser un projet npm
npm init -y

# Installer TypeScript localement
npm install typescript --save-dev

# Initialiser la configuration TypeScript
npx tsc --init
```

### Commandes de compilation
```bash
# Compiler un fichier spécifique
tsc fichier.ts

# Compiler avec des options spécifiques
tsc fichier.ts --target ES2020 --module commonjs

# Compiler en mode watch (recompilation automatique)
tsc fichier.ts --watch

# Compiler tout le projet selon tsconfig.json
tsc

# Compiler en mode watch pour tout le projet
tsc --watch
```

### Options de compilation courantes
```bash
# Compiler avec génération de source maps
tsc fichier.ts --sourceMap

# Compiler en mode strict
tsc fichier.ts --strict

# Compiler en spécifiant le dossier de sortie
tsc fichier.ts --outDir ./dist

# Compiler sans émettre de fichiers (vérification uniquement)
tsc fichier.ts --noEmit
```

### Scripts npm recommandés
```json
// package.json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "start": "tsc && node dist/index.js",
    "dev": "ts-node src/index.ts",
    "type-check": "tsc --noEmit"
  }
}
```

---

# Table 2: Opérateurs et utilitaires avancés

Cette section couvre les opérateurs et utilitaires avancés de TypeScript, incluant la configuration de compilation, les opérateurs modernes de JavaScript/TypeScript, et les techniques de manipulation d'objets et de tableaux.

## Configuration de fichiers et exclusions

### Exclure un fichier cycle

Dans TypeScript, il est possible d'exclure certains fichiers de la compilation pour éviter les références circulaires ou simplement pour optimiser le processus de build.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs"
  },
  "exclude": [
    "node_modules",
    "dist",
    "**/*.cycle.ts"
  ]
}
```

### Tous les fichiers devs

Pour inclure tous les fichiers de développement dans la compilation TypeScript, on peut utiliser des patterns de glob dans la configuration.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs"
  },
  "include": [
    "src/**/*.dev.ts",
    "dev/**/*"
  ]
}
```

### Les .dev de tout répertoire

Configuration pour inclure tous les fichiers avec l'extension `.dev` dans tous les répertoires du projet.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs"
  },
  "include": [
    "**/*.dev.ts"
  ]
}
```

### Les fichiers de node_modules

Généralement, les fichiers de `node_modules` sont exclus de la compilation TypeScript, mais parfois il peut être nécessaire d'inclure certains modules spécifiques.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "skipLibCheck": true
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "node_modules/some-specific-module/**/*.d.ts"
  ]
}
```

## Opérateurs modernes

### Spread operator

L'opérateur de décomposition (`...`) permet de décomposer des éléments d'un tableau ou d'un objet. Il est très utile pour créer des copies, fusionner des objets ou passer des arguments à des fonctions.

```typescript
// Avec les tableaux
const nombres1 = [1, 2, 3];
const nombres2 = [4, 5, 6];
const tousLesNombres = [...nombres1, ...nombres2];
console.log(tousLesNombres); // Output: [1, 2, 3, 4, 5, 6]

// Avec les objets
const personne = { nom: "Alice", age: 30 };
const adresse = { ville: "Paris", codePostal: "75001" };
const personneComplete = { ...personne, ...adresse };
console.log(personneComplete);
// Output: { nom: "Alice", age: 30, ville: "Paris", codePostal: "75001" }

// Dans les fonctions
function additionner(...nombres: number[]): number {
  return nombres.reduce((sum, num) => sum + num, 0);
}

console.log(additionner(1, 2, 3, 4, 5)); // Output: 15
```

### Type primitif vs référence

TypeScript distingue les types primitifs (stockés par valeur) des types de référence (stockés par référence). Cette distinction est cruciale pour comprendre le comportement des variables et des assignations.

```typescript
// Types primitifs (stockés par valeur)
let a: number = 10;
let b: number = a;
a = 20;
console.log(a); // Output: 20
console.log(b); // Output: 10 (b n'est pas affecté)

// Types de référence (stockés par référence)
let obj1 = { valeur: 10 };
let obj2 = obj1;
obj1.valeur = 20;
console.log(obj1.valeur); // Output: 20
console.log(obj2.valeur); // Output: 20 (obj2 est affecté car il référence le même objet)

// Pour créer une vraie copie d'un objet
let obj3 = { ...obj1 };
obj1.valeur = 30;
console.log(obj1.valeur); // Output: 30
console.log(obj3.valeur); // Output: 20 (obj3 n'est pas affecté)
```

### Index properties (Index signature)

Les signatures d'index permettent de décrire les types d'objets dont on ne connaît pas toutes les propriétés à l'avance, mais dont on connaît la forme des clés et des valeurs.

```typescript
interface DictionnaireNombres {
  [cle: string]: number;
}

const scores: DictionnaireNombres = {
  alice: 95,
  bob: 87,
  charlie: 92
};

console.log(scores["alice"]); // Output: 95
scores["david"] = 88;

interface TableauAssociatif {
  [index: number]: string;
}

const couleurs: TableauAssociatif = {
  0: "rouge",
  1: "vert",
  2: "bleu"
};

console.log(couleurs[1]); // Output: vert
```

### Let - var - const

TypeScript hérite des trois façons de déclarer des variables de JavaScript, chacune avec ses propres règles de portée et de mutabilité.

```typescript
// var: portée de fonction, peut être redéclarée
function exempleVar() {
  if (true) {
    var x = 1;
  }
  console.log(x); // Output: 1 (accessible en dehors du bloc)
}

// let: portée de bloc, ne peut pas être redéclarée dans la même portée
function exempleLet() {
  if (true) {
    let y = 2;
    console.log(y); // Output: 2
  }
  // console.log(y); // Erreur: y n'est pas défini
}

// const: portée de bloc, ne peut pas être réassignée
function exempleConst() {
  const z = 3;
  // z = 4; // Erreur: Cannot assign to 'z' because it is a constant
  
  const objet = { valeur: 10 };
  objet.valeur = 20; // OK: on peut modifier les propriétés
  console.log(objet.valeur); // Output: 20
}
```

### Copier un objet de type référence

Il existe plusieurs façons de copier des objets en TypeScript, selon que l'on souhaite une copie superficielle ou profonde.

```typescript
// Copie superficielle avec spread operator
const original = { nom: "Alice", details: { age: 30, ville: "Paris" } };
const copieSuperficielle = { ...original };

copieSuperficielle.nom = "Bob";
copieSuperficielle.details.age = 25;

console.log(original.nom); // Output: Alice
console.log(original.details.age); // Output: 25 (modifié car référence partagée)

// Copie profonde avec JSON (limitation: ne fonctionne pas avec les fonctions)
const copieProfonde = JSON.parse(JSON.stringify(original));
copieProfonde.details.ville = "Lyon";

console.log(original.details.ville); // Output: Paris (non modifié)
console.log(copieProfonde.details.ville); // Output: Lyon

// Copie profonde avec une fonction récursive
function copierProfondement<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => copierProfondement(item)) as unknown as T;
  }
  
  const copie = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copie[key] = copierProfondement(obj[key]);
    }
  }
  
  return copie;
}
```

### Nombre paramètre variable

TypeScript permet de définir des fonctions avec un nombre variable de paramètres en utilisant les paramètres rest.

```typescript
function calculerMoyenne(...nombres: number[]): number {
  if (nombres.length === 0) return 0;
  const somme = nombres.reduce((acc, num) => acc + num, 0);
  return somme / nombres.length;
}

console.log(calculerMoyenne(10, 20, 30)); // Output: 20
console.log(calculerMoyenne(5, 15, 25, 35, 45)); // Output: 25

function formaterMessage(template: string, ...valeurs: (string | number)[]): string {
  let message = template;
  valeurs.forEach((valeur, index) => {
    message = message.replace(`{${index}}`, valeur.toString());
  });
  return message;
}

console.log(formaterMessage("Bonjour {0}, vous avez {1} ans", "Alice", 30));
// Output: Bonjour Alice, vous avez 30 ans
```

### Nullish coalescing

L'opérateur de coalescence nulle (`??`) retourne l'opérande de droite quand l'opérande de gauche est `null` ou `undefined`, et l'opérande de gauche sinon.

```typescript
function obtenirNomUtilisateur(nom?: string): string {
  return nom ?? "Utilisateur anonyme";
}

console.log(obtenirNomUtilisateur("Alice")); // Output: Alice
console.log(obtenirNomUtilisateur(undefined)); // Output: Utilisateur anonyme
console.log(obtenirNomUtilisateur(null)); // Output: Utilisateur anonyme

// Différence avec l'opérateur OR (||)
const valeur1 = 0;
const valeur2 = "";
const valeur3 = false;

console.log(valeur1 || "défaut"); // Output: défaut
console.log(valeur1 ?? "défaut"); // Output: 0

console.log(valeur2 || "défaut"); // Output: défaut
console.log(valeur2 ?? "défaut"); // Output: ""

console.log(valeur3 || "défaut"); // Output: défaut
console.log(valeur3 ?? "défaut"); // Output: false
```

## Destructuration

### Destructuration avec les tableaux

La destructuration de tableaux permet d'extraire des valeurs de tableaux et de les assigner à des variables distinctes.

```typescript
const couleurs = ["rouge", "vert", "bleu", "jaune"];

// Destructuration basique
const [premiere, deuxieme] = couleurs;
console.log(premiere); // Output: rouge
console.log(deuxieme); // Output: vert

// Ignorer des éléments
const [, , troisieme] = couleurs;
console.log(troisieme); // Output: bleu

// Avec des valeurs par défaut
const [a, b, c, d, e = "violet"] = couleurs;
console.log(e); // Output: violet

// Avec le rest operator
const [premier, ...reste] = couleurs;
console.log(premier); // Output: rouge
console.log(reste); // Output: ["vert", "bleu", "jaune"]
```

### Destructuration avec les objets

La destructuration d'objets permet d'extraire des propriétés d'objets et de les assigner à des variables.

```typescript
const utilisateur = {
  nom: "Alice",
  age: 30,
  email: "alice@example.com",
  adresse: {
    ville: "Paris",
    codePostal: "75001"
  }
};

// Destructuration basique
const { nom, age } = utilisateur;
console.log(nom); // Output: Alice
console.log(age); // Output: 30

// Renommer les variables
const { nom: nomUtilisateur, email: adresseEmail } = utilisateur;
console.log(nomUtilisateur); // Output: Alice
console.log(adresseEmail); // Output: alice@example.com

// Avec des valeurs par défaut
const { nom: n, telephone = "Non renseigné" } = utilisateur;
console.log(telephone); // Output: Non renseigné

// Destructuration imbriquée
const { adresse: { ville, codePostal } } = utilisateur;
console.log(ville); // Output: Paris
console.log(codePostal); // Output: 75001

// Dans les paramètres de fonction
function afficherUtilisateur({ nom, age }: { nom: string; age: number }): void {
  console.log(`${nom} a ${age} ans`);
}

afficherUtilisateur(utilisateur);
```

## Décorateurs

### Les décorateurs

Les décorateurs sont une fonctionnalité expérimentale de TypeScript qui permet d'ajouter des métadonnées ou de modifier le comportement des classes, méthodes, propriétés ou paramètres.

```typescript
// Décorateur de classe
function Loggable(constructor: Function) {
  console.log(`Classe ${constructor.name} créée`);
}

@Loggable
class MaClasse {
  constructor() {
    console.log("Instance de MaClasse créée");
  }
}

// Décorateur de méthode
function Mesurer(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const methodeOriginale = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const debut = performance.now();
    const resultat = methodeOriginale.apply(this, args);
    const fin = performance.now();
    console.log(`${propertyKey} a pris ${fin - debut} millisecondes`);
    return resultat;
  };
  
  return descriptor;
}

class Calculateur {
  @Mesurer
  calculerFactorielle(n: number): number {
    if (n <= 1) return 1;
    return n * this.calculerFactorielle(n - 1);
  }
}
```

### Ajout de décorateurs de classe

Les décorateurs de classe sont appliqués au constructeur de la classe et peuvent être utilisés pour observer, modifier ou remplacer une définition de classe.

```typescript
function Serializable<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    serialize() {
      return JSON.stringify(this);
    }
    
    static deserialize(json: string) {
      return JSON.parse(json);
    }
  };
}

@Serializable
class Produit {
  constructor(public nom: string, public prix: number) {}
}

const produit = new Produit("Livre", 25);
console.log((produit as any).serialize()); // Output: {"nom":"Livre","prix":25}
```

## Collections et utilitaires

### Map

La classe `Map` est une collection de paires clé-valeur où les clés peuvent être de n'importe quel type.

```typescript
const utilisateurs = new Map<number, string>();

utilisateurs.set(1, "Alice");
utilisateurs.set(2, "Bob");
utilisateurs.set(3, "Charlie");

console.log(utilisateurs.get(1)); // Output: Alice
console.log(utilisateurs.has(2)); // Output: true
console.log(utilisateurs.size); // Output: 3

// Itération sur une Map
for (const [id, nom] of utilisateurs) {
  console.log(`ID: ${id}, Nom: ${nom}`);
}

// Avec des objets comme clés
const objetMap = new Map<object, string>();
const cle1 = { id: 1 };
const cle2 = { id: 2 };

objetMap.set(cle1, "Première valeur");
objetMap.set(cle2, "Deuxième valeur");

console.log(objetMap.get(cle1)); // Output: Première valeur
```

### Ajout de décorateurs de Propriété

Les décorateurs de propriété permettent de modifier le comportement des propriétés de classe.

```typescript
function Readonly(target: any, propertyKey: string) {
  let valeur = target[propertyKey];
  
  const getter = () => valeur;
  const setter = (nouvelleValeur: any) => {
    console.warn(`Tentative de modification de la propriété readonly ${propertyKey}`);
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Configuration {
  @Readonly
  version: string = "1.0.0";
  
  nom: string = "Mon App";
}

const config = new Configuration();
console.log(config.version); // Output: 1.0.0
config.version = "2.0.0"; // Warning: Tentative de modification de la propriété readonly version
```

## Configuration TypeScript (TSCONFIG)

### Include, Fin, RootDir, RemoveComments, NoEmitOnError

Ces options de configuration TypeScript contrôlent différents aspects de la compilation.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "removeComments": true,
    "noEmitOnError": true,
    "strict": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### Expliquer les clés du TSCONFIG

Le fichier `tsconfig.json` configure le comportement du compilateur TypeScript. Voici les principales options :

```typescript
{
  "compilerOptions": {
    // Cible de compilation
    "target": "ES2020",
    
    // Système de modules
    "module": "commonjs",
    
    // Répertoire racine des fichiers source
    "rootDir": "./src",
    
    // Répertoire de sortie
    "outDir": "./dist",
    
    // Supprimer les commentaires du code compilé
    "removeComments": true,
    
    // Ne pas émettre de fichiers en cas d'erreur
    "noEmitOnError": true,
    
    // Mode strict
    "strict": true,
    
    // Vérification de type stricte pour null
    "strictNullChecks": true,
    
    // Résolution des modules
    "moduleResolution": "node",
    
    // Permettre l'importation de modules JSON
    "resolveJsonModule": true,
    
    // Générer des fichiers de déclaration
    "declaration": true,
    
    // Générer des source maps
    "sourceMap": true
  },
  
  // Fichiers à inclure
  "include": [
    "src/**/*"
  ],
  
  // Fichiers à exclure
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}
```

