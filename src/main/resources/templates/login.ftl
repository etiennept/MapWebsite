<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/static/style.css"/>
        <!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossorigin="anonymous"></script> -->
    </head>
    <body>
        <form id="form" action="/login" method="post">
            <label> Email:
                <input type="text" name="email" value ="${user.email}" /></label>
            <label> Password:
                <input type="password" name="password" value="${user.password}" /></label>
            <input type="submit" value="Login"/>
        </form>
        <a href="/register"> Register</a>
    </body>
</html>