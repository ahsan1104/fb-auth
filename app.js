import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB2q__wW7VCkSn7-K6LwMsDxC0PoTefukA",
  authDomain: "auth-b1cba.firebaseapp.com",
  projectId: "auth-b1cba",
  storageBucket: "auth-b1cba.appspot.com",
  messagingSenderId: "989096624456",
  appId: "1:989096624456:web:1c8f5e60c38e75ea6db37d"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

let sbtn = document.getElementById('sbtn');
if (sbtn) {
    sbtn.addEventListener('click', () => {
        let email = document.getElementById('semail').value;
        let password = document.getElementById('spass').value;
       

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        email: email,
                        password: password,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    alert('user signed up successfully');
                    location.href = './signin.html';
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert('something went wrong');
            });
    });
}

let lbtn = document.getElementById('lbtn');
if (lbtn) {
    lbtn.addEventListener('click', () => {
        let email = document.getElementById('lemail').value;
        let password = document.getElementById('lpass').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user mil gaya ==>', user);
                location.href = './welcome.html'
            })
            .catch((error) => {
                console.log('error shareef ==>', error);
            });
    });
}


let showData = document.getElementById('showData')
if (showData) {
    showData.addEventListener('click', async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            let showw = document.getElementById('show')
            showw.innerHTML +=  `
            <div>${doc.data().email}</div>
            <div>${doc.data().password}</div>
            <br><br>
            `            
        });
    }
    )
}