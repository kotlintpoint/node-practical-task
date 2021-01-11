const socket=io()

const user=JSON.parse(localStorage.getItem('user'))
const token=localStorage.getItem('token')
if(user===null){
    window.location.replace('/')
}
document.querySelector("#username").value=user.name
document.querySelector("#username").setAttribute('disabled','disabled')
//document.querySelector("#room").setAttribute('disabled','disabled')

document.querySelector("#form").addEventListener('submit',(e)=>{
    e.preventDefault()
    window.location=`/chat.html?token=${token}`
})

document.querySelector('#logout').addEventListener('click',()=>{
    console.log('Logout')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.replace('/')
})

