export function serializeTemplate(body: string) {
  return `<!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap" rel="stylesheet">
  
    <style>
      * {
        font-family: 'Overpass', sans-serif;
      }
      html, body {
        background-color: #f4f6f8;
        margin: 0 !important;
        padding: 10px 0 !important;
      }
    </style>
  </head>
  
  <body style="margin: 0;padding: 20px 0;">
    <div style="width: 600px !important;margin: 0 auto;">
      <table style="border-spacing: 0 !important;width: 100%;max-width: 600px;">
          <tr style="height: 80px;">
            <td align="center" style="background-color: #f5f5f5;">
              <img src="https://appbpmaccountprod.blob.core.windows.net/public/appbpm/logo.png" width="180">
            </td>
          </tr>
          <tr align="center" style="height: 200px;background-color: #ffffff;">
            <td style="padding: 30px !important;color:#4d4d4d;font-size: 18px;font-weight: 300;">
              ${body}
            </td>
          </tr>
      </table>
    </div>
  </body>
  </html>`;
}

export function changePasswordText() {
  return `<!DOCTYPE html>
  <html lang="pt-br">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');
        </style>
  
    <style>
      * {
        font-family: 'Montserrat', sans-serif;
      }

      html,
      body {
        background-color: #f4f6f8;
        /* width: 100vw; */
        margin: 0;
        padding: 10px 0;
      }

      .container {
        /* width: 200px; */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .content {
        display: flex;
        align-items: center;
        flex-direction: column;
        /* width: 100%; */
        max-width: 600px;
        
      }

      .text {
        background-color: #ffffff;
        text-align: center;
        padding: 30px;
      }
      
      h1 {
          color: #707070; 
          font-weight: 400;
          font-size: 19px;
      }
      
      h2 {
         color: #707070; 
         font-weight: 600;
         font-size: 19px;
         margin-bottom: 20px;
      }
      
      .span-black {
          color: #000;
          font-weight: 900;
          text-decoration: none;
      }
      
      .container-paragraph {
          padding: 0 60px;
      }
      
      .text .container-paragraph p {
          color: #707070;
          font-weight: 400;
          font-size: 15px;
          margin-bottom: 30px;
      }
      
      .text .container-paragraph p span {
          font-weight: 600;
      }
      
      .content h3 {
          font-weight: 400;
          color: #707070;
          font-size: 19px;
          margin-bottom: 40px;
      }
      
      .content h3 .span-black {
        font-weight: 600;
      }

      button {
        border: none;
        text-decoration: none;
        background: #000;
        /* font-size: 15px; */
        font-weight: 600;
        color: #ffffff;
        height: 34px;
        width: 150px;
        box-shadow: 0px 3px 6px #00000054;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
      }

      table {
        border-spacing: 0;
        width: 100%;
        max-width: 600px;
      }

      @media only screen and (max-width: 768px) {
        .br {
         display: none;
        }

        h1 h2 h3 button {
          font-size: 16px;
        }

        p {
          font-size: 12px;
        }

        .container-paragraph {
          padding: 0 20px;
        }

        .text {
          padding: 8px;
        }
      }
      
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="content">
        <div class="logo">
          <img src="https://appbpmaccountprod.blob.core.windows.net/public/appbpm/logo.png" width="180">
        </div>
        <div class="text">
          <h1>Olá {{ username }}.</h1>
          <h2>Esqueceu sua senha? <br />Não se preocupe!</h2>      
          <h3>
            Para redefinir é simples, basta clicar <a href="{{ url }}" class="span-black">aqui</a> <br />ou clique no botão abaixo
          </h3>
  
          <a href="{{ url }}"><button>TROCAR SENHA</button></a>
        </div>
      </div>
    </div>
  </body>
</html>
`
}

export function passwordChangedText() {
  return `Olá {{ username }}.
  <br/><br/>Sua senha foi alterada com sucesso!`;
}

export function renewPasswordText() {
  return `<!DOCTYPE html>
  <html lang="pt-br">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');
        </style>
  
    <style>
      * {
        font-family: 'Montserrat', sans-serif;
      }

      html,
      body {
        background-color: #f4f6f8;
        /* width: 100vw; */
        margin: 0;
        padding: 10px 0;
      }

      .container {
        /* width: 200px; */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .content {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        max-width: 600px;
      }

      .text {
        background-color: #ffffff;
        text-align: center;
      }
      
      h1 {
          color: #707070; 
          font-weight: 400;
          font-size: 19px;
      }
      
      h2 {
         color: #707070; 
         font-weight: 600;
         font-size: 19px;
         margin-bottom: 20px;
      }
      
      .span-red {
          color: #FF002A;
          text-decoration: none;
      }
      
      .container-paragraph {
          padding: 0 60px;
      }
      
      .text .container-paragraph p {
          color: #707070;
          font-weight: 400;
          font-size: 15px;
          margin-bottom: 30px;
      }
      
      .text .container-paragraph p span {
          font-weight: 600;
      }
      
      .content h3 {
          font-weight: 600;
          color: #707070;
          font-size: 19px;
          margin-bottom: 40px;
      }

      button {
        border: none;
        text-decoration: none;
        background: #FF002A;
        /* font-size: 15px; */
        font-weight: 600;
        color: #ffffff;
        height: 34px;
        width: 150px;
        box-shadow: 0px 3px 6px #00000054;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
      }

      table {
        border-spacing: 0;
        width: 100%;
        max-width: 600px;
      }

      @media only screen and (max-width: 768px) {
        .br {
         display: none;
        }

        h1 h2 h3 button {
          font-size: 16px;
        }

        p {
          font-size: 12px;
        }

        .container-paragraph {
          padding: 0 20px;
        }
      }
      
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="content">
        <div class="logo">
          <img src="https://appbpmaccountprod.blob.core.windows.net/public/appbpm/logo.png" width="180">
        </div>
        <div class="text">
          <h1>Olá {{ username }}.</h1>
          <h2>Renove sua senha trimestral<br /> <span class="span-red">Para manter a plataforma sempre segura</span></h2>
          <div class="container-paragraph">
              <p>
                Adotamos como prática de preservação <br class="br" /> aos dados sensíveis dos nossos clientes, <br class="br" /> a renovação da senha de acesso<span class="span-grey"> a cada 90 dias.</span><br class="br" /> Para manter a integridade do nosso sistema e<br class="br" /> evitar possíveis acessos maliciosos.
              </p>
          </div>
          
          <h3>
              Acesse seu <a href="{{ url }}" class="span-red">perfil</a> ou clique no <br class="br" /> botão abaixo
          </h3>
  
          <a href="{{ url }}"><button>RENOVAR SENHA</button></a>
        </div>
      </div>
    </div>
  </body>
</html>
`;
}


