# Rete Neurale

Keyboard shortcut: Compile - <kbd>Ctrl</kbd> + <kbd>S</kbd>

Snippets: start typing

* lia ... for LiaScript related issues
* voice ... for text to speech voices
* hili ... programming languages

## 1. Markdown

Headers

By now you should have noticed, that # (hash-tags) are used to structure your content.
The number of # defines the header-type and indentation.

------------------------

Task:

Try to structure the document according to:


<!-- style="max-width: 300px; width: 100%" -->
`````````````````````````````````````
Tutorial
|
O----- 1. Markdown
|      |
|      O---- Paragraphs
|      |
|      O---- Lists
|      |     |
|      |     o--- Numbered Lists
|      |
|      O---- Formatting
|      |
|      O---- Block-quotes
|      |
|      O---- Links & References
|      |     |
|      |     O--- Images
|      |
|      O---- Tables
|
O----- 2. LiaScript
`````````````````````````````````````

# Rete neurale con funzione di attivazione step

Una rete neurale con funzione di attivazione step è un tipo di rete neurale artificiale in cui la funzione di attivazione dei neuroni è una funzione step.
Questo significa che l'output del neurone cambia bruscamente da uno stato all'altro.

Ecco una descrizione di alto livello di come è costituita una rete neurale con funzione di attivazione step:

1. **Neuroni**: Ogni neurone prende in input un insieme di valori, ognuno dei quali è moltiplicato per un peso corrispondente.
I pesi sono parametri che la rete neurale apprende durante la fase di addestramento.

2. **Funzione di somma ponderata**: I valori di input moltiplicati per i loro pesi corrispondenti sono sommati insieme, e a questo risultato viene aggiunto un valore di bias.

3. **Funzione di attivazione step**: Il risultato della somma ponderata viene passato attraverso una funzione di attivazione step. Se il risultato della somma ponderata supera una certa soglia, la funzione di attivazione restituisce 1, altrimenti restituisce 0.

4. **Struttura della rete**: La rete neurale è composta da diversi strati di neuroni. L'input viene passato attraverso gli strati della rete, con l'output di ogni strato che diventa l'input per lo strato successivo, fino a raggiungere l'output finale della rete.

Ecco un esempio di come potrebbe essere implementata una rete neurale con funzione di attivazione step in JavaScript:

```javascript
class Neuron {
    constructor(weights, bias) {
        this.weights = weights;
        this.bias = bias;
    }

    stepFunction(value) {
        return value >= 0 ? 1 : 0;
    }

    calculateOutput(inputs) {
        let total = this.bias;
        for (let i = 0; i < this.weights.length; i++) {
            total += this.weights[i] * inputs[i];
        }
        return this.stepFunction(total);
    }
}

class NeuralNetwork {
    constructor(neurons) {
        this.neurons = neurons;
    }

    feedForward(input) {
        let outputs = [];
        for (let neuron of this.neurons) {
            outputs.push(neuron.calculateOutput(input));
        }
        return outputs;
    }
}
```

In questo esempio, la classe `Neuron` rappresenta un singolo neurone nella rete, mentre la classe `NeuralNetwork` rappresenta l'intera rete neurale. La funzione `feedForward` calcola l'output della rete per un dato input.

---

Task:

Add two more paragraphs and try out, if the number of empty lines in between has an effect on the representation of the content.

# Il valore bias

Il valore bias in una rete neurale è un parametro aggiuntivo utilizzato nei neuroni per spostare la funzione di attivazione a sinistra o a destra, aiutando così a migliorare l'adattabilità del modello.

Puoi pensare al bias come l'intercetta in un'equazione lineare.

In termini pratici, il bias permette al neurone di produrre un output significativo anche quando tutti gli input sono nulli.
Senza il bias, se tutti gli input di un neurone fossero nulli, l'output del neurone sarebbe sempre nullo, indipendentemente dai pesi.

Durante l'addestramento della rete neurale, sia i pesi che i bias vengono aggiornati e appresi in modo da minimizzare l'errore di output della rete.

------------------------

Task:

Add some more bullet points the list, where you write down some comments your experiences with indentation.

# L'addestramento di una rete neurale

L'addestramento di una rete neurale con una funzione di attivazione step può essere impegnativo perché la funzione step non è differenziabile e, pertanto, metodi come il discesa del gradiente non possono essere utilizzati direttamente.
Tuttavia, è possibile utilizzare un algoritmo di apprendimento chiamato Regola di Apprendimento del Perceptron per reti neurali a singolo strato con funzioni di attivazione step.

Ecco un semplice in JavaScript:

