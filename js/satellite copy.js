
// const initAlt=16//as 1000km
const left_right=document.querySelectorAll(".left, .right")
// const middleLeftRight=document.querySelectorAll(".middleLeft, .middleRight")
const planetList=document.querySelector(".planetList")
const range=document.querySelector('.range input[type="range"]');
const scrollBar=document.querySelector(".scrollBar")
const scrollInput=document.querySelector(".scrollBar input")
const planetContainer = document.querySelector(".planetContainer")
const arrowDown = document.querySelector(".arrowDown")
const arrowSvg = document.querySelectorAll(".arrowDown svg, .arrowUp svg")
const arrowShadow = document.querySelectorAll(".arrowShadow")
const arrowUp = document.querySelector(".arrowUp")
const innerScale = document.querySelector(".innerScale")
const inputVelo = document.querySelector('input[name="velo"]')
const inputAlt = document.querySelector('input[name="alt"]')
const launch = document.querySelector(".launchBtn")
const middle = document.querySelector(".middle")
const sateInfoUpper = document.querySelector(".sateInfoUpper")
const sateInfoLower = document.querySelector(".sateInfoLower")
const showInitParams = document.querySelector(".showInitParams")

const body=document.querySelector("body");
const satellite=document.querySelector("#satellite");

const cntnrBaseWidth=planetContainer.getBoundingClientRect().width

const imgWidthPercent="84%"//Use the same value as CSS
const imgWidthPercentSaturn="123%"//Use the same value as CSS

// const planetLiBGcolor1="rgba(255, 211, 15, 0.5)"
// const planetLiBGcolor2="rgba(255, 59, 15, 0.5)"
const planetLiBGcolor1="none"
const planetLiBGcolor2="none"
console.log("left_right",left_right)
let raitio=[]
let ratio_E=[]
let changeRatio=1;
let px=63.78/changeRatio;//1px=63.78km
let planetLi, planetImg, liBaseWidth, imgWidth, mddlWidth, plWidth2, mass, planetContainerLi, forBoxShadow, func, saturn, clickPlanetList

// arrowSvg.onmouseover=()=>{
//     arrowShadow.forEach(val=>{
//         val.style.display="block"
//     })
// }
// arrowSvg.onmouseleave=()=>{
//     arrowShadow.forEach(val=>{
//         val.style.display="none"
//     })
// }

arrowSvg.forEach(val=>{
    val.onmouseover=()=>{
        arrowShadow.forEach(val2=>{
            val2.style.display="block"
        })
    }
    val.onmouseleave=()=>{
        arrowShadow.forEach(val2=>{
            val2.style.display="none"
        })
    }
})

arrowDown.onclick=()=>{
    scrollInput.disabled=false
    planetList.style.transitionDelay="0s"
    scrollBar.style.transitionDelay="0s"
    arrowDown.style.transitionDelay="0s"
    arrowUp.style.transitionDelay="0s"
    planetList.style.top="50px"
    planetList.style.opacity=1
    
    scrollBar.style.opacity=1
    arrowDown.style.opacity=0
    arrowDown.style.zIndex=0
    arrowUp.style.opacity=1
    arrowDown.style.transition=" all ease-out .7s";
    arrowUp.style.transition=" all ease-out .7s .7s";

    satellite.style.opacity=0
    planetContainer.style.opacity=0

    satellite.style.transition= "opacity ease-out .7s";
    planetContainer.style.transition= "opacity ease-out .7s";
    left_right.forEach(val=>{
        val.style.opacity=0
        // val.style.display="none"
        val.style.transition="all ease-out .7s";
        // val.style.display="none"
        val.style.zIndex=-1
    })

    inputAlt.disabled=true
    inputVelo.disabled=true
    launch.disabled=true
    
}

