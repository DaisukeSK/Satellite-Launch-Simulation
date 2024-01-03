import { checkSatelliteAlt, inputAltChange, convertNum, listBrowsing, makeStar } from "./functions.js"

export const planetList=document.querySelector(".planetList")
export const scrollInput=document.querySelector(".scrollBar input")
export const planetContainer = document.querySelector(".planetContainer")
export const initAlt = document.querySelector(".initAlt")
export const satellite=document.querySelector("#satellite");

const left_right=document.querySelectorAll(".left, .right")
const scrollBar=document.querySelector(".scrollBar")
const arrowDown = document.querySelector(".arrowDown")
const arrowUp = document.querySelector(".arrowUp")
const inputVelo = document.querySelector('input[name="velo"]')
const inputAlt = document.querySelector('input[name="alt"]')
const launchBtn = document.querySelector(".launchBtn")
const initVelo = document.querySelector(".initVelo")
const question = document.querySelector(".questionSymbolHolder")
const instruction = document.querySelector(".instruction")
const instructionBG = document.querySelector(".instructionBG")
const close = document.querySelector(".close")

let changeRatio=1;
const px_km=63.78//1px=63.78km

export let px=px_km/changeRatio;
export let planetLi, planetImg, liBaseWidth, imgWidth, plWidth2, mass, saturn
export let raitio=[]


const clickPlanetList=(E,data)=>{
    const pName=E.closest(".planetLi").querySelector(".pName span").textContent

    if(pName=="Ceres" && inputAlt.value>=500){
        console.log("Ceres selected",inputAlt.value)
        inputAlt.value=500
        inputAltChange(inputAlt.value)
    }
    
    mass=data[pName].mass*(10**data[pName].mass2)
    
    planetContainer.querySelector("img").src=data[pName].image
    planetContainer.querySelector("img").style.width=pName=="Saturn"?"211%":"120%"

    $(".planetName").html(E.closest(".planetLi").querySelector(".pName").innerHTML)
    $(".planetDescription").text(data[pName].description)
    $(".massSpan").text(Math.round(data[pName].mass*100)/100)
    $(".massSup").text(data[pName].mass2)
    $(".diaSpan").html(convertNum(data[pName].diameter))
}


question.onclick=()=>{
    instruction.style.top=`50%`
    instruction.style.opacity=1
    question.style.opacity=0
    instructionBG.style.display="block"
    setTimeout(()=>{
        instructionBG.style.opacity=1
    },0)
}

close.onclick=()=>{
    instruction.style.top=`-${window.innerHeight}px`
    instruction.style.opacity=0
    question.style.opacity=1
    instructionBG.style.opacity=0
    setTimeout(()=>{
        instructionBG.style.display="none"
    },1000)
}

arrowDown.onclick=()=>{
    planetList.style.transitionDelay="0s"
    scrollBar.style.transitionDelay="0s"
    arrowUp.style.transitionDelay=".7s"
    planetList.style.top="50px"
    planetList.style.opacity=1
    scrollInput.disabled=false
    scrollBar.style.opacity=1
    arrowDown.style.opacity=0
    arrowUp.style.opacity=1
    arrowDown.style.zIndex=0
    satellite.style.transitionDelay= "0s";
    planetContainer.style.transitionDelay= "0s";
    satellite.style.opacity=0
    planetContainer.style.opacity=0

    left_right.forEach(val=>{
        val.style.transitionDelay="0s";
        val.style.opacity=0
        val.style.zIndex=-1
    })

    inputAlt.disabled=true
    inputVelo.disabled=true
    launchBtn.disabled=true
}

const listUp=()=>{
    arrowDown.style.transitionDelay=".7s";
    arrowUp.style.transitionDelay="0s";
    planetList.style.top="-500px";
    planetList.style.opacity=0
    scrollInput.disabled=true
    scrollBar.style.opacity=0
    arrowDown.style.opacity=1
    arrowDown.style.zIndex=2
    arrowUp.style.opacity=0
    satellite.style.opacity=1
    planetContainer.style.opacity=1
    
    left_right.forEach(val=>{
        val.style.opacity=1
        val.style.zIndex=2
    })

    inputAlt.disabled=false
    inputVelo.disabled=false
    launchBtn.disabled=false

    setTimeout(() => {
        arrowDown.style.transitionDelay="0s"
    }, 0);
}

arrowUp.onclick=()=>{
    listUp()
}

launchBtn.onclick=()=>{
    if(inputVelo.value && inputAlt.value){
        $(".rectSVG").css("opacity",0)
        $(".instructionSVG").css("opacity",0)
    }
}

