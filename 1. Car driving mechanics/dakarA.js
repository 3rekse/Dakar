/*Questo codice JavaScript definisce una classe `Dakar` 
che rappresenta un'auto in un gioco o in una simulazione. 
Ecco una descrizione dettagliata di ciascuna parte:*/


class DaKar{
    constructor(x,y,width,height){
        // Costruttore della classe. Imposta le proprietà iniziali dell'auto.
        // x e y sono le coordinate dell'auto centro dell'auto.
        // width e height sono la larghezza e l'altezza dell'auto.
        
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0; // La velocità attuale dell'auto.
        this.acceleration=0.2; // L'accelerazione dell'auto.
        this.maxSpeed=13; // La velocità massima dell'auto.
       
        this.controls=new Controls(); // Un oggetto che gestisce i controlli dell'auto.
        // Questo è un oggetto definito altrove vedi: controls.js che gestisce l'input dell'autista.
    }

    /*Questo metodo aggiorna la velocità dell'auto  in base ai controlli attivi.*/ 
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
        
        this.y-=this.speed; // Aggiorna la posizione x dell'auto in base alla velocità e all'angolo.
    }    
    
    
    draw(ctx){ 
        this.#move();
        ctx.save(); // Salva lo stato corrente del contesto del canvas.
        // Questo permette di ripristinare lo stato dopo aver effettuato delle modifiche.
    
        ctx.translate(this.x,this.y); // Sposta l'origine del contesto del canvas alle coordinate (x, y) dell'auto. 
        //Questo significa che tutti i successivi comandi di disegno saranno relativi a questa posizione.
    
     
        ctx.beginPath(); // Inizia un nuovo percorso di disegno. 
        //Questo è necessario prima di disegnare una forma come un rettangolo.
        //ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        
        //ctx.fillStyle = 'orange'; // Imposta il colore di riempimento del rettangolo su arancione.
        //ctx.drawImage(img, x, y, width, height); // Disegna l'immagine sul canvas quando è caricata
        
        ctx.fillStyle = 'blue';
        
       ctx.fillRect(  -this.width/2,  -this.height/2, this.width, this.height ); // Disegna un rettangolo con l'origine al centro.
          
        ctx.restore(); // Ripristina lo stato del contesto del canvas al suo stato precedente. Questo significa che le modifiche apportate con translate e rotate non avranno effetto sui successivi comandi di disegno.
    }
}