const listUp=()=>{
    scrollInput.disabled=true
    planetList.style.top="-500px";
    planetList.style.opacity=0
    scrollBar.style.opacity=0
    arrowDown.style.opacity=1
    arrowDown.style.zIndex=2
    arrowUp.style.opacity=0

    satellite.style.opacity=1
    planetContainer.style.opacity=1
    
    arrowDown.style.transition=" all ease-out .7s .7s";
    arrowUp.style.transition=" all ease-out .7s";
    // middleLeftRight.forEach(val=>{
    //     val.style.opacity=0
    //     val.style.transition= "opacity ease-out .7s .7s";
    // })
    left_right.forEach(val=>{
        val.style.opacity=1
        // val.style.display="block"
        // val.style.transition="all ease-out .7s .7s";
        val.style.zIndex=2
    })

    inputAlt.disabled=false
    inputVelo.disabled=false
    launch.disabled=false
}

const checkSatelliteAlt=()=>{
    // sateInfoUpper.style.display=sate.getBoundingClientRect().top>=70?"block":"none"
    // sateInfoLower.style.display=sate.getBoundingClientRect().top>=70?"none":"block"
    if(+satellite.style.top.split("px")[0]>=70){
        console.log(">>>",+sate.style.top.split("px")[0])
        showInitParams.style.top="-40px"
    }else{
        console.log("<<<",+satellite.style.top.split("px")[0])
        showInitParams.style.top="30px"
    }
}
arrowUp.onclick=()=>{
    listUp()
    left_right.forEach(val=>{
        // val.style.opacity=1
        val.style.transition="all ease-out .7s";
    })
    
}

launch.onclick=()=>{
    if(inputVelo.value && inputAlt.value){

        document.querySelector(".rectSVG").style.opacity=0
        document.querySelector(".instructionSVG").style.opacity=0
        listUp()
        arrowDown.style.transition=" all ease-out .7s";
        console.log("Launced::",inputVelo.value,inputAlt.value)
    }
}

inputVelo.oninput=(e)=>{
    if(e.target.value/2 || e.target.value==0){
        document.querySelector(".showInitVelo").textContent=parseInt(e.target.value).toLocaleString()
            
    }
}

inputAlt.oninput=(e)=>{
    if(e.target.value/2){
        satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().width/2-e.target.value/px+"px"
        document.querySelector(".showInitAlt").textContent=parseInt(e.target.value).toLocaleString()
        console.log("Sate top",satellite.getBoundingClientRect().top)
        checkSatelliteAlt()
        
        
    }
}

const convertNum=(num)=>{
    return `${(Math.round(100*num/(10**(num.toString().length-1))))/100}×10<sup>${num.toString().length-1}</sup>&nbsp;[km]`
}


