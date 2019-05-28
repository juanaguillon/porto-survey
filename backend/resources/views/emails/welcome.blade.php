<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Un gran correo.</title>
</head>

<body>
  <table width="500" align="center" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td width="500" height="56" valign="top">&nbsp;</td>
    </tr>
    <tr>
      <td height="134" valign="top">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="500" height="150" align="center" valign="top"><img src="http://localhost/images/logo_porto.png" width="337" height="150" /></td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>

      <td height="134" valign="top">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="500" height="134" valign="top" style="font-size: 14px; font-family: Arial, Helvetica, sans-serif; ">
              <p align="center">Formulario enviado desde el website <a href="{{ env('URL_PATH') . '/#/questions' }}">Porto Survey</a>
              </p>
              <table width="384" border="1" align="center" cellpadding="3" cellspacing="0" bordercolor="#000" style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">

                <tr>
                  <td width="84"><span><strong>Nombre</strong></span></td>
                  <td width="251"><span>{{ $name }}</span></td>
                </tr>
                <tr>
                  <td width="84"><span><strong>Apellido</strong></span></td>
                  <td width="251"><span>{{ $lastname }}</span></td>
                </tr>

                <tr>
                  <td><span><strong>Email</strong></span></td>
                  <td><span>{{ $email }}</span></td>
                </tr>

                <tr>
                  <td><span><strong>Teléfono</strong></span></td>
                  <td><span>{{ $phone }}</span></td>
                </tr>

                <tr>
                  <td width="84"><span><strong>Residencia</strong></span></td>
                  <td width="251"><span>{{ $place_reside }}</span></td>
                </tr>


                <tr>
                  <td width="84"><span><strong>Medio de Llegada</strong></span></td>
                  @switch( $red_come )
                  @case('red_social')
                  <td width="251"><span>Red Social</span></td>
                  @break
                  @case('referido')
                  <td width="251"><span>Referido</span></td>
                  @break
                  @case('publicidad')
                  <td width="251"><span>Publicidad</span></td>
                  @break
                  @case('other')
                  <td width="251"><span>Otro Medio</span></td>
                  @break
                  @default
                  <td width="251"><span>Error de medio.</span></td>
                  @endswitch
                </tr>
                <tr>
                  <td width="84"><span><strong>Puntaje</strong></span></td>
                  <td width="251"><span>{{ $rating }}</span></td>
                </tr>

              </table>
          <tr>
            <!--<td align="center" valign="top"><p style="font-family:Tahoma, Geneva, sans-serif"><a href="https://www.myqorg.com/contactos/recibidos.php">Ver el informe de los contactos recibidos</a> </p></td>-->
          </tr>

          <p>&nbsp;</p>
      </td>
    </tr>
  </table>
  </td>
  </tr>
  </table>
</body>

</html>