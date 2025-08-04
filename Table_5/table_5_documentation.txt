# Table 5: Concepts avancés et types complexes

Cette section couvre les concepts les plus avancés de TypeScript, incluant les interfaces complexes, les types d'intersection, les propriétés de discrimination, et les techniques avancées de manipulation de types.

## Interfaces et types avancés

### Interface et type

En TypeScript, les `interface` et les `type` sont deux façons de définir des types personnalisés. Bien qu'ils soient souvent interchangeables, ils ont des différences subtiles mais importantes.

```typescript
// Interface
interface UtilisateurInterface {
  nom: string;
  age: number;
  email?: string;
}

// Type alias
type UtilisateurType = {
  nom: string;
  age: number;
  email?: string;
};

// Les deux peuvent être utilisés de manière similaire
const user1: UtilisateurInterface = { nom: "Alice", age: 30 };
const user2: UtilisateurType = { nom: "Bob", age: 25 };

// Extension d'interface
interface UtilisateurAvecAdresse extends UtilisateurInterface {
  adresse: string;
}

// Extension de type avec intersection
type UtilisateurAvecTelephone = UtilisateurType & {
  telephone: string;
};

// Les interfaces peuvent être fusionnées (declaration merging)
interface Fenetre {
  titre: string;
}

interface Fenetre {
  largeur: number;
  hauteur: number;
}

// Maintenant Fenetre a toutes les propriétés
const maFenetre: Fenetre = {
  titre: "Ma Fenêtre",
  largeur: 800,
  hauteur: 600
};

// Les types peuvent utiliser des unions et des types conditionnels
type Statut = "en_attente" | "traite" | "termine";
type Reponse<T> = T extends string ? string : number;
```

### Intersection de types

L'intersection de types permet de combiner plusieurs types en un seul type qui possède toutes les propriétés des types combinés.

```typescript
interface Personne {
  nom: string;
  age: number;
}

interface Employe {
  entreprise: string;
  salaire: number;
}

interface Developpeur {
  langages: string[];
  experience: number;
}

// Intersection de types
type DeveloppeurEmploye = Personne & Employe & Developpeur;

const dev: DeveloppeurEmploye = {
  nom: "Alice",
  age: 30,
  entreprise: "TechCorp",
  salaire: 65000,
  langages: ["TypeScript", "JavaScript", "Python"],
  experience: 5
};

// Intersection avec des types primitifs
type StringEtNombre = string & number; // Type never (impossible)

// Intersection utile avec des types d'objets
type AvecId = { id: number };
type AvecTimestamp = { createdAt: Date; updatedAt: Date };

type Entite = AvecId & AvecTimestamp;

const monEntite: Entite = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Fonction générique avec intersection
function fusionnerObjets<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const objet1 = { nom: "Test", valeur: 42 };
const objet2 = { actif: true, description: "Un objet de test" };
const objetFusionne = fusionnerObjets(objet1, objet2);

console.log(objetFusionne.nom); // Type-safe
console.log(objetFusionne.actif); // Type-safe
```

### Param de fn par défaut

TypeScript supporte les paramètres par défaut dans les fonctions, permettant d'omettre certains arguments lors de l'appel.

```typescript
// Paramètres par défaut simples
function saluer(nom: string, salutation: string = "Bonjour"): string {
  return `${salutation}, ${nom}!`;
}

console.log(saluer("Alice")); // Output: Bonjour, Alice!
console.log(saluer("Bob", "Salut")); // Output: Salut, Bob!

// Paramètres par défaut avec types complexes
interface ConfigurationServeur {
  port: number;
  host: string;
  ssl: boolean;
}

function demarrerServeur(
  config: Partial<ConfigurationServeur> = {}
): ConfigurationServeur {
  const configParDefaut: ConfigurationServeur = {
    port: 3000,
    host: "localhost",
    ssl: false
  };
  
  return { ...configParDefaut, ...config };
}

const serveur1 = demarrerServeur(); // Utilise tous les défauts
const serveur2 = demarrerServeur({ port: 8080 }); // Override seulement le port
const serveur3 = demarrerServeur({ host: "0.0.0.0", ssl: true });

// Paramètres par défaut avec fonctions
function traiterDonnees(
  donnees: string[],
  transformateur: (item: string) => string = (x) => x.toUpperCase()
): string[] {
  return donnees.map(transformateur);
}

const mots = ["hello", "world"];
console.log(traiterDonnees(mots)); // ["HELLO", "WORLD"]
console.log(traiterDonnees(mots, x => x.toLowerCase())); // ["hello", "world"]

// Paramètres par défaut calculés
function creerUtilisateur(
  nom: string,
  id: number = Math.floor(Math.random() * 10000),
  dateCreation: Date = new Date()
) {
  return { nom, id, dateCreation };
}
```

