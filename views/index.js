function openmenu()
{
 const menuIcon=document.getElementById("menuIcon")
      let menu=document.getElementById("menu")
     //  menu.style.width="80%"
      if(menu.style.height==="100vh"){
         
         menuIcon.innerHTML="&#9776;"
         menu.style.height="0vh"
      }else{
         menuIcon.innerHTML="&times;"
         menuIcon.style.transform="scale(1.3)"
         menu.style.height="100vh"
      }
}
