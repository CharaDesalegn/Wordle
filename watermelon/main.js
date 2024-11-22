const canvas = document.getElementById("my_canvas")
const merge  = document.getElementById("merge")
const music  = document.getElementById("music")

const width = 500
const height = 600
canvas.width = width
canvas.height = height
canvas.style.backgroundColor = "black"
const move_speed = 1
const context = canvas.getContext("2d")
const radis  = [20,30,40]

let levelColors = [
    "#FF0000",  // Red
    "#00FF00",  // Lime Green
    "#0000FF",  // Blue
    "#FFFF00",  // Yellow
    "#FF00FF",  // Magenta
    "#00FFFF",  // Cyan
    "#FFA500",  // Orange
    "#800080",  // Purple
    "#008000",  // Green
    "#000080",  // Navy
    "#FFC0CB",  // Pink
    "#FFD700",  // Gold
    "#00CED1",  // Dark Turquoise
    "#8B0000",  // Dark Red
    "#4B0082"   // Indigo
];
class Cirle{
    constructor(x,y,r){
        this.x = x
        this.y = y
        this.r = r
        this.color = "purple"
        this.follow = true
        this.draw()
        
    }
    draw(){
        this.color = color_seter(this.r)

        context.beginPath()
        context.arc(this.x,this.y,this.r,0,2*Math.PI)
        context.fillStyle = this.color
        context.fill()
    }
    
}
// const c = new Cirle(100,100,100)
// const c2 = new Cirle(120,120,100)
let cs = []
for(let i = 0;i<5;i++){
    const b = new Cirle(rand(),rand(),radis[Math.floor(Math.random()*radis.length)])
    cs.push(b)
}



function rand(){
    return Math.floor(Math.random()*width)
}



function fps(){
    context.clearRect(0,0,width,height)

   for(let c of cs){
        for(let c2 of cs){if(c!=c2){
            if(c2.y<height){
                c2.y+=0.02
            }
            if(c2.follow==true){
                c2.y+=1
            }
            if(Math.sqrt(Math.pow(c2.y-c.y,2)+Math.pow(c2.x-c.x,2)) < c.r+c2.r){
                if(c2.follow){
                    c2.follow = false
                }
                if(c.r == c2.r){
                    c.r = c.r +10
                    merge.play()
                    for(let m = 0;m<cs.length;m++){if(cs[m]==c2){cs.splice(m,1)}}
                }else{
                
                    let unit_vector = unitVector(c,c2)
                    if(unit_vector.x){
                        c2.x+=unit_vector.x
                    }
                    if(unit_vector.y){
                        c2.y+=unit_vector.y-0.4
                    }
            }
            }

            c2.draw()

        }

            
    }
    walls_checker()
   }
      
    // requestAnimationFrame(fps)
    
}



fps()


function unitVector(point1, point2) {
    let xComponent = point2.x - point1.x;
    let yComponent = point2.y - point1.y;
    let magnitude = Math.sqrt(xComponent * xComponent + yComponent * yComponent);
    let unitX = xComponent / point2.r/2;
    let unitY = yComponent / point2.r/2;
    return { x: unitX, y: unitY };
}
function walls_checker(){
    for(let c of cs){
        if(c.x > width - c.r){
            c.x-=move_speed
        }else if(c.x < 0 + c.r){
            c.x+=move_speed
        }
        if(c.y > height - c.r){
            c.y-=move_speed
        }else if(c.y < 0 + c.r){
            c.y+=move_speed
        }
    }
}
function color_seter(r){
    return levelColors[(r/10)-2]
}
let follower = new Cirle(rand,30,radis[Math.floor(Math.random()*radis.length)])

function fps_for_follower(){
    follower.draw()

}
addEventListener("mousemove",(event)=>{
    follower.x = event.offsetX
    // h.y = event.offsetY
    

})
addEventListener("click",()=>{
    
    cs.push(follower)
    follower = new Cirle(rand,30,radis[Math.floor(Math.random()*radis.length)])
    follower.draw()
})

setInterval(() => {
    fps()
    fps_for_follower()
}, 10);

setTimeout(4000,()=>{
    music.play()
})
