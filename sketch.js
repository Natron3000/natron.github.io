var estado;
var xbolacima, ybolacima;
var xboladir, yboladir;
var xbolaesq, ybolaesq;
var xbolabaixo, ybolabaixo;
var xbolacima2, ybolacima2;
var xbolabaixo2, ybolabaixo2;
var x, y;
var imgchar;
var velobo1, velobo2, velobo3, velobo4, velobo5, velobo6;
var char;
var collideRectCircle = false;
var vida = 3;
var nfase = 0;
//MUSICA NAO PERMITE JOGO CARREGAR
//var sabert;
//var smenu;
//var spre12;
//var sfase;
//var sfasew;
//var spre3;
//var svit;
//var sgover;

function preload(){
  
  imgmenu = loadImage('MENU.png');
  imginstru = loadImage('Instruções2.png');
  imgquadra = loadImage('Quadra.png');
  imgfrente = loadImage('frente.png');
  imgcostas = loadImage('costas.png');
  imgdir = loadImage('direita.png');
  imgesq = loadImage('esquerda.png');
  imgvitoria = loadImage('vitoria.png');
  imgderrota = loadImage('gameover.png');
  imgpause = loadImage('pause.png');
  imgcred = loadImage('creditos.png');
  imgpref1 = loadImage('prefase1.png');
  imgpref2 = loadImage('prefase2.png');
  imgpref3 = loadImage('prefase3.png');
  
  //MUSICA NAO PERMITE JOGO CARREGAR
  //soundFormats('mp3');
  //sabert = loadSound('abertura.mp3');
  //smenu = loadSound('musicamenu.mp3');
  //spre12 = loadSound('prefase12.mp3');
  //sfase = loadSound('fase.mp3');
  //sfasew = loadSound('prefasewin.mp3');
  //spre3 = loadSound('prefase3.mp3');
  //svit = loadSound('vitoria.mp3');
  //sgover = loadSound('gameover.mp3');
}

function setup(){
  createCanvas(400, 400);
  estado = 0;
  
  x = width/2-12;
  y = height/2-25;
  
  velobo1 = 2;
  velobo2 = 2;
  velobo3 = 2;
  velobo4 = 2;
  velobo5 = 2;
  velobo6 = 2;

  xbolacima = random(20, 380);
  ybolacima = 0;
  xboladir = 0;
  yboladir = random(20, 380);
  xbolaesq = 0;
  ybolaesq = random(20, 380);
  xbolabaixo = random(20, 380);
  ybolabaixo = 0;
  xbolacima2 = random(20, 380);
  ybolacima2 = 0;
  xbolabaixo2 = random(20, 380);
  ybolabaixo2 = 0;
  
  char = 1;
  
  corBotaoJogar = color(0);
  corBotaoInstru = color(0);
  corBotaoCred = color(0);
  
  temposemhit = 0;
  tempofase = 0;
  segfase = 60;
  
  //MUSICA NÃO PERMITE JOGO CARREGAR
  //sounds();
  
}

function draw(){
  //MENUS
  if(estado==0){
    menu();
  }
  if(estado==1){
    instruções();
  }
  if(estado==2){
    créditos();
  }
  if(estado==3){
    pause();
  }
  
  //FASES
  if(estado==10){
    prefase1();
  }if(estado==11){
    fase1();
  }
  if(estado==20){
    prefase2();
  }if(estado==21){
    fase2();
  }
  if(estado==30){
    prefase3();
  }if(estado==31){
    fase3();
  }
  
  if(estado==4){
    gameover();
  } 
  if(estado==5){
    vitoria();
  }
}

function menu (){
  image(imgmenu, 0, 0);
    
  fill("#22897E");
  rect(25, 270, 180, 50);
  fill(corBotaoJogar);
  textSize(30);
  text("JOGAR", 63, 305);
  
  if(mouseX>25 && mouseX<205 && mouseY>270 && mouseY<320){
    corBotaoJogar = color("#E90000");
    if(mouseIsPressed){
      estado = 10;
    }
  }
  else{
    corBotaoJogar = color(0)
  }
  
  fill(corBotaoInstru);
  textSize(20);
  text("INSTRUÇÕES", 50, 350);
  
  fill(corBotaoCred);
  textSize(20);
  text("CRÉDITOS", 63, 375)
  
  if(mouseX>45 && mouseX<185 && mouseY>330 && mouseY<353){
    corBotaoInstru = color("#E90000");
    if(mouseIsPressed){
      estado = 1;
    }
  }else{
    corBotaoInstru = color(0);
  }
  
  if(mouseX>45 && mouseX<185 && mouseY>=353 && mouseY<381){
    corBotaoCred = color("#E90000");
    if(mouseIsPressed){
      estado = 2;
    }
  }else{
    corBotaoCred = color(0);
  }
}  

