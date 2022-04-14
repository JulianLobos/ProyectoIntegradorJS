ingreso = false;
menu = true;
let newAccBtn = document.getElementById('newAccount');
let accCreated = document.getElementById('accCreated');
let hasAcc = document.getElementById('hasAcc');
let loginBtn = document.getElementById('entrarBtn');
let users = [
    {
        username: 'julian',
        password: 'lobos'
    },
    {
        username: 'baltazar',
        password: 'salomon'
    },
    {
        username: 'user',
        password: 'user'
    }
]

function login(){
    event.preventDefault();
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    if(users.some((el) => el.username === username && el.password === password)){
        document.location.href = 'home.html';
    }else{
        document.getElementById('errorText').style.display='block';
    }
}

function crear(){
    event.preventDefault();
    let newUser = document.getElementById('newUser').value;
    let newPass = document.getElementById('newPass').value;
    if(newUser != '' && newPass != ''){
        users.unshift({
            username: newUser,
            password: newPass
        });
        document.getElementById('exitoText').style.display='block';
        document.getElementById('errorText2').style.display='none';
    }else{
        document.getElementById('errorText2').style.display='block';
    }
}

function mostrarLogin(num){
    document.getElementById('section1').style.display='none';
    document.getElementById('section2').style.display='none';
    document.getElementById('section'+num).style.display='flex'
}

newAccBtn.onclick = () => {mostrarLogin('2');};
accCreated.onclick = () => {mostrarLogin('1');};
hasAcc.onclick = () => {mostrarLogin('1')};
loginBtn.onclick = () => {login()};
