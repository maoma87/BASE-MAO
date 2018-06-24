const config = {
    apiKey: "XXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXXX" 
};

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({timestampsInSnapshots:true});

export default firebaseApp.firestore();