window.onload=async()=>{
    
await fetch("planets.json")
.then((data)=>{
    return data.json()
}).then((data)=>{

    Object.keys(data).forEach((val,key)=>{

        planetList.insertAdjacentHTML("beforeend",
        `
            <li class='planetLi planetLi${key+1} ${val}'>
                <div class="planetContainerLi">

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

                </div>
            </li>
        `)
        if(data[val].symbol){
            planetList.children[key].querySelector(".pName").insertAdjacentHTML("beforeend",`<img src="${data[val].symbol}"/>`)

        }
        
        if(key){
            
            // console.log("diameter",parseFloat(data[key].diameter),parseFloat(data[key-1].diameter))
            raitio.push(data[val].diameter/data[Object.keys(data)[key-1]].diameter)
        }
        ratio_E.push(data[val].diameter/data["Earth"].diameter)

    })//Object.keys(data).forEach, creating list items
    
    planetContainerLi = document.querySelectorAll(".planetContainerLi")
    forBoxShadow = document.querySelectorAll(".forBoxShadow")
    // mass=data["Earth"].mass*(10**data["Earth"].mass2)
    // console.log("Mass",mass)

    planetLi=document.querySelectorAll(".planetLi")
    planetImg=document.querySelectorAll(".planetLi .planetImg")
    liBaseWidth=planetLi[0].getBoundingClientRect().width
    imgWidth=planetImg[0].getBoundingClientRect().width
    
    saturn=document.querySelector(".planetLi.Saturn")
    
    
    console.log("imgWidthPercent",imgWidthPercent)
    console.log("imgWidth",planetImg[0].style.width)
    console.log("saturn",saturn)
    mddlWidth=middle.getBoundingClientRect().width
    // plWidth2=planetList.offsetWidth-(liBaseWidth+planetLi[planetLi.length-1].getBoundingClientRect().width)/2
    plWidth2=planetList.getBoundingClientRect().width-(liBaseWidth+planetLi[planetLi.length-1].getBoundingClientRect().width)/2
    
    // console.log("mddlWidth",mddlWidth)
    clickPlanetList=(E)=>{
        const pName=E.closest(".planetLi").querySelector(".pName span").textContent
        if(pName=="Ceres"){
            console.log("Ceres selected")
            inputAlt.value=500
        }
        document.querySelectorAll(".param2 span").forEach(val=>{
            val.textContent=parseInt(inputAlt.value).toLocaleString()
        })
        planetContainer.querySelector("img").src=data[pName].image
        mass=data[pName].mass*(10**data[pName].mass2)

        
        planetContainer.querySelector("img").style.width=pName=="Saturn"?"211%":"120%"
    
    
        // document.querySelector(".planetName").textContent=pName
        document.querySelector(".planetName").innerHTML=E.closest(".planetLi").querySelector(".pName").innerHTML
        document.querySelector(".planetDescription").textContent=data[pName].description
        document.querySelector(".massSpan").textContent=(Math.round(data[pName].mass*100))/100
        document.querySelector(".massSup").textContent=data[pName].mass2
        document.querySelector(".diaSpan").innerHTML=convertNum(data[pName].diameter)
    }
    func=(value,number)=>{

        planetContainerLi.forEach(val=>{
        
        // val.style.background="none"
        val.style.outline="none"
        // val.style.boxShadow="none"
        // val.style.zIndex="auto"
    })
    forBoxShadow.forEach(val=>{
        
        // val.style.background="none"
        // val.style.outline="none"
        val.style.boxShadow="none"
        // val.style.zIndex="auto"
    })

    if((value==0 && !number)||number==1){
        
        planetList.style.left=(mddlWidth-liBaseWidth)/2+"px"
        planetLi[1].style.width=liBaseWidth*raitio[0]+"px"
        planetLi[2].style.width=planetLi[1].getBoundingClientRect().width*raitio[1]+"px"
        
        planetImg[0].style.width=imgWidthPercent
        planetImg[1].style.width=imgWidthPercent
        planetImg[2].style.width=imgWidthPercent
        planetLi[0].style.backgroundColor=planetLiBGcolor1
        planetLi[1].style.backgroundColor=planetLiBGcolor1
        planetLi[2].style.background="none"

        innerScale.innerHTML=planetLi[0].querySelector(".diameter").innerHTML
        // innerScale.innerHTML=convertNum(data[pNames[0]].diameter)

        // console.log("change",e.target.value)
        // saturn.style.width=imgWidthPercentSaturn

        }else if((value==scrollInput.max && !number)||number==planetLi.length){

            planetLi.forEach(val=>{
                val.style.width=liBaseWidth+"px"
            })

            planetList.style.left=(planetLi[planetLi.length-1].getBoundingClientRect().width+mddlWidth)/2-planetList.getBoundingClientRect().width+"px"
            planetLi[planetLi.length-1].style.backgroundColor=planetLiBGcolor1
            
            planetImg[planetLi.length-1].style.width=imgWidth+"px"
            planetImg[planetLi.length-2].style.width=imgWidth/raitio[planetLi.length-2]+"px"
            
            planetImg[planetLi.length-3].style.width=imgWidth/raitio[planetLi.length-2]/raitio[planetLi.length-3]+"px"
            planetLi[planetLi.length-3].style.background="none"
            
            planetImg[planetLi.length-4].style.width=imgWidth/raitio[planetLi.length-2]/raitio[planetLi.length-3]/raitio[planetLi.length-4]+"px"
            
            // innerScale.textContent=planetLi[planetLi.length-1].querySelector(".diameter").innerHTML+" [km]"
            // innerScale.innerHTML=convertNum(data[pNames[pNames.length-1]].diameter)
            innerScale.innerHTML=planetLi[planetLi.length-1].querySelector(".diameter").innerHTML
            
            // console.log("change",e.target.value)
        }else{
            if(number){
                console.log("num",number)

                const left3=-liBaseWidth*number+mddlWidth/2+planetLi[number-1].getBoundingClientRect().width/2
                // let left2=0;
                // for(let i=0; i<=number-1; i++){
                //     left2-=planetLi[i].getBoundingClientRect().width
                // }
                // left2=left2+mddlWidth/2+planetLi[number-1].getBoundingClientRect().width/2
                // console.log("left",left,left2)
                
                planetList.style.left=left3+"px"
            }else{
                planetList.style.left=(mddlWidth-liBaseWidth)/2-plWidth2*value/scrollInput.max+"px"
            }
            // console.log("change",e.target.value)

            // const widthSum=Math.floor(mddlWidth/2-(+planetList.style.left.split("px")[0]))
            const widthSum=mddlWidth/2-(+planetList.style.left.split("px")[0])
            // Probably Math.floor is not necessary.
            // Added Math.floor for the case of e.target.value=max
            // But added another if condition for e.target.value=max above

            let target=[]
            let bool=false
            planetLi.forEach((val,key)=>{
                if(!bool){
    
                    let sum=0
                    // let widthTotal=0;
                    for(let i=0; i<=key; i++){
                        sum+=planetLi[i].getBoundingClientRect().width
                    }

///////////////////////////////////////////////////////////////////////////////////////////

                    // sum-=planetLi[key].getBoundingClientRect().width/2

                    // if(widthSum<=sum){
                    //     bool=true
                    //     target=[key-1,key]
                        
                    //     for(let i=0;i<=key-1;i++){
                    //         widthTotal+=planetLi[i].getBoundingClientRect().width
                    //     }
                    //     widthTotal-=planetLi[key-1].getBoundingClientRect().width/2
                    
                    if(widthSum<=sum-planetLi[key].getBoundingClientRect().width/2){
                        bool=true
                        target=[key-1,key]
                        
                        sum-=planetLi[key].getBoundingClientRect().width + planetLi[key-1].getBoundingClientRect().width/2
                        // for(let i=0;i<=key-1;i++){
                        //     widthTotal+=planetLi[i].getBoundingClientRect().width
                        // }
                        // widthTotal-=planetLi[key-1].getBoundingClientRect().width/2

///////////////////////////////////////////////////////////////////////////////////////////
                        const Dis_2middles=(planetLi[key-1].getBoundingClientRect().width + planetLi[key].getBoundingClientRect().width)/2
                        // const movingPx=-(+planetList.style.left.split("px")[0])+mddlWidth/2-widthTotal
                        const movingPx=-(+planetList.style.left.split("px")[0])+mddlWidth/2-sum
                        const percent=movingPx/Dis_2middles

                        console.log("target1",key-1,key,val,"distance:",Dis_2middles)
                        console.log("target2",movingPx)
                        console.log("target%",percent*100+"%")
                        
                        ////////////////////////////////////////////////////////
                        //             const pName=e.target.closest(".planetLi").querySelector(".pName").textContent
                        // changeRatio=data.Earth.diameter/data[pName].diameter
                        const baseDis1=data[planetLi[key-1].querySelector(".pName span").textContent].diameter
                        const baseDis2=data[planetLi[key].querySelector(".pName span").textContent].diameter
                        const difference=baseDis2-baseDis1
                        // console.log("distance",baseDis,difference)
                        innerScale.innerHTML=convertNum(Math.round(baseDis1+difference*percent))
                        
                        planetLi[key].style.width=liBaseWidth*(1+(raitio[key-1]-1)*(1-percent))+"px"
                        
                        planetImg[key].style.width=imgWidthPercent
                        planetLi[key].style.backgroundColor=planetLiBGcolor2

                        if(planetLi[key+1]){
                            planetLi[key+1].style.width=planetLi[key].getBoundingClientRect().width*raitio[key]+"px"
                            planetImg[key+1].style.width=imgWidthPercent
                            planetLi[key+1].style.background="none"
                        }
                        // planetLi[key+2].style.width=planetLi[key].getBoundingClientRect().width*(250/150)+"px"
                        if(planetLi[key+2]){
                            planetLi[key+2].style.width=planetLi[key+1].getBoundingClientRect().width*raitio[key+1]+"px"
                            planetImg[key+2].style.width=imgWidthPercent
                            planetLi[key+2].style.background="none"
                        }
                        // if(planetLi[key+3]){
                        //     planetLi[key+3].style.width=planetLi[key+2].getBoundingClientRect().width*raitio[key+2]+"px"
                        //     planetImg[key+3].style.width=imgWidthPercent
                        //     planetLi[key+3].style.background="none"
                        // }
                        // if(planetLi[key+4]){
                        //     planetLi[key+4].style.width=planetLi[key+3].getBoundingClientRect().width*raitio[key+3]+"px"
                        //     planetImg[key+4].style.width=imgWidthPercent
                        //     planetLi[key+4].style.background="none"
                        // }
                        if(planetLi[key-1]){
                            planetImg[key-1].style.width=(imgWidth*(1-(1-1/raitio[key-1])*percent))+"px"
                            planetLi[key-1].style.backgroundColor=planetLiBGcolor2
                            planetLi[key-1].style.width=liBaseWidth+"px"
                        }
                        if(planetLi[key-2]){
                            planetImg[key-2].style.width=(imgWidth*(1-(1-1/raitio[key-1])*percent))/raitio[key-2]+"px"
                            planetLi[key-2].style.background="none"
                            planetLi[key-2].style.width=liBaseWidth+"px"
                        }
                        if(planetLi[key-3]){
                            planetImg[key-3].style.width=(imgWidth*(1-(1-1/raitio[key-1])*percent))/raitio[key-2]/raitio[key-3]+"px"
                            planetLi[key-3].style.width=liBaseWidth+"px"
                        }
                        if(planetLi[key-4]){
                            planetImg[key-4].style.width=(imgWidth*(1-(1-1/raitio[key-1])*percent))/raitio[key-2]/raitio[key-3]/raitio[key-4]+"px"
                            planetLi[key-4].style.width=liBaseWidth+"px"
                        }
                        if(
                            planetLi[key+2]?.classList[2]=="Saturn" ||
                            planetLi[key+1]?.classList[2]=="Saturn" ||
                            planetLi[key]?.classList[2]=="Saturn" ||
                            planetLi[key-1]?.classList[2]=="Saturn" ||
                            planetLi[key-2]?.classList[2]=="Saturn" ||
                            planetLi[key-3]?.classList[2]=="Saturn" ||
                            planetLi[key-4]?.classList[2]=="Saturn"
                            
                            ){

                            // saturn.querySelector("img").style.width=saturn.querySelector("img").getBoundingClientRect().width*1.77+"px"
                            saturn.querySelector(".planetImg").style.width=saturn.querySelector(".planetImg").getBoundingClientRect().width*1.77+"px"
                            saturn.querySelector(".planetLiTop").style.marginBottom=saturn.querySelector(".planetImg").getBoundingClientRect().height*1.07+"px"
                            console.log("planetLi[key-4])", planetLi[key-4].classList[2])
                        }
                    }
                }
            })
        }
        // if(number){
        //     // planetLi[number-1].style.backgroundColor="rgba(81, 255, 71, 0.7)"
        //     // planetLi[number-1].querySelector(".planetContainerLi").style.backgroundColor="rgba(81, 255, 71, 0.7)"
        //     planetLi[number-1].querySelector(".planetContainerLi").style.outline="2px solid white"
        //     planetLi[number-1].querySelector(".forBoxShadow").style.boxShadow="inset 0 0 20px white, 0 0 30px white"
        //     // console.log("cntnr",planetContainerLi[0].querySelector("img").getBoundingClientRect())
        //     console.log("cntnr",planetContainerLi[0].offsetHeight)
        //     planetLi[number-1].querySelector(".forBoxShadow").style.height=planetLi[number-1].querySelector(".planetContainerLi").getBoundingClientRect().height+"px"
        //     // planetLi[number-1].querySelector(".planetContainerLi").style.zIndex=1
        // }
        if(number){
            // planetLi[number-1].style.backgroundColor="rgba(81, 255, 71, 0.7)"
            // planetLi[number-1].querySelector(".planetContainerLi").style.backgroundColor="rgba(81, 255, 71, 0.7)"
            planetLi[number-1].querySelector(".planetContainerLi").style.outline="2px solid white"
            planetLi[number-1].querySelector(".forBoxShadow").style.boxShadow="inset 0 0 20px white, 0 0 30px white"
            // console.log("cntnr",planetContainerLi[0].querySelector("img").getBoundingClientRect())
            console.log("cntnr",planetContainerLi[0].offsetHeight)
            // planetLi[number-1].querySelector(".forBoxShadow").style.height=planetLi[number-1].querySelector(".planetContainerLi").getBoundingClientRect().height+"px"
            // planetLi[number-1].querySelector(".planetContainerLi").style.zIndex=1
        }
    }//const func=(value,number)


    scrollInput.oninput=(e)=>{
        func(e.target.value,null)
    }
    scrollInput.onchange=(e)=>{
        func(e.target.value,null)
    }

    planetLi.forEach((val,key)=>{
        val.onclick=(e)=>{
            
            // changeRatio=data.Earth.diameter/data[pName].diameter
            changeRatio=1/ratio_E[key]
            // console.log("Ratio::",changeRatio,1/ratio_E[key])
            px=63.78/changeRatio
            
            // console.log("e",e.target.closest(".planetLi").querySelector("planetImg").src)
            // planetContainer.style.width=changeRatio*cntnrBaseWidth*data[pName].diameter/data.Earth.diameter+"px"
            // planetContainer.style.height=planetContainer.getBoundingClientRect().width+"px"
            
            
            clickPlanetList(e.target)
                
            // const pName=e.target.closest(".planetLi").querySelector(".pName span").textContent
            // planetContainer.querySelector("img").src=data[pName].image
            // mass=data[pName].mass*(10**data[pName].mass2)

            // console.log("Mass",mass)

            // // document.querySelector(".planetName").textContent=pName
            // document.querySelector(".planetName").innerHTML=e.target.closest(".planetLi").querySelector(".pName").innerHTML
            // document.querySelector(".massSpan").textContent=(Math.round(data[pName].mass*100))/100
            // document.querySelector(".massSup").textContent=data[pName].mass2
            // document.querySelector(".diaSpan").innerHTML=convertNum(data[pName].diameter)




            planetLi.forEach(val=>{
                val.style.width=liBaseWidth+"px"
                val.style.background="none"
            })

            const num=e.target.closest(".planetLi").classList[1].split("planetLi")[1]
            console.log("Click",num,planetLi.length,scrollInput.value,scrollInput.max)
            
            
            func(null,num)
            // innerScale.textContent=e.target.closest(".planetLi").querySelector(".diameter").textContent+" km"
            
            // innerScale.innerHTML=convertNum(data[pName].diameter)
            scrollInput.value=scrollInput.max*(num-1)/(planetLi.length-1)
            satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().height/2-changeRatio*parseInt(inputAlt.value)/63.78+"px"
            // scrollInput.disabled=true
            planetList.style.transitionDelay=".5s"
            scrollBar.style.transitionDelay=".5s"
            arrowDown.style.transitionDelay=".5s"
            arrowUp.style.transitionDelay=".5s"
            // planetList.style.top="-350px";
            // planetList.style.opacity=0
            
            // scrollBar.style.opacity=0
            // arrowDown.style.opacity=1
            // arrowDown.style.zIndex=2
            // arrowUp.style.opacity=0
            
            
            // console.log("top:",window.innerHeight/2,planetContainer.getBoundingClientRect().height/2,initAlt)
            // satellite.style.top="20px"
            satellite.style.transition= "opacity ease-in-out .7s .7s";
            planetContainer.style.transition= "opacity ease-in-out .7s .7s";
            left_right.forEach(val=>{
                // val.style.opacity=1
                val.style.transition="all ease-out .7s .7s";
            })
            listUp()
            checkSatelliteAlt()
        }
        
    })//planetLi.forEach, onclick
    
})// End of await fetch("planets.json")

////////////////////////// Onload //////////////////////////
////////////////////////// Onload //////////////////////////
////////////////////////// Onload //////////////////////////
console.log("onload running")
// console.log("left width",left.getBoundingClientRect())
// middleLeftRight.forEach((val, key)=>{
//     val.style.width=left.getBoundingClientRect().left + left.getBoundingClientRect().width*1.5+"px"
//     // val.style.background= "green"
//     val.style.background= key==0?
//     `linear-gradient(90deg, navy ${left.getBoundingClientRect().left+left.getBoundingClientRect().width}px, transparent)`:
//     `linear-gradient(270deg, navy ${left.getBoundingClientRect().left+left.getBoundingClientRect().width}px, transparent)`;
// })
body.style.height=window.innerHeight+"px"

// planetList.style.left=mddlWidth/2-planetLi[0].getBoundingClientRect().width/2+"px"
// planetLi[1].style.width=liBaseWidth+(liBaseWidth*raitio[0]-liBaseWidth)+"px"
// planetLi[2].style.width=planetLi[1].getBoundingClientRect().width*raitio[1]+"px"
// planetLi[1].style.width=liBaseWidth+raitio[1]+"px"
// planetLi[2].style.width=planetLi[1].getBoundingClientRect().width*((150+raitio[2])/150)+"px"

// console.log("width",window.innerWidth)
// console.log("height",window.innerHeight)

// const earth=document.querySelector("svg");
// console.log("earth",earth.getAttribute("height"))
// const earthRadius=earth.getAttribute("height")/2

// satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().width/2-changeRatio*initAlt+"px"
satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().width/2-changeRatio*inputAlt.value/px+"px"

const makeStar=(num, classNum)=>{
    for(let i=0; i<=num; i++){
        // const randX=Math.ceil(Math.random()*(+window.innerWidth)-15)
        // const randY=Math.ceil(Math.random()*(+window.innerHeight)-15)
        const randX=(Math.random()*97)
        const randY=(Math.random()*97)
        const shineIntvl=Math.random()*5+3
        const div= 
        '<div class="star'+classNum+' star" style="top:'+randY+'%; left:'+randX+'%; animation-duration: '+shineIntvl+'s"></div>'
        // '<div class="star'+classNum+' star" style="top:'+randY+'px; left:'+randX+'px; animation-delay: '+shineIntvl+'s"></div>'
        // '<div class="star'+classNum+' star" style="top:'+randY+'px; left:'+randX+'px;"></div>'
        body.insertAdjacentHTML("beforeend",div)
    }
}

// makeStar(500, 1);
makeStar(50, 2);
// makeStar(400, 3);
makeStar(100, 4);
// planetImg.forEach(val=>{
//     val.style.height="192px"
// })
// saturn.querySelector("img").style.width=saturn.querySelector("img").getBoundingClientRect().width*1.77+"px"
// console.log("Onload strn width",saturn.querySelector("img").getBoundingClientRect().width)
saturn.querySelector(".planetImg").style.width="150%"
saturn.style.width="535px"
func(null,10)
scrollInput.value=scrollInput.max*9/(planetLi.length-1)
clickPlanetList(document.querySelector("li.Earth"))
console.log("init_Mass",mass)
checkSatelliteAlt()
}// End of window.onload
