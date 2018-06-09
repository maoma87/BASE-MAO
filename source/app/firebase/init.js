const config = {
    apiKey: "AIzaSyCXC1tD1EVmt6zyfCAHpGwucnqD-ZRriO8",
    authDomain: "maoma-website.firebaseapp.com",
    databaseURL: "https://maoma-website.firebaseio.com",
    projectId: "maoma-website",
    storageBucket: "maoma-website.appspot.com",
    messagingSenderId: "564155916456" 
};

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({timestampsInSnapshots:true});

export default firebaseApp.firestore();