### Héritage

L'héritage en TypeScript permet aux classes de hériter des propriétés et méthodes d'autres classes, créant des hiérarchies de types.

```typescript
// Classe de base
class Animal {
  protected nom: string;
  protected age: number;

  constructor(nom: string, age: number) {
    this.nom = nom;
    this.age = age;
  }

  faireDuBruit(): void {
    console.log("L'animal fait un bruit");
  }

  afficherInfo(): void {
    console.log(`${this.nom} a ${this.age} ans`);
  }
}

// Héritage simple
class Chien extends Animal {
  private race: string;

  constructor(nom: string, age: number, race: string) {
    super(nom, age); // Appel du constructeur parent
    this.race = race;
  }

  faireDuBruit(): void {
    console.log(`${this.nom} aboie: Woof!`);
  }

  afficherRace(): void {
    console.log(`${this.nom} est un ${this.race}`);
  }
}

// Héritage multiple via interfaces
interface Volant {
  voler(): void;
}

interface Nageur {
  nager(): void;
}

class Canard extends Animal implements Volant, Nageur {
  voler(): void {
    console.log(`${this.nom} vole dans le ciel`);
  }

  nager(): void {
    console.log(`${this.nom} nage dans l'eau`);
  }

  faireDuBruit(): void {
    console.log(`${this.nom} fait coin-coin`);
  }
}

const monChien = new Chien("Buddy", 3, "Golden Retriever");
monChien.afficherInfo();
monChien.faireDuBruit();
monChien.afficherRace();

const monCanard = new Canard("Donald", 2);
monCanard.voler();
monCanard.nager();
monCanard.faireDuBruit();
```

### Propriété de discrimination

Les propriétés de discrimination (discriminated unions) permettent de créer des types union où chaque membre a une propriété commune qui peut être utilisée pour distinguer les types.

```typescript
// Types avec propriété discriminante
interface Cercle {
  type: "cercle";
  rayon: number;
}

interface Rectangle {
  type: "rectangle";
  largeur: number;
  hauteur: number;
}

interface Triangle {
  type: "triangle";
  base: number;
  hauteur: number;
}

type Forme = Cercle | Rectangle | Triangle;

// Fonction utilisant la discrimination
function calculerAire(forme: Forme): number {
  switch (forme.type) {
    case "cercle":
      return Math.PI * forme.rayon * forme.rayon;
    case "rectangle":
      return forme.largeur * forme.hauteur;
    case "triangle":
      return 0.5 * forme.base * forme.hauteur;
    default:
      // TypeScript s'assure que tous les cas sont couverts
      const _exhaustiveCheck: never = forme;
      return _exhaustiveCheck;
  }
}

const cercle: Cercle = { type: "cercle", rayon: 5 };
const rectangle: Rectangle = { type: "rectangle", largeur: 10, hauteur: 20 };
const triangle: Triangle = { type: "triangle", base: 8, hauteur: 12 };

console.log(`Aire du cercle: ${calculerAire(cercle)}`);
console.log(`Aire du rectangle: ${calculerAire(rectangle)}`);
console.log(`Aire du triangle: ${calculerAire(triangle)}`);

// Exemple avec des états d'application
interface EtatChargement {
  statut: "chargement";
}

interface EtatSucces {
  statut: "succes";
  donnees: any[];
}

interface EtatErreur {
  statut: "erreur";
  message: string;
}

type EtatApplication = EtatChargement | EtatSucces | EtatErreur;

function afficherEtat(etat: EtatApplication): void {
  switch (etat.statut) {
    case "chargement":
      console.log("Chargement en cours...");
      break;
    case "succes":
      console.log(`Données chargées: ${etat.donnees.length} éléments`);
      break;
    case "erreur":
      console.log(`Erreur: ${etat.message}`);
      break;
  }
}
```

### Type union

Les types union permettent à une variable d'accepter plusieurs types différents, offrant flexibilité tout en maintenant la sécurité de type.

```typescript
// Union simple
type StringOuNombre = string | number;

function afficherValeur(valeur: StringOuNombre): void {
  if (typeof valeur === "string") {
    console.log(`Chaîne: ${valeur.toUpperCase()}`);
  } else {
    console.log(`Nombre: ${valeur.toFixed(2)}`);
  }
}

