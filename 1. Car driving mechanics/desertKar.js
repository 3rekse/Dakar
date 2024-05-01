import { Dakar } from './dakar.js';


class DesertKar extends Dakar{
   
    draw(ctx){ 
        ctx.save(); // Salva lo stato corrente del contesto del canvas.
        // Questo permette di ripristinare lo stato dopo aver effettuato delle modifiche.
    
        ctx.translate(this.x,this.y); // Sposta l'origine del contesto del canvas alle coordinate (x, y) dell'auto. 
        //Questo significa che tutti i successivi comandi di disegno saranno relativi a questa posizione.
    
        ctx.rotate(-this.angle); // Ruota il contesto del canvas di un angolo negativo.
        // Questo fa sì che l'auto sia disegnata rivolta nella direzione opposta all'angolo dell'auto.
    
        ctx.beginPath();
        ctx.fillStyle = "#BB9B55";
        
        ctx.fillRect(  -this.width/2,  -this.height/2, this.width, this.height+10 ); // Disegna un rettangolo con l'origine al centro.
 
        ctx.restore();
        this.update();
        super.draw(ctx);
        
           }
}