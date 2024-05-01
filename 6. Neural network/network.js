// La classe NeuralNetwork rappresenta una rete neurale
export class NeuralNetwork{
    // Il costruttore accetta un array di numeri che rappresentano il numero di neuroni in ciascun livello
    constructor(neuronCounts){
        // I livelli della rete neurale vengono memorizzati in un array
        this.levels=[];
        // Per ogni livello, crea un nuovo oggetto Level con il numero di neuroni corrispondente
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }
/*
La classe `NeuralNetwork` rappresenta una rete neurale, 
che è composta da diversi livelli. 
Ogni livello è rappresentato da un'istanza della classe `Level`, 
che contiene i suoi input, output, pesi e bias. 

I pesi e i bias vengono inizializzati in modo casuale nel costruttore di `Level`.

Il metodo `feedForward` di `NeuralNetwork` calcola 
l'output della rete neurale per un dato set di input. 
Questo viene fatto alimentando gli input attraverso ogni livello della rete, 
uno alla volta, 
e utilizzando l'output di un livello come input per il livello successivo.

Il metodo `feedForward` di `Level` calcola l'output di un singolo livello. 
Questo viene fatto calcolando 
la somma ponderata degli input per ogni neurone nel livello, 
applicando la funzione di attivazione step, 
e infine restituendo gli output del livello.
*/

    // Il metodo statico feedForward calcola l'output della rete neurale per un dato set di input
    // Non richiede di modificare lo stato di un oggetto della rete 
    // ma solo un calcolo siu valori di correnti dei pesi edei bias
        static feedForward(givenInputs,network){
        let outputs=Level.feedForward(
            givenInputs,network.levels[0]);
        for(let i=1;i<network.levels.length;i++){
            outputs=Level.feedForward(
                outputs,network.levels[i]);
        }
        return outputs;
    }
}

// La classe Level rappresenta un livello in una rete neurale
class Level{
    // Il costruttore accetta il numero di input e di output per il livello
    constructor(inputCount,outputCount){
        // Crea array per gli input, gli output e i bias
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount);
        // Crea una matrice di pesi
        this.weights=[];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }
        // Randomizza i pesi e i bias
        Level.#randomize(this);
    }

    // Il metodo statico privato #randomize randomizza i pesi e i bias di un livello
    static #randomize(level){
         // Randomizza i pesi
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }
         // Randomizza i bias
        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }

    // Il metodo statico feedForward calcola l'output di un livello basandosi sugli input dati
    static feedForward(givenInputs,level){
        // Imposta gli input del livello
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        // Per ogni output, calcola la somma ponderata degli input
        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i];
            }

            // Applica la funzione di attivazione step
            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            } 
        }

        // Restituisce gli output del livello
        return level.outputs;
    }
}