function instruções(){
  image(imginstru, 0, 0);
  
  if(keyIsDown(27)){
    estado = 0;
  }
}

function créditos(){
  image(imgcred,0,0);
  
  if(keyIsDown(27)){
    estado = 0;
  }
}

function prefase1(){
  image(imgpref1,0,0);
  
  if(keyIsDown(13)){
    estado = 11
  }if(keyIsDown(27)){
    estado = 0;
  }
}

function fase1(){
  rect(x,y,25,50)
  image(imgquadra, 0, 0);
  nfase = 10;
  
  temposemhit++;
  tempofase--;

  //POSIÇÃO DO PERSONAGEM
  if(char==1){
    image(imgfrente, x, y);
  }if(char==2){
    image(imgdir, x, y);
  }if(char==3){
    image(imgcostas, x, y);
  }if(char==4){
    image(imgesq, x, y);
  }
  
  fill("#D41111");
  
  //BOLA DE CIMA E COLISÃO COM ELA
  hitbc = collideRectCircle(x, y, 25, 50, xbolacima, ybolacima, 20);
  if(hitbc==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolacima, ybolacima, 20)
  if(ybolacima<=400){
    ybolacima = ybolacima + velobo1;
  }else{
    ybolacima = 0;
    xbolacima = random(20, 380);
    velobo1 = random(2,3);
  }
  
  //BOLA DA DIREITA E COLISÃO COM ELA
  hitbd = collideRectCircle(x, y, 25, 50, xboladir, yboladir, 20);
  if(hitbd==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xboladir, yboladir, 20)
  if(xboladir>=0){
    xboladir = xboladir - velobo2;
  }else{
    xboladir = 400;
    yboladir = random(20, 380);
    velobo2 = random(2,3);
  }
  
  //BOLA DA ESQUERDA E COLISÃO COM ELA
  hitbe = collideRectCircle(x, y, 25, 50, xbolaesq, ybolaesq, 20);
  if(hitbe==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolaesq, ybolaesq, 20)
  if(xbolaesq<=400){
    xbolaesq = xbolaesq + velobo3;
  }else{
    xbolaesq = 0;
    ybolaesq = random(20, 380);
    velobo3 = random(2,3);
  }
  
  //BOLA DE BAIXO E COLISÃO COM ELA
  hitbb = collideRectCircle(x, y, 25, 50, xbolabaixo, ybolabaixo, 20);
  if(hitbb==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolabaixo, ybolabaixo, 20)
  if(ybolabaixo>=0){
    ybolabaixo = ybolabaixo - velobo4;
  }else{
    ybolabaixo = 400;
    xbolabaixo = random(20, 380);
    velobo4 = random(2,3);
  }
  
  //CONTROLE DO PERSONAGEM
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    char = 4;
    if(x>15){
      x = x - 5;
    }
  }
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    char = 2;
    if(x<365){
      x = x + 5;
    }
  }
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    char = 3;
    if(y>-30){
      y = y - 5;
    }
  }
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    char = 1;
    if(y<330){
      y = y + 5;
    }
  }
  
  fill(50);
  rect(280, 30, 80, 25);
  rect(40, 30, 100, 25)
  fill(255);
  textSize(20);
  text("Vidas: "+vida, 285, 50);
  text("Tempo: "+segfase, 44, 50);
  
  if(tempofase%60==0){
    segfase--;
  }
  
  if(segfase==0){
    estado = 20;
  }
  
  if(vida<=0){
    estado = 4;
  }
  
  if(keyIsDown(27)){
    estado = 0;
  }
}

function prefase2(){
  image(imgpref2,0,0);
  
  vida = 3;
  
  xbolacima = random(20, 380);
  ybolacima = 0;
  xboladir = 0;
  yboladir = random(20, 380);
  xbolaesq = 0;
  ybolaesq = random(20, 380);
  xbolabaixo = random(20, 380);
  ybolabaixo = 0;
  
  x = width/2-12;
  y = height/2-25;
  
  temposemhit = 0;
  tempofase = 0;
  segfase = 60;
  
  if(keyIsDown(13)){
    estado = 21
  }if(keyIsDown(27)){
    estado = 0;
  }
}

function fase2(){
  rect(x,y,25,50)
  image(imgquadra, 0, 0);
  nfase = 21;
  
  temposemhit++;
  tempofase--;

  //POSIÇÃO DO PERSONAGEM
  if(char==1){
    image(imgfrente, x, y);
  }if(char==2){
    image(imgdir, x, y);
  }if(char==3){
    image(imgcostas, x, y);
  }if(char==4){
    image(imgesq, x, y);
  }
  if(temposemhit<100 && temposemhit%5==0){
    
  }
  
  fill("#D41111");
  
  //BOLA DE CIMA E COLISÃO COM ELA
  hitbc = collideRectCircle(x, y, 25, 50, xbolacima, ybolacima, 20);
  if(hitbc==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolacima, ybolacima, 20)
  if(ybolacima<=400){
    ybolacima = ybolacima + velobo1;
  }else{
    ybolacima = 0;
    xbolacima = random(20, 380);
    velobo1 = random(2,5);
  }
  
  
  //BOLA DA DIREITA E COLISÃO COM ELA
  hitbd = collideRectCircle(x, y, 25, 50, xboladir, yboladir, 20);
  if(hitbd==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xboladir, yboladir, 20)
  if(xboladir>=0){
    xboladir = xboladir - velobo2;
  }else{
    xboladir = 400;
    yboladir = random(20, 380);
    velobo2 = random(2,5);
  }
  
  //BOLA DA ESQUERDA E COLISÃO COM ELA
  hitbe = collideRectCircle(x, y, 25, 50, xbolaesq, ybolaesq, 20);
  if(hitbe==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolaesq, ybolaesq, 20)
  if(xbolaesq<=400){
    xbolaesq = xbolaesq + velobo3;
  }else{
    xbolaesq = 0;
    ybolaesq = random(20, 380);
    velobo3 = random(2,5);
  }
  
  //BOLA DE BAIXO E COLISÃO COM ELA
  hitbb = collideRectCircle(x, y, 25, 50, xbolabaixo, ybolabaixo, 20);
  if(hitbb==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolabaixo, ybolabaixo, 20)
  if(ybolabaixo>=0){
    ybolabaixo = ybolabaixo - velobo4;
  }else{
    ybolabaixo = 400;
    xbolabaixo = random(20, 380);
    velobo4 = random(2,5);
  }
  
  //CONTROLE DO PERSONAGEM
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    char = 4;
    if(x>15){
      x = x - 5;
    }
  }
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    char = 2;
    if(x<365){
      x = x + 5;
    }
  }
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    char = 3;
    if(y>-30){
      y = y - 5;
    }
  }
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    char = 1;
    if(y<330){
      y = y + 5;
    }
  }
  
  fill(50);
  rect(280, 30, 80, 25);
  rect(40, 30, 100, 25)
  fill(255);
  textSize(20);
  text("Vidas: "+vida, 285, 50);
  text("Tempo: "+segfase, 44, 50);
  
  if(tempofase%60==0){
    segfase--;
  }
  
  if(segfase==0){
    estado = 30;
  }
  
  if(vida<=0){
    estado = 4;
  }
  
  if(keyIsDown(27)){
    estado = 0;
  }
}

function prefase3(){
  image(imgpref3,0,0);
  
  vida = 3;
  
  xbolacima = random(20, 380);
  ybolacima = 0;
  xboladir = 0;
  yboladir = random(20, 380);
  xbolaesq = 0;
  ybolaesq = random(20, 380);
  xbolabaixo = random(20, 380);
  ybolabaixo = 0;
  
  x = width/2-12;
  y = height/2-25;
  
  temposemhit = 0;
  tempofase = 0;
  segfase = 60;
  
  if(keyIsDown(13)){
    estado = 31
  }if(keyIsDown(27)){
    estado = 0;
  }
}

function fase3(){
  rect(x,y,25,50)
  image(imgquadra, 0, 0);
  nfase = 21;
  
  temposemhit++;
  tempofase--;

  //POSIÇÃO DO PERSONAGEM
  if(char==1){
    image(imgfrente, x, y);
  }if(char==2){
    image(imgdir, x, y);
  }if(char==3){
    image(imgcostas, x, y);
  }if(char==4){
    image(imgesq, x, y);
  }
  if(temposemhit<100 && temposemhit%5==0){
    
  }
  
  fill("#D41111");
  
  //BOLA DE CIMA E COLISÃO COM ELA
  hitbc = collideRectCircle(x, y, 25, 50, xbolacima, ybolacima, 20);
  if(hitbc==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolacima, ybolacima, 20)
  if(ybolacima<=400){
    ybolacima = ybolacima + velobo1;
  }else{
    ybolacima = 0;
    xbolacima = random(20, 380);
    velobo1 = random(2,4);
  }
  
  
  //BOLA DA DIREITA E COLISÃO COM ELA
  hitbd = collideRectCircle(x, y, 25, 50, xboladir, yboladir, 20);
  if(hitbd==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xboladir, yboladir, 20)
  if(xboladir>=0){
    xboladir = xboladir - velobo2;
  }else{
    xboladir = 400;
    yboladir = random(20, 380);
    velobo2 = random(2,4);
  }
  
  //BOLA DA ESQUERDA E COLISÃO COM ELA
  hitbe = collideRectCircle(x, y, 25, 50, xbolaesq, ybolaesq, 20);
  if(hitbe==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolaesq, ybolaesq, 20)
  if(xbolaesq<=400){
    xbolaesq = xbolaesq + velobo3;
  }else{
    xbolaesq = 0;
    ybolaesq = random(20, 380);
    velobo3 = random(2,4);
  }
  
  //BOLA DE BAIXO E COLISÃO COM ELA
  hitbb = collideRectCircle(x, y, 25, 50, xbolabaixo, ybolabaixo, 20);
  if(hitbb==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolabaixo, ybolabaixo, 20)
  if(ybolabaixo>=0){
    ybolabaixo = ybolabaixo - velobo4;
  }else{
    ybolabaixo = 400;
    xbolabaixo = random(20, 380);
    velobo4 = random(2,4);
  }
  
  //BOLA DE CIMA2 E COLISÃO COM ELA
  hitbc2 = collideRectCircle(x, y, 25, 50, xbolacima2, ybolacima2, 20);
  if(hitbc2==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolacima2, ybolacima2, 20)
  if(ybolacima2<=400){
    ybolacima2 = ybolacima2 + velobo5;
  }else{
    ybolacima2 = 0;
    xbolacima2 = random(20, 380);
    velobo5 = random(2,4);
  }
  
  //BOLA DE BAIXO2 E COLISÃO COM ELA
  hitbb2 = collideRectCircle(x, y, 25, 50, xbolabaixo2, ybolabaixo2, 20);
  if(hitbb2==true && temposemhit>100){
    vida--;
    temposemhit = 0;
  }
  circle(xbolabaixo2, ybolabaixo2, 20)
  if(ybolabaixo2>=0){
    ybolabaixo2 = ybolabaixo2 - velobo6;
  }else{
    ybolabaixo2 = 400;
    xbolabaixo2 = random(20, 380);
    velobo6 = random(2,4);
  }
  
  //CONTROLE DO PERSONAGEM
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    char = 4;
    if(x>15){
      x = x - 5;
    }
  }
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    char = 2;
    if(x<365){
      x = x + 5;
    }
  }
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    char = 3;
    if(y>-30){
      y = y - 5;
    }
  }
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    char = 1;
    if(y<330){
      y = y + 5;
    }
  }
  
  fill(50);
  rect(280, 30, 80, 25);
  rect(40, 30, 100, 25)
  fill(255);
  textSize(20);
  text("Vidas: "+vida, 285, 50);
  text("Tempo: "+segfase, 44, 50);
  
  if(tempofase%60==0){
    segfase--;
  }
  
  if(segfase==0){
    estado = 5;
  }
  
  if(vida<=0){
    estado = 4;
  }
  
  if(keyIsDown(27)){
    estado = 0;
  }
}

function gameover(){
  image(imgderrota,0,0);
  
  vida = 3;
  
  xbolacima = random(20, 380);
  ybolacima = 0;
  xboladir = 0;
  yboladir = random(20, 380);
  xbolaesq = 0;
  ybolaesq = random(20, 380);
  xbolabaixo = random(20, 380);
  ybolabaixo = 0;
  
  x = width/2-12;
  y = height/2-25;
  
  temposemhit = 0;
  tempofase = 0;
  segfase = 60;
  
  if(keyIsDown(32)){
    estado = nfase;
  }
  if(keyIsDown(27)){
    estado = 0;
  }
}

function vitoria(){
  image(imgvitoria, 0, 0);
  
  vida = 3;
  
  xbolacima = random(20, 380);
  ybolacima = 0;
  xboladir = 0;
  yboladir = random(20, 380);
  xbolaesq = 0;
  ybolaesq = random(20, 380);
  xbolabaixo = random(20, 380);
  ybolabaixo = 0;
  
  x = width/2-12;
  y = height/2-25;
  
  temposemhit = 0;
  tempofase = 0;
  segfase = 60;
  
  if(keyIsDown(27)){
    estado = 0;
  }
}

//function sounds(){
//MUSICA NAO PERMITE JOGO CARREGAR
//}