```javascript
// Funzione di attivazione step
function stepActivation(x) {
    return x >= 0 ? 1 : 0;
}

// Funzione di addestramento del perceptron
function trainPerceptron(inputs, targets, learningRate, epochs) {
    // Inizializza i pesi e il bias
    let weights = new Array(inputs[0].length).fill(0);
    let bias = 0;

    for (let epoch = 0; epoch < epochs; epoch++) {
        for (let i = 0; i < inputs.length; i++) {
            // Calcola l'output
            let output = stepActivation(inputs[i].reduce((sum, value, index) => sum + value * weights[index], bias));
            
            // Aggiorna i pesi e il bias
            let error = targets[i] - output;
            weights = weights.map((weight, index) => weight + learningRate * error * inputs[i][index]);
            bias += learningRate * error;
        }
    }

    return {weights, bias};
}

// Esempio di utilizzo:
let inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
let targets = [0, 0, 0, 1];  // Funzione AND
let learningRate = 0.1;
let epochs = 100;

let {weights, bias} = trainPerceptron(inputs, targets, learningRate, epochs);
console.log("Pesi:", weights);
console.log("Bias:", bias);
```

In questo esempio, la funzione `trainPerceptron` addestra un perceptron a singolo strato utilizzando la Regola di Apprendimento del Perceptron. La funzione prende in input gli input di addestramento, gli output target, il tasso di apprendimento e il numero di epoche (iterazioni su tutto il dataset). Inizializza i pesi e il bias a zero, poi li aggiorna in base all'errore tra l'output target e l'output effettivo per ogni input.

Si prega di notare che questo è un esempio molto semplice e le reti neurali del mondo reale sono di solito molto più complesse, con molti strati di neuroni e diversi tipi di funzioni di attivazione. Inoltre, la Regola di Apprendimento del Perceptron funziona solo per problemi linearmente separabili. Per problemi più complessi, si utilizzerebbe tipicamente un tipo diverso di rete neurale e un algoritmo di addestramento diverso, come la retropropagazione.

------------------------

Task:

Write some useful comments on the usage of numbered lists
and create an example, where you combine numbered and not numbered bullet points.

# Funzioni di attivazione

Ecco alcune funzioni di attivazione comunemente utilizzate nelle reti neurali:

1. **Funzione Sigmoidale**: Questa funzione prende un input a valore reale e lo comprime in un intervallo tra 0 e 1. È spesso utilizzata nello strato di output di una rete di classificazione binaria.

```python
def sigmoid(x):
    return 1 / (1 + np.exp(-x))
```

```js
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
```

2. **Funzione Tanh**: Questa funzione prende un input a valore reale e lo comprime in un intervallo tra -1 e 1. È simile alla funzione sigmoidale ma può essere più adatta quando l'output deve essere centrato intorno a 0.

```javascript
function tanh(x) {
    return Math.tanh(x);
}
```

In JavaScript, la funzione `Math.tanh()` restituisce il valore tangente iperbolico di un numero, quindi non è necessario implementarla manualmente.

```python
def tanh(x):
    return np.tanh(x)
```

3. **Funzione ReLU (Rectified Linear Unit)**: Questa funzione prende un input a valore reale e lo soglia a zero (sostituisce i valori negativi con zero). È spesso utilizzata negli strati nascosti di una rete neurale perché aiuta a mitigare il problema del gradiente che svanisce.

```python
def relu(x):
    return np.maximum(0, x)
```

4. **Funzione Leaky ReLU**: Questa è una variante di ReLU che consente piccoli valori negativi quando l'input è inferiore a zero. Può aiutare a prevenire i neuroni morti (neuroni che non si attivano mai).

```python
def leaky_relu(x):
    return np.maximum(0.01 * x, x)
```

5. **Funzione Softmax**: Questa funzione prende un vettore di numeri reali e restituisce una distribuzione di probabilità. È spesso utilizzata nello strato di output di una rete di classificazione multiclasse.

```python
def softmax(x):
    e_x = np.exp(x - np.max(x))  # sottrai il max per stabilizzare
    return e_x / e_x.sum(axis=0)
```

Ciascuna di queste funzioni di attivazione ha i suoi casi d'uso e caratteristiche, e la scelta di quale utilizzare dipende dalle specifiche esigenze della rete neurale e dal problema che sta cercando di risolvere.

# La funzione di attivazione ReLU (Rectified Linear Unit)

La funzione di attivazione ReLU (Rectified Linear Unit) ha diversi vantaggi rispetto alla funzione sigmoidale:

1. **Riduzione del problema del gradiente che svanisce**: Le reti neurali con molte camere possono soffrire del problema del gradiente che svanisce, dove i gradienti diventano molto piccoli man mano che vengono retropropagati attraverso la rete. Poiché la funzione ReLU ha un gradiente costante di 1 per input positivi, questo problema è ridotto.

2. **Calcolo più efficiente**: La funzione ReLU è più semplice e quindi più veloce da calcolare rispetto alla funzione sigmoidale, che richiede l'uso di esponenziali.

