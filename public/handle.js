var socket = io.connect('http://localhost:3000');
socket.on('fail-register',()=>{
    alert('Tên đăng nhập đã trùng');
})

socket.on('new-user',()=>{
    $('#active-list').append(`<div class="user" id="the-host">hallo</div>`)

})
socket.on('active-user-list',()=>{
    $('#active-list').append(`<div class="user">helo</div>`)
})


socket.on('fail-Login',()=>{
    alert('Sai tên đăng nhập hoặc sai mật khẩu hoặc không tồn tại!!!');
})

socket.on('server-send-message-to-the-host',(message)=>{
    
    $('#message').append(`<div id='right-chat'>
                            <p>  ${message.message} </p>
                        </div>`)    
})


socket.on('server-send-message-to-users',(message)=>{
    $('#message').append(`<div id='left-chat'>
                            <h6> ${message.name} </h6>
                            <p>  ${message.message} </p>
                        </div>`)    
})

$(() => {
$('#text-chat').keydown(function(event){
    if(event.which === 13 && event.shiftKey == false){        
        socket.emit('Client-send-message',{           
            message:$("#text-chat").val()}
            ); 
            $("#text-chat").val("");
        event.preventDefault();    
    }
    })
    
})

$(document).ready(()=>{

        $("#btn-submit-login").click(()=>{   
            socket.emit('login',{
                username:$('#uname').val(),
                password: $('#pwd').val()
            });
            event.preventDefault();

    });
    $("#btn-register").click(()=>{      
        socket.emit('register',{
            username:$('#uname').val(),
            password: $('#pwd').val()
        })
        event.preventDefault();
        
    });
    $('#btn-register').click(()=>{
        window.location.assign('http://localhost:3000/register')
    })
    $('#btn-login').click(()=>{
        window.location.assign('http://localhost:3000/login')
    })
  });