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
//const dakar=new OsKar(road.getLaneCenter(0),canvas.height/2,25,40,4); // Crea un nuovo oggetto Omarillo con 
const N=15;
const oskars=generateOsKars(N);
// le coordinate iniziali al centro del canvas.
//let bestCar=oskars[0];

const traffic=[
  new DaKar(road.getLaneCenter(1),-100,25,40,"DUMMY",2,"")
];
let numObjects = Math.floor(Math.random() * 20) + 1;
for (let i = 0; i < numObjects; i++) {
  // Add the object to the array
  traffic.push(new DaKar(road.getLaneCenter(i%3+1),-100+Math.floor(i/3)*50+(i%3)*10,25,40,"DUMMY",(i%3)+1,"random"));
}

animate(); // Chiama la funzione animate per iniziare l'animazione.

export function save(){
  localStorage.setItem("bestBrain"+oskars[0].ray,
      JSON.stringify(oskars[0].brain));
}

export function discard(){
  localStorage.removeItem("bestBrain"+oskars[0].ray);
}

function generateOsKars(N=1){
  const cars=[];
  cars.push(new OsKar(road.getLaneCenter(2),canvas.height/2,25,40,4)); // Crea un nuovo oggetto Omarillo con 
  for(let i=1;i<N;i++){
    cars.push(cars[0].clone(0));
    }
  return cars;
}
function miny(oskars){
  let min=0;
  for(let i=1;i<oskars.length;i++){
    if(oskars[i].y<oskars[min].y && !oskars[i].damaged){
      min=i;
    } 
    else {
      if( oskars[i].y>oskars[min].y+canvas.height*0.5){       
          oskars[i].y=oskars[min].y+canvas.height*0.5; 
          oskars[i].damaged=false;  
          oskars[i].speed=oskars[i].maxSpeed;
      }
    }
  }
  if (oskars[min].damaged||oskars[min].speed==0){
    if (oskars.length<200){
      oskars.push(oskars[min].clone(oskars[min].generation+1));
      min=oskars.length-1;
      oskars[min].speed=oskars[min].maxSpeed/2;}
    else{
      oskars[min].mutate(); 
      oskars[min].speed=oskars[min].maxSpeed/2;
      oskars[min].damaged=false;
    }
  }
  if (min!=0){
   for(let i=0;i<min;i++){
      if( oskars[i].y>oskars[min].y+canvas.height*0.5){       
        oskars[i].y=oskars[min].y+canvas.height*0.5; 
        oskars[i].damaged=false;
        oskars[i].speed=oskars[i].maxSpeed;
      }
    }
    const temp=oskars[0];
    oskars[0]=oskars[min];
    oskars[min]=temp;
  }
  

  return 0;
}
function animate(time){
  //  dakar.update(); // Aggiorna lo stato dell'oggetto Dakar.
    // Questo potrebbe includere cose come la posizione, la velocità, ecc.
    networkCanvas.height=window.innerHeight;
    canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.
    oskars[miny(oskars)];
    ctx.save();
    ctx.translate(0,-oskars[0].y+canvas.height*0.7);
    road.draw(ctx);
    let maxdist=0
    for(let i=0;i<traffic.length;i++){
      traffic[i].draw(ctx,[]);
      if(traffic[i].y-oskars[0].y>canvas.height){
        traffic[i].y=oskars[0].y-canvas.height;
        traffic[i].maxSpeed=Math.floor(Math.random() * 5);
        traffic[i].speed=traffic[i].maxSpeed;
        traffic[i].damaged=false;
        traffic[i].x= road.getLaneCenter(traffic[i].maxSpeed);       
      }
      if (-traffic[i].y+oskars[0].y>maxdist){
        maxdist=-traffic[i].y+oskars[0].y;
      }
    } 
  /*  if (Math.floor(maxdist/canvas.height)>1){
      oskars.push(bestCar.clone(N/oskars.length));
    }*/
    ctx.globalAlpha=0.2;
    for(let i=0;i<oskars.length;i++){
      oskars[i].draw(ctx,traffic,road.borders);
    }
    ctx.globalAlpha=1;
    //bestCar.draw(ctx,"blue",true);
    oskars[0].draw(ctx,traffic,road.borders); // Disegna l'oggetto Omarillo sul canvas utilizzando 
    //il contesto di disegno 2D.
    
    ctx.restore(); 
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,oskars[0].brain);
    requestAnimationFrame(animate); // Richiede che la funzione animate venga 
    //chiamata di nuovo al prossimo frame di animazione. Questo crea un ciclo di animazione.
}