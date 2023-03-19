
function ShowHideSel(name,n){
    var hdel = document.getElementById(name)
    if (n==1){
    hdel.setAttribute('visibility','visible')
    } else {
        hdel.setAttribute('visibility','hidden')
    }
}

function getVisString(visComp)
{
  var visArr = []  
 // console.log(visComp)  
  visComp.split('.').forEach(v=>{
    if (v=='0')
      {visArr.push("hidden")
    } else {visArr.push("visible")}
  })
  //console.log(visArr)  
  return visArr
}

function SetSelVis(inx,visComp){    
  var visArr = getVisString(visComp)
   document.getElementById("sLine").style.visibility = visArr[0]
   document.getElementById("tipSelect").style.visibility = visArr[1];
   document.getElementById("postavSelect").style.visibility = visArr[2];
   document.getElementById("clientSelect").style.visibility = visArr[3]
   document.getElementById("calend").style.visibility = visArr[4]
  }

function setFormCaption (inx) {  
  var txt = document.getElementById("rgCapt_"+inx).innerText;
  //console.log(txt)
  var el = document.getElementById("searchBy")
  el.innerText = txt
  }


function rgClick(inx,visComp) {
      var hdel = document.getElementById('seekNo')
      hdel.setAttribute('value',inx)      
      SetSelVis(inx,visComp)
      setFormCaption(inx)
    }

function setSearchPage(){  
  var repID = document.getElementById("repID")
  var hdel = document.getElementById('seekNo')  
  repID.setAttribute('value',hdel.value)    
}

function reverseDate(dtx,dt){
  var dtx = document.getElementById(dtx).value
  var hdel = document.getElementById(dt)
  var val = dtx.split('-').reverse().join('.')
  hdel.setAttribute('value',dtx) //for reverse change: dtx-->val
}

//function tapMenuOpen(){        
//    jQuery(function(){
//      $('.tap-target').tapTarget('open');                
//    });
//}

function ComponentVisibility(id,vis){
  var elm = document.getElementById(id)
  if (elm){
    elm.setAttribute("style",`visibility:${vis}`);    
  }
}

function showPOPUP(msg) {
  ComponentVisibility('popup','visible')
  document.getElementById('popup_text').innerText = msg
  console.log(msg)
  setInterval(() => {
    $('#popup').hide(1500)
  }, 1000);
  }