inputVelo.oninput=(e)=>{
    if(e.target.value/2 || e.target.value==0){
        $(".showInitVelo").text(parseInt(e.target.value).toLocaleString())
        initVelo.innerText=parseInt(e.target.value).toLocaleString()
    }
}

inputAlt.oninput=(e)=>{
    inputAltChange(e.target.value)
}

////////////////////////// Main //////////////////////////
fetch("planets.json")
.then((data)=>{
    return data.json()
    })
.then((data)=>{

    Object.keys(data).forEach((val,key)=>{
        planetList.insertAdjacentHTML("beforeend", `
            <li class='planetLi planetLi${key+1} ${val}'>
                <div class="planetContainerLi"></div>
                <div class="planetLiTop">
                    <div class="pName">
                        <span>${val}</span>
                    </div>
                    <div class="grid">
                        <div class="gridLeft">Diameter:</div>
                        <div class="diameter">${convertNum(data[val].diameter)}</div>
                        <div class="gridLeft">Mass:</div>
                        <div>${(Math.round(data[val].mass*100))/100}×10<sup>${data[val].mass2}</sup>&nbsp;[kg]</div>
                    </div>
                </div>
                <img class="planetImg" src="${data[val].image}"/>
                <div class="forBoxShadow"></div>
            </li>
        `)
        
        data[val].symbol &&
        planetList.children[key].querySelector(".pName").insertAdjacentHTML("beforeend",`<img src="${data[val].symbol}"/>`)
        
        key && raitio.push(data[val].diameter/data[Object.keys(data)[key-1]].diameter)

    })//Object.keys(data).forEach, creating list items
    
    planetLi=document.querySelectorAll(".planetLi")
    planetImg=document.querySelectorAll(".planetLi .planetImg")
    liBaseWidth=planetLi[0].getBoundingClientRect().width
    imgWidth=planetImg[0].getBoundingClientRect().width
    saturn=document.querySelector(".planetLi.Saturn")
    plWidth2=planetList.getBoundingClientRect().width-(liBaseWidth+planetLi[planetLi.length-1].getBoundingClientRect().width)/2
    
    scrollInput.oninput=(e)=>{
        listBrowsing(e.target.value,null,data)
    }
    scrollInput.onchange=(e)=>{
        listBrowsing(e.target.value,null,data)
    }

    planetLi.forEach(val=>{
        val.onclick=(e)=>{
            // satellite.style.transitionProperty="none, none"
            // setTimeout(()=>{
            //     satellite.style.transitionProperty="opacity, top"
            // },0)
            if(e.target.closest("li").classList[2]=="Sirius-B"){

                alert("Sorry, simulation is unavailable with Sirius-B because of its too massive property values.")
            
            }else{

                changeRatio=1/(data[val.querySelector(".pName").innerText].diameter/data["Earth"].diameter)
                px=px_km/changeRatio // Is this necessary?
                
                clickPlanetList(e.target,data)
    
                planetLi.forEach(val=>{
                    val.style.width=liBaseWidth+"px"
                    val.style.background="none"
                })
    
                const num=e.target.closest(".planetLi").classList[1].split("planetLi")[1]
                listBrowsing(null,num,data)
                
                scrollInput.value=scrollInput.max*(num-1)/(planetLi.length-1)
                satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().height/2-changeRatio*parseInt(inputAlt.value)/px_km+"px"
    
                planetList.style.transitionDelay=".5s"
                scrollBar.style.transitionDelay=".5s"
                satellite.style.transitionDelay= ".7s, 0s";
                planetContainer.style.transitionDelay= ".7s";
                
                left_right.forEach(val=>{
                    val.style.transitionDelay=".7s"
                })
    
                listUp()
                checkSatelliteAlt()
            }
            
        }
    })//planetLi.forEach, onclick

    ////////////////////////// Onload //////////////////////////
    instruction.style.top=`-${window.innerHeight}px`
    satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().width/2-changeRatio*inputAlt.value/px+"px"

    makeStar(50, 2);
    makeStar(100, 4);
    // makeStar(500, 1);
    // makeStar(400, 3);

    saturn.querySelector(".planetImg").style.width="150%"
    saturn.style.width="535px"
    listBrowsing(null,10,data)
    scrollInput.value=scrollInput.max*9/(planetLi.length-1)
    clickPlanetList(document.querySelector("li.Earth"),data)
    checkSatelliteAlt()

    initVelo.innerText=parseInt(inputVelo.value).toLocaleString()
    initAlt.innerText=parseInt(inputAlt.value).toLocaleString()
})// End of fetch("planets.json")