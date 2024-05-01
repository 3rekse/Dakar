import { Controls } from './controlsA.js';
/*Questo codice JavaScript definisce una classe `Dakar` 
che rappresenta un'auto in un gioco o in una simulazione. 
Ecco una descrizione dettagliata di ciascuna parte:*/


export class DaKar{
    constructor(x,y,width,height){
        // Costruttore della classe. Imposta le proprietà iniziali dell'auto.
        // x e y sono le coordinate dell'auto centro dell'auto.
        // width e height sono la larghezza e l'altezza dell'auto.
        
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        //this.img = new Image();   // Crea un nuovo oggetto immagine
        this.img = `. . . . . . . . . . . . . . . .
        . . . . . . 4 . . . . . . . . .
        . . . . . . 4 . . . . . . . . .
        . 4 4 . . . 4 4 . . . 4 4 4 . .
        . 4 . . . 4 4 4 4 . . . . 4 . .
        . 4 . . 4 4 4 4 4 4 . . . 4 . . 
        . 4 4 4 4 . 4 4 . 4 4 4 4 4 . .
        . . . 4 4 4 4 4 . 4 4 . . . . .
        . 4 4 4 4 4 4 4 4 4 4 4 4 . . .
        . 4 . 4 4 7 7 7 7 4 4 . 4 . . .
        . . . 4 4 4 4 4 4 4 4 . . . . .
        . . 4 4 4 . . . . 4 4 4 . . . .
        . . 4 4 4 . . . . 4 4 4 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .`.trim().split('\n');

        
        ; // Imposta la sorgente dell'immagine
        
        this.speed=0; // La velocità attuale dell'auto.
        this.acceleration=0.2; // L'accelerazione dell'auto.
        this.maxSpeed=3; // La velocità massima dell'auto.
        this.friction=0.05; // L'attrito che rallenta l'auto.
        this.angle=0; // L'angolo in cui l'auto è attualmente rivolta.

        this.controls=new Controls(); // Un oggetto che gestisce i controlli dell'auto.
        // Questo è un oggetto definito altrove vedi: controls.js che gestisce l'input dell'autista.
    }
    /*Questo metodo aggiorna la velocità e l'angolo dell'auto 
    in base ai controlli attivi.*/ 
    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration; // Se il controllo "avanti" è attivo, aumenta la velocità dell'auto.
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration; // Se il controllo "indietro" è attivo, diminuisce la velocità dell'auto.
        }
    
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed; // Se la velocità supera la velocità massima, limita la velocità alla velocità massima.
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2; // Se la velocità è inferiore alla metà della velocità massima in direzione opposta, limita la velocità a quella velocità.
        }
    
        if(this.speed>0){
            this.speed-=this.friction; // Se la velocità è positiva, diminuisce la velocità per l'attrito.
        }
        if(this.speed<0){
            this.speed+=this.friction; // Se la velocità è negativa, aumenta la velocità per l'attrito.
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0; // Se la velocità è molto bassa (inferiore all'attrito), imposta la velocità a 0.
        }
    
        if(this.speed!=0){
            const flip=this.speed>0?1:-1; // Determina la direzione del movimento.
            if(this.controls.left){
                this.angle+=0.03*flip; // Se il controllo "sinistra" è attivo, ruota l'auto a sinistra.
            }
            if(this.controls.right){
                this.angle-=0.03*flip; // Se il controllo "destra" è attivo, ruota l'auto a destra.
            }
        }
    
        this.x-=Math.sin(this.angle)*this.speed; // Aggiorna la posizione x dell'auto in base alla velocità e all'angolo.
        this.y-=Math.cos(this.angle)*this.speed; // Aggiorna la posizione y dell'auto in base alla velocità e all'angolo.
    }
    
    /*In sintesi, questo metodo disegna un rettangolo 
    (che rappresenta l'auto) sul canvas nella posizione 
    e con l'orientamento corretti. */

    draw(ctx){ this.#move();
        ctx.save(); // Salva lo stato corrente del contesto del canvas.
        // Questo permette di ripristinare lo stato dopo aver effettuato delle modifiche.
    
        ctx.translate(this.x,this.y); // Sposta l'origine del contesto del canvas alle coordinate (x, y) dell'auto. 
        //Questo significa che tutti i successivi comandi di disegno saranno relativi a questa posizione.
    
        ctx.rotate(-this.angle); // Ruota il contesto del canvas di un angolo negativo.
        // Questo fa sì che l'auto sia disegnata rivolta nella direzione opposta all'angolo dell'auto.
    
        ctx.beginPath(); // Inizia un nuovo percorso di disegno. 
        //Questo è necessario prima di disegnare una forma come un rettangolo.
        //ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        
        //ctx.fillStyle = 'orange'; // Imposta il colore di riempimento del rettangolo su arancione.
        //ctx.drawImage(img, x, y, width, height); // Disegna l'immagine sul canvas quando è caricata
        
        ctx.fillStyle = 'blue';
        
       ctx.fillRect(  -this.width/2,  -this.height/2, this.width, this.height ); // Disegna un rettangolo con l'origine al centro.
        // Le coordinate sono relative alla posizione dell'auto a causa del precedente comando translate.
    
       // ctx.fill(); // Riempie il rettangolo con il colore corrente.
     //    Disegno della stringa  img di omarillo sull'area del canvas
        for (var i = 0; i < this.img.length; i++) {
            for (var j = 0; j < this.img[i].length; j++) {
              if (this.img[i][j*2] === '4') {
                ctx.fillStyle = 'orange'; // Imposta il colore del punto
                ctx.fillRect(j-16, i-16 , 1, 1); // Disegna un punto nella posizione corretta
              }
            }
          }
             // ctx.fillRect( -( pointSize)/2, -( pointSize)/2, pointSize, pointSize); // Disegna un punto nella posizione corretta

    
        ctx.restore(); // Ripristina lo stato del contesto del canvas al suo stato precedente. Questo significa che le modifiche apportate con translate e rotate non avranno effetto sui successivi comandi di disegno.
    }
}