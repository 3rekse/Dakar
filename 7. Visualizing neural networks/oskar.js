import { DaKar } from './dakar.js';
import { NeuralNetwork } from './network.js';
export class OsKar extends DaKar {
    constructor(x,y,width=20,height=40,maxSpeed=3,color="orange",ray=(Math.floor(Math.random()*7)+1)){
        // Chiama il costruttore della classe padre
        super(x,y,width,height,"KEYS",maxSpeed,color,ray);
        this.generation=1;
        // Aggiungi una proprietà aggiuntiva specifica per la classe figlio
        this.useBrain=true;
        if(localStorage.getItem("bestBrain"+ray)){
            this.brain=JSON.parse(localStorage.getItem("bestBrain"+ray));
        }
        else 
            this.brain=new NeuralNetwork([this.sensor.rayCount,Math.floor(Math.random()*7)+1,4]);
    }

    clone(gen=1) {
        let clone;
        if (gen==0){
          clone = new OsKar(this.x, this.y, this.width, this.height, this.maxSpeed, this.color);
        }
        else{
            clone = new OsKar(this.x, this.y, this.width, this.height, this.maxSpeed, this.color, this.ray);
            clone.useBrain = this.useBrain;
            clone.brain = JSON.parse(JSON.stringify(this.brain)); // Deep copy
            clone.generation=this.generation++
            NeuralNetwork.mutate(clone.brain,clone.generation);
        }        
        return clone;
    }
    
    mutate(){
        this.generation++;
        NeuralNetwork.mutate(this.brain,this.generation);
    }

    draw(ctx,trafic,borders) {
        // Chiama il metodo draw della classe padre
        super.draw(ctx,trafic,borders);
        this.x=Math.min(Math.max(this.x,borders[0][0].x),borders[1][0].x);

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