import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, 
    updateDoc, doc, increment, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDInlY6s7aJMm_OihzgS1zPqSOn5ee4yOQ",
    authDomain: "devede-ed0aa.firebaseapp.com",
    projectId: "devede-ed0aa",
    storageBucket: "devede-ed0aa.appspot.com",
    messagingSenderId: "290632333974",
    appId: "1:290632333974:web:134b8f4bed519d2d8320b7"
  };

// init app
const app = initializeApp(firebaseConfig);

// init service
const db = getFirestore(app);

//collection ref
const colRef = collection(db, 'movies')

//print movie elem
const movieElem = document.querySelector('#movie-output')


//hämta collection
onSnapshot(colRef, (snapshot) => {
      snapshot.docs.map((doc) =>{
      const data = doc.data()
        return movieElem.innerHTML+= 
        `
        <hr>
        <h1>${data.title}</h1>
        <h3>
         ${data.genere}
        : ${data.date}
        </h3>
        <p>id: ${doc.id}</p>
        ` 
    })  
    console.log(snapshot)

})

// add documents
const addMovieForm = document.querySelector('.add-movie')
addMovieForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef,{
    title: addMovieForm.name.value,
    genere: addMovieForm.genere.value,
    date: addMovieForm.date.value, 

  })
  .then(() => { 
    addMovieForm.reset()
    
  })
})

//delete documents
const deleteMovieForm = document.querySelector('.delete')
deleteMovieForm.addEventListener('submit', (e)=> {
  e.preventDefault()
const docRef = doc(db, 'movies', deleteMovieForm.id.value)

deleteDoc(docRef)
  .then(() => {
    deleteMovieForm.reset()
  })

})

function clearData(){
  document.querySelector('movieElem').innerHTML = "";
}
