console.log("clicked")
function myFunction() {
   console.log(event.target.nextElementSibling)
   let nav=event.target.nextElementSibling
   if(nav.style.height==="100vh"){
       nav.style.height="0vh"  
       event.target.innerHTML="&#9776;"

   }
   else{
       nav.style.height="100vh"
       event.target.innerHTML="&times;"
      
   }
}