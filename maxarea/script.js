// messy code. don't try to follow :-)
// WEBPAGE DEMO
// 360
var BALL_NUM = 50;
document.getElementById('ballNum').addEventListener('change', function(event) {
    BALL_NUM = event.target.value;
    let chain=createChain([CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2], SIZE * 0.4);
    particles=[];
    segments=[];
    particles.add(chain.p);
    segments.add(chain.s);
    // Qui puoi aggiungere il codice per aggiornare il tuo canvas
});
const BALL_SIZE = 5;
var G = [
  0,
  0
];
var particles = [];
var segments = [];
const orange = 'rgb(255, 117, 24)';
const blue = 'rgb(0, 71, 171)';
const red = 'rgb(179, 0, 0)';
function scale(vector, value) {
  let newVector = [];
  for (let i = 0; i < vector.length; i++) {
    newVector[i] = vector[i] * value;
  }
  return newVector;
}
function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}
function distance(v1, v2) {
  let dist = 0;
  for (let i = 0; i < v1.length; i++) {
    dist += Math.pow(v1[i] - v2[i], 2);
  }
  return Math.sqrt(dist);
}
Array.prototype.add = function (elements) {
  for (let i = 0; i < elements.length; i++) {
    this.push(elements[i]);
  }
}
function reverse(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.unshift(arr[i]);
  }
  return newArr;
}
function averageParticleLocations(particles) {
  let avg = [
    0,
    0
  ];
  for (let i = 0; i < particles.length; i++) {
    avg[0] += particles[i].location[0];
    avg[1] += particles[i].location[1];
  }
  avg[0] /= particles.length;
  avg[1] /= particles.length;
  return avg;
}
class Segment {
  constructor(particleA, particleB, isHidden) {
    this.isHidden = isHidden;
    this.particleA = particleA;
    this.particleB = particleB;
    this.length = distance(particleA.location, particleB.location);
  }
  update() {
    let newLength = subtract(this.particleA.location, this.particleB.location);
    let magn = magnitude(newLength);
    let diff = magn - this.length;
    let norm = normalize(newLength);
    if (!this.particleA.isFixed && !this.particleB.isFixed) {
      this.particleA.location = add(this.particleA.location, scale(norm, - diff * 0.5)
      )
      this.particleB.location = add(this.particleB.location, scale(norm, diff * 0.5)
      )
    } else if (!this.particleA.isFixed) {
      this.particleA.location = add(this.particleA.location, scale(norm, - diff)
      )
    } else {
      this.particleB.location = add(this.particleB.location, scale(norm, diff)
      )
    }
  }
  draw(ctx) {
    if (this.isHidden) {
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 2;
    ctx.moveTo(...this.particleA.location);
    ctx.lineTo(...this.particleB.location);
    ctx.stroke();
  }
}

class Particle {
  constructor(location, isFixed) {
    this.isFixed = isFixed;
    this.location = location;
    this.oldLocation = location;
    this.radius = BALL_SIZE;
  }
  update(forces) {
    if (this.isFixed) {
      return;
    }
    let vel = subtract(this.location, this.oldLocation);
    vel = scale(vel, 0.8);
    let newLocation = add(this.location, vel);
    for (let i = 0; i < forces.length; i++) {
      newLocation = add(newLocation, forces[i]);
    }
    this.oldLocation = this.location;
    this.location = newLocation;
  }
  draw(ctx, del = false, color = 'rgba(200,200,200,1)') {
    ctx.beginPath();
    let rad = this.radius;
    if (del) {
      rad = rad * 1.06;
      color = 'white';
    }
    ctx.fillStyle = color;
    ctx.arc(...this.location, rad, 0, Math.PI * 2);
    ctx.fill();
    if (del) {
      return;
    }
    const gradient = ctx.createRadialGradient(...this.location, 0, ...this.location, rad);
    // Add three color stops
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}
function particleCollision() {
  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      let newLength = subtract(p1.location, p2.location);
      let magn = magnitude(newLength);
      let norm = normalize(newLength);
      let diff = magn - p1.radius * 2;
      // diff=scale(diff,0.9);
      if (magn < p1.radius * 2) {
        p1.location = add(p1.location, scale(norm, - diff * 0.5)
        )
        p2.location = add(p2.location, scale(norm, diff * 0.5)
        )
      }
    }
  }
}
function updateSegments(segments) {
  for (let i = 0; i < segments.length; i++) {
    segments[i].update();
  }
}
function updateParticles(particles, forces) {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(forces);
  }
}
function drawObjects(objects, ctx) {
  for (let i = 0; i < objects.length; i++) {
    objects[i].draw(ctx);
  }
}
function normalize(v) {
  return scale(v, 1 / magnitude(v));
}
function magnitude(v) {
  let magn = 0;
  for (let i = 0; i < v.length; i++) {
    magn += v[i] * v[i];
  }
  return Math.sqrt(magn);
}
function subtract(v1, v2) {
  let newV = [];
  for (let i = 0; i < v1.length; i++) {
    newV[i] = v1[i] - v2[i];
  }
  return newV;
}
function add(v1, v2) {
  let newV = [];
  for (let i = 0; i < v1.length; i++) {
    newV[i] = v1[i] + v2[i];
  }
  return newV;
}
function average(v1, v2) {
  let newV = [];
  for (let i = 0; i < v1.length; i++) {
    newV[i] = (v1[i] + v2[i]) / 2;
  }
  return newV;
}
function getNearestParticle(particles, location) {
  let minDist = Number.MAX_VALUE;
  let nearestParticle = null;
  for (let i = 0; i < particles.length; i++) {
    let dist = distance(particles[i].location, location);
    if (dist < minDist) {
      minDist = dist;
      nearestParticle = particles[i];
    }
  }
  return nearestParticle;
}
let lastEvt = null;
function getMousePos(canvas, evt) {
  if (evt != null) {
    lastEvt = evt;
  }
  var rect = canvas.getBoundingClientRect();
  return [
  Math.round(
    CANVAS_WIDTH * (lastEvt.clientX - rect.left) / (rect.right - rect.left)
  ),
  Math.round(
    CANVAS_HEIGHT * (lastEvt.clientY - rect.top) / (rect.bottom - rect.top)
  )
  ];
}
const PANNEL_WIDTH = 402;
const BTN_SIZE = 134;
const CANVAS_WIDTH = window.innerWidth - PANNEL_WIDTH;
const CANVAS_HEIGHT = window.innerHeight;
const SIZE = 550;
let canvas;
controls.width = PANNEL_WIDTH;
chart.width = PANNEL_WIDTH;
chart.height = CANVAS_HEIGHT - BTN_SIZE;
const chartCtx = chart.getContext('2d');
function initializeCanvas(canvasID) {
  const canvas = document.getElementById(canvasID);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}
