import { DaKar } from './dakar.js';
import { OsKar } from './oskar.js';
import { Road } from './road.js';
import { Visualizer } from './visualizer.js';

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;
const networkCtx = networkCanvas.getContext("2d");

const canvas=document.getElementById("myCanvas"); // Ottiene un riferimento all'elemento canvas con l'ID "myCanvas" dal documento HTML.
canvas.width=200; // Imposta la larghezza del canvas a 200 pixel.
canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.
//canvas.style.backgroundCored"lor="#CCAC66"; // Imposta il colore di sfondo del canvas su nero.
const ctx = canvas.getContext("2d"); // Ottiene il contesto di disegno 2D del canvas. 

//Questo viene utilizzato per disegnare sull'elemento canvas.
const road=new Road(canvas.width/2,canvas.width-25); // Crea un nuovo oggetto Road con la posizione centrale e la larghezza specificate.
//const dakar=new DaKar(road.getLaneCenter(0),canvas.height/2,25,40,"KEYS",19); // Crea un nuovo oggetto Omarillo con 
const dakar=new OsKar(road.getLaneCenter(0),canvas.height/2,25,40,4); // Crea un nuovo oggetto Omarillo con 

// le coordinate iniziali al centro del canvas.
const traffic=[
  new DaKar(road.getLaneCenter(1),-100,25,40,"DUMMY",2,"")
];
let numObjects = Math.floor(Math.random() * 20) + 1;
for (let i = 0; i < numObjects; i++) {
  // Add the object to the array
  traffic.push(new DaKar(road.getLaneCenter(i%3+1),-100+Math.floor(i/3)*50+(i%3)*10,25,40,"DUMMY",(i%3)+1,"random"));
}

animate(); // Chiama la funzione animate per iniziare l'animazione.

function animate(time){
  //  dakar.update(); // Aggiorna lo stato dell'oggetto Dakar.
    // Questo potrebbe includere cose come la posizione, la velocità, ecc.
    networkCanvas.height=window.innerHeight;
    canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.

    ctx.save();
    ctx.translate(0,-dakar.y+canvas.height*0.7);
    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
      traffic[i].draw(ctx,[]);
    }
    dakar.draw(ctx,traffic,road.borders); // Disegna l'oggetto Omarillo sul canvas utilizzando 
    //il contesto di disegno 2D.
    
    ctx.restore(); 
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,dakar.brain);
    requestAnimationFrame(animate); // Richiede che la funzione animate venga 
    //chiamata di nuovo al prossimo frame di animazione. Questo crea un ciclo di animazione.
}