3. **Sparsità**: ReLU produce attivazioni sparse, cioè solo un sottoinsieme dei neuroni in uno strato sarà attivo allo stesso tempo. Questo può portare a modelli più efficienti e facilmente interpretabili.

Tuttavia, ReLU ha anche alcuni svantaggi. Ad esempio, può soffrire del problema dei "neuroni morti", dove alcuni neuroni non si attivano mai e quindi non apprendono. Una soluzione a questo problema è l'uso di varianti di ReLU come Leaky ReLU o Parametric ReLU (PReLU).

In generale, la scelta della funzione di attivazione dipende dal problema specifico che si sta cercando di risolvere e dalla struttura della rete neurale.

---

Question: Can blockquotes be nested?

# Links & References

Nothing within the Internet works without links. You can use them everywhere within the document, but Markdown has also support for named and internal links.

https://liascript.github.io/course/?https://raw.githubusercontent.com/liaScript/docs/master/README.md#1

The syntax for named links is: `[name](url)`

> **Task 1:** Try to write the previous link as a named link.
>
> **Task 2:** Try to highlight your new link as bold.

---

Internal links follow a similar pattern, but instead of URLs you will have to reference the section title, starting with a hash-tag and with a title where spaces are replaced by dashes:

`#Title-Without-Spaces`

> **Task:** Create an internal link to the (Numbered lists) section.

# Images

Images are a special case of links, which you want to embed into your document and not only reference. Thus, these are important links, which are highlighted by a starting `!`.

> **Task 1:**  Change the link below to an image.
>
> Try to change the image URL and see the result.
>
> __Every part is important__