canvas = initializeCanvas('canvas');
addEventListeners(canvas);
let selected = null;
function addEventListeners() {
  canvas.addEventListener(
    'mousedown',
    function (event) {
      const location = getMousePos(canvas, event);
      selected = getNearestParticle(particles, location);
    },
    false
  );
  window.addEventListener('mouseup', function (event) {
    selected = null;
  }, false);
  canvas.addEventListener(
    'mousemove',
    function (event) {
      getMousePos(canvas, event);
    },
    false
  );
}
createHangingDecorations([CANVAS_WIDTH / 2,
CANVAS_HEIGHT / 2], SIZE * 0.4);
setInterval(
  function () {
    clear(canvas);
    updateSim(canvas);
    clear(chart);
    updateChart();
  },
  1000 / 30
);
const HISTORY = [];
function updateChart() {
  const x = chart.width * 0.8;
  const margin = 10;
  const bottom = chart.height - margin;
  const top = margin;
  const rad = 5;
  const spacing = margin * 2;
  let _x = x;
  for (let i = HISTORY.length - 1; i >= 0; i--) {
    _x -= spacing;
    const oldY = lerp(bottom - margin, top + margin + rad, HISTORY[i].oldVal)
    const newY = lerp(bottom - margin, top + margin + rad, HISTORY[i].newVal)
    switch (HISTORY[i].method) {
      case 'flip':
        chartCtx.strokeStyle = orange;
        chartCtx.fillStyle = orange;
        break;
      case 'half':
        chartCtx.strokeStyle = blue;
        chartCtx.fillStyle = blue;
        break;
      case 'scissords':
        chartCtx.strokeStyle = red;
        chartCtx.fillStyle = red;
        break;
    }
    chartCtx.beginPath();
    chartCtx.moveTo(_x, oldY);
    chartCtx.lineTo(_x + spacing, newY);
    chartCtx.stroke();
    //drawArrow(chartCtx,[_x+rad,oldY],[_x+spacing-rad,newY]);
    chartCtx.beginPath();
    chartCtx.arc(_x + spacing, newY, rad, 0, Math.PI * 2);
    chartCtx.lineWidth = 3;
    //chartCtx.stroke();
    chartCtx.fill();
    if (i == 0) {
      chartCtx.fillStyle = 'black';
      chartCtx.beginPath();
      chartCtx.arc(_x, oldY, rad, 0, Math.PI * 2);
      chartCtx.lineWidth = 3;
      //chartCtx.stroke();
      chartCtx.fill();
    }
  }
  drawArrow(chartCtx, [
    x,
    bottom
  ], [
    x,
    top
  ]);
  chartCtx.fillStyle = 'black';
  chartCtx.beginPath();
  chartCtx.font = '24px Calibri';
  chartCtx.textAlign = 'left';
  chartCtx.textBaseline = 'top';
  chartCtx.fillText('Area', x + 10, top - 7);
  chartCtx.strokeStyle = 'black';
  let area = procArea();
  chartCtx.fillStyle = 'white';
  if (LIVE != null) {
    area = procArea(LIVE.val);
    switch (LIVE.method) {
      case 'flip':
        chartCtx.fillStyle = interpColor([255,
        255,
        255], [
          255,
          117,
          24
        ], LIVE.t);
        break;
      case 'half':
        chartCtx.fillStyle = interpColor([255,
        255,
        255], [
          0,
          71,
          171
        ], LIVE.t);
        break;
      case 'scissords':
        chartCtx.fillStyle = interpColor([255,
        255,
        255], [
          179,
          0,
          0
        ], LIVE.t);
        break;
    }
  }
  chartCtx.beginPath();
  chartCtx.arc(x, lerp(bottom - margin, top + margin + rad, area), rad, 0, Math.PI * 2);
  chartCtx.lineWidth = 3;
  chartCtx.stroke();
  chartCtx.fill();
}
function procArea(area = AREA) {
  const minArea = 14809;
  const maxArea = 138450;
  //const rad=LENGTH/(Math.PI*2);
  //const circArea=Math.PI*rad**2;
  let perc = Math.max(0, area - minArea) / (maxArea - minArea);
  //perc=Math.pow(perc,6);
  return perc;
}
function setInitLocs() {
  //this one!
  const locString = '[[720.818842322536,253.11089409652308],[745.2173684781258,265.7979710425734],[769.607021416705,278.5020975192603],[792.726432403962,293.39312957222114],[814.3402190358195,310.3959007414317],[835.6122119330273,327.8243923049934],[811.4687220897645,340.9903293467792],[786.0272380025738,351.4297204900032],[760.3431680651213,361.2571591923328],[734.5171673090712,370.705316946546],[708.6304902637729,379.9859393153546],[682.6292403963774,388.9405473655857],[656.4189602676154,397.2634804766842],[630.0698944924123,405.1360107417278],[603.5631334223931,412.46005454122206],[576.7981245801899,418.7754564822536],[549.8812129923531,424.4083838359989],[522.699685088489,428.5814571413053],[495.29621807915805,430.8836291306479],[467.79643127741394,430.99191513445476],[440.3779349120634,428.87624572189094],[413.110473835411,425.307553183545],[385.9533369502339,420.97859069817315],[358.94717273052623,415.79042202915514],[332.40932258676673,408.579838852507],[306.97880970946176,398.1137500511818],[283.868981315952,383.207850828977],[266.0932432135614,362.22516427755517],[265.8800386769653,334.7259907658735],[278.29117985048396,310.1859505301488],[295.3824732460596,288.6420954882498],[319.53417552156714,275.4912294637159],[347.03413731152864,275.44538679086287],[374.0811122081394,280.4164177646251],[399.8627215850015,289.9850445176602],[423.1460006856456,304.6185305794811],[443.62597267711686,322.9712074204371],[462.7881077983914,342.6958766849398],[482.0710119905051,323.0892552034666],[501.31557784103626,303.4450019668438],[522.7054737030885,286.16141567780755],[545.360305802042,270.57268312611427],[569.1276376439785,256.7392476484291],[592.9613239266843,243.0204503914696],[618.1424388382541,231.96778321063405],[644.0907577276065,222.86093156934334],[670.0044420454236,232.06587399591598],[695.3997658781115,242.61706006350653]]'  //const locString='[[950.7230123266564,203.33189855771414],[976.6108435152979,212.60930101467386],[986.0711167559846,238.43086623081726],[985.9819964211753,265.9307218225458],[978.118560682289,292.2825031357778],[964.8653087344485,316.3781731369847],[947.7625108590122,337.9128963725401],[928.0712148505875,357.109324725455],[906.603206212948,374.29579048006076],[883.8212100512594,389.698084169275],[860.0185113372116,403.4705760980534],[835.4012774093549,415.7278920253347],[810.1132043446455,426.53360165839086],[784.2625912532068,435.91420946368436],[757.9434999135328,443.88637548390136],[731.2566338333473,450.5242349896643],[704.3212610745096,456.06821319511056],[677.2312137483996,460.798893470623],[650.102134489436,465.3003441879884],[622.9776083186741,469.8291497713243],[614.4887319785832,443.67214347315166],[595.7161002780648,423.57641509529253],[576.3704875157196,404.03166472980075],[553.473120213391,388.8014129058073],[527.6422033717887,379.3667038418125],[501.3334432175823,371.36051004273145],[473.91443386995144,369.25149928066133],[488.0737817987178,345.6768759277393],[501.68955870770765,321.78418626825095],[515.8126959417472,298.1878519201263],[533.4786262248665,277.1126317022503],[558.6863452664096,266.1207755931746],[586.1266818950237,267.93127986224965],[612.0969567331966,276.9753290013111],[635.7080343205166,291.07380463400096],[656.7108735611104,308.82572689142916],[674.6450040447362,329.67319589359556],[690.7345490041212,351.9751362351876],[710.5859333276211,332.944304922796],[731.493403672719,315.0801597216157],[753.89465884248,299.1291796006559],[777.496080030597,285.01454471692267],[801.6263686123439,271.8244282291273],[825.8282262081544,258.76609415038234],[849.8736811656972,245.42195326815312],[873.8750093173365,231.9986061834158],[898.3543747781381,219.4682164593682],[923.8458334393009,209.15145653552435]]'
  //!!const locString='[[617.6963123053793,191.1173739121798],[635.2522491370908,212.28430760511134],[640.3068934418292,239.31578131544714],[639.9965146806468,266.8140297146563],[631.6883456166886,293.02899351025764],[618.2429623415715,317.0179840806256],[601.0115836736052,338.4499599391683],[581.2475460224122,357.57148748594733],[559.7401855904579,374.70868233370504],[536.9339823973821,390.0751098923842],[513.1149118795657,403.8192679119681],[488.4865613387793,416.0542321391389],[463.1904658344693,426.8411479280392],[437.33359890715883,436.2045037742815],[411.0090963712506,444.1587835177254],[384.31732400162247,450.7768865516737],[357.3786469543934,456.30478660007327],[330.28603699607953,461.02076853882943],[303.1563930972412,465.5188149950397],[276.02274196891193,469.9926250542752],[267.6036041404922,443.81308880501985],[248.8427835179621,423.70633348325674],[229.45092740722995,404.2074638601051],[206.52091546225492,389.0264048653148],[180.7050814718009,379.5505030413553],[154.34865844223478,371.7026393137823],[126.8527411768606,371.2287894053749],[140.45902659316758,347.3306933061039],[154.0402197831929,323.41832848086733],[167.66978092226398,299.5334993385787],[182.7325449168184,276.525606326737],[199.19910641723936,254.50056711331325],[221.23091315381146,270.9580727542765],[244.0598475392312,286.29070967119975],[268.8091354256584,298.2791519851432],[294.83050626745904,307.1751207077439],[322.0950422961534,310.76609204430815],[349.5932624459147,310.45322051274445],[376.9549553455016,307.698631311303],[404.11777252987133,303.4054550269528],[431.2580086772284,298.9717678632376],[457.87580460510657,292.0621412494591],[483.4389517647247,281.9243156790666],[508.5929847669069,270.8101524750673],[533.4107686070425,258.9641571490382],[558.0264309388141,246.70368538127184],[581.5368567290071,232.43799650327435],[600.8123868325265,212.82412541089906]]'
  //const locString='[[616.0616458168424,190.89131355648817],[635.8106311612315,210.02838694473397],[641.142194169917,237.00660845550848],[640.2877573776475,264.4933313916465],[634.5837101140446,291.39526152341557],[622.3255751971171,316.01208764617974],[605.3622646594281,337.6568582756396],[585.7920855053344,356.97674667792285],[564.5546942823958,374.4473853051698],[542.0031759129282,390.18520660392534],[518.3634828461948,404.2356482948701],[493.8631486966908,416.7249888123934],[468.71999431638426,427.8637404393968],[443.0880468376828,437.8263338993894],[417.00241014146127,446.53205375203464],[390.372826025774,453.39610866334874],[363.3410882857275,458.44934077293414],[336.2347970629012,463.0860396140635],[308.9183588172878,466.2581369602355],[281.5354528061537,468.79318299244045],[268.124587482742,444.78487836097355],[248.95166099681083,425.0706984397829],[229.7177154157837,405.4160466396088],[206.8210832735302,390.18468962382315],[181.07739640337704,380.514499019109],[154.73447068823933,372.62144734268276],[127.24448980575568,371.8791865524725],[140.62862199857014,347.8559685031506],[154.24906480545235,323.9659384122435],[169.17280637518797,300.86762813725267],[184.32123891951454,277.91604885716856],[197.64245009378578,253.85788324026268],[219.7226892246584,270.250352240492],[241.4456913797538,287.1133643489417],[267.3163287028504,296.43860560570283],[294.2172122695146,302.1475865421553],[321.47435942006626,305.7942191275927],[348.9296588369165,307.36155250984024],[376.42394484056973,306.8009839151823],[403.7982675416227,304.17487335798637],[430.8872881665667,299.438317480415],[457.4451726275843,292.30187768488423],[483.20643394989355,282.6786030299813],[508.29992720838027,271.42842098317504],[533.1620490140326,259.6757659928799],[557.8273665740029,247.51549832864578],[581.3734600098721,233.30875753741165],[600.553114893398,213.60112352039067]]'
  //const locString='[[616.3195196369878,188.17144350318506],[637.8162764884764,205.32193751554456],[642.4386357364434,232.43067771096372],[641.6222828598666,259.91855809452375],[638.0198390397629,287.18158064381197],[626.5700875338188,312.18464426513907],[609.3081116684824,333.5919838762291],[589.5866670724199,352.75743777235266],[568.705437003413,370.6522479363415],[546.6362661746754,387.0596151514676],[523.2436501915732,401.5176757913706],[498.75229466360287,414.02461404189995],[473.5232089803293,424.9673392776919],[447.8559936719066,434.8387149827834],[421.9130868790548,443.9609727700528],[395.7178707425341,452.33119687463727],[369.192120924479,459.58616734941853],[342.19555707539683,464.82406199731156],[314.7052491750349,465.55411099792525],[288.4698971354837,457.31054967039114],[266.06185827542276,441.36910072601967],[246.93500249540665,421.6102194831339],[228.6783265829187,401.0446223698385],[204.1347317399557,388.6405120758884],[178.80362262580277,377.9360778990214],[151.8043161734271,383.1598170857253],[124.88643341331353,388.788101701199],[132.1055007035855,362.2525582272371],[142.9990299482912,337.0021914854501],[154.2978022728284,311.93053928703546],[170.3238952569592,289.58295902285494],[189.05862407631884,269.4518900978064],[214.59462629423217,279.65789767798805],[241.01890006371218,287.27417995713],[267.68643804215384,293.9892688000548],[294.6468038013935,299.41040135036405],[321.91554323151803,302.9693126855857],[349.37365987057314,304.4864911971805],[376.8665373882908,303.86064313592465],[404.2382876040784,301.20785401416447],[431.32757361579115,296.47281617106114],[457.9088992688839,289.4241903103537],[483.65186538238225,279.75208114640856],[508.68906135754895,268.377160588396],[533.520779679883,256.5604027775472],[558.0997545057784,244.226547074321],[581.5821760280699,229.91480785613305],[602.2971479826288,211.8277976852442]]'
  //const locString='[[981.9606192315684,206.02537997117892],[1000.9670352098967,225.9001416466996],[1015.2309103219573,249.41166790059344],[998.8316257134412,271.4868454611225],[980.5618690658822,292.0408229846816],[958.8449294752934,308.91164201692516],[940.1168659488998,329.0489118554947],[922.4028368691592,350.08372047744575],[902.1425655702985,368.6786500792636],[879.9268086199169,384.88698568541287],[855.9803996023852,398.4080616472244],[830.8576513369237,409.5927618931071],[805.2260786020963,419.5563194474773],[779.3983574623112,428.99977330321735],[753.440575267863,438.07961600810984],[727.3497848371276,446.7698780697192],[700.968483825435,454.53370167220186],[674.1301258734497,460.5297455714004],[646.8282746853828,463.8250333744081],[619.4094956694563,461.7130302314686],[594.4438831998316,450.18184668351853],[577.7821555894946,428.304076389475],[564.9788121283968,403.966360880061],[546.7139727633821,383.4080135979907],[522.8135946196098,369.8057371493705],[497.1390092995834,359.95354609130203],[472.4736229433093,347.79341797126455],[458.2908455237636,324.23288264908604],[476.8827247527406,303.969812133117],[503.19700173971825,295.9817694033478],[530.6164195755846,293.8780760934337],[558.074714227607,295.39202946217165],[585.5222769894893,297.0894682482648],[613.0126081653572,297.81864027262895],[640.4393367194814,299.8247710805238],[667.0170211670177,306.8871141341565],[687.7581494714238,324.9441237608961],[712.6952287326611,336.5368834805992],[736.9438826502138,323.5656544260046],[756.7252423755376,304.4620472426129],[778.7259252990668,287.9629578465787],[802.4122477022621,273.9912675046089],[827.3157524474129,262.3265578464883],[853.0889272703819,252.73523575072497],[879.401173547238,244.74050649539237],[905.8950435580086,237.36996704075327],[932.1039946495623,229.04284973159085],[957.6787186757508,218.93426471763883]]';
  //const locString='[[1043.8298855423116,219.1181623200715],[1071.2124038019097,216.5789313808325],[1080.569497939747,242.43806495672115],[1060.9407245428297,261.69841944287936],[1042.9015978470256,282.4551028979193],[1020.903222138615,298.95726839798635],[1002.2950133364219,319.20534398985393],[984.7085055649189,340.34688471901705],[964.4199520417321,358.91095205181847],[942.1960056271536,375.1080569092286],[918.2350928232785,388.60341379984436],[893.0964485548769,399.7523404004981],[867.4577123042554,409.69744992584106],[841.6282822307049,419.1362285584587],[815.6700388541958,428.21475271197187],[789.5807391568503,436.90948912557764],[763.200491480633,444.6768910426558],[736.3618289481843,450.6715714736159],[709.0602956628194,453.9694920712219],[681.6418392372767,451.85330511336207],[656.6830108022217,440.3074451129337],[640.0507202854523,418.40728730149823],[627.2676663211448,394.0589088884374],[609.0013199399472,373.5019005972947],[585.0960192827131,359.90827707421414],[559.4185932129593,350.0634921384055],[534.7485876854649,337.91273795303084],[520.4979509545196,314.393185390054],[539.0253294241086,294.0711223293159],[565.3312995871783,286.05576620624277],[592.749107063353,283.93118784820996],[620.2049685736699,285.4886436987218],[647.6503875134765,287.22039980698383],[675.1424506852231,287.8810529388889],[702.5809930102275,289.7185498991421],[729.2950661751083,296.24605286286356],[749.353994531974,315.0580010122218],[772.620160332383,329.7186807013725],[797.7200355890216,318.48274450979585],[813.5220303833539,295.97614635459047],[835.9486362749051,280.06082831865274],[858.8165734501242,264.7864232778587],[883.292675096417,252.24965941311495],[908.9849626303743,242.443724410655],[935.3671405874431,234.6828812707927],[962.1181942645997,228.30862624279948],[988.9690644692424,222.36886452591008],[1016.3351997047256,219.65876447734317]]'
  //!!const locString='[[542.5313022657292,394.49172109361405],[560.6187935933069,373.7771692646508],[559.1404587886041,346.3169339013986],[570.1012012023573,321.0956705361476],[580.6835107803587,295.71330019775445],[593.7108565759398,271.49474818648935],[610.0077909183356,249.3439032581431],[630.9993162927072,231.57860386699542],[656.5933639682829,221.519045050608],[683.7600172610988,225.78787965362747],[698.8861828839554,248.75413998372719],[697.5500376024225,276.2216610911485],[689.8076206412054,302.60925248556447],[680.2885430054191,328.40919746542585],[670.1968436550214,353.9905892223491],[659.8828653556229,379.4831734703129],[649.5449922812581,404.96607715686963],[639.3547713368539,430.5083831824466],[629.4740653980596,456.17200822161584],[620.0592551928582,482.0101844111235],[611.250521522566,508.0612153144459],[603.1007345683687,534.3258488089608],[595.5376270449932,560.76539125186],[590.8212762386196,587.8579369991909],[578.9338870284979,612.65592033992],[558.1621472311753,594.6341328094802],[543.6046892479106,571.3032430479326],[525.1537232556491,550.9117778246483],[506.7376298613137,530.4888127095845],[488.06675562228787,510.29850673987517],[469.12307628114183,490.36393844708704],[449.95609588148807,470.6439774339591],[430.647249372578,451.06290375309686],[411.3177985563406,431.5021693307226],[392.143632811095,411.78919472073926],[373.4099930872589,391.65711229746506],[355.722993129754,370.5995713084695],[340.9472628122711,347.4063008710125],[335.3383558775006,320.48437369264946],[347.38693510335133,295.76430616364786],[371.0562623094344,281.7638436851661],[398.4778191209197,279.688217988061],[425.24202801764983,286.00700918038496],[450.23716864132996,297.4740465136484],[473.08148830517706,312.78375124940237],[493.46159421517,331.2472634585535],[511.1042582655785,352.34196433826315],[520.3451847154969,378.24283842288037]]'
  const locs = JSON.parse(locString);
  for (let i = 0; i < particles.length; i++) {
    particles[i].location = locs[i];
    particles[i].oldLocation = locs[i];
  }
  const avg = averageParticleLocations(particles);
  const mid = [
    CANVAS_WIDTH / 2 - 27,
    CANVAS_HEIGHT / 2 - 24
  ];
  const diff = subtract(mid, avg);
  for (let i = 0; i < particles.length; i++) {
    const transLoc = add(particles[i].location, diff);
    particles[i].location = transLoc;
    particles[i].oldLocation = transLoc;
  }
}
function createHangingDecorations(center, radius) {
  let chain=createChain(center,radius);
  //let chain=createSquareChain(center,radius);
 // let chain = createHexChain(center, radius);
  particles.add(chain.p);
  segments.add(chain.s);
 // setInitLocs();
}
function createChain(center, radius) {
  let links = BALL_NUM;
  let p = []
  let s = []  //support
  for (let i = 0; i < links; i++) {
    const angle = Math.PI * 2 * i / links;
    p.push(
      new Particle(
        [
        center[0] + radius * Math.cos(angle),
        center[1] + radius * Math.sin(angle),
        ],
        false
      )
    );
    if (i > 0) {
      s.push(new Segment(p[p.length - 2], p[p.length - 1], false));
    }
  }
  s.push(new Segment(p[p.length - 1], p[0], false));
  return {
    p: p,
    s: s
  };
}
function vLerp(v1, v2, t) {
  return [
  v1[0] + (v2[0] - v1[0]) * t,
  v1[1] + (v2[1] - v1[1]) * t
  ];
}
function createSquareChain(center, radius) {
  let links = 44;
  let p = []
  let s = []  //support
  const corners = [];
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI * 2 * i / 4;
    corners.push(
      [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle),
      ]
    );
  }
  for (let i = 0; i < corners.length; i++) {
    const nextI = i < corners.length - 1 ? i + 1 : 0;
    const c1 = corners[i];
    const c2 = corners[nextI];
    for (let j = 0; j < links / 4; j++) {
      const loc = vLerp(c1, c2, j / (links / 4));
      p.push(new Particle(loc, false));
      if (p.length > 1) {
        s.push(new Segment(p[p.length - 2], p[p.length - 1], false));
      }
    }
  }
  s.push(new Segment(p[p.length - 1], p[0], false));
  return {
    p: p,
    s: s
  };
}
function createHexChain(center, radius) {
  let links = 48;
  let p = []
  let s = []  //support
  const S = 6;
  const corners = [];
  for (let i = 0; i < S; i++) {
    const angle = Math.PI * 2 * i / S;
    corners.push(
      [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle),
      ]
    );
  }
  for (let i = 0; i < corners.length; i++) {
    const nextI = i < corners.length - 1 ? i + 1 : 0;
    const c1 = corners[i];
    const c2 = corners[nextI];
    for (let j = 0; j < links / S; j++) {
      const loc = vLerp(c1, c2, j / (links / S));
      p.push(new Particle(loc, false));
      if (p.length > 1) {
        s.push(new Segment(p[p.length - 2], p[p.length - 1], false));
      }
    }
  }
  s.push(new Segment(p[p.length - 1], p[0], false));
  return {
    p: p,
    s: s
  };
}
function clear(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function getPolygonLength() {
  var length = 0;
  for (var i = 0; i < segments.length; i++) {
    const s = segments[i];
    length += distance(s.particleA.location, s.particleB.location);
  }
  return length;
}
function getPolygonArea(part) {
  var area = 0;
  for (var i = 0; i < part.length; i++) {
    let nextI = i + 1;
    if (i == part.length - 1) {
      nextI = 0;
    }
    const pA = part[i];
    const pB = part[nextI];
    area += pA.location[0] * pB.location[1];
    area -= pA.location[1] * pB.location[0];
  }
  area = Math.abs(area) / 2
  return area;
}
function project(p1, dir, p0) {
  const v = subtract(p1.location, p0.location);
  const norm = normalize(dir);
  const scalar = dot(v, norm);
  const proj = add(p0.location, scale(norm, scalar));
  const refl = subtract(proj, p1.location);
  const loc = add(p1.location, scale(refl, 2));
  return loc;
}
function projectLoc(p1, dir, p0) {
  const v = subtract(p1, p0);
  const norm = normalize(dir);
  const scalar = dot(v, norm);
  const proj = add(p0, scale(norm, scalar));
  const refl = subtract(proj, p1);
  const loc = add(p1, scale(refl, 1));
  return loc;
}
function showSim(start, end, particles) {
  if (end < start) {
    let aux = start;
    start = end;
    end = aux;
    //end+=particles.length;
  }
  let sel = [];
  for (let i = start; i <= end; i++) {
    sel.push(particles[i]);
  }
  const parts = [];
  const dir = subtract(sel[0].location, sel[sel.length - 1].location);
  for (let i = 0; i < sel.length; i++) {
    const loc = project(sel[i], dir, sel[0]);
    parts.push(new Particle(loc, false));
    /*
		ctx.beginPath();
		ctx.fillStyle="red";
		ctx.arc(...loc,4,0,Math.PI*2);
		ctx.fill();
		*/
  }
  return parts;
  /*
	ctx.beginPath();
	ctx.moveTo(...sel[0].location);
	ctx.lineTo(...sel[sel.length-1].location);
	ctx.stroke();*/
}
let anim = 0;
let LIVE = null;
function showFlipEmph(ctx) {
  const locs = emphFlip.map(p => p.location);
  if (locs.length == 0) {
    return;
  }
  const moving = [];
  let t = anim;
  if (t > 1) {
    t = 2 - t;
  }
  const val = lerp(AREA, getPolygonArea(maxFlip), t);
  LIVE = {
    method: 'flip',
    val: val,
    t: t
  }
  for (let i = locs.length / 2; i < locs.length; i++) {
    locs[i] = vLerp(
      locs[locs.length / 2 - (i - locs.length / 2) - 1],
      locs[i],
      Math.min(t, 1)
    );
    moving.push(locs[i]);
  }
  if (anim < 1) {
    anim += Math.sin(anim * Math.PI) * 0.06 + 0.002;
  }
  if (anim >= 1) {
    anim += Math.sin((2 - anim) * Math.PI) * 0.12 + 0.002;
    //anim+=0.03;
  }
  ctx.beginPath();
  ctx.moveTo(...locs[0]);
  for (let i = 1; i < locs.length; i++) {
    ctx.lineTo(...locs[i]);
  }  /*
	ctx.globalAlpha=1;
	if(anim>1){
		ctx.globalAlpha=Math.max(0,1-Math.max(0,(anim-1))*1);
	}
	*/
  if (anim >= 2) {
    anim = 0;
  }  //ctx.globalAlpha=1-Math.abs(anim-1);
  //ctx.fillStyle="rgba(0, 150, 255,0.5)";
  //ctx.filter = 'blur(5px)';
  //ctx.fill();
  //ctx.filter = 'blur(0px)';
  //ctx.globalAlpha=1;
  ctx.beginPath();
  ctx.moveTo(...moving[0]);
  ctx.lineTo(...moving[moving.length - 1]);
  ctx.setLineDash([5,
  5]);
  ctx.stroke();
  ctx.setLineDash([]);
  //ctx.stroke();
  drawPath2(moving, ctx);
  for (let i = emphFlip.length / 2 + 1; i < emphFlip.length - 1; i++) {
    emphFlip[i].location = locs[i];
    const c = interpColor([200,
    200,
    200], [
      255,
      147,
      84
    ], t)    //emphFlip[i].draw(ctx,false,'rgba(250, 160, 0,1)');
    emphFlip[i].draw(ctx, false, c);
  }  //ctx.globalAlpha=1;
  drawPath(oldFlip, ctx);
  for (let i = 0; i < oldFlip.length; i++) {
    oldFlip[i].draw(ctx, false);
  }
}
function interpColor(c1, c2, t) {
  return `rgb(${ lerp(c1[0], c2[0], t) },${ lerp(c1[1], c2[1], t) },${ lerp(c1[2], c2[2], t) })`;
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function drawPath(parts, ctx) {
  ctx.beginPath();
  for (let i = 0; i < parts.length; i++) {
    if (i < parts.length - 1) {
      let nextI = (i + 1) % parts.length;
      ctx.moveTo(...parts[i].location);
      ctx.lineTo(...parts[nextI].location);
    }
  }
  ctx.stroke();
}
function drawPath2(locs, ctx) {
  ctx.beginPath();
  for (let i = 0; i < locs.length; i++) {
    if (i < locs.length - 1) {
      let nextI = (i + 1) % locs.length;
      ctx.moveTo(...locs[i]);
      ctx.lineTo(...locs[nextI]);
    }
  }
  ctx.stroke();
}
function showHalfEmph(ctx) {
  const locs = emphArea.map(p => p.location);
  const locsDisc = discArea.map(p => p.location);
  const locsUpd = updArea.map(p => p.location);
  if (locs.length == 0) {
    return;
  }
  if (anim < 1) {
    anim += Math.sin(anim * Math.PI) * 0.06 + 0.002;
  }
  if (anim >= 1) {
    anim += Math.sin((2 - anim) * Math.PI) * 0.12 + 0.002;
    //anim+=0.03;
  }
  if (anim >= 2) {
    anim = 0;
  }
  let t = anim;
  if (t > 1) {
    t = 2 - t;
  }
  const val = lerp(AREA, getPolygonArea(maxArea), t);
  LIVE = {
    method: 'half',
    val: val,
    t: t
  }
  for (let i = 0; i < locsDisc.length; i++) {
    locsDisc[i] = vLerp(locsDisc[i], locsUpd[i], Math.min(Math.max(0, t), 1));
  }
  ctx.beginPath();
  ctx.moveTo(...locsDisc[0]);
  for (let i = 1; i < locsDisc.length; i++) {
    ctx.lineTo(...locsDisc[i]);
  }  /*
	ctx.globalAlpha=1-Math.abs(anim-1);
	ctx.fillStyle="rgba(0, 150, 255,0.5)";
	ctx.filter = 'blur(5px)';
	//ctx.fill();
	ctx.filter = 'blur(0px)';
	ctx.globalAlpha=1;
	*/
  ctx.beginPath();
  ctx.moveTo(...locs[0]);
  ctx.lineTo(...locs[locs.length - 1]);
  ctx.setLineDash([5,
  5]);
  ctx.stroke();
  ctx.setLineDash([]);
  const newParts = [];
  for (let i = 0; i < discArea.length; i++) {
    newParts.push(new Particle(locsDisc[i], false));
  }
  drawPath(newParts, ctx);
  for (let i = 0; i < newParts.length; i++) {
    const c = interpColor([200,
    200,
    200], [
      0,
      110,
      255
    ], t)
    newParts[i].draw(ctx, false, c);
  }  //ctx.globalAlpha=1;
  drawPath(emphArea, ctx);
  for (let i = 0; i < emphArea.length; i++) {
    emphArea[i].draw(ctx, false);
  }
}
function showSciEmph(ctx) { /*
	if(scissorsBtn.disabled){
		showScissors=false;
		return;
	}*/
  const locs = oldEmphScissords.map(p => p.location);
  const locs2 = emphScissords.map(p => p.location);
  const reflLocs = reflScissords.map(p => p.location);
  const discLocs = discScissords.map(p => p.location);
  for (let i = 0; i < locs.length; i++) {
    if (anim <= 4) {
      locs[i] = vLerp(locs[i], locs2[i], Math.min(Math.max(0, anim - 1), 1));
    }
    if (anim > 4 && anim < 5) {
      locs[i] = vLerp(locs[i], locs2[i], Math.min(Math.max(0, 5 - anim), 1));
    }
  }
  for (let i = 0; i < reflLocs.length; i++) {
    if (anim > 4) {
      reflLocs[i] = vLerp(reflLocs[i], discLocs[i], Math.min(Math.max(0, anim - 4), 1));
    }
  }
  if (anim < 1) {
    anim += 0.05;
  }
  if (anim >= 2) {
    anim += 0.04;
  } else if (anim >= 1) {
    anim += Math.sin((anim - 1) * Math.PI) * 0.05 + 0.002;
  }
  ctx.strokeStyle = 'black';
  ctx.globalAlpha = Math.max(0, 1 - anim);
  if (anim > 3) {
    //	ctx.globalAlpha=Math.min(1,anim-4);
  }
  for (let i = 1; i < discScissords.length - 1; i++) {
    discScissords[i].draw(ctx, false);
  }
  ctx.globalAlpha = 0;
  ctx.globalAlpha = Math.min(1, anim);
  if (anim > 2) {
    ctx.globalAlpha = Math.max(0, 3 - anim);
  }
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 150, 255,0.8)';
  ctx.fillStyle = 'rgba(255, 100, 100,0.8)';
  ctx.moveTo(...locs[0]);
  ctx.lineTo(...locs[sciC - sciA])
  ctx.lineTo(...locs[locs.length - 1]);
  ctx.globalAlpha = Math.max(0, Math.min(1, anim - 1));
  if (anim > 4) {
    ctx.globalAlpha = Math.max(0, 5 - anim);
  }
  ctx.globalAlpha = 1;
  //ctx.filter = 'blur(5px)';
  //ctx.fill();
  //ctx.filter = 'blur(0px)';
  ctx.globalAlpha = 1;
  ctx.stroke();
  if (heightDemo) {
    ctx.beginPath();
    ctx.moveTo(...locs[sciC - sciA])
    ctx.lineTo(...locs[locs.length - 1]);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.lineWidth = 2;
  }
  ctx.globalAlpha = Math.max(0, Math.min(1, anim - 1));
  if (anim > 4) {
    ctx.globalAlpha = Math.max(0, 5 - anim);
  }
  const res = getSmallSquare(locs[0], locs[locs.length - 1], locs[sciC - sciA])
  const a1 = res[0];
  const a2 = res[1];
  const a3 = res[2];
  ctx.beginPath();
  ctx.moveTo(...a1);
  ctx.lineTo(...a3)
  ctx.lineTo(...a2);
  if (heightDemo == false) {
    //ctx.globalAlpha=1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const dir = subtract(locs[locs.length - 1], locs[sciC - sciA])
  const loc = projectLoc(locs[0], dir, locs[sciC - sciA]);
  /*
	ctx.beginPath();
	ctx.arc(...loc,5,0,Math.PI*2)
	ctx.fill();
	*/
  ctx.beginPath();
  ctx.moveTo(...locs[0]);
  ctx.lineTo(...locs[locs.length - 1]);
  ctx.setLineDash([5,
  5]);
  ctx.stroke();
  ctx.setLineDash([]);
  if (heightDemo) {
    ctx.strokeStyle = red;
    ctx.beginPath();
    ctx.moveTo(...locs[0]);
    ctx.lineTo(...loc);
    ctx.setLineDash([5,
    5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    const res2 = getSmallSquare(locs[0], locs[locs.length - 1], loc)
    const _a1 = res2[0];
    const _a2 = res2[1];
    const _a3 = res2[2];
    ctx.moveTo(..._a1);
    ctx.lineTo(..._a3)
    ctx.lineTo(..._a2);
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(...locs[locs.length - 1]);
    ctx.lineTo(...loc);
    ctx.setLineDash([5,
    5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }  /*
	ctx.globalAlpha=Math.min(1,anim);
	if(anim>2){
		ctx.globalAlpha=Math.max(0,4-anim);
		//ctx.globalAlpha=Math.min(1,anim-2);
	}*/
  ctx.globalAlpha = 1;
  const newParts = [];
  for (let i = 0; i < locs.length; i++) {
    newParts.push(new Particle(locs[i], false));
  }
  let t = Math.max(0, Math.min(anim - 1, 1));
  if (anim > 4) {
    t = Math.max(5 - anim, 0);
  }
  const val = lerp(AREA, getPolygonArea(maxScissords), t);
  LIVE = {
    method: 'scissords',
    val: val,
    t: t
  }
  if (!heightDemo) {
    for (let i = 0; i < newParts.length; i++) {
      const c = interpColor([200,
      200,
      200], [
        255,
        0,
        0
      ], t)
      newParts[i].draw(ctx, false, c);
      //newParts[i].draw(ctx,false);
    }
  }
  const reflParts = [];
  for (let i = 0; i < reflLocs.length; i++) {
    reflParts.push(new Particle(reflLocs[i], false));
  }
  if (anim >= 2) {
    if (anim <= 3) {
      ctx.globalAlpha = Math.min(1, anim - 2) * 1;
    }
    let t = Math.max(0, Math.min(anim - 1, 1));
    if (anim > 4) {
      t = Math.max(5 - anim, 0);
    }
    const c = interpColor([200,
    200,
    200], [
      255,
      0,
      0
    ], t)
    for (let i = 1; i < reflParts.length - 1; i++) {
      reflParts[i].draw(ctx, false, c);
    }
  }
  ctx.globalAlpha = 1;
  /*
	for(let i=0;i<oldEmphScissords.length;i++){
		oldEmphScissords[i].draw(ctx,false);
	}
	*/
  if (anim >= 5) {
    anim = 0;
  }
  if (forcedI != null) {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    const aver = average(locs[0], locs[locs.length - 1])
    ctx.moveTo(...aver);
    ctx.lineTo(...locs[sciC - sciA]);
    ctx.setLineDash([5,
    5]);
    //ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.setLineDash([4,
    4]);
    ctx.moveTo(...vLerp(locs[0], aver, 0.47));
    ctx.lineTo(...vLerp(locs[0], aver, 0.53));
    ctx.moveTo(...vLerp(locs[locs.length - 1], aver, 0.47));
    ctx.lineTo(...vLerp(locs[locs.length - 1], aver, 0.53));
    ctx.moveTo(...vLerp(locs[sciC - sciA], aver, 0.47));
    ctx.lineTo(...vLerp(locs[sciC - sciA], aver, 0.53));
    ctx.lineWidth = 10;
    ctx.strokeStyle = red;
    //ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
  }
}
function getSmallSquare(A, B, C) {
  const v1 = subtract(B, C);
  const v2 = subtract(A, C);
  const n1 = normalize(v1);
  const n2 = normalize(v2);
  const m1 = magnitude(v1);
  const m2 = magnitude(v2);
  const sqSize = Math.min(30, Math.min(m1, m2) * 0.7);
  const s1 = scale(n1, sqSize);
  const s2 = scale(n2, sqSize);
  const a1 = add(C, s1);
  const a2 = add(C, s2);
  const avg = average(a1, a2);
  const flp = subtract(avg, C);
  const scl = scale(flp, 2);
  const a3 = add(C, scl);
  return [a1,
  a2,
  a3]
}
let LENGTH = 0;
let AREA = 0;
function updateSim(canvas) {
  if (selected != null) {
    const location = getMousePos(canvas, null);
    let vel = subtract(location, selected.location);
    const norm = normalize(vel);
    vel = scale(norm, Math.min(magnitude(vel), 10));
    let newLocation = add(selected.location, vel);
    selected.location = newLocation;
    selected.oldLocation = newLocation;
  }
  updateParticles(particles, [
    G
  ]);
  const rep = 20;
  for (let i = 1; i <= rep; i++) {
    updateSegments(segments);
  }
  particleCollision();
  let ctx = canvas.getContext('2d');
  /*
	let context=canvas.getContext("2d");
	context.beginPath();
	context.fillStyle="lightgreen";
	context.font = "40px Brush Script MT";
	context.textAlign="center";
	context.textBaseline="middle";
	context.fillText("Click for Music!",canvas.width/2,canvas.height*0.4);
*/
  /*let flip;
  if (minFlipActive) {
    flip = findMinFlip(ctx);
  } else {
    flip = findFlip(ctx);
  }*/
  //let half = findHalf(ctx);
  //let sci = findScissords(ctx);
  let sci,half,flip = false;
  LENGTH = getPolygonLength();
  AREA = getPolygonArea(particles);
  if (sci) {
    scissorsBtn.disabled = false;
  } else {
    showScissors = false;
    scissorsBtn.disabled = true;
  }
  if (half) {
    halfBtn.disabled = false;
    //scissorsBtn.disabled=true;
  } else {
    showHalf = false;
    halfBtn.disabled = true;
  }
  if (flip) {
    flipBtn.disabled = false;
    //halfBtn.disabled=true;
    //scissorsBtn.disabled=true;
  } else {
    showFlip = false;
    flipBtn.disabled = true;
  }
  if (showFlip) {
    showFlipEmph(ctx);
  }
  if (showHalf || mirrorTimeout != null) {
    showHalfEmph(ctx);
  }
  if (showScissors || scissordsTimeout != null) {
    showSciEmph(ctx);
  }
  if (!half && !sci && !flip) {
    doOut();
  }
  if (convexDemoEnabled) {
    convexDemo(ctx)
  }
  if (!showScissors && !showFlip && !showHalf) {
    drawObjects(segments, ctx);
    drawObjects(particles, ctx);
  }
  if (doCountParts) {
    countParts();
  }
}
function approx(a, b, thr = 0.01) {
  if (a - b > - thr && a - b < thr) {
    return true;
  }
  return false;
}
function formatPercent(p) {
  return p.toFixed(2) + '%';
}
function calcAngle(A, C, B) {
  var AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  var BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
  var AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
let heightDemo = false;
let MASTER_ANGLE = Math.PI / 2;
function getAngle(A, C, B, particles) {
  const angle = calcAngle(
    particles[A].location,
    particles[B].location,
    particles[C].location
  );
  let extra = Math.PI - angle;
  let diff = angle - MASTER_ANGLE;
  const magA = magnitude(subtract(particles[A].location, particles[C].location));
  const magB = magnitude(subtract(particles[B].location, particles[C].location));
  const angA = Math.atan2(
    particles[A].location[1] - particles[C].location[1],
    particles[A].location[0] - particles[C].location[0]
  );
  const angB = Math.atan2(
    particles[B].location[1] - particles[C].location[1],
    particles[B].location[0] - particles[C].location[0]
  );
  const newA = angA - diff / 2;
  const newB = angB + diff / 2;
  const partA = new Particle(
    [
    particles[C].location[0] + Math.cos(newA) * magA,
    particles[C].location[1] + Math.sin(newA) * magA
    ],
    false
  );
  const partB = new Particle(
    [
    particles[C].location[0] + Math.cos(newB) * magB,
    particles[C].location[1] + Math.sin(newB) * magB
    ],
    false
  );
  const angle2 = calcAngle(partA.location, partB.location, particles[C].location
  );
  /*
	if(!approx(angle2,Math.PI/2)){
		diff+=extra;
	}*/
  const partsSubset = [];
  const newParts = [];
  for (let i = A; i < C; i++) {
    const mag = magnitude(subtract(particles[i].location, particles[C].location));
    const ang = Math.atan2(
      particles[i].location[1] - particles[C].location[1],
      particles[i].location[0] - particles[C].location[0]
    );
    const newAng = ang - diff / 2;
    const part = new Particle(
      [
      particles[C].location[0] + Math.cos(newAng) * mag,
      particles[C].location[1] + Math.sin(newAng) * mag
      ],
      false
    );
    newParts.push(part);
    partsSubset.push(particles[i]);
  }
  newParts.push(new Particle(particles[C].location, false))
  partsSubset.push(new Particle(particles[C].location, false));
  for (let i = C + 1; i <= B; i++) {
    const mag = magnitude(subtract(particles[i].location, particles[C].location));
    const ang = Math.atan2(
      particles[i].location[1] - particles[C].location[1],
      particles[i].location[0] - particles[C].location[0]
    );
    const newAng = ang + diff / 2;
    const part = new Particle(
      [
      particles[C].location[0] + Math.cos(newAng) * mag,
      particles[C].location[1] + Math.sin(newAng) * mag
      ],
      false
    );
    newParts.push(part);
    partsSubset.push(particles[i]);
  }
  return newParts;
}
function getScissords(A, C, B, particles) {
  const newParts = [];
  for (let i = A; i < A + particles.length; i++) {
    newParts.push(particles[i % particles.length]);
  }
  const newNewParts = [];
  const old = [];
  for (let i = 0; i <= B - A; i++) {
    old.push(newParts[i]);
  }
  const emph = [];
  newNewParts.add(getAngle(0, C - A, B - A, newParts));
  emph.add(getAngle(0, C - A, B - A, newParts));
  for (let i = newNewParts.length; i < newParts.length; i++) {
    newNewParts.push(newParts[i]);
  }
  const res = getReflectedHalf(0, B - A, newNewParts);
  const withReflection = res.all;
  const disc = res.disc;
  return {
    all: withReflection,
    emph: emph,
    oldEmph: old,
    disc: disc,
    refl: res.upd,
    c: C,
    a: A,
    b: B
  }
}
function getPartsFlip(A, B, particles) {
  const newParts = [];
  for (let i = A; i < A + particles.length; i++) {
    newParts.push(particles[i % particles.length]);
  }
  const newNewParts = [];
  const old = [];
  newNewParts.add(showSim(0, B - A, newParts));
  old.push(newNewParts[newNewParts.length - 1]);
  for (let i = newNewParts.length; i < newParts.length; i++) {
    newNewParts.push(newParts[i]);
    old.push(newParts[i]);
  }
  old.push(newNewParts[0]);
  const emph = [];
  for (let i = 0; i <= B - A; i++) {
    emph.push(newParts[i]);
  }
  emph.add(reverse(showSim(0, B - A, newParts)));
  return {
    all: newNewParts,
    emph: emph,
    old: old
  };
}
function getReflectedHalf(A, B, particles) {
  const newParts = [];
  for (let i = A; i < A + particles.length; i++) {
    newParts.push(particles[i % particles.length]);
  }
  const newNewParts = [];
  const emph = [];
  const disc = [];
  emph.push(newParts[0]);
  for (let i = 1; i < B - A; i++) {
    newNewParts.push(newParts[i]);
    emph.push(newParts[i]);
  }
  emph.push(newParts[B - A]);
  //disc.push(emph[emph.length-1]);
  for (let i = B - A; i < newParts.length; i++) {
    disc.push(newParts[i]);
  }
  disc.push(emph[0]);
  newNewParts.add(reverse(showSim(0, B - A, newParts)));
  const upd = reverse(showSim(0, B - A, newParts));
  //newNewParts.add(reverse(showSim(0,B-A,newParts)));
  return {
    all: newNewParts,
    disc: disc,
    emph: emph,
    upd: upd
  }
}
let maxFlip = [];
let maxArea = [];
let maxScissords = [];
let reflScissords = [];
let discScissords = [];
let emphScissords = [];
let oldEmphScissords = [];
let sciA = 0;
let sciB = 0;
let sciC = 0;
let emphFlip = [];
let oldFlip = [];
let emphArea = [];
let forcedI = null;
let forcedK = null;
let discArea = [];
let updArea = [];
let MIRROR_TOLERANCE = 5;
let SCI_TOLERANCE = 5;
let FLIP_TOLERANCE = 30; //50;
function findFlip(ctx) {
  let maxI = 0;
  let maxJ = 2;
  let maxA = getPolygonArea(particles);
  maxFlip = [];
  emphFlip = [];
  let found = false;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 2; j < i + 2 + particles.length / 2; j++) {
      let A = i;
      let B = j;
      const flip = getPartsFlip(A, B, particles);
      const all = flip.all;
      const emph = flip.emph;
      const old = flip.old;
      const a = getPolygonArea(all);
      if (a > maxA + FLIP_TOLERANCE) {
        maxA = a;
        maxI = i;
        maxJ = j;
        maxFlip = all;
        emphFlip = emph;
        oldFlip = old;
        found = true;
      }
    }
  }
  return found;
}// make scissords demo
// show equal segments
function findScissords(ctx) {
  let maxI = 0;
  let maxJ = 2;
  let maxC = 1;
  let maxA = getPolygonArea(particles);
  maxScissords = [];
  reflScissords = [];
  let found = false;
  for (let i = 0; i < particles.length; i++) {
    if (forcedI) {
      i = forcedI;
      found = true;
    }
    const j = i + particles.length / 2;
    for (let k = i + 1; k < j; k++) {
      if (forcedK) {
        if (forcedK < i + 1) {
          forcedK = i + 1;
        }
        if (forcedK >= j) {
          forcedK = i + 1
          forcedI++;
        }
        k = forcedK;
      }
      let A = i;
      let B = j;
      let C = k;
      //console.log(A,C,B);
      const res = getScissords(A, C, B, particles);
      const flip = res.all;
      const a = getPolygonArea(flip);
      if (a > maxA + SCI_TOLERANCE) {
        maxA = a;
        maxI = i;
        maxJ = j;
        maxC = k;
        maxScissords = flip;
        emphScissords = res.emph;
        oldEmphScissords = res.oldEmph;
        reflScissords = res.refl;
        discScissords = res.disc;
        sciA = res.a;
        sciB = res.b;
        sciC = res.c;
        found = true;
      }
      if (forcedK) {
        break;
      }
    }
    if (forcedI) {
      break;
    }
  }  /*
	ctx.beginPath();
	ctx.moveTo(...particles[maxI].location);
	ctx.lineTo(...particles[maxC].location);
	ctx.lineTo(...particles[maxJ].location);
	ctx.stroke();
	*/
  return found;
}
function findHalf(ctx) {
  let maxI = 0;
  let maxJ = 2;
  let maxA = getPolygonArea(particles);
  maxArea = [];
  emphArea = [];
  discArea = [];
  updArea = [];
  let found = false;
  for (let i = 0; i < particles.length; i++) {
    if (forcedI) {
      i = forcedI;
      found = true;
    }
    const j = i + particles.length / 2;
    let A = i;
    let B = j;
    const res = getReflectedHalf(A, B, particles);
    const flip = res.all;
    const emph = res.emph;
    const upd = res.upd;
    const disc = res.disc;
    const a = getPolygonArea(flip);
    if (a > maxA + MIRROR_TOLERANCE) {
      maxA = a;
      maxI = i;
      maxJ = j;
      maxArea = flip;
      emphArea = emph;
      discArea = disc;
      updArea = upd;
      found = true;
    }
    if (forcedI) {
      break;
    }
  }
  return found;
}
function doFlip() {
  anim = 0;
  if (maxFlip.length > 0) {
    HISTORY.push({
      oldVal: procArea(AREA),
      method: 'flip',
      newVal: procArea(getPolygonArea(maxFlip))
    });
    LIVE = null;
    particles = maxFlip;
    segments = [];
    for (let i = 0; i < particles.length; i++) {
      let nextI = i + 1;
      if (nextI == particles.length) {
        nextI = 0;
      }
      segments.push(new Segment(particles[i], particles[nextI], false));
    }
  }
}
function doMirror() {
  anim = 0;
  if (maxArea.length > 0) {
    HISTORY.push({
      oldVal: procArea(AREA),
      method: 'half',
      newVal: procArea(getPolygonArea(maxArea))
    });
    LIVE = null;
    particles = maxArea;
    segments = [];
    for (let i = 0; i < particles.length; i++) {
      let nextI = i + 1;
      if (nextI == particles.length) {
        nextI = 0;
      }
      segments.push(new Segment(particles[i], particles[nextI], false));
    }
  }
}
function doScissords() {
  anim = 0;
  if (maxScissords.length > 0) {
    HISTORY.push({
      oldVal: procArea(AREA),
      method: 'scissords',
      newVal: procArea(getPolygonArea(maxScissords))
    });
    LIVE = null;
    particles = maxScissords;
    segments = [];
    for (let i = 0; i < particles.length; i++) {
      let nextI = i + 1;
      if (nextI == particles.length) {
        nextI = 0;
      }
      segments.push(new Segment(particles[i], particles[nextI], false));
    }
  }
}
let showFlip = false;
let showHalf = false;
let showScissors = false;
function doFlipOver() {
  doOut();
  showFlip = true;
}
function doHalfOver() {
  doOut();
  showHalf = true;
}
function doScissorsOver() {
  doOut();
  showScissors = true;
}
function doOut() {
  showFlip = false;
  showHalf = false;
  showScissors = false;
  anim = 0;
  LIVE = null;
}
let oldMirrorTol = null;
let mirrorTimeout = null;
let scissordsTimeout = null;
function demoAllMirrors() {
  forcedI = 0;
  oldMirrorTol = MIRROR_TOLERANCE;
  MIRROR_TOLERANCE = - 1000000;
  showHalf = true;
  mirrorTimeout = setInterval(function () {
    forcedI++;
    anim = 0;
  }, 100);
}
function stopDemoAllMirrors() {
  forcedI = null;
  MIRROR_TOLERANCE = oldMirrorTol;
  showHalf = false;
  clearTimeout(mirrorTimeout);
  mirrorTimeout = null;
}
function demoAllScissors() {
  forcedI = 0;
  forcedK = 0;
  oldMirrorTol = SCI_TOLERANCE;
  SCI_TOLERANCE = - 1000000;
  showScissors = true;
  anim = - 1;
  scissordsTimeout = setInterval(function () {
    forcedK++;
    anim = - 1;
  }, 40);
}
function stopDemoAllScissors() {
  forcedI = null;
  forcedK = null;
  SCI_TOLERANCE = oldMirrorTol;
  showScissors = false;
  clearTimeout(scissordsTimeout);
  scissordsTimeout = null;
}
let doCountParts = false;
let partCounter = 0;
let frameCounter = 0;
function countParts() {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  for (let i = 7; i < Math.min(particles.length / 2 + 6, partCounter); i++) {
    ctx.beginPath();
    ctx.font = '18px Calibri';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      (i + 1 - 7),
      particles[i].location[0],
      particles[i].location[1] + 0.5
    );
    const j = (i + particles.length / 2) % particles.length
    ctx.fillText(
      (i + 1 - 7),
      particles[j].location[0],
      particles[j].location[1] + 0.5
    );
  }
  frameCounter++;
  if (frameCounter % 2 == 0) {
    partCounter++;
  }
  if (partCounter > particles.length + 15) {
    partCounter = 0;
  }
}
function countPartsOld() {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  for (let i = 0; i < Math.min(particles.length, partCounter); i++) {
    ctx.beginPath();
    ctx.font = '18px Calibri';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((i + 1), particles[i].location[0], particles[i].location[1] + 0.5);
  }
  frameCounter++;
  if (frameCounter % 2 == 0) {
    partCounter++;
  }
  if (partCounter > particles.length + 15) {
    partCounter = 0;
  }
}
function doAllFlips() {
  let i = 1;
  while (findFlip()) {
    doFlip();
    i++;
  }
}
function doAllHalfs() {
  while (findHalf()) {
    doMirror();
  }
}
let minFlipActive = false;
function doMinFlip() {
  findMinFlip();
  doFlip();
}
function findMinFlip(ctx) {
  let maxI = 0;
  let maxJ = 2;
  let current = getPolygonArea(particles);
  let maxA = 20000000; //getPolygonArea(particles);
  maxFlip = [];
  emphFlip = [];
  let found = false;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 2; j < i + 2 + particles.length / 2; j++) {
      let A = i;
      let B = j;
      const flip = getPartsFlip(A, B, particles);
      const all = flip.all;
      const emph = flip.emph;
      const old = flip.old;
      const a = getPolygonArea(all);
      if (a < maxA + FLIP_TOLERANCE && a > current) {
        maxA = a;
        maxI = i;
        maxJ = j;
        maxFlip = all;
        emphFlip = emph;
        oldFlip = old;
        found = true;
      }
    }
  }
  return found;
}
let convexDemoEnabled = false;
function convexDemo(ctx) {
  const i = Math.floor(Math.random() * particles.length)
  let j = i + (
    particles.length / 2 + Math.floor(Math.random() - 0.5) * particles.length / 2
  )
  j = j % particles.length;
  ctx.beginPath();
  ctx.moveTo(...particles[i].location);
  ctx.lineTo(...particles[j].location);
  ctx.setLineDash([5,
  5]);
  ctx.stroke();
  ctx.setLineDash([]);
}
function drawArrow(ctx, from, to, color = 'black') {
  const headlen = 10;
  const arrowWidth = 4;
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(from[0], from[1]);
  ctx.lineTo(to[0], to[1]);
  ctx.lineWidth = arrowWidth;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(to[0], to[1]);
  ctx.lineTo(
    to[0] - headlen * Math.cos(angle - Math.PI / 7),
    to[1] - headlen * Math.sin(angle - Math.PI / 7)
  );
  ctx.lineTo(
    to[0] - headlen * Math.cos(angle + Math.PI / 7),
    to[1] - headlen * Math.sin(angle + Math.PI / 7)
  );
  ctx.lineTo(to[0], to[1]);
  ctx.lineTo(
    to[0] - headlen * Math.cos(angle - Math.PI / 7),
    to[1] - headlen * Math.sin(angle - Math.PI / 7)
  );
  ctx.stroke();
  ctx.restore();
}

