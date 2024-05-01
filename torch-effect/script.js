let CANVAS, CTX, VIDEO;
const COLOR =[8,73,175];
const THRESHOLD=50;

// La funzione principale che inizializza il canvas e ottiene l'accesso alla webcam dell'utente
function main(){
    // Ottiene il riferimento al canvas e al suo contesto di disegno
    CANVAS=document.getElementById("myCanvas");
    CTX=CANVAS.getContext("2d");

    // Richiede l'accesso alla webcam dell'utente
    navigator.mediaDevices.getUserMedia({video:true}).then(function(rawData){
            // Crea un elemento video e imposta la sorgente sul flusso di dati grezzi dalla webcam
            VIDEO=document.createElement("video");
            VIDEO.srcObject=rawData;
            VIDEO.play();
            // Una volta che i dati video sono caricati, inizia l'animazione dell'effetto torcia
            VIDEO.onloadeddata=animateTorchEffect;
        }).catch(function(err){alert(err)})
}

// La funzione che anima l'effetto torcia
function animateTorchEffect(){
    // Imposta la larghezza e l'altezza del canvas per corrispondere a quelle del video
    CANVAS.width=VIDEO.videoWidth;
    CANVAS.height=VIDEO.videoHeight;
    // Disegna il frame corrente del video sul canvas
    CTX.drawImage(VIDEO,0,0,CANVAS.width,CANVAS.height);

    // Trova tutti i pixel nel frame che sono vicini al colore specificato
    const locs=[];
    const {data}=CTX.getImageData(0,0,CANVAS.width,CANVAS.height);
    for(let i=0;i<data.length;i+=4){
        const r=data[i];
        const g=data[i+1];
        const b=data[i+2];
        // Se la distanza tra il colore del pixel e il colore specificato è inferiore alla soglia, registra la posizione del pixel
        if(distance([r,g,b],COLOR)<THRESHOLD){
            const x = (i/4)%CANVAS.width;
            const y = Math.floor((i/4)/CANVAS.width);
            locs.push({x,y});
        }
    }
    
    // Se ci sono pixel che corrispondono al colore, crea un gradiente radiale intorno al loro centro
    if(locs.length>0){
        const center={x:0,y:0};
        for(let i=0;i<locs.length;i++){
            center.x+=locs[i].x;
            center.y+=locs[i].y;
        }
        center.x/=locs.length;
        center.y/=locs.length;
        
        let rad=Math.sqrt(CANVAS.width*CANVAS.width+
                CANVAS.height*CANVAS.height);
        rad+=Math.random()*0.1*rad;
        
        const grd=CTX.createRadialGradient(
            center.x,center.y,rad*0.05,
            center.x,center.y,rad*0.2
        )
        grd.addColorStop(0,"rgba(0,0,0,0)");
        grd.addColorStop(1,"rgba(0,0,0,0.8)");

        // Disegna il gradiente sul canvas
        CTX.fillStyle=grd;
        CTX.arc(center.x,center.y,rad,0,Math.PI*2);
        CTX.fill();
    }else{ // Se non ci sono pixel che corrispondono al colore, riempie il canvas di nero
        CTX.fillStyle="rgba(0,0,0,0.8)";
        CTX.rect(0,0,CANVAS.width,CANVAS.height);
        CTX.fill();
    }

    // Richiede il prossimo frame di animazione
    requestAnimationFrame(animateTorchEffect);
}

// Calcola la distanza euclidea tra due vettori a 3 dimensioni (in questo caso, colori RGB)
function distance(v1,v2){
            return Math.sqrt((v1[0]-v2[0])*(v1[0]-v2[0])+
            (v1[1]-v2[1])*(v1[1]-v2[1])+
            (v1[2]-v2[2])*(v1[2]-v2[2]));
};

/*
Questo codice JavaScript crea un effetto "torcia" che illumina i pixel in un video
che corrispondono a un certo colore. 

Utilizza l'API MediaDevices per ottenere l'accesso alla webcam dell'utente 
e l'API Canvas per disegnare l'effetto.
*/
