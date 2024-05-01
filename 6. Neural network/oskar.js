import { DaKar } from './dakar.js';
import { NeuralNetwork } from './network.js';
export class OsKar extends DaKar {
    constructor(x,y,width=20,height=40,maxSpeed=3,color="orange"){
        // Chiama il costruttore della classe padre
        super(x,y,width,height,"KEYS",maxSpeed,color);
        
        // Aggiungi una proprietà aggiuntiva specifica per la classe figlio
        this.useBrain=true;
          
        this.brain=new NeuralNetwork(
                [this.sensor.rayCount,6,4]
            );

    }
    draw(ctx,trafic,borders) {
        // Chiama il metodo draw della classe padre
        super.draw(ctx,trafic,borders);

        // Codice aggiuntivo per disegnare l'oggetto DaKarChild
        if(this.sensor){
            //this.sensor.update(roadBorders,traffic);
            const offsets=this.sensor.readings.map(s=>s==null?0:1-s.offset);
            const outputs=NeuralNetwork.feedForward(offsets,this.brain);

            if(this.useBrain){
                this.controls.forward=outputs[0];
                this.controls.left=outputs[1];
                this.controls.right=outputs[2];
                this.controls.reverse=outputs[3];
            } 
        }
    }    
}