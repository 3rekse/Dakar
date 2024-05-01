import { SaharaKar } from './desertKar.js';
/*Questo codice JavaScript è responsabile per l'inizializzazione 
e l'animazione di un oggetto `Omarillo` su un canvas HTML. */

const canvas=document.getElementById("myCanvas"); // Ottiene un riferimento all'elemento canvas con l'ID "myCanvas" dal documento HTML.
canvas.width=window.innerWidth; // Imposta la larghezza del canvas a 200 pixel.
canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.
canvas.style.backgroundColor="#CCAC66"; // Imposta il colore di sfondo del canvas su nero.

const ctx = canvas.getContext("2d"); // Ottiene il contesto di disegno 2D del canvas. 
//Questo viene utilizzato per disegnare sull'elemento canvas.

const dakar=new SaharaKar(canvas.width/2,canvas.height/2,30,50); // Crea un nuovo oggetto Omarillo con 
// le coordinate iniziali al centro del canvas.

animate(); // Chiama la funzione animate per iniziare l'animazione.

function animate(){
  //  dakar.update(); // Aggiorna lo stato dell'oggetto Dakar.
    // Questo potrebbe includere cose come la posizione, la velocità, ecc.

   // canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.

    dakar.draw(ctx); // Disegna l'oggetto Omarillo sul canvas utilizzando 
    //il contesto di disegno 2D.

    requestAnimationFrame(animate); // Richiede che la funzione animate venga 
    //chiamata di nuovo al prossimo frame di animazione. Questo crea un ciclo di animazione.
}
