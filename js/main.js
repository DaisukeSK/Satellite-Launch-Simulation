import { checkSatelliteAlt, inputAltChange, convertNum, listBrowsing, makeStar } from "./functions.js"

export const planetList=$(".planetList")
// export const planetList2=document.querySelector(".planetList")
export const scrollInput=document.querySelector(".scrollBar input")
export const planetContainer = $(".planetContainer")
export const initAlt = $(".initAlt")
export const satellite=document.querySelector("#satellite");

// const left_right=document.querySelectorAll(".left, .right")
const left_right=$(".left, .right")
const scrollBar=$(".scrollBar")
const arrowDown = $(".arrowDown")
const arrowUp = $(".arrowUp")
const inputVelo = $('input[name="velo"]')
const inputAlt = $('input[name="alt"]')
const launchBtn = $(".launchBtn")
const initVelo = $(".initVelo")
const question = $(".questionSymbolHolder")
const instruction = $(".instruction")
const instructionBG = $(".instructionBG")
// const close = document.querySelector(".close")

let changeRatio=1;
const px_km=63.78//1px=63.78km

export let px=px_km/changeRatio;
export let planetLi, planetImg, liBaseWidth, imgWidth, plWidth2, mass, saturn
export let raitio=[]


const clickPlanetList=(E,data)=>{
    const pName=E.closest(".planetLi").querySelector(".pName span").textContent

    if(pName=="Ceres" && inputAlt.val()>=500){
        console.log("Ceres selected",inputAlt.val())
        inputAlt.val(500)
        inputAltChange(inputAlt.val())
    }
    
    mass=data[pName].mass*(10**data[pName].mass2)
    
    planetContainer.find("img").attr("src",data[pName].image)
    planetContainer.find("img").css("width",pName=="Saturn"?"211%":"120%")

    $(".planetName").html(E.closest(".planetLi").querySelector(".pName").innerHTML)
    $(".planetDescription").text(data[pName].description)
    $(".massSpan").text(Math.round(data[pName].mass*100)/100)
    $(".massSup").text(data[pName].mass2)
    $(".diaSpan").html(convertNum(data[pName].diameter))
}


// question.onclick=()=>{
//     instruction.css("top",`50%`)
//     instruction.css("opacity",1)
//     question.style.opacity=0
//     instructionBG.show()
//     setTimeout(()=>{
//         instructionBG.css("opacity",1)
//     },0)
// }

question.on("click",()=>{
    instruction.css("top",`50%`)
    instruction.css("opacity",1)
    question.css("opacity",0)
    instructionBG.show()
    setTimeout(()=>{
        instructionBG.css("opacity",1)
    },0)
})


$(".close").on("click", ()=>{
    
    instruction.css("top",`-${window.innerHeight}px`)
    instruction.css("opacity",0)

    question.css("opacity",1)
    instructionBG.css("opacity",0)
    setTimeout(()=>{
        instructionBG.hide()
    },1000)
})

// arrowDown.onclick=()=>{
//     planetList.style.transitionDelay="0s"
//     scrollBar.css("transitionDelay","0s")
//     arrowUp.css("transitionDelay",".7s")
//     // arrowUp.style.transitionDelay=".7s"
//     // planetList.style.top="50px"
//     planetList.style.top="40%"
//     planetList.style.opacity=1
//     scrollInput.disabled=false
//     scrollBar.css("opacity",1)
//     arrowDown.css("opacity",0)
//     arrowUp.css("opacity",1)
//     arrowDown.css("z-index",0)
//     satellite.style.transitionDelay= "0s";
//     planetContainer.style.transitionDelay= "0s";
//     satellite.style.opacity=0
//     planetContainer.style.opacity=0

//     // left_right.forEach(val=>{
//     //     val.style.transitionDelay="0s";
//     //     val.style.opacity=0
//     //     val.style.zIndex=-1
//     // })
//     left_right.each(function(){
//         $(this).css("opacity",0)
//         $(this).css("z-index",1)
//         $(this).css("transitionDelay","0s")
//     })

//     inputAlt.prop("disabled", true)
//     inputVelo.prop("disabled", true)
//     launchBtn.prop("disabled", true)
// }

