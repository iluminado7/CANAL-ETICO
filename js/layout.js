window.addEventListener('scroll', () => {

  const header = document.querySelector('.header')

  if (window.scrollY >= 50) {
      header.classList.add('scroll-header')
  } else {
      header.classList.remove('scroll-header')
  }

})
function iniciarHeaderScroll(){

const header = document.querySelector(".header")

window.addEventListener("scroll",()=>{

if(window.scrollY >= 50){
header.classList.add("scroll-header")
}else{
header.classList.remove("scroll-header")
}

})

}
function iniciarMenuMobile(){

const toggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".nav-menu")

if(!toggle || !menu) return

toggle.addEventListener("click",()=>{

menu.classList.toggle("active")

})

}

fetch("layouts/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header-container").innerHTML = data
    iniciarMenuMobile()
    iniciarHeaderScroll()
})

fetch("layouts/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer-container").innerHTML = data
})