// val.pageX, val.pageY:
//      absolute coordinate of clicked point from upper left of viewport  (including scrolled amount)

// val.target.getBoundingClientRect().top :
//      distance between top of element and top of viewport (not including scrolled amount)

//window.pageYOffset, window.pageXOffset : scrolled amount

"use strict";

$(document).ready(function(){

// variables coming from another js file
// changeRatio, mass

const gravityDiv = $(".gravity")
const container = $(".containerEarth")
const sate = $("#sate")
const time = $(".time")
const velocity = $(".velo")
const initAltDiv = $(".initAlt")
const point = $(".point")
const arrowDown = $(".arrowDown")
const sateInfo = $(".sateInfoUpper, .sateInfoLower")
const launchArrow = $(".launchArrow")
const inputVelo = $('input[name="velo"]')
const inputAlt = $('input[name="alt"]')
const launchBtn = $(".launchSate")
const ovsRange = $(".observation")
const abort = $(".abort")

const center_x = window.innerWidth/2;//center coordinate of earth 350+110
const center_y =  window.innerHeight/2;//center coordinate of earth 150+110
const size = sate.css("width").split("px")[0];//satelite size(px)

const G=6.67;//*10^-11

const historyCV = document.querySelector(".history");
historyCV.width = window.innerWidth;
historyCV.height = window.innerHeight;
const drawPath = historyCV.getContext("2d");

let history=[];
let Intvl
let velo
let ini_alt
let radi
// let px

//////////////////////////////////////////////////////////////////
///////////////////////////  Onclick  ///////////////////////////
//////////////////////////////////////////////////////////////////
$(".launchSate").click(()=>{
        
    velo=inputVelo.val()
    ini_alt=inputAlt.val()
    
    if(ini_alt/2 && ini_alt>0 && (velo/2 || velo==0)){
        inputVelo.attr("disabled",true)
        inputAlt.attr("disabled",true)
        launchBtn.attr("disabled",true)
        ovsRange.attr("disabled",true)
        abort.attr("disabled",false)

        sateInfo.css("visibility","hidden")
        launchArrow.css("display", "none")
        arrowDown.css("top","-65px")
        console.log("Launch")
        
        let current_x;//initial position_x
        let current_y;//initial position_y

        let prev_x;
        let prev_y;
        
        let d_x;
        let d_y;
        let i=0;//counter
        
        let time_m;//i=30
        let time_h;
        let hour;
        let time_day;
    
        let dis_pre;//distance between center of earth and satellite in px
        let dis;//distance between center of earth and satellite
        
        let alt;//d
        
        let gravity;
        let approach;//aproach distance in one minute by gravity
        let revision;
        
        radi = container.css("width").split("px")[0]/2;//radius(px)
        
        //////////////////////////////////////////////////////////////////
        /////////////////////  Function declaration  /////////////////////
        //////////////////////////////////////////////////////////////////
        
        function calclation(){
            
            if(i==0){
                velocity.text(parseInt(velo).toLocaleString());
                initAltDiv.text(parseInt(ini_alt).toLocaleString());
                
                const alt_px=ini_alt/px;// Initial altitude in px
        
                current_x=center_x;//initial position_x
                current_y=center_y-radi-alt_px;//initial position_y
        
                //Initial position of satelite
                sate.offset({top: current_y-size/2, left: current_x-size/2});
        
                const x=velo/1000;//km/s
                // const y=0;//km/s
                const move=(x*60)/px;//px
                prev_x=current_x-move;
                // let prev_y=current_y-y;
                prev_y=current_y;
                history[0]=[current_x,current_y];
            }
    
            i+=1;
        
            time_m=i%60;
            time_h=Math.floor(i/60);
        
            hour=time_h%24;
            time_day=Math.floor(time_h/24);
    
            if(!time_h){
                time.text(`${time_m} min`);
                time.css("marginLeft","110px")
            }else if(!time_day && time_h){
                time.text(`${time_h} hr ${time_m} min`);
                time.css("marginLeft","85px")
        
            }else{
                time.text(`${time_day} day ${hour} hr ${time_m} min`);
                time.css("marginLeft","55px")
            }
        
            // $("#i").text(`i=${i}`);
        
            //storing current position tempolarily
            d_x=current_x;
            d_y=current_y;
        
            //calculate next position
            current_x=2*current_x-prev_x;
            current_y=2*current_y-prev_y;
        
            prev_x=d_x;
            prev_y=d_y;
        
            dis_pre=Math.sqrt((current_x-center_x)**2+(current_y-center_y)**2);//distance between center of earth and satellite in px
            dis=dis_pre*px;//km
            alt=dis-px*radi;//distance between surface of earth and satellite in km
        
            ///////////// Revision /////////////
        
            gravity=mass*G/((10**17)*(dis**2));
            //gravityDiv.html(`Garvtity Acceleration:${gravity.toFixed(1)}m/s<sup>2</sup>`);
        
            approach=gravity*60;//aproach distance in one minute by gravity
            revision=approach/(dis*(10**3));
        
            // current_x=current_x-(current_x-center_x)*revision;
            // current_y=current_y+(center_y-current_y)*revision;
            //Do equations above cover all equations bellow??
            if(current_x>=center_x && current_y<=center_y){
                current_x=current_x-Math.abs(current_x-center_x)*revision;
                current_y=current_y+Math.abs(center_y-current_y)*revision;
        
            }else if(current_x>=center_x && current_y>=center_y){
                current_x=current_x-Math.abs(current_x-center_x)*revision;
                current_y=current_y-Math.abs(center_y-current_y)*revision;
        
            }else if(current_x<=center_x && current_y>=center_y){
                current_x=current_x+Math.abs(current_x-center_x)*revision;
                current_y=current_y-Math.abs(center_y-current_y)*revision;
        
            }else if(current_x<=center_x && current_y<=center_y){
                current_x=current_x+Math.abs(current_x-center_x)*revision;
                current_y=current_y+Math.abs(center_y-current_y)*revision;
            }
        
            dis_pre=Math.sqrt((current_x-center_x)**2+(current_y-center_y)**2);//distance between center of earth and satellite in px
            dis=dis_pre*px;//km
            alt=dis-px*radi;//distance between surface of earth and satellite in km
        
            gravity=mass*G/((10**17)*(dis**2));
            // console.log("G",gravity)
            gravityDiv.text(gravity.toFixed(2));
        
            point.css("top",70-alt/10000*70+"px")
        
            $("#sate").offset({top:current_y-size/2,left:current_x-size/2});
        
            
            // $(".alt").text(alt.toFixed(1));
            $(".alt").text(parseInt(alt).toLocaleString());

            history[i]=[current_x,current_y];
            
            if(i%8==0){
            
                drawPath.beginPath();
                drawPath.moveTo(history[i-1][0], history[i-1][1]);
                drawPath.lineTo(history[i][0], history[i][1]);
                drawPath.lineWidth=0.5;
                drawPath.strokeStyle="white";
                drawPath.closePath();
                drawPath.stroke();
            }


            
            if(current_x<0 || current_x>window.innerWidth || current_y<0 || current_y>window.innerHeight){

                alert("Done1")
                clearInterval(Intvl)
                Reset()
                $(".alt").text("")
                time.text("")
            }

            if(dis<=px*radi){

                $(".alt").text(0);
                clearInterval(Intvl)
                
                setTimeout(()=>{
                    
                    alert("Done2")
                    $(".alt").text("")
                    time.text("")
                    Reset()
                },50)
            }
        }//End of function declaration
        
        // Execution
        Intvl=setInterval(calclation,10);

    }else{
        alert("Please enter parameters correctly.")
    }
    
})// End of onclick

const Reset=()=>{
    
    sate.offset({top: center_y-radi-ini_alt/px-size/2, left: center_x-size/2});
    drawPath.clearRect(0, 0, historyCV.width, historyCV.height);
    arrowDown.css("top","0")
    abort.attr("disabled",true)
    sateInfo.css("visibility","visible")
    launchArrow.css("display", "flex")
    launchBtn.attr("disabled",false)
    inputVelo.attr("disabled",false)
    inputAlt.attr("disabled",false)
    ovsRange.attr("disabled",false)
    console.log("sateOffSet",+sate.css("top").split("px")[0])
}

$(".abort").click(()=>{
    clearInterval(Intvl)
    Reset()
    alert("Aborted")

})

});