arrowDown.on("click",()=>{
    planetList.css("transitionDelay","0s")
    scrollBar.css("transitionDelay","0s")
    arrowUp.css("transitionDelay",".7s")
    // arrowUp.style.transitionDelay=".7s"
    // planetList.style.top="50px"
    planetList.css("top","40%")
    planetList.css("opacity",1)
    scrollInput.disabled=false
    scrollBar.css("opacity",1)
    arrowDown.css("opacity",0)
    arrowUp.css("opacity",1)
    arrowDown.css("z-index",0)
    satellite.style.transitionDelay= "0s";
    planetContainer.css("transitionDelay","0s")
    satellite.style.opacity=0
    planetContainer.css("opacity",0)

    // left_right.forEach(val=>{
    //     val.style.transitionDelay="0s";
    //     val.style.opacity=0
    //     val.style.zIndex=-1
    // })
    left_right.each(function(){
        $(this).css("opacity",0)
        $(this).css("z-index",1)
        $(this).css("transitionDelay","0s")
    })

    inputAlt.prop("disabled", true)
    inputVelo.prop("disabled", true)
    launchBtn.prop("disabled", true)
})

const listUp=()=>{
    arrowDown.css("transitionDelay",".7s")
    // arrowUp.style.transitionDelay="0s";
    arrowUp.css("transitionDelay","0s")
    planetList.css("top","-200px")
    planetList.css("opacity",0)
    scrollInput.disabled=true
    scrollBar.css("opacity",0)
    arrowDown.css("opacity",1)
    arrowDown.css("z-index",2)
    arrowUp.css("opacity",0)
    satellite.style.opacity=1
    planetContainer.css("opacity",1)
    
    // left_right.forEach(val=>{
    //     val.style.opacity=1
    //     val.style.zIndex=2
    // })
    left_right.each(function(){
        $(this).css("opacity",1)
        $(this).css("z-index",2)
    })

    inputAlt.prop("disabled", false)
    inputVelo.prop("disabled", false)
    launchBtn.prop("disabled", false)

    setTimeout(() => {
        arrowDown.css("transitionDelay","0s")
    }, 0);
}

// arrowUp.onclick=()=>{
//     listUp()
// }
arrowUp.on("click",()=>{
    listUp()
})


inputVelo.on("input", function(){
    if($(this).val()/2 || $(this).val()==0){
        $(".showInitVelo").text(parseInt($(this).val()).toLocaleString())
        initVelo.text(parseInt($(this).val()).toLocaleString())
    }
})


inputAlt.on("input", function(){
    inputAltChange($(this).val())
})

////////////////////////// Main //////////////////////////
fetch("planets.json")
.then((data)=>{
    return data.json()
    })
.then((data)=>{

    Object.keys(data).forEach((val,key)=>{
        planetList.append(`
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
        planetList.children()[key].querySelector(".pName").insertAdjacentHTML("beforeend",`<img src="${data[val].symbol}"/>`)
        
        key && raitio.push(data[val].diameter/data[Object.keys(data)[key-1]].diameter)

    })//Object.keys(data).forEach, creating list items
    
    planetLi=document.querySelectorAll(".planetLi")
    planetImg=document.querySelectorAll(".planetLi .planetImg")
    liBaseWidth=planetLi[0].getBoundingClientRect().width
    imgWidth=planetImg[0].getBoundingClientRect().width
    saturn=document.querySelector(".planetLi.Saturn")
    // plWidth2=planetList.getBoundingClientRect().width-(liBaseWidth+planetLi[planetLi.length-1].getBoundingClientRect().width)/2
    plWidth2=+planetList.css("width").split("px")[0]-(liBaseWidth+planetLi[planetLi.length-1].getBoundingClientRect().width)/2
    
    // console.log("1:",planetList2.getBoundingClientRect().width)
    console.log("2:",+planetList.css("width").split("px")[0])

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
                satellite.style.top=window.innerHeight/2-planetContainer.css("height").split("px")[0]/2-changeRatio*parseInt(inputAlt.val())/px_km+"px"
    
                planetList.css("transitionDelay",".5s")
                // scrollBar.style.transitionDelay=".5s"
                scrollBar.css("transitionDelay",".5s")
                satellite.style.transitionDelay= ".7s, 0s";
                planetContainer.css("transitionDelay",".7s")
                
                // left_right.forEach(val=>{
                //     val.style.transitionDelay=".7s"
                // })
                left_right.each(function(){
                    $(this).css("transitionDelay",".7s")
                })
    
                listUp()
                checkSatelliteAlt()
            }
            
        }
    })//planetLi.forEach, onclick

    ////////////////////////// Onload //////////////////////////
    instruction.css("top",`-${window.innerHeight}px`)
    satellite.style.top=window.innerHeight/2-planetContainer.css("width").split("px")[0]/2-changeRatio*inputAlt.val()/px+"px"

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

    initVelo.text(parseInt(inputVelo.val()).toLocaleString())
    initAlt.text(parseInt(inputAlt.val()).toLocaleString())
})// End of fetch("planets.json")