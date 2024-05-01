// Il file `road.js` definisce una classe `Road` che rappresenta una strada in un contesto 2D. 
// in base a :https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.versione=1&art.idGruppo=18&art.flagTipoArticolo=1&art.codiceRedazionale=059U0420&art.idArticolo=103&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.dataPubblicazioneGazzetta=1959-06-30&art.progressivo=0
// La larghezza della corsia puo' variare da un minimo di m. 2,80 nelle zone urbane ad un massimo di m. 4. 

import { lerp } from './utils.js'; // Questa riga importa la funzione `lerp` dal modulo `utils.js`. La funzione `lerp` è utilizzata per l'interpolazione lineare.

export class Road{
    //costruttore ha 3 parametri: 
    // `x` che rappresenta la posizione centrale della strada sull'asse x, 
    // `width` che rappresenta la larghezza della strada,
    // `laneCount` che rappresenta il numero di corsie sulla strada. `laneCount` ha un valore predefinito di 3 se non viene fornito.
    constructor(x,width,laneWidth=34){
        this.x=x;
        this.laneCount= Math.floor(width / laneWidth);
        this.laneWidth=laneWidth;
        this.width=this.laneCount*laneWidth;
    // I bordi sinistro e destro della strada, 
    // calcolati come la posizione centrale `x` più o meno la metà della larghezza.
        this.left=x-this.width/2;
        this.right=x+this.width/2;

        const infinity=1000000;
    //I bordi superiore e inferiore della strada.
    //Sono impostati su un valore molto grande e molto piccolo rispettivamente, 
    //indicando che la strada si estende molto in alto e in basso.
        this.top=-infinity;
        this.bottom=infinity;
    
    //i punti ai quattro angoli della strada sono oggetti .
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        //  const topCent={x:(this.right+this.left)/2,y:this.top};
        //  const bottomCent={x:(this.right+this.left)/2,y:this.bottom};
    //I bordi della strada sono rappresentati come un array di due punti.
    //Ogni bordo è rappresentato come un array di due punti.
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight],
            //[topCent,bottomCent]
        ];
    }
        //funzione che calcola il centro di una corsia specifica sulla strada. 
    // Richiede il numero della corsia come parametro. 
    // 0 è la corsia più a sinistra, 1 è la corsia successiva e così via.
    getLaneCenter(laneIndex){
        if(laneIndex>this.laneCount)
            return this.left;
        return this.left+(this.laneCount-laneIndex)*this.laneWidth+this.laneWidth/2;
       // -Math.min(laneIndex,this.laneCount-1)* // la corsia più a destra è `this.laneCount-1`
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=1;i<=this.laneCount-1;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.strokeStyle="white";
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}