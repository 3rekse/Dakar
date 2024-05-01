// La classe NeuralNetwork rappresenta una rete neurale
import { lerp } from './utils.js'; // Questa riga importa la funzione `lerp` dal modulo `utils.js`. La funzione `lerp` è utilizzata per l'interpolazione lineare.

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
     /*Il metodo `mutate` nella classe è utilizzato per introdurre piccole variazioni
casuali nei pesi e nei bias della rete neurale. 
Questo è un concetto chiave negli algoritmi genetici,
dove la mutazione è utilizzata per mantenere e introdurre la diversità 
nella popolazione, permettendo all'algoritmo di esplorare lo spazio delle soluzioni.

Nel contesto di una rete neurale, la mutazione può aiutare a prevenire l'overfitting 
e può permettere alla rete di esplorare nuove soluzioni che potrebbero non essere raggiunte 
solo attraverso l'apprendimento da un set di dati di addestramento.
L'overfitting è un problema comune nell'apprendimento automatico e nelle reti neurali. 
Si verifica quando un modello impara troppo bene i dati di addestramento,
 a tal punto da catturare anche il rumore o le fluttuazioni casuali nei dati di addestramento.

In altre parole, un modello overfitted è un modello che ha una performance molto buona 
sui dati di addestramento, ma una performance significativamente peggiore sui dati di test 
o su nuovi dati non visti. 

Questo perché il modello non è riuscito a generalizzare bene dai dati di addestramento 
al problema sottostante che si sta cercando di risolvere, 
ma ha invece "memorizzato" i dati di addestramento.

Ci sono diverse tecniche per prevenire l'overfitting nelle reti neurali, tra cui 
la regolarizzazione (come L1 o L2), il dropout, l'early stopping, 
o l'aumento dei dati (data augmentation).

Il metodo `mutate` fa questo modificando i pesi e i bias della rete neurale in modo casuale. 
La quantità di mutazione è controllata dal parametro `amount`. 

Il metodo utilizza la funzione `lerp` (linear interpolation) 
per calcolare un nuovo valore che è una certa quantità `amount` 
lontano dal valore originale, in direzione di un numero casuale tra -1 e 1.
Il metodo `mutate`  può essere visto come un metodo per introdurre una sorta di "rumore" 
o variazione nei pesi e nei bias della rete neurale. 
Impedisce alla rete di stabilizzarsi su un set di pesi 
 
In termini più specifici, `mutate` può essere visto come 
parte di un algoritmo genetico applicato a una rete neurale. 
Gli algoritmi genetici sono metodi di ottimizzazione ispirati alla selezione naturale e alla genetica. 
Includono operazioni come la mutazione (introduzione di piccole variazioni casuali, come fa il metodo `mutate`), 
la crossover (combinazione di due o più "genitori" per produrre "figli"), e la selezione 
(scelta dei migliori individui da una popolazione).

Tuttavia, è importante notare che mentre la mutazione può aiutare a prevenire l'overfitting, non è una soluzione completa. 
*/
    static mutate(network,amount=1){
        network.levels.forEach(level => {
            for(let i=0;i<level.biases.length;i++){
                level.biases[i]=lerp( level.biases[i],
                    Math.random()*2-1, amount);
            }
            for(let i=0;i<level.weights.length;i++){
                for(let j=0;j<level.weights[i].length;j++){
                    level.weights[i][j]=lerp(level.weights[i][j],Math.random()*2-1,amount);
                }
            }
        });
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