import { Controls } from './controls.js';
import { Sensor } from './sensor.js';
import { polysIntersect } from './utils.js';
/*La classe `Dakar` rappresenta un'auto in una simulazione. 
https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.versione=1&art.idGruppo=4&art.flagTipoArticolo=1&art.codiceRedazionale=059U0393&art.idArticolo=32&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.dataPubblicazioneGazzetta=1959-06-23&art.progressivo=0
*/

//Ogni veicolo, compreso il suo carico, deve potersi inscrivere in una sagoma di
// metri 2,50 di larghezza e di 6 metri quattro di lughezza.

export class DaKar{
    constructor(x,y,width=20,height=40,controlType="KEYS",maxSpeed=3,color="blue",ray=(Math.floor(Math.random()*7)+1)){
        // Verifica che la larghezza e la lunghezza rispettino i limiti
        if (width > 25 || height > 60) {
            throw new Error('Le dimensioni dell\'auto superano i limiti consentiti');
        }

        // Costruttore della classe. Imposta le proprietà iniziali dell'auto.
        // x e y sono le coordinate dell'auto centro dell'auto.
        // width e height sono la larghezza e l'altezza dell'auto.
        if (color=="random"){
            // Generate three random numbers between 0 and 255
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            // Set the fill color to the random RGB color
            this.color = `rgb(${r}, ${g}, ${b})`;
        }
        else{
            this.color=color;
        }
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        //this.img = new Image();   // Crea un nuovo oggetto immagine
        this.img = `
        . . . . . . . . . . . . . . . .
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
        this.maxSpeed=maxSpeed; // La velocità massima dell'auto.
        this.friction=0.05; // L'attrito che rallenta l'auto.
        this.angle=0; // L'angolo in cui l'auto è attualmente rivolta.
        this.damaged=false; // Indica se l'auto è danneggiata.
        this.controls=new Controls(controlType); // Un oggetto che gestisce i controlli dell'auto.
        // Questo è un oggetto definito altrove vedi: controls.js che gestisce l'input dell'autista.
        if(controlType!="DUMMY"){
            this.ray=Math.floor(Math.random()*7)+1
            this.sensor=new Sensor(this);
        }
        
    } 
// Questo metodo aggiorna lo stato dell'auto.
    #assessDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                traffic[i].damaged=true;
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }
    /*Questo metodo aggiorna la velocità e l'angolo dell'auto 
    in base ai controlli if (borders) attivi.*/ 
    #move(traffic,borders=null){
        
        if(!this.damaged){
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
       
            this.polygon=this.#createPolygon();
            if (borders)
            this.damaged=this.#assessDamage(borders,traffic);
            if (borders&&this.sensor) {
                this.sensor.update(borders,traffic);
            }
        }
    }
    /*In sintesi, questo metodo disegna un rettangolo 
    (che rapp resenta l'auto) sul canvas nella posizione 
    e con l'orientamento corretti. */

    draw(ctx,trafic,borders=null){ 
        this.#move(trafic,borders);
        
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
        
        if(this.damaged){
            ctx.fillStyle="red";
        }else{
            ctx.fillStyle=this.color;
        }
        
       ctx.fillRect(  -this.width/2,  -this.height/2, this.width, this.height ); // Disegna un rettangolo con l'origine al centro.
        // Le coordinate sono relative alla posizione dell'auto a causa del precedente comando translate.
    
       // ctx.fill(); // Riempie il rettangolo con il colore corrente.
       // Disegno della stringa  img di omarillo sull'area del canvas
       let imgX=this.img[0].length;
       imgX=(imgX/2>this.width?imgX/2-4:imgX/2);       
       if  (this.color === 'orange')
            ctx.fillStyle = 'black';
        else
            ctx.fillStyle = 'orange';
       for (let i = 0; i < this.img.length; i++) {
            for (let j = 0; j < this.img[i].length; j++) {
              if (this.img[i][j*2] === '4') {
                // Imposta il colore del punto
                ctx.fillRect(j-imgX, i-imgX , 1, 1); // Disegna un punto nella posizione corretta
              }
            }
        }
      ctx.restore();
    // ctx.fillRect( 0-5, 0-20, 10, 19); // Disegna un punto nella posizione corretta    
        // Ripristina lo stato del contesto del canvas al suo stato precedente. Questo significa che le modifiche apportate con translate e rotate non avranno effetto sui successivi comandi di disegno.
        if (borders&&this.sensor) 
           this.sensor.draw(ctx); 
        
    }
}