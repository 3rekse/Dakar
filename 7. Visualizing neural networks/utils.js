export function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value>0?255:0;
    const G=R;
    const B=value<0?255:0;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}

export function fillComplementary(colore){
    
    // Convert the fill style to its RGB representation
    let rgb = colore.match(/\d+/g).map(Number); // Assumes the fill style is in 'rgb(r, g, b)' format
    // Set the fill style to the complementary color
return( `rgb(${255 - rgb[0]}, ${255 - rgb[1]}, ${255 - rgb[2]})`);
}
/*
1. `lerp(A, B, t)`: 
Questa è una funzione di interpolazione lineare. 
Prende due numeri, `A` e `B`, e un valore di interpolazione `t`. 
Restituisce un numero che è una interpolazione lineare tra `A` e `B` basata su `t`. 
Se `t` è 0, restituisce `A`. 
Se `t` è 1, restituisce `B`. 
Per valori di `t` tra 0 e 1, restituisce un valore tra `A` e `B`.

L'interpolazione lineare è un metodo semplice per trovare 
un valore intermedio tra due punti noti. 
In termini matematici, se hai due punti (x0, y0) e (x1, y1), 
l'interpolazione lineare ti permette di trovare il valore di y 
per un dato x nell'intervalo [x0, x1].

La formula per l'interpolazione lineare è la seguente:

y = y0 + (x - x0) * ((y1 - y0) / (x1 - x0))

In termini di programmazione, 
l'interpolazione lineare è spesso utilizzata 
in un contesto leggermente diverso. 
Se hai due valori, `start` e `end`, e un parametro `t` 
nell'intervallo [0, 1], puoi trovare un valore intermedio 
tra `start` e `end` con la seguente formula:

 value = start * (1 - t) + end * t;

Quando `t` è 0, `value` sarà uguale a `start`. 
Quando `t` è 1, `value` sarà uguale a `end`. 
Per valori di `t` tra 0 e 1, `value` sarà 
un valore intermedio tra `start` e `end`. 
Questo è spesso chiamato "lerping", 
che è una contrazione di "linear interpolation".*/

export function lerp(start,end,t){
    return start+(end-start)*t;   
}


/*
2. `getIntersection(A, B, C, D)`: 
Questa funzione calcola l'intersezione tra 
    due segmenti di linea definiti dai punti `A-B` e `C-D`.
Ogni punto è un oggetto con proprietà `x` e `y`. 

La funzione restituisce un oggetto con:
 le coordinate `x` e `y` dell'intersezione 
 e l'offset `t` lungo il segmento `A-B` se l'intersezione esiste. 
 Se non esiste un'intersezione 
 (le linee sono parallele o l'intersezione cade al di fuori dei segmenti di linea), 
 la funzione restituisce `null`.

Per trovare l'intersezione tra due segmenti di linea, puoi seguire questi passaggi:

1 - Calcola le equazioni dei due segmenti di linea: 
Se hai i punti finali dei segmenti di linea, 
puoi utilizzare la formula per trovare l'equazione della retta che passa attraverso due punti.
Eq retta y = mx + b 
=>  yA = mxA + b ;  yB = mxB + b 
=> yA-yB = m(xA-xB) 
=> m = (yA - yB) / (xA - xB)  b = yA - m * xA


Verifica se le rette si intersecano:
y = m1x + b1 ; y = m2x + b2 => m1x + b1 = m2x + b2 => x = (b2 - b1) / (m1 - m2)
 Utilizzo le equazioni delle rette per vedere se si intersecano. 

Se le rette sono parallele, non c'è intersezione tra i segmenti di linea. (m1 = m2); 
Calcola il punto di intersezione: Se le rette non sono parallele, 
calcola il punto di intersezione risolvendo il sistema di equazioni delle due rette.

Verifica se il punto di intersezione è all'interno dei segmenti di linea: 
    Dopo aver trovato il punto di intersezione, 
    assicurati che sia compreso all'interno dei due segmenti di linea. 
    Puoi farlo controllando 
        se le coordinate del punto di intersezione sono comprese tra 
            le coordinate dei punti terminali di ciascun segmento di linea 
            lungo entrambi gli assi.  
            yA <= y <= yB && xA <= x <= xB 
            yC <= y <= yD && xC <= x <= xD

Gestisci casi speciali: 
 Assicurati di gestire casi speciali come segmenti di linea verticali 
 (dove l'equazione della retta non è definita come x = costante) 
 e casi in cui i segmenti sono sovrapposti o coincidenti.
*/
export function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

export function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}