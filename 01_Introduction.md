<!--
author:   Fabrizio Bonfiglio

email:    LiaScript@mail.org

version:  0.0.1

language: it

narrator: IT Female

comment:  Breve introduzione.

import:   https://raw.githubusercontent.com/LiaTemplates/algebrite/0.2.1/README.md
          https://raw.githubusercontent.com/LiaTemplates/ABCjs/0.0.2/README.md
          https://raw.githubusercontent.com/liaTemplates/TextAnalysis/main/README.md

notranslate: <span class="notranslate">(@0)</span>

-->

# From Dakar to OsKar l'auto a guida autonoma per Omarilli

              --{{0}}--
Ciao e benvenuto a DAKAR: una guida per produrre __OSKAR__ Omarillo Self-driving car, l'auto a guida autonoma dell' Omarillo in JavaScript.
L'idea è realizzare una simulazione di auto a guida autonoma implementando uno ad uno ogni suo componente.

Progettiamo __OsKar__ Omarillo Self-driving car l'auto a guida autonoma dell' Omarillo in JavaScript.

Proveremo ad _implementare la meccanica di guida_ dell'auto,
a _definire l'ambiente_, a _simulare alcuni sensori_, a _rilevare le collisioni_ e come far sì che l'auto si controlli da sola utilizzando una _rete neurale_.

![eLearning Africa Logo](https://www.elearning-africa.com/conference2023/ressources/banner/2023/social_1200_630.png)

## Features

               --{{0}}--
Le reti neurali artificiali (ANN) sono modelli di calcolo ispirati al sistema nervoso centrale (in particolare al cervello) che sono progettati per simulare il comportamento dei neuroni umani.

Le RETI una componente fondamentale del machine learning e vengono utilizzate per risolvere problemi complessi che richiedono un'elaborazione avanzata dei dati, come il riconoscimento vocale, la visione artificiale e la traduzione automatica. Più computer collegati fra loro costituiscono una Rete

Una rete neurale artificiale è composta da un insieme di nodi, o "neuroni", organizzati in strati.

Ogni neurone riceve input da alcuni altri neuroni, o dall'esterno del network, e calcola un output.

Questo output può poi essere passato ad altri neuroni nella rete.

L' "apprendimento" in una rete neurale avviene attraverso un processo chiamato __"addestramento"__, in cui la rete è esposta a un insieme di dati di input e output desiderati, e modifica i pesi delle connessioni tra i neuroni per minimizzare la differenza tra gli output prodotti dalla rete e gli output desiderati.

Come funzionano le reti neurali artificiali, confrontiamole le con le reti neurali reali del nostro cervello.

Come implementare una rete neurale e come visualizzarla in modo da poterla vedere in azione.

Avrai bisogno di imparare anche alcune tecniche di ottimizzazione per rendere la Dakar un OSKar un'auto intelligente una Omarillo Self-driving Kar.

ATTENTO: L'intero sistema è piuttosto complesso, tuttavia ogni componente è relativamente semplice di per sé.

# Conoscenze acquisite

                    --{{0}}--
Le tue conoscenze potrebbero essere sufficienti per seguire le istruzioni che ti daremo.

__Prova a leggere le frasi sotto riportate e dare una risposta__

![gokart](https://www.gokart.it/images/slides/4t.jpg)

Per implementare OsKar useremo JavaScript, non importa se vuoi diventare un ingegnere del software o uno specialista dell'apprendimento automatico.

JavaScript non è l'ideale per l'intelligenza artificiale.

Altri linguaggi sono un supporto migliore, ma poiché non utilizziamo alcuna libreria, ciò non avrà importanza.

Se vorrai imparare un linguaggio di programmazione più utile per applicativi di intelligenza artificiale, considera di studiare queste cose anche usando __Python__.

Cos'è JavaScrip?

JavaScript è un [[linguaggio di programmazione]].

# Interactive Coding

I principi sottostanti all'insegnamento della codifica possono essere adattati e applicati con successo ad altre aree di apprendimento.

>L'intelligenza artificiale è ovunque è e sarà il _grillo parlante_ per le future generazioni

Potremmo anche dire al diavolo la codifica!

--{{0}}--
Potremmo anche dire al diavolo la codifica! Al diavolo l'initelligenza artificiale al diavolo il grillo parlante ed ascoltare una canzonetta!

!?[Fun with Tables](https://youtu.be/6Mn5vkvAqeg)

--{{1}}--
Ma lo sai che ciò che fai online ciò che scrivi negli email, nei social è analizzato e assegnandoti dei punteggi in base a dei criteri

>MA considera l' A.I. come il copilota della nostra vita quotidiana ad esempio :

Quotidianamente analizza già ciò che fai online ciò che scrivi negli email, nei social e ti classifica assegnandoti dei punteggi:

```
Play should not be seen exclusively as an activity for children, but it should be recognized as an important source of leisure, well-being and learning for adults too.
```
@Textanalysis.FULL

--{{2}}--

[Coding](https://codepen.io/3rekse/project/editor/XGzgbL)

## A.I. (Artificial Intelligence) il copilota della nostra vita

--{{0}}--
Oltre ad alimentarla sarà oppertuno anche utilizzarla attraverso la programmazione interattiva

Sarà meglio che impariamo a sfruttarla per aiutandoci in ogni nostra attività.

🔑La programmazione interattiva si riferisce a un approccio che consente agli sviluppatori di scrivere, eseguire e ricevere feedback immediato sul codice in maniera interattiva.

Alcuni esempi di ambienti interattivi includono le console interattive di linguaggi di scripting come Python e JavaScript, IDE (Integrated Development Environment) con funzionalità di esecuzione del codice in tempo reale e strumenti di sviluppo web che consentono di visualizzare le modifiche direttamente nel browser.

Propio come si sviluppa con l'[Omarillo Logo](http://bit.ly/omarillo)

Ecco alcune caratteristiche chiave della programmazione interattiva:

Feedback immediato: Gli sviluppatori possono vedere i risultati delle loro azioni quasi istantaneamente, il che favorisce un ciclo di sviluppo rapido.

Esplorazione e sperimentazione: La natura interattiva consente agli sviluppatori di esplorare le funzionalità, testare piccoli frammenti di codice e sperimentare senza dover eseguire un'intera applicazione.

Apprendimento attivo: La programmazione interattiva favorisce l'apprendimento attivo, consentendo agli sviluppatori di vedere direttamente come il codice produce risultati.

Ambienti come Jupyter Notebook, REPL (Read-Eval-Print Loop) per linguaggi di programmazione come Python, JavaScript, Ruby e molti IDE moderni offrono un'esperienza di sviluppo interattiva che favorisce la produttività e l'apprendimento continuo.

-------------------------------------------------

### Competenze Matematiche

--{{0}}--
usiamola per aiutarci nella verifica di problemi matematici

Per risolvere l'espressione _(3 * x - 5x)^3^ * (x + x)_, possiamo eseguire i seguenti passaggi:

Risolviamo l'espressione all'interno della parentesi con l'operatore di moltiplicazione: (3 * x - 5x) = -2x.

Sostituiamo il valore calcolato nella parentesi all'interno del termine elevato a 3: (-2x)^3^  =  -8x^3.

Risolviamo l'espressione all'interno della seconda parentesi con l'operatore di addizione: (x + x) = 2x.

Moltiplichiamo i due risultati ottenuti: -8x^3^ * 2x = -16x^4.

Quindi, l'espressione (3 * x - 5x)^3^ * (x + x) equivale a -16x^4.

_60!_ (60 fattoriale) è il prodotto di tutti i numeri interi positivi da 1 a 60. Il valore di 60! è:

L' Omarillo è un neurone di I.A.

```
(3 * x - 5x)^3 * (x + x)

60!
```
@Algebrite.eval

-------------------------------------------------

### Competenze in Elettronica

--{{0}}--
usiamola per analizzare il comportamento di circuiti elettrici

??[A circuit simulator](https://www.falstad.com/circuit/circuitjs.html)


-------------------------------------------------

### e poichè il codice è anche Musica

--{{0}}--
usiamola per comporre musica

The code provided is in ABC notation, a text-based format for music notation, particularly popular for folk and traditional tunes. 
It's used to notate music in a way that's easy to read and write.

Here's a breakdown of the provided ABC notation:

- `% channel: 0` and `% autoplay: true` are likely custom directives, possibly related to the software used to play the ABC notation.
- `X:353` is an index number for the tune.
- `T: GLUECK AUF DER STEIGER KOEMMT` is the title of the tune.
- `N: E1512` is a notation field, which could be used for any purpose.
- `O: Europa, Mitteleuropa, Deutschland` is the origin of the tune.
- `R: Staende -, Bergmanns - Lied` is the rhythm of the tune.
- `M: 4/4` is the meter of the tune, indicating it's in 4/4 time.
- `L: 1/16` is the default note length, which is a sixteenth note.
- `K: G` is the key of the tune, which is G.

The rest of the notation is the melody of the tune, with each letter representing a note (A-G), numbers representing the duration of the note, and vertical bars (`|`) marking the measures. For example, `G8F4A4` represents an eighth note G, a quarter note F, and a quarter note A.


``` abc
% channel: 0
% autoplay: true
X:353
T: GLUECK AUF DER STEIGER KOEMMT
N: E1512
O: Europa, Mitteleuropa, Deutschland
R: Staende -, Bergmanns - Lied
M: 4/4
L: 1/16
K: G
 | G8F4A4 | G8z8 |
B8A4c4 | B8z4
G2A2 | B4B4B4A2B2 | c4A3AA4
A2B2 | c4c4c4B2c2 | d4B3BB4
A4 | G8F8 | G4e4d4
c2A2 | B8A8 | G8z8
```
@ABCJS.eval

-------------------------------------------------

## A.I. è anche la regina dei Multimedia

Of course you can add any kind of multimedia content and content from other sites.

![Portrait of a lady](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Leonardo_da_Vinci_%28attrib%29-_la_Belle_Ferroniere.jpg/723px-Leonardo_da_Vinci_%28attrib%29-_la_Belle_Ferroniere.jpg "La Belle Ferronnière, c. 1490–1498")
!?[Fun with Tables](https://www.youtube.com/watch?v=Y_7q9T5jYHo)
??[Beating heart](https://sketchfab.com/3d-models/beating-heart-d9845afb1ee64ad094adc96320c67d98 "'Beating Heart' (https://skfb.ly/owVVo) by Dreamwasabducted")

??[BMW](https://sketchfab.com/3d-models/bmw-s1000rr-54448bcc039843468149051e48d5b484 "BMW S1000RR" )

## OsKAr General Idea

<!-- data-solution-button="off"-->
Concentrati completa la prova e riceverai la 🔑 segreta per conquistare il __Tesoro dei super risolutori__ da inserire quì  [[Omarillo]] per un salto nel passato
***********************************************************************

??[MS-DOS Math Game](https://archive.org/embed/msdos_Super_Solvers_Teasure_MathStorm_1992)

***********************************************************************
Ricordati la possibilità di lavorare direttamente sui file HTML CSS e JS o utilizzare uno spazio di lavoro come [CodePen](https://codepen.io/).  ( per semplificare le cose, prova anche in CodePen). Inizia creando una nuova pen. Hai il tuo file HTML, CSS e JavaScript.


<!--
style="width: 100%; max-width: 860px; display: block; margin-left: auto; margin-right: auto;"
-->
```ascii
  Creazione di text files
   +-------------------+
   | # JavaScript JS : |\               
   |     controls.js   +-+                  .-----------------.    
   |     dakar.js        |              ╔═══| Editor di testo |═══╗
   |     main.js         | <----+       ║   '-----------------'   ║
 +--------------------+         |       ║ Blocco Note             ║
 | # CSS : style.css  |\  <-----+-------║ Visual Strudio Code     ║
+-----------------+   +-+       |       ║ ...                     ║
| # HTML 5:       |\            |       ╚═════════════════════════╝
|                 +-+  <--------+                  
|    index.html   |                         
+-----------------+                                    visualizzati con 
         |             Transferiti                       .----------.
         *---------------------------+----------+   ╔════| Browser  |═════╗  
                                     |          |   ║    '----------'     ║  
                                     v          +-->║ Firefox             ║
                                .-,(   ),-.         ║ Chrome              ║ 
License: ...                 .-(  Http     )-.      ║ Opera               ║   
Content: ...                (      Server     ) +-->║ Safari              ║  
Author: ...                  '-(           )-'  |   ╚═════════════════════╝
Versions: ...                   '-.(   ).-'     | 
                                     |          |
                                     +----------+          
```

 {{1}}

Il telaio, la struttura __HTML__

```html     -index.html

<!DOCTYPE html>
<html lang="it">
    <title>OsKar </title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
   <h1>DaKAR ad OsKar  Omarillo Self-driving car</h1>
   <canvas id="myCanvas"></canvas>
    <script src="controls.js"></script>
    <script src="dakar.js"></script>
   <script src="main.js"></script> 
</body>
</html>
```

Questo è un semplice documento HTML:

- `<!DOCTYPE html>`: Questa dichiarazione definisce che questo documento è un documento HTML5 un ipertesto scritto nella versione 5 del linguaggio HTML.
  
  - `<head>`: Questo elemento contiene metadati (dati sul dati) per il documento, che non vengono visualizzati sulla pagina web.
    - `<title>OsKar </title>`: Questo elemento definisce il titolo del documento, che viene visualizzato nella barra del titolo del browser o nella scheda della pagina.
    - `<link rel="stylesheet" href="style.css">`: Questo elemento collega un foglio di stile esterno (in questo caso, "style.css") al documento HTML.
  - `</head>` Questo è il tag di chiusura del
    - [( )] body
    - [(X)] head
    - [( )] html
  - `<body>`: Questo elemento contiene il contenuto principale del documento HTML, che viene visualizzato nel browser.
    - `<h1>DaKAR ad OsKar  Omarillo Self-driving car</h1>`: Questo è un titolo di livello 1. HTML fornisce 6 livelli di titoli, da `<h1>` a `<h6>`.
    - `<canvas id="myCanvas"></canvas>`: Questo elemento viene utilizzato per disegnare grafica, sulla mosca, tramite scripting (solitamente JavaScript). In questo caso, ha un ID "myCanvas" per poter essere facilmente selezionato e manipolato tramite script.
    - `<script src="controls.js"></script>`:
    - `<script src="dakar.js"></script>` :
    - `<script src="main.js"></script>`: Questo elemento viene utilizzato per incorporare o fare riferimento a file JavaScript esterni. In questo caso, sta facendo riferimento a "main.js".
  - `</body>`Questo è il tag di chiusura del<!-- data-randomize -->
    - [(X)] body
    - [( )] head
    - [( )] html
- `</html>`: Questo è il tag di [[ apertura del documento HTML | chiusura del body del documento HTML | (chiusura del documento HTML) | apertura del head del documento HTML ]]. Tutti gli elementi devono essere inseriti prima di questo tag di chiusura.

{{2}}
L'estetica. l'aspetto __CSS__

```css     -style.css
body{
    margin:0;
    background:rgb(66, 155, 48);
    overflow:hidden;
    text-align:center;
    color: rgb(255, 51, 0);
}
#myCanvas{
    background:#71797E;
}
```

Questo è un frammento di codice CSS che da stile a due elementi HTML:

- `body`: Questo è riferito all'elemento body dell'HTML. Le regole CSS qui definite si applicano a tutto il corpo del documento HTML.
  - `margin:0;`: Rimuove tutti i margini intorno al corpo del documento.
  - `background:rgb(66, 155, 48);`: Imposta il colore di sfondo del corpo del documento a un colore verde specificato in RGB.
  - `overflow:hidden;`: Nasconde qualsiasi contenuto che esce dal box del corpo del documento.
  - `text-align:center;`: Centra il testo all'interno del corpo del documento.
  - `color: rgb(255, 51, 0);`: Imposta il colore del testo a un colore rosso specificato in RGB.
- `#myCanvas`: Questo è un selettore di ID che seleziona l'elemento HTML con l'ID "myCanvas". Le regole CSS qui definite si applicano solo a questo elemento.
  
  - `background:#71797E;`: Imposta il colore di sfondo dell'elemento "myCanvas" a un colore grigio specificato in esadecimale.
 {{3}}

Il motore, la logica, l'intelligenza __JS__

``` js     -main.js
/*Questo codice JavaScript è responsabile per l'inizializzazione 
 di 3 oggetti `OsKar` su un canvas HTML. */

const canvas=document.getElementById("myCanvas"); // Ottiene un riferimento all'elemento canvas con l'ID "myCanvas" dal documento HTML.
canvas.width=200; // Imposta la larghezza del canvas a 200 pixel.

const ctx = canvas.getContext("2d"); // Ottiene il contesto di disegno 2D del canvas. 
//Questo viene utilizzato per disegnare sull'elemento canvas.

ctx.beginPath(); // Inizia un nuovo percorso di disegno. 
//Questo è necessario prima di disegnare una forma come un rettangolo.

ctx.fillStyle = 'blue';// Imposta il colore di riempimento del rettangolo 
ctx.fillRect(  0,  0, 30, 50 ); // Disegna un rettangolo in alto a sinistra.

ctx.fillStyle = 'yellow';
ctx.fillRect(  canvas.width-30,  canvas.height-50, 30, 50 ); // Disegna un rettangolo in basso a destra.
```

Questo è un codice JavaScript che utilizza l'API Canvas per disegnare due rettangoli su un elemento canvas:

- `const canvas=document.getElementById("myCanvas");`: Questa linea ottiene un riferimento all'elemento canvas con l'ID "myCanvas" dal documento HTML.
- `canvas.width=200;`: Questa linea imposta la larghezza del canvas a 200 pixel.
- `const ctx = canvas.getContext("2d");`: Questa linea ottiene il contesto di disegno 2D del canvas, che viene utilizzato per disegnare sull'elemento canvas.
- `ctx.beginPath();`: Questa linea inizia un nuovo percorso di disegno. Questo è necessario prima di disegnare una forma come un rettangolo.
- `ctx.fillStyle = 'blue';`: Questa linea imposta il colore di riempimento del rettangolo a blu.
- `ctx.fillRect(  0,  0, 30, 50 );`: Questa linea disegna un rettangolo blu in alto a sinistra del canvas.
- `ctx.fillStyle = 'yellow';`: Questa linea imposta il colore di riempimento del rettangolo a giallo.
- `ctx.fillRect(  canvas.width-30,  canvas.height-50, 30, 50 );`: Questa linea disegna un rettangolo giallo in basso a destra del canvas.

<!-- data-solution-button="off"-->
Dove si trova l'origine del contesto di disegno 2D di un canvas [[ al centro del canvas | in alto a destra | in basso a destra | (in alto a sinistra) | in basso a sinistra ]]
***********************************************************************

BRAVO Certo __in alto a sinista__, ma ora prova tu stesso a creare i 3 file in una directory vuota e fammi vedere come aggiungere un terzo rettangolo delle stesse dimensioni ma di colore rosso al centro del canvas con ID "myCanvas"

Quando hai finito, ti invierò la 🔑

***********************************************************************

## HTML CSS JS - Overview on web technologies

??[Internet](https://3rekse.github.io/internet)


## 1. Il modello per la costrizione dell'auto dakar.js

``` js     -dakar.js
/*Questo codice JavaScript definisce una classe `Dakar` 
che rappresenta un'auto in un gioco o in una simulazione. 
Ecco una descrizione dettagliata di ciascuna parte:*/


class DaKar{
    constructor(x,y,width,height){
        // Costruttore della classe. Imposta le proprietà iniziali dell'auto.
        // x e y sono le coordinate centrali dell'auto.
        // width e height sono la larghezza e l'altezza dell'auto.
        
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    /*In sintesi, questo metodo disegna un rettangolo 
    (che rappresenta l'auto) sul canvas nella posizione 
    e con l'orientamento corretti. */

    draw(ctx){ 
        ctx.save(); // Salva lo stato corrente del contesto del canvas.
        // Questo permette di ripristinare lo stato dopo aver effettuato delle modifiche.
    
        ctx.translate(this.x,this.y); // Sposta l'origine del contesto del canvas alle coordinate (x, y) dell'auto. 
        //Questo significa che tutti i successivi comandi di disegno saranno relativi a questa posizione.
    
        ctx.beginPath(); 
        
        ctx.fillStyle = 'blue';
        
       ctx.fillRect(  -this.width/2,  -this.height/2, this.width, this.height ); // Disegna un rettangolo con l'origine al centro.
        // Le coordinate sono relative alla posizione dell'auto a causa del precedente comando translate.
    
        ctx.restore(); // Ripristina lo stato del contesto del canvas al suo stato precedente. Questo significa che le modifiche apportate con translate non avranno effetto sui successivi comandi di disegno.
    }
}
```

Usiamo il modello dakar.js per disegnare

``` js    -main.js

const canvas=document.getElementById("myCanvas"); // Ottiene un riferimento all'elemento canvas con l'ID "myCanvas" dal documento HTML.
canvas.width=200; // Imposta la larghezza del canvas a 200 pixel.
canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.

const ctx = canvas.getContext("2d"); // Ottiene il contesto di disegno 2D del canvas. 
//Questo viene utilizzato per disegnare sull'elemento canvas.

const dakar=new DaKar(canvas.width/2,canvas.height/2,30,50); // Crea un nuovo oggetto Omarillo con 
// le coordi[Title](<1. Car driving mechanics/sahara.html>)nate iniziali al centro del canvas.

dakar.draw(ctx); // Disegna l'oggetto DAKAR sul canvas utilizzando
```

![dakar](/images/dakar1.png)

```js   -style.css modifiche allo stile
body{
    margin:0;
    background:rgb(66, 155, 48);
    overflow:hidden;
    text-align:center;
    
}
#myCanvas{
    background:#71797E;
}
h1{
    background:#103a55;
    color: #070201;
    margin: 0px; /* Imposta un margine di 10px su tutti i lati */
}
```

## 2. Ma un'auto deve muoversi?

E per muoversi serve un motore e dei controlli

``` js     -control.js
// This file contains the class "Controls" which is used to manage the input of the driver.
// This file is part of the "Car driving mechanics" example project.
//
/* Questa classe `Controls` gestisce gli input della tastiera 
per controllare un'auto in un gioco o in una simulazione. */

class Controls{
    constructor(){ 
        // Costruttore della classe. Imposta le proprietà iniziali dei controlli.
        // Tutti i controlli sono inizialmente impostati su false, indicando che non sono attivi.

        this.forward=false; // Controllo per il movimento in avanti.
        this.#addKeyboardListeners(); // Chiama il metodo privato addKeyboardListeners.
    }

    #addKeyboardListeners(){
        // Questo è un metodo privato che aggiunge dei listener agli eventi di pressione
        // e rilascio dei tasti della tastiera.

        document.onkeydown=(event)=>{
            // Questo listener viene chiamato quando un tasto viene premuto.
            // Imposta il controllo corrispondente a true.

            switch(event.key){
                case "ArrowUp":
                    this.forward=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            // Questo listener viene chiamato quando un tasto viene rilasciato.
            // Imposta il controllo corrispondente a false.

            switch(event.key){
                case "ArrowUp":
                    this.forward=false;
                    break;
            }
        }
    }
}
```

``` js     -dakar.js
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
        this.maxSpeed=3; // La velocità massima dell'auto.
       
        this.controls=new Controls(); // Un oggetto che gestisce i controlli dell'auto.
        // Questo è un oggetto definito altrove vedi: controls.js che gestisce l'input dell'autista.
    }

    /*Questo metodo aggiorna la velocità dell'auto  in base ai controlli attivi.*/ 
    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration; // Se il controllo "avanti" è attivo, aumenta la velocità dell'auto.
        }
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed; // Se la velocità supera la velocità massima, limita la velocità alla velocità massima.
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
```

``` js      -main.js
const canvas=document.getElementById("myCanvas"); // Ottiene un riferimento all'elemento canvas con l'ID "myCanvas" dal documento HTML.
canvas.width=200; // Imposta la larghezza del canvas a 200 pixel.
canvas.height=window.innerHeight; // Imposta l'altezza del canvas all'altezza della finestra del browser. Questo assicura che il canvas occupi l'intera altezza della finestra.
const ctx = canvas.getContext("2d"); // Ottiene il contesto di disegno 2D del canvas. 
//Questo viene utilizzato per disegnare sull'elemento canvas.

const dakar=new DaKar(canvas.width/2,canvas.height/2,30,50); // Crea un nuovo oggetto Omarillo con 
// le coordinate iniziali al centro del canvas.

animate()Hai anche la possibilità di lavorare direttamente sul tuo modulo HTML o utilizzare uno spazio di lavoro come CodePen.  ( per semplificare le cose, prova anche in CodePen). Inizia creando una nuova pen. Hai il tuo file HTML, CSS e JavaScript.

function animate(){
    
    dakar.draw(ctx); // Disegna l'oggetto Omarillo sul canvas utilizzando 
    //il contesto di disegno 2D.

    requestAnimationFrame(animate); // Richiede che la funzione animate venga 
    //chiamata di nuovo al prossimo frame di animazione. Questo crea un ciclo di animazione.
}

```

Ma quest' auto non si ferma accellera e basta

## 3 La dobbiamo rallentare

``` js     -control.js
// This file contains the class "Controls" which is used to manage the input of the driver.
// This file is part of the "Car driving mechanics" example project.
//
/* Questa classe `Controls` gestisce gli input della tastiera 
per controllare un'auto in un gioco o in una simulazione. */

class Controls{
    constructor(){ 
        // Costruttore della classe. Imposta le proprietà iniziali dei controlli.
        // Tutti i controlli sono inizialmente impostati su false, indicando che non sono attivi.

        this.forward=false; // Controllo per il movimento in avanti.
        this.reverse=false; // Controllo per il movimento all'indietro.
        this.#addKeyboardListeners(); // Chiama il metodo privato addKeyboardListeners.
    }

    #addKeyboardListeners(){
        // Questo è un metodo privato che aggiunge dei listener agli eventi di pressione
        // e rilascio dei tasti della tastiera.

        document.onkeydown=(event)=>{
            // Questo listener viene chiamato quando un tasto viene premuto.
            // Imposta il controllo corrispondente a true.

            switch(event.key){         
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            // Questo listener viene chiamato quando un tasto viene rilasciato.
            // Imposta il controllo corrispondente a false.

            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
        }
    }
}
```

``` js     -dakar.js
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
```
## 4 


``` js     -control.js
// This file contains the class "Controls" which is used to manage the input of the driver.
// This file is part of the "Car driving mechanics" example project.
//
/* Questa classe `Controls` gestisce gli input della tastiera 
per controllare un'auto in un gioco o in una simulazione. */

class Controls{
    constructor(){ 
        // Costruttore della classe. Imposta le proprietà iniziali dei controlli.
        // Tutti i controlli sono inizialmente impostati su false, indicando che non sono attivi.

        this.forward=false; // Controllo per il movimento in avanti.
        this.reverse=false; // Controllo per il movimento all'indietro.
        this.#addKeyboardListeners(); // Chiama il metodo privato addKeyboardListeners.
    }

    #addKeyboardListeners(){
        // Questo è un metodo privato che aggiunge dei listener agli eventi di pressione
        // e rilascio dei tasti della tastiera.

        document.onkeydown=(event)=>{
            // Questo listener viene chiamato quando un tasto viene premuto.
            // Imposta il controllo corrispondente a true.

            switch(event.key){         
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            // Questo listener viene chiamato quando un tasto viene rilasciato.
            // Imposta il controllo corrispondente a false.

            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
        }
    }
}
```

``` js     -dakar.js
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
```
