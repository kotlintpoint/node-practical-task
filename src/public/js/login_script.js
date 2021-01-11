const token=localStorage.getItem('token');
const user=localStorage.getItem('user')
if(token && user){
    window.location='/game.html'
}


document.querySelector("#loginForm").addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('loginForm')
    var email=document.querySelector("#email").value
    var password=document.querySelector("#password").value
    const data={email, password}
    fetch('/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((data) => {
        if(!data.token || !data.user){
            return alert('Login Fail!!!')
        }
        alert('Login Success')
        console.log(data.token)
        console.log(data.user) 
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user))
        window.location='/game.html'
    })
    .catch(e=>{
        console.log('error')
        console.log(e)
        alert('Login Fail!!! Try Again!!!')
    })

})