// Union avec null et undefined
type ValeurOptionnelle = string | null | undefined;

function traiterValeur(valeur: ValeurOptionnelle): string {
  if (valeur === null) {
    return "Valeur nulle";
  } else if (valeur === undefined) {
    return "Valeur indéfinie";
  } else {
    return `Valeur: ${valeur}`;
  }
}

// Union de types d'objets
interface Utilisateur {
  type: "utilisateur";
  nom: string;
  email: string;
}

interface Admin {
  type: "admin";
  nom: string;
  permissions: string[];
}

type Personne = Utilisateur | Admin;

function afficherPersonne(personne: Personne): void {
  console.log(`Nom: ${personne.nom}`);
  
  if (personne.type === "admin") {
    console.log(`Permissions: ${personne.permissions.join(", ")}`);
  } else {
    console.log(`Email: ${personne.email}`);
  }
}

// Union avec types littéraux
type Theme = "clair" | "sombre" | "auto";
type Taille = "petit" | "moyen" | "grand";

interface Configuration {
  theme: Theme;
  taille: Taille;
}

const config: Configuration = {
  theme: "sombre",
  taille: "moyen"
};
```

### Attributs et méthodes de classe

TypeScript offre plusieurs modificateurs et fonctionnalités pour les membres de classe, permettant un contrôle fin de l'encapsulation et du comportement.

```typescript
class Produit {
  // Propriétés publiques (par défaut)
  public nom: string;
  
  // Propriétés privées (accessibles seulement dans cette classe)
  private _prix: number;
  
  // Propriétés protégées (accessibles dans cette classe et ses sous-classes)
  protected categorie: string;
  
  // Propriétés statiques (appartiennent à la classe, pas aux instances)
  static compteur: number = 0;
  
  // Propriétés en lecture seule
  readonly id: number;

  constructor(nom: string, prix: number, categorie: string) {
    this.nom = nom;
    this._prix = prix;
    this.categorie = categorie;
    this.id = ++Produit.compteur;
  }

  // Getter
  get prix(): number {
    return this._prix;
  }

  // Setter avec validation
  set prix(nouveauPrix: number) {
    if (nouveauPrix < 0) {
      throw new Error("Le prix ne peut pas être négatif");
    }
    this._prix = nouveauPrix;
  }

  // Méthode publique
  afficherInfo(): void {
    console.log(`${this.nom} - ${this._prix}€ (${this.categorie})`);
  }

  // Méthode privée
  private calculerTaxe(): number {
    return this._prix * 0.2;
  }

  // Méthode protégée
  protected obtenirPrixAvecTaxe(): number {
    return this._prix + this.calculerTaxe();
  }

  // Méthode statique
  static obtenirNombreProduits(): number {
    return Produit.compteur;
  }
}

class ProduitPremium extends Produit {
  private reduction: number;

  constructor(nom: string, prix: number, categorie: string, reduction: number) {
    super(nom, prix, categorie);
    this.reduction = reduction;
  }

  // Override de méthode
  afficherInfo(): void {
    super.afficherInfo();
    console.log(`Réduction: ${this.reduction}%`);
  }

  // Utilisation de méthode protégée
  obtenirPrixFinal(): number {
    const prixAvecTaxe = this.obtenirPrixAvecTaxe();
    return prixAvecTaxe * (1 - this.reduction / 100);
  }
}

const produit1 = new Produit("Laptop", 999, "Électronique");
const produit2 = new ProduitPremium("Smartphone", 599, "Électronique", 10);

console.log(`Nombre de produits créés: ${Produit.obtenirNombreProduits()}`);
```

### Paramètres callback

Les callbacks sont des fonctions passées en paramètre à d'autres fonctions. TypeScript permet de typer précisément ces callbacks pour une meilleure sécurité de type.

```typescript
// Type de callback simple
type Callback = () => void;
type CallbackAvecParametre<T> = (valeur: T) => void;
type CallbackAvecRetour<T, R> = (valeur: T) => R;

// Fonction utilisant un callback
function executerAvecDelai(callback: Callback, delai: number): void {
  setTimeout(callback, delai);
}

executerAvecDelai(() => {
  console.log("Callback exécuté après délai");
}, 1000);

// Callback avec paramètres
function traiterTableau<T>(
  tableau: T[],
  callback: CallbackAvecParametre<T>
): void {
  tableau.forEach(callback);
}

