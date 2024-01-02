import { planetContainer,initAlt,satellite,px, imgWidth,planetLi,planetList,liBaseWidth,raitio,planetImg,scrollInput,plWidth2,saturn} from "./main.js"

const showInitParams = document.querySelector(".showInitParams")
const innerScale = document.querySelector(".innerScale")
const imgWidthPercent="84%"//Use the same value as CSS
const imgWidthPercentSaturn="123%"//Use the same value as CSS
const planetLiBGcolor1="none"// for testing purpose only
const planetLiBGcolor2="none"// for testing purpose only
const mddlWidth= +$(".middle").css("width").split("px")[0]


export const checkSatelliteAlt=()=>{
    showInitParams.style.top= +satellite.style.top.split("px")[0]>=70 ? "-40px":"30px"
}


export const inputAltChange=(num)=>{
    if(num/2){
        satellite.style.top=window.innerHeight/2-planetContainer.getBoundingClientRect().width/2-num/px+"px"
        $(".showInitAlt").text(parseInt(num).toLocaleString())
        initAlt.innerText=parseInt(num).toLocaleString()
        checkSatelliteAlt()
    }
}


export const convertNum=(num)=>{
    return `${(Math.round(100*num/(10**(num.toString().length-1))))/100}×10<sup>${num.toString().length-1}</sup>&nbsp;[km]`
}


export const makeStar=(num, classNum)=>{
    for(let i=0; i<=num; i++){
        const randX=(Math.random()*97)
        const randY=(Math.random()*97)
        const shineIntvl=Math.random()*5+3
        const div='<div class="star'+classNum+' star" style="top:'+randY+'%; left:'+randX+'%; animation-duration: '+shineIntvl+'s"></div>'
        document.querySelector("body").insertAdjacentHTML("beforeend",div)
    }
}


export const listBrowsing=(value,number,jsonData)=>{
    // value: range input value,
    // number: palnet number

    planetLi.forEach(val=>{
    
    // val.style.background="none"
    val.style.outline="none"
    val.querySelector(".forBoxShadow").style.boxShadow="none"
    // val.style.boxShadow="none"
    // val.style.zIndex="auto"
})
// forBoxShadow.forEach(val=>{
    
//     // val.style.background="none"
//     // val.style.outline="none"
//     // val.style.boxShadow="none"
//     // val.style.zIndex="auto"
// })

if((value==0 && !number)||number==1){// Leftmost li
    
    planetList.style.left=(mddlWidth-liBaseWidth)/2+"px"
    planetLi[1].style.width=liBaseWidth*raitio[0]+"px"
    planetLi[2].style.width=planetLi[1].getBoundingClientRect().width*raitio[1]+"px"
    
    planetImg[0].style.width=imgWidthPercent
    planetImg[1].style.width=imgWidthPercent
    planetImg[2].style.width=imgWidthPercent
    planetLi[0].style.backgroundColor=planetLiBGcolor1// for testing purpose only
    planetLi[1].style.backgroundColor=planetLiBGcolor1// for testing purpose only
    planetLi[2].style.background="none"

    innerScale.innerHTML=planetLi[0].querySelector(".diameter").innerHTML
    // innerScale.innerHTML=convertNum(data[pNames[0]].diameter)

    // console.log("change",e.target.value)
    // saturn.style.width=imgWidthPercentSaturn

    }else if((value==scrollInput.max && !number)||number==planetLi.length){// Rightmost li

        planetLi.forEach(val=>{
            val.style.width=liBaseWidth+"px"
        })

        planetList.style.left=(planetLi[planetLi.length-1].getBoundingClientRect().width+mddlWidth)/2-planetList.getBoundingClientRect().width+"px"
        planetLi[planetLi.length-1].style.backgroundColor=planetLiBGcolor1// for testing purpose only
        
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
                    const baseDis1=jsonData[planetLi[key-1].querySelector(".pName span").textContent].diameter
                    const baseDis2=jsonData[planetLi[key].querySelector(".pName span").textContent].diameter
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
        planetLi[number-1].style.outline="2px solid white"
        planetLi[number-1].querySelector(".forBoxShadow").style.boxShadow="inset 0 0 20px white, 0 0 30px white"
        // console.log("cntnr",planetContainerLi[0].querySelector("img").getBoundingClientRect())
        // console.log("cntnr",planetContainerLi[0].offsetHeight)
        // planetLi[number-1].querySelector(".forBoxShadow").style.height=planetLi[number-1].querySelector(".planetContainerLi").getBoundingClientRect().height+"px"
        // planetLi[number-1].querySelector(".planetContainerLi").style.zIndex=1
    }

}//const func=(value,number)