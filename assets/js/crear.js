$("#formu").on("submit",function(){
    event.preventDefault();
    var name = $("#nom").val();
    var mail = $("#mail").val();
    var password = $("#pass").val();

    console.log(name);
    console.log(mail);
    console.log(password);
    console.log("Hola");
    $.post('/createUser',
    {
      nombre: name,
      password: password,
      mail: mail
    });

    window.alert("Usuario Registrado");
    window.location.href = "/homeUser";
  });