traiterTableau([1, 2, 3], (nombre) => {
  console.log(`Nombre: ${nombre}`);
});

// Callback avec valeur de retour
function transformerTableau<T, R>(
  tableau: T[],
  transformateur: CallbackAvecRetour<T, R>
): R[] {
  return tableau.map(transformateur);
}

const nombres = [1, 2, 3, 4, 5];
const carres = transformerTableau(nombres, (n) => n * n);
console.log(carres); // [1, 4, 9, 16, 25]

// Callbacks optionnels
function chargerDonnees(
  url: string,
  onSuccess?: (data: any) => void,
  onError?: (error: Error) => void
): void {
  // Simulation d'une requête
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      onSuccess?.({ message: "Données chargées" });
    } else {
      onError?.(new Error("Échec du chargement"));
    }
  }, 1000);
}

chargerDonnees(
  "https://api.example.com/data",
  (data) => console.log("Succès:", data),
  (error) => console.error("Erreur:", error.message)
);

// Interface pour des callbacks complexes
interface GestionnaireEvenements {
  onStart?: () => void;
  onProgress?: (pourcentage: number) => void;
  onComplete?: (resultat: any) => void;
  onError?: (error: Error) => void;
}

function executerTache(
  tache: () => Promise<any>,
  gestionnaires: GestionnaireEvenements = {}
): void {
  gestionnaires.onStart?.();
  
  tache()
    .then((resultat) => {
      gestionnaires.onProgress?.(100);
      gestionnaires.onComplete?.(resultat);
    })
    .catch((error) => {
      gestionnaires.onError?.(error);
    });
}
```

### Fonction générique

Les fonctions génériques permettent de créer des fonctions réutilisables qui peuvent travailler avec différents types tout en maintenant la sécurité de type.

```typescript
// Fonction générique simple
function identite<T>(arg: T): T {
  return arg;
}

const nombre = identite(42); // Type inféré: number
const texte = identite("hello"); // Type inféré: string

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
// afficherLongueur(123); // Erreur

// Fonction générique avec plusieurs paramètres de type
function echanger<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const paire = echanger(["hello", 42]); // Type: [number, string]

// Fonction générique avec keyof
function obtenirPropriete<T, K extends keyof T>(obj: T, cle: K): T[K] {
  return obj[cle];
}

const personne = { nom: "Alice", age: 30 };
const nom = obtenirPropriete(personne, "nom"); // Type: string
const age = obtenirPropriete(personne, "age"); // Type: number

// Fonction générique avec types conditionnels
type ApiResponse<T> = T extends string ? { message: T } : { data: T };

function traiterReponse<T>(input: T): ApiResponse<T> {
  if (typeof input === "string") {
    return { message: input } as ApiResponse<T>;
  } else {
    return { data: input } as ApiResponse<T>;
  }
}

const reponseTexte = traiterReponse("Succès"); // Type: { message: string }
const reponseDonnees = traiterReponse({ id: 1, nom: "Test" }); // Type: { data: { id: number, nom: string } }

// Fonction générique avec valeurs par défaut
function creerTableau<T = string>(longueur: number, valeur: T): T[] {
  return new Array(longueur).fill(valeur);
}

const tableauStrings = creerTableau(3, "test"); // Type: string[]
const tableauNombres = creerTableau<number>(5, 0); // Type: number[]
```

### Décorateurs de propriétés

Les décorateurs de propriétés permettent de modifier ou d'observer le comportement des propriétés de classe au moment de leur définition.

```typescript
// Décorateur de propriété simple
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