[Markdown logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

---

> **Task 2:** Add a title to your link/image and see what happens --> `![alt-text](url "title")`
>
> Does markdown work too?

liatablediar


# Tables

Tables are self explaining as we hope. The first row is the head, the second one defines the orientation of the columns based on the position of the colons. And the rest is just data.


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | 1600$ |
| col 2 is      | centered      |   12$ |
| zebra stripes | are neat      |    1$ |

> __Task:__ Add a space between the number and the dollar sign within the last row and checkout what happens.


## 2. LiaScript

### Multimedia

From links to ! images --> ? audio --> !? video --> ?? anything else:

* Audio: `?[alt-info](url)`
* Video: `!?[alt-info](url)`
* Anything else: `??[alt-info](url)`

> Task1: Embed the links below as audio content

[singing birds](https://bigsoundbank.com/UPLOAD/mp3/1068.mp3)

[soundcloud](https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata)

> Task2: Go to youtube and add some video content

> Task3: Embed the content of the link below into your course


??[Piggy Bank](https://sketchfab.com/3d-models/horizontal-and-vertical-planing-machine-4cb50841dd6e42938b3bc098bff92423 "Horizontal and Vertical Planing Machine")

??[A circuit simulator](https://www.falstad.com/circuit/circuitjs.html)


### Galleries

> **Galleries are simply paragraphs with only multimedia content!**

![Portrait of a lady](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Leonardo_da_Vinci_%28attrib%29-_la_Belle_Ferroniere.jpg/723px-Leonardo_da_Vinci_%28attrib%29-_la_Belle_Ferroniere.jpg "La Belle Ferronnière, c. 1490–1498")


![Lady with an Ermine](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/761px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg "Lady with an Ermine, c. 1489–1491, Czartoryski Museum, Kraków, Poland")


![Mona Lisa](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg "Mona Lisa or La Gioconda c. 1503–1516, Louvre, Paris")


![Virgin and Child ](https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Leonardo_da_Vinci_-_Virgin_and_Child_with_St_Anne_C2RMF_retouched.jpg/764px-Leonardo_da_Vinci_-_Virgin_and_Child_with_St_Anne_C2RMF_retouched.jpg "The Virgin and Child with Saint Anne, c. 1501–1519, Louvre, Paris")


![The Death of Leonardo da Vinci](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Francois_Ier_Leonard_de_Vinci-Jean_Auguste_Dominique_Ingres.jpg/1276px-Francois_Ier_Leonard_de_Vinci-Jean_Auguste_Dominique_Ingres.jpg "The Death of Leonardo da Vinci, by Ingres, 1818")

> **Task1:** Make a gallery
>
> **Task2:** Add some movies and other elements to the gallery.

### Quizzes `[[ ]]`

It is proven that students perform better, when they have the possibility to reflect.
Quizzes are an ideal way to check the understanding.
LiaScript currently has support for different types of quizzes, with the possibility to tweak them.

#### Text-input

A text input is simply a filed that follows after your question.
The solution is placed within a stylized input field.
In LiaScript quizzes are always associated with double brackets.

    `[[Solution]]`

> **Task:** Remove the backtics, change the solution and add your questions.

#### Selection

A selection is a quiz with multiple options separated by `|` and where the solution is put in parenthesis:

    `[[ This is not right | (**This is correct**) | This is another wrong option]]`

> **Task:** Remove the backtics, change the solution and add your questions.

##### Gap Text

Combining text inputs and selections:

The film that I saw [[(that)|those|these|then]] night wasn’t very good.
It was all [[ about ]] a man [[ who ]] built a
time machine so he [[ could ]] travel back in time.
It took him ages and ages [[ to ]] build the machine.

#### Single Choice

If you want to create a single choice quiz, for which commonly radio-buttons are used, would you use a similar syntax?

    [( )] No
    [(X)] <-- **YES of course**
    [( )] I would use H5P

> **Task:** Add some more options and try out, what happens, when multiple `X` are used.

#### Multiple Choice

If we stick to this metaphor, checkboxes can be defined with the following syntax:

    [[X]] <-- right
    [[ ]] wrong
    [[ ]] <-- right
    [[X]] wrong

> **Task:** Adapt the quiz above, such that the solution represents the defined options.
> Add and remove some Xs, see what happens when no X is defined.

#### Matrix

A matrix is basically a 2D representation multiple horizontal vectors.
The first row only defines the head of this quiz type.

    [ [head1] [ ;-) ] [ Option3 ] ]
    [   ( )     ( )       (X)     ]  <-- Single Choice
    [   [ ]     [X]       [X]     ]  <-- Multiple Choice

#### Tweaks

> You can use multiple tweaks when dealing with quizzes.
>
> 1. Hints
> 2. Solutions
> 3. Scripting

##### Hints

We stuck to the double brackets notation and simply include `?` to mark a hint.
Add as much hints to every quiz type.

What is the name of the Markdown dialect we are using?

    [[LiaScript]]
    [[?]] You have to use the correct writing
    [[?]] The solutions starts with Lia.....

> **Task:** Try to add some hints to other quizzes. 

##### Solutions

With the help of two horizontal lines, based on asterisk you can define a block that may contain a couple of different Markdown-blocks.
Solutions are only revealed, when the quiz is solved or when the user gives up.

---

What is the name of the Markdown dialect we are using?

    [[LiaScript]]
    [[?]] You have to use the correct writing
    [[?]] The solutions starts with Lia.....
    **************************************************
    
    LiaScript is an interactive extension to Markdown,
    which allows to develop free and open online course.
    More information can be found at:

    https://LiaScript.github.io

                    Just a diagram
    1.9 |
        |                 ***
      y |               *     *
      - | r r r r r r r*r r r r*r r r r r r r
      a |             *         *
      x |            *           *
      i | B B B B B * B B B B B B * B B B B B
      s |         *                 *
        |**  * *                       * *   *
     -1 +------------------------------------
        0              x-axis               1

    **************************************************

### Surveys

Surveys are basically the little sister of a quiz, the syntax is the same but instead of `X| ` you provide options:

Comma separated word-cloud:

[[___]]

---

Text inputs with multiple lines:

[[___ ___ ___]]

---

How do you rate LiaScript so far?

- [(poor)]      Not that good 
- [(ok)]        It is okay, but I expected more
- [(good)]      I like the approach
- [(excellent)] Extremely good... 


---

What are your favorite colors?

- [[red]] red
- [[blue]] blue
- [[green]] green
- [[yellow]] yellow
- [[something else]] other colors are fine too

### Animations & Presentations


> Your user can decide, which presentation mode is used.
> We currently support Textbook, Slides, and Presentation.

You can use these curly braces to let blocks appear and disappear.
Simply add these points the the beginning of your block.

* fade-in: `{{2}}`
* fade-in and out: `{{1-3}}`

> **Task:** Add some animations to the content below.

Let me appear at first.
And disappear at step 2.

| let    | me        |
| :----- | :-------- |
| appear | at step 2 |

> As the the last and final quote.
> I wanted to be displayed at the very end.

#### Text to Speech


The currently used default language is `UK English Female`.
LiaScript uses the browser TTS-API and as a fallback responsive:

https://responsivevoice.org 

You can use more voices, simply by typing "voice".


With this notation `--{{1}}--` you can add some more explanation that will be spoken out loud to animation-step 1.
You can also change the voice for per comment `--{{2 US English Male}}--`.

> **Task:** Add some comment tags to the head of the paragraphs below and change their voices.
> 
> Try to add some examples of your mother tongue.

The entire ***Markdown*** paragraph right below the effect definition in double minus notation is sent to responsivevoice to speak the text out loud.
If you click on the ear button at the navigation panel, then this paragraph gets rendered at the place where it is defined.

Der Ganze Satz sollte deutsch ausgesprochen werden!

#### Combine Animations and TTS

> __Task:__ Create some examples by your own, where you combine the animation steps with the spoken output ...
