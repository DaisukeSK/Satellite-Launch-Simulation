// val.pageX, val.pageY:
//      absolute coordinate of clicked point from upper left of viewport  (including scrolled amount)

// val.target.getBoundingClientRect().top :
//      distance between top of element and top of viewport (not including scrolled amount)

//window.pageYOffset, window.pageXOffset : scrolled amount

"use strict";

import { mass, px } from "./main.js"

$(document).ready(function(){
    
// variables coming from another js file
// mass, px

const gravitySpan = $(".gravity")
const planetContainer = $(".planetContainer")
const satellite = $("#satellite")
const time = $(".time")
const initVelo = $(".initVelo")
const initAlt = $(".initAlt")
const point = $(".point")//????
const arrowDown = $(".arrowDown")
const arrowUp = $(".arrowUp")
const sateInfo = $(".sateInfoUpper, .sateInfoLower")
const launchDirectionImg = $(".launchDirectionImg")
const showInitParams = $(".showInitParams")
const inputVelo = $('input[name="velo"]')
const inputAlt = $('input[name="alt"]')
const launchBtn = $(".launchBtn")
const ovsRange = $(".observation")
const abortBtn = $(".abortBtn")
const question = $(".questionSymbolHolder")

const altSpan=$(".alt")

const center_x = window.innerWidth/2;//center coordinate of earth 350+110
const center_y =  window.innerHeight/2;//center coordinate of earth 150+110
const size = satellite.css("width").split("px")[0];//satelite size(px)
const radius = $(".planetContainer").css("width").split("px")[0]/2;//radius(px)

const G=6.67;//*10^-11

const historyCV = document.querySelector(".history"); //$(selector) doesn't work
historyCV.width = window.innerWidth;
historyCV.height = window.innerHeight;
const drawPath = historyCV.getContext("2d");

let history=[];
let launch
let ini_velo
let ini_alt
// let px
console.log("mass",mass)
//////////////////////////////////////////////////////////////////
///////////////////////////  Onclick  ///////////////////////////
//////////////////////////////////////////////////////////////////
launchBtn.click(()=>{
    console.log("mass",mass)
    ini_velo=inputVelo.val()
    ini_alt=inputAlt.val()
    
console.log("Input:",ini_velo)

// if(ini_alt/2 && ini_alt>0 && (ini_velo/2 || ini_velo==0)){
    if(!ini_alt/2 || !ini_velo/2 || ini_alt<=0){

        alert("Please enter parameters correctly.")

    }else{

        satellite.css("transitionProperty","none")
        inputVelo.attr("disabled",true)
        inputAlt.attr("disabled",true)
        launchBtn.attr("disabled",true)
        // ovsRange.attr("disabled",true)
        abortBtn.attr("disabled",false)

        // sateInfo.css("visibility","hidden")
        launchDirectionImg.css("display", "none")
        showInitParams.css("display", "none")

        arrowDown.css("top","-60px")
        arrowUp.css("top","-60px")


        console.log("Launch")

        question.css("left","-50px")

        // Keep variables below inside onclick function to initialize them everytime launch button is clicked
        
        // let current_x;//initial position_x
        // let current_y;//initial position_y

        // let prev_x;
        // let prev_y;
        
        
        let d_x;//storing current position tempolarily
        let d_y;//storing current position tempolarily
        let i=0;//counter
        
        let time_m;//i=30
        let time_h;
        let hour;
        let time_day;
    
        let dis_pre;//distance between center of earth and satellite in px
        let dis;//distance between center of earth and satellite
        
        let alt;
        
        let gravity;
        let approach;//aproach distance in one minute by gravity
        let revision;
        


        ////////// Moved below from if part inside setInterval //////////
        // $(".initVelo").text(parseInt(ini_velo).toLocaleString());
        // $(".initAlt").text(parseInt(ini_alt).toLocaleString());
        
        const alt_px=ini_alt/px;// Initial altitude in px

        let current_x=center_x;//initial position_x
        let current_y=center_y-radius-alt_px;//initial position_y

        //Initial position of satelite
        satellite.offset({top: current_y-size/2, left: current_x-size/2});

        const x=ini_velo/1000;//km/s
        // const y=0;//km/s
        const move=(x*60)/px;//px
        let prev_x=current_x-move;
        // let prev_y=current_y-y;
        let prev_y=current_y;
        history[0]=[current_x,current_y];
        
        // Execution
        launch=setInterval(()=>{

                if(i==0){
                }
        
                i+=1;
            
                time_m=String(i%60).padStart(2,"0");
                time_h=Math.floor(i/60);
            
                hour=time_h%24;
                time_day=Math.floor(time_h/24);
        
                if(!time_h){
                    time.text(`${time_m} min`);
                    // time.text(`${time_m} min`);
                    // time.css("marginLeft","100px")
                }else if(!time_day && time_h){
                    time.text(`${hour} hr ${time_m} min`);
                    // time.css("marginLeft","75px")
            
                }else{
                    time.text(`${time_day} day ${hour} hr ${time_m} min`);
                    // time.css("marginLeft","45px")
                }
            
                // $("#i").text(`i=${i}`);
            
                d_x=current_x;
                d_y=current_y;
            
                //calculate next position
                current_x=2*current_x-prev_x;
                current_y=2*current_y-prev_y;
            
                prev_x=d_x;
                prev_y=d_y;
            
                dis_pre=Math.sqrt((current_x-center_x)**2+(current_y-center_y)**2);//distance between center of earth and satellite in px
                dis=dis_pre*px;//km
                // alt=dis-px*radius;//distance between surface of earth and satellite in km
            
                ///////////// Revision /////////////
            
                gravity=mass*G/((10**17)*(dis**2));
                
                //gravitySpan.html()
                //gravitySpan.html(`Garvtity Acceleration:${gravity.toFixed(1)}m/s<sup>2</sup>`);
            
                approach=gravity*60;//aproach distance in one minute by gravity
                revision=approach/(dis*(10**3));
            
                current_x+=   (center_x-current_x)*revision;
                current_y+=   (center_y-current_y)*revision;
                //Do equations above cover all equations bellow?? : Yes

                // if(current_x>=center_x && current_y<=center_y){
                //     current_x=current_x-Math.abs(current_x-center_x)*revision;
                //     current_y=current_y+Math.abs(center_y-current_y)*revision;
            
                // }else if(current_x>=center_x && current_y>=center_y){
                //     current_x=current_x-Math.abs(current_x-center_x)*revision;
                //     current_y=current_y-Math.abs(center_y-current_y)*revision;
            
                // }else if(current_x<=center_x && current_y>=center_y){
                //     current_x=current_x+Math.abs(current_x-center_x)*revision;
                //     current_y=current_y-Math.abs(center_y-current_y)*revision;
            
                // }else if(current_x<=center_x && current_y<=center_y){
                //     current_x=current_x+Math.abs(current_x-center_x)*revision;
                //     current_y=current_y+Math.abs(center_y-current_y)*revision;
                // }
            
                dis_pre=Math.sqrt((current_x-center_x)**2+(current_y-center_y)**2);//distance between center of earth and satellite in px
                dis=dis_pre*px;//km
                alt=dis-px*radius;//distance between surface of earth and satellite in km
            
                gravity=mass*G/((10**17)*(dis**2));
                // console.log("G",gravity)
                gravitySpan.text(gravity.toFixed(2));
                altSpan.text(parseInt(alt).toLocaleString());
            
                point.css("top",70-alt/10000*70+"px")//?????
            
                satellite.offset({top:current_y-size/2,left:current_x-size/2});
            
                
                // $(".alt").text(alt.toFixed(1));

                
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
                    clearInterval(launch)
                    Reset()
                    // altSpan.text("")
                    // time.text("")
                }
    
                if(dis<=px*radius){
    
                    altSpan.text(0);
                    clearInterval(launch)
                    
                    setTimeout(()=>{
                        
                        alert("Done2")
                        Reset()
                        // altSpan.text("")
                        // time.text("")
                    },50)
                }


        },5);


    }
    
})// End of onclick


const Reset=()=>{
    satellite.offset({top: center_y-radius-ini_alt/px-size/2, left: center_x-size/2});
    drawPath.clearRect(0, 0, historyCV.width, historyCV.height);
    arrowDown.css("top","0")
    arrowUp.css("top","0")
    abortBtn.attr("disabled",true)
    // sateInfo.css("visibility","visible")
    launchDirectionImg.css("display", "flex")
    showInitParams.css("display", "block")
    launchBtn.attr("disabled",false)
    inputVelo.attr("disabled",false)
    inputAlt.attr("disabled",false)
    // ovsRange.attr("disabled",false)
    console.log("sateOffSet",+satellite.css("top").split("px")[0])

    altSpan.text("-")
    time.text("-")
    gravitySpan.text("-");

    question.css("left","10px")

    setTimeout(()=>{
        satellite.css("transitionProperty","opacity, top")
    
    },0)
}

abortBtn.click(()=>{
    alert("Aborted")
    clearInterval(launch)
    

    // altSpan.text("")
    // time.text("")
    Reset()

})

});