// Décorateur avec paramètres (factory)
function MinMax(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    let valeur = target[propertyKey];
    
    const getter = () => valeur;
    const setter = (nouvelleValeur: number) => {
      if (nouvelleValeur < min || nouvelleValeur > max) {
        throw new Error(`La valeur doit être entre ${min} et ${max}`);
      }
      valeur = nouvelleValeur;
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

// Décorateur de validation
function Required(target: any, propertyKey: string) {
  let valeur = target[propertyKey];
  
  const getter = () => valeur;
  const setter = (nouvelleValeur: any) => {
    if (nouvelleValeur === null || nouvelleValeur === undefined) {
      throw new Error(`La propriété ${propertyKey} est requise`);
    }
    valeur = nouvelleValeur;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Utilisateur {
  @Required
  nom: string;
  
  @MinMax(0, 120)
  age: number;
  
  @Readonly
  id: string;

  constructor(nom: string, age: number, id: string) {
    this.nom = nom;
    this.age = age;
    this.id = id;
  }
}

const user = new Utilisateur("Alice", 30, "user123");
console.log(user.nom); // Alice

// user.age = 150; // Erreur: La valeur doit être entre 0 et 120
// user.id = "newId"; // Warning: Tentative de modification de la propriété readonly id
```

## Types utilitaires et avancés

### Type unknow

Le type `unknown` est le type-safe counterpart de `any`. Il représente n'importe quelle valeur, mais contrairement à `any`, vous devez effectuer une vérification de type avant de l'utiliser.

```typescript
let valeurInconnue: unknown;

valeurInconnue = 42;
valeurInconnue = "hello";
valeurInconnue = true;
valeurInconnue = { nom: "Alice" };

// Vous ne pouvez pas utiliser unknown directement
// console.log(valeurInconnue.toUpperCase()); // Erreur

// Vous devez d'abord vérifier le type
if (typeof valeurInconnue === "string") {
  console.log(valeurInconnue.toUpperCase()); // OK
}

// Fonction de garde de type
function estString(valeur: unknown): valeur is string {
  return typeof valeur === "string";
}

if (estString(valeurInconnue)) {
  console.log(valeurInconnue.length); // TypeScript sait que c'est une string
}

// Utilisation avec try-catch
function traiterDonneesInconnues(donnees: unknown): string {
  try {
    if (typeof donnees === "object" && donnees !== null && "nom" in donnees) {
      return `Nom: ${(donnees as { nom: string }).nom}`;
    } else if (typeof donnees === "string") {
      return `Texte: ${donnees}`;
    } else {
      return `Type non supporté: ${typeof donnees}`;
    }
  } catch (error) {
    return "Erreur lors du traitement";
  }
}
```

### Tableau en lecture seule

Les tableaux en lecture seule empêchent la modification du tableau après sa création, offrant une immutabilité au niveau du type.

```typescript
// Tableau readonly
const nombres: readonly number[] = [1, 2, 3, 4, 5];

// Ces opérations sont interdites
// nombres.push(6); // Erreur
// nombres.pop(); // Erreur
// nombres[0] = 10; // Erreur

// Ces opérations sont autorisées (elles retournent de nouveaux tableaux)
const nouveauxNombres = [...nombres, 6];
const nombresFiltres = nombres.filter(n => n > 2);
const nombresTransformes = nombres.map(n => n * 2);

console.log(nombres); // [1, 2, 3, 4, 5] (inchangé)
console.log(nouveauxNombres); // [1, 2, 3, 4, 5, 6]

// Type ReadonlyArray
let tableauLectureSeule: ReadonlyArray<string> = ["a", "b", "c"];

// Fonction qui accepte un tableau readonly
function afficherElements(elements: readonly string[]): void {
  elements.forEach(element => console.log(element));
}

afficherElements(nombres.map(String));

// Conversion d'un tableau mutable en readonly
let tableauMutable = [1, 2, 3];
let tableauImmutable: readonly number[] = tableauMutable;

// Le tableau original peut encore être modifié
tableauMutable.push(4);
console.log(tableauImmutable); // [1, 2, 3, 4] (affecté par la modification)

// Pour une vraie immutabilité, créez une copie
let vraiTableauImmutable: readonly number[] = [...tableauMutable];
```

### Type Object

Le type `Object` (avec un O majuscule) représente tous les types non-primitifs, mais il est généralement préférable d'utiliser des types plus spécifiques.

```typescript
// Type Object (éviter en général)
let obj: Object;
obj = { nom: "Alice" };
obj = [1, 2, 3];
obj = new Date();
obj = function() {};

// Types d'objets plus spécifiques (recommandé)
type UtilisateurObjet = {
  nom: string;
  age: number;
};

// Record pour créer des types d'objets avec des clés dynamiques
type DictionnaireUtilisateurs = Record<string, UtilisateurObjet>;

const utilisateurs: DictionnaireUtilisateurs = {
  "user1": { nom: "Alice", age: 30 },
  "user2": { nom: "Bob", age: 25 }
};

// Partial - rend toutes les propriétés optionnelles
type UtilisateurPartiel = Partial<UtilisateurObjet>;
const updateUser: UtilisateurPartiel = { age: 31 }; // nom est optionnel

// Required - rend toutes les propriétés requises
interface UtilisateurAvecEmail {
  nom: string;
  age: number;
  email?: string;
}

type UtilisateurComplet = Required<UtilisateurAvecEmail>;
// Maintenant email est requis

// Pick - sélectionne certaines propriétés
type NomSeul = Pick<UtilisateurObjet, "nom">;
const nomUtilisateur: NomSeul = { nom: "Charlie" };

// Omit - exclut certaines propriétés
type SansAge = Omit<UtilisateurObjet, "age">;
const utilisateurSansAge: SansAge = { nom: "David" };

// Readonly - rend toutes les propriétés en lecture seule
type UtilisateurLectureSeule = Readonly<UtilisateurObjet>;
const userReadonly: UtilisateurLectureSeule = { nom: "Eve", age: 28 };
// userReadonly.age = 29; // Erreur
```

### Arrow function

Les fonctions fléchées (arrow functions) offrent une syntaxe concise et un comportement de `this` lexical, particulièrement utile en TypeScript.

```typescript
// Syntaxe de base
const addition = (a: number, b: number): number => a + b;
const saluer = (nom: string): string => `Bonjour ${nom}`;

// Fonction fléchée sans paramètres
const obtenirDateActuelle = (): Date => new Date();

// Fonction fléchée avec un seul paramètre (parenthèses optionnelles)
const doubler = (x: number): number => x * 2;
const tripler = x => x * 3; // Type inféré

// Fonction fléchée avec corps de fonction
const traiterUtilisateur = (user: { nom: string; age: number }): string => {
  const statut = user.age >= 18 ? "majeur" : "mineur";
  return `${user.nom} est ${statut}`;
};

// Fonction fléchée retournant un objet (parenthèses nécessaires)
const creerPoint = (x: number, y: number) => ({ x, y });

// Utilisation avec les méthodes de tableau
const nombres = [1, 2, 3, 4, 5];
const carres = nombres.map(n => n * n);
const pairs = nombres.filter(n => n % 2 === 0);
const somme = nombres.reduce((acc, n) => acc + n, 0);

// Fonction fléchée générique
const identite = <T>(valeur: T): T => valeur;

// Fonction fléchée avec types union
const formater = (valeur: string | number): string => 
  typeof valeur === "string" ? valeur.toUpperCase() : valeur.toString();

// Fonction fléchée async
const chargerDonnees = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return response.json();
};

// Comportement de 'this' avec les fonctions fléchées
class Compteur {
  private valeur = 0;

  // Méthode traditionnelle - 'this' peut changer
  incrementer() {
    this.valeur++;
  }

  // Fonction fléchée - 'this' est lié lexicalement
  incrementerFleche = (): void => {
    this.valeur++;
  }

  obtenirValeur = (): number => this.valeur;
}

const compteur = new Compteur();
const incrementerDetache = compteur.incrementerFleche;
incrementerDetache(); // Fonctionne correctement grâce au 'this' lexical
```

### Attribut en lect seule

Les attributs en lecture seule (`readonly`) empêchent la modification d'une propriété après son initialisation.

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 15; // Erreur: Cannot assign to 'x' because it is a read-only property

class Cercle {
  readonly rayon: number;
  readonly centre: Point;

  constructor(rayon: number, centre: Point) {
    this.rayon = rayon;
    this.centre = centre;
  }

  // Méthode qui retourne un nouveau cercle au lieu de modifier l'existant
  redimensionner(nouveauRayon: number): Cercle {
    return new Cercle(nouveauRayon, this.centre);
  }
}

const cercle = new Cercle(5, { x: 0, y: 0 });
// cercle.rayon = 10; // Erreur

// Readonly avec des objets imbriqués
interface Configuration {
  readonly nom: string;
  readonly options: readonly string[];
  readonly parametres: {
    readonly theme: string;
    readonly langue: string;
  };
}

const config: Configuration = {
  nom: "MonApp",
  options: ["option1", "option2"],
  parametres: {
    theme: "sombre",
    langue: "fr"
  }
};

// Toutes ces tentatives de modification échoueront
// config.nom = "NouveauNom"; // Erreur
// config.options.push("option3"); // Erreur
// config.parametres.theme = "clair"; // Erreur

// Utilisation avec des types utilitaires
type ConfigurationMutable = {
  -readonly [K in keyof Configuration]: Configuration[K];
};

// Fonction qui crée une version mutable d'un objet readonly
function rendreMutable<T>(obj: T): { -readonly [K in keyof T]: T[K] } {
  return { ...obj } as { -readonly [K in keyof T]: T[K] };
}

const configMutable = rendreMutable(config);
configMutable.nom = "NouveauNom"; // OK maintenant
```

