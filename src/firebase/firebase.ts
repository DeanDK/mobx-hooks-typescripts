import firebase from "firebase";
import { firebaseLinksPath } from "../constants/firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser?.updateProfile({
      displayName: name
    });
  }

  isInitialized(): Promise<unknown> {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername(): string | null {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  linksDatabaseReference(): firebase.database.Reference {
    return firebase.database().ref(firebaseLinksPath);
  }

  newLinkDatabaseReference(index: number): firebase.database.Reference {
    return firebase.database().ref(`${firebaseLinksPath}/${index}`);
  }

  databaseChildReference(): firebase.database.Reference {
    return firebase
      .database()
      .ref()
      .child(firebaseLinksPath);
  }
}

export default new Firebase();
