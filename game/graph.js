let camx=0 ,camy=0
let vCamx=0,vCamy=0
let graphSize = 5000
let graphScale = 1
let currentTool = 0
let mtie = {state:false,first:-1,second:-1}

function drawHelpers(){
    fill(0)
    textSize(15)
    textAlign(LEFT, TOP)
    text(round(frameRate()),20,20)
    text('Chemistry Jam',20,40)
    text('Cunev Dmitri Sergeyevich',20,57)
    
    textSize(20)
    text(currentFormula,40,height-120)
    textAlign(CENTER, CENTER)
}
function drawgrid(){
    let sepGrid = 20
    stroke('rgba(0,0,0,0.3)')
    for (let i = 0; i < graphSize/sepGrid; i++) {
        line(i*sepGrid-graphSize/2,-graphSize/2,i*sepGrid-graphSize/2,height+graphSize/2)
        line(-graphSize/2,i*sepGrid-graphSize/2,width+graphSize/2,i*sepGrid-graphSize/2)
    }
    strokeWeight(3)
    line(-graphSize/2,0,graphSize/2,0)
    line(0,-graphSize/2,0,graphSize/2)
}

function moveCamera(dx,dy){
    camx+=dx;
    camy+=dy;
}

let objects = []

function addObject(data){
    objects.push(new object(data))
}

class object {
    constructor(data){
        data.x ? this.x = data.x : this.x = 0
        data.y ? this.y = data.y : this.y = 0
        data.type ? this.type = data.type : this.type = 'none'
        data.clickable ? this.clickable = data.clickable : this.clickable = true
        data.dragable ? this.dragable = data.dragable : this.dragable = true;
        data.name ? this.name = data.name : this.name = 'C'
        data.size ? this.size = data.size : this.size = 35;
        this.ties = []
        this.dties = []
        this.vx = this.x,this.vy = this.y;this.drx = 0;this.dry = 0;
        this.mouseOver = false;
        this.indrag = false;
        this.fcolor = '#e74c3c'
        this.active = true;
        this.used = false;
        
    }
    display(){
        if(this.active){
            fill('#25CCF7')
            let cAmount = 4-constrain(this.ties.length,0,4)
            if(this.name == 'C'){
                for(let i = 0 ;i < cAmount;i++){
                    circle(this.x+(this.size/1.5)*cosa((360/cAmount)*i),this.y+(this.size/1.5)*sina((360/cAmount)*i),this.size/2)
                }
                
            }
            fill(this.fcolor)
            circle(this.x,this.y,this.size)
            
            
            fill(255)
            text(this.name,this.x,this.y)
        }
        

        
    }
    drawTies(){
        if(this.active){
            this.ties.forEach((e,i)=>{
                if(objects[e].active){
                    line(this.x,this.y,objects[e].x,objects[e].y)
                } else {
                    this.ties.splice(i,1);
                }
                
            })
        }
        
    }
    update(){
        let vCamxm = camx+width/2
        let vCamym = camy+height/2
        let mousevX = mouseX-vCamxm;
        let mousevY = mouseY-vCamym;
        let interpolationValue=1
        this.vx += (this.x-this.vx)/interpolationValue;this.vy += (this.y-this.vy)/interpolationValue;
        this.mouseOver = this.clickable&&distance(mousevX,mousevY,this.x,this.y)<this.size/2;
        if(this.indrag){
            this.x = mousevX+this.drx
            this.y = mousevY+this.dry
        }
    }
}
function tie(ia,ib){
    let acceptable = true;
    for (let i = 0; i < objects[ia].ties.length; i++) {
        if(objects[ia].ties[i]==ib){acceptable = false;}
    }
    if (4-objects[ia].ties.length<=0||4-objects[ib].ties.length<=0){acceptable = false}
    if(ia == ib ){acceptable = false}
    if (!objects[ia].active||!objects[ib].active){this.acceptable = false}
    if(acceptable){
        objects[ia].ties.push(ib);
        objects[ib].ties.push(ia);
    }
    
}

let buttons = []
class button {
    constructor(data){
        this.x = data.x
        this.y = data.y
        this.w = data.w
        this.h = data.h
        this.txt = data.txt
        this.onclick = data.onclick
        this.mouseOver = false;
    }
    display(){
        this.mouseOver = mouseX>this.x-this.w/4&&mouseX<this.x+this.w/4&&mouseY>this.y-this.h/4&&mouseY<this.y+this.h/4
        
        if(this.mouseOver) {rect(this.x,this.y,this.w/2-2,this.h/2-2,6)} else {rect(this.x,this.y,this.w/2,this.h/2,6)}
        text(this.txt,this.x,this.y)
    }
}

let cathenes = []
let mainCathene = []
let currentFormula = ''
let catheneType = 'an'
function drawCathene(){
    
    objects.forEach((e)=>{
        e.fcolor = '#e74c3c'
    })
    mainCathene.forEach((e,i)=>{
        if (i==0){
            objects[e].fcolor = 100
        } else {
            objects[e].fcolor = 0
        }
        
    })
    
}
function getLargest(){
    cathenes = []
    resetButtons();
        
    let minTied = []
    
    //find edges
    objects.forEach((e,i)=>{
        if (e.ties.length == 1){
            minTied.push(i)
        }
    })

    //get all cathenes
    minTied.forEach((e)=>{
        analyze(e,0,[])
        objects.forEach((e)=>{
            e.used = false;
        })
    })
     
    //sort biggest ones
    let maxCath = 0;
    let lcathenes = []
    cathenes.forEach((e)=>{
        if (e.length>maxCath){maxCath = e.length}
    })
    cathenes.forEach((e)=>{
        if(e.length == maxCath){
            lcathenes.push(e)
        }
    })
    console.log(lcathenes);
    buttons.push(new button({txt:'Reset',x:60,y:100,w:90,h:90,onclick:()=>{
    resetButtons();
    lcathenes = []
    mainCathene = []
    cathenes = []
    }}))
    lcathenes.forEach((e,i)=>{
        buttons.push(new button({txt:i,x:60,y:170+i*50,w:90,h:90,onclick:()=>{mainCathene = e;drawCathene();}}))
    })
    
    
    
}
function analyze(bi,index,ord){
    ord.push(bi)
    index+=1;
    if(index>40){console.log('Stopped');return "CallStacked"}
    objects[bi].used = true;
    let obj = objects[bi]
   
    // console.log(obj)
    let found = false;
    obj.ties.forEach((e)=>{
        if (!objects[e].used){
            //fucking javascript reference
            analyze(e,index,ord.join(':').split(':'))
            
            found = true;
        }
    })
    
    if(!found){
        for (let i = 0; i < ord.length; i++) {
            ord[i] = parseInt(ord[i])
            
        }
        cathenes.push(ord)
    }
    
}