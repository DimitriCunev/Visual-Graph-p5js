
function setup(){
    createCanvas(windowWidth,windowHeight)
    textAlign(CENTER, CENTER)
    rectMode(CENTER)
    addObject({name:'C',x:-200,y:0})
    addObject({name:'C',x:-100,y:0})
    addObject({name:'C',x:0,y:0})
    addObject({name:'C',x:100,y:0})
    addObject({name:'C',x:0,y:100})
    addObject({name:'C',x:100,y:100})
    addObject({name:'C',x:200,y:100})
    addObject({name:'C',x:100,y:200})
    tie(0,1);tie(1,2);tie(2,3);tie(2,4);tie(3,5);tie(5,6);tie(5,7)
    // tie(0,1)
    resetButtons()
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
    resetButtons()
}


function resetButtons(){
    buttons = []
    buttons.push(new button({txt:'C',x:60,y:height-50,w:90,h:90,onclick:()=>{currentTool = 4;resetButtons();}}))
    buttons.push(new button({txt:'O',x:120,y:height-50,w:90,h:90,onclick:()=>{currentTool = 5;resetButtons();}}))
    buttons.push(new button({txt:'Trage',x:430,y:height-50,w:140,h:90,onclick:()=>{currentTool = 0;resetButtons();}}))
    buttons.push(new button({txt:'Leg 1',x:190,y:height-50,w:140,h:90,onclick:()=>{currentTool = 1;resetButtons();}}))
    buttons.push(new button({txt:'Leg 2',x:270,y:height-50,w:140,h:90,onclick:()=>{console.log('3');resetButtons();}}))
    buttons.push(new button({txt:'Leg 3',x:350,y:height-50,w:140,h:90,onclick:()=>{console.log('3');resetButtons();}}))
    buttons.push(new button({txt:'Sterge',x:510,y:height-50,w:140,h:90,onclick:()=>{currentTool = -2;resetButtons();}}))
    buttons.push(new button({txt:'All',x:590,y:height-50,w:140,h:90,onclick:()=>{objects = [];resetButtons();}}))
    buttons.push(new button({txt:'Caten',x:670,y:height-50,w:140,h:90,onclick:()=>{getLargest()}}))
    objects.forEach((e)=>{
        e.fcolor = '#e74c3c';
    })
}

function draw(){
    background(255)
    push()
    scale(graphScale,graphScale)
        vCamx += ((camx+width/(2*graphScale))-vCamx)/3
        vCamy += ((camy+height/(2*graphScale))-vCamy)/3
        
        translate(vCamx,vCamy)
        drawgrid()
        stroke(0)
        if(mtie.state){
            line(objects[mtie.first].x,objects[mtie.first].y,mouseX-vCamx,mouseY-vCamy)
        }
        objects.forEach((e)=>{
            e.drawTies()
        })
        objects.forEach((e,i)=>{
            e.display()
            e.update()
        })

        
    pop()
    drawHelpers()
    checkKeys()
    strokeWeight(4)
    stroke(0);
    fill(255);
    buttons.forEach((e)=>{
        e.display()
    })
    strokeWeight(1)
    
}
function mouseWheel(event){

}
