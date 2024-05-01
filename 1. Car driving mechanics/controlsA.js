
// This file contains the class "Controls" which is used to manage the input of the driver.
// This file is part of the "Car driving mechanics" example project.
//
/* Questa classe `Controls` gestisce gli input della tastiera 
per controllare un'auto in un gioco o in una simulazione. */

export class Controls{
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
