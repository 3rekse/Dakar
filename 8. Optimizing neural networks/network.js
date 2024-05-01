class NeuralNetwork{
    constructor(neuronCounts){
        this.levels=[];
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs,network){
        let outputs=Level.feedForward(
            givenInputs,network.levels[0]);
        for(let i=1;i<network.levels.length;i++){
            outputs=Level.feedForward(
                outputs,network.levels[i]);
        }
        return outputs;
    }

    /*Il metodo `mutate` nella classe 
 è utilizzato per introdurre piccole variazioni
casuali nei pesi e nei bias della rete neurale. 
Questo è un concetto chiave negli algoritmi genetici,
dove la mutazione è utilizzata per mantenere e introdurre la diversità 
nella popolazione, permettendo all'algoritmo di esplorare 
lo spazio delle soluzioni.

Nel contesto di una rete neurale, 
la mutazione può aiutare a prevenire l'overfitting 
e può permettere alla rete di esplorare nuove soluzioni 
che potrebbero non essere raggiunte solo attraverso 
l'apprendimento da un set di dati di addestramento.
L'overfitting è un problema comune nell'apprendimento automatico 
e nelle reti neurali. 
Si verifica quando un modello impara troppo bene i dati di addestramento,
 a tal punto da catturare anche il rumore o le fluttuazioni casuali
  nei dati di addestramento.

In altre parole, un modello overfitted è un modello che ha 
una performance molto buona sui dati di addestramento, 
ma una performance significativamente peggiore sui dati di test 
o su nuovi dati non visti. 
Questo perché il modello non è riuscito a generalizzare bene 
dai dati di addestramento al problema sottostante 
che si sta cercando di risolvere, 
ma ha invece "memorizzato" i dati di addestramento.

Ci sono diverse tecniche per prevenire l'overfitting 
nelle reti neurali, tra cui 
la regolarizzazione (come L1 o L2), 
il dropout, 
l'early stopping, 
o l'aumento dei dati (data augmentation).

Il metodo `mutate` fa questo modificando i pesi e i bias 
della rete neurale in modo casuale. 
La quantità di mutazione è controllata dal parametro `amount`. 
Il metodo utilizza la funzione `lerp` (linear interpolation) 
per calcolare un nuovo valore che è una certa quantità `amount` 
lontano dal valore originale, in direzione di un numero 
casuale tra -1 e 1.
Il metodo `mutate`  può essere visto come un metodo per introdurre
 una sorta di "rumore" o variazione nei pesi e nei bias 
 della rete neurale. 
Impedisce alla rete di stabilizzarsi su un set di pesi 
 
In termini più specifici, `mutate` può essere visto come 
parte di un algoritmo genetico applicato a una rete neurale. 
Gli algoritmi genetici sono metodi di ottimizzazione ispirati 
alla selezione naturale e alla genetica. I
ncludono operazioni come la mutazione 
(introduzione di piccole variazioni casuali, 
    come fa il metodo `mutate`), 
la crossover (combinazione di due o più "genitori" 
per produrre "figli"), e la selezione 
(scelta dei migliori individui da una popolazione).

Tuttavia, è importante notare che mentre la mutazione può aiutare
 a prevenire l'overfitting, non è una soluzione completa. 

*/
static mutate(network,amount=1){
    network.levels.forEach(level => {
        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=lerp(
                level.biases[i],
                Math.random()*2-1,
                amount
            )
        }
        for(let i=0;i<level.weights.length;i++){
            for(let j=0;j<level.weights[i].length;j++){
                level.weights[i][j]=lerp(
                    level.weights[i][j],
                    Math.random()*2-1,
                    amount
                )
            }
        }
    });
}
}

class Level{
    constructor(inputCount,outputCount){
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount);

        this.weights=[];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }

    static feedForward(givenInputs,level){
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i];
            }

            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            } 
        }

        return level.outputs;
    }
}