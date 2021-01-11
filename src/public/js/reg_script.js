document.querySelector("#signUpForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    var name=document.querySelector("#name").value
    var email=document.querySelector("#email").value
    var password=document.querySelector("#psw").value
    var age=document.querySelector("#age").value

    const user= {name, email, password, age}
    
    fetch('/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(user)
    })
    .then((response) => {
        console.log('response')
        return response.json()})
    .then((data) => {
        if(!data.token || !data.user){
            return alert('User Registration Fail!!! Enter Detail Properly and Try Again!!!')
        }
        alert('Registration Success')
        console.log(data.token)
        console.log(data.user) 
        localStorage.setItem('token',data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        window.location='/game.html'   
    })
    .catch(e=>{
        console.log('error')
        console.log(e)
    })
})

