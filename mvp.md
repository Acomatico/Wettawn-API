##Projecto: web/aplicacion meteorologica
###Alumno: Alejandro Rodriguez Seves
###Cliente: Empresas/particulares

###Vista 1: Registro/Login
    //Podria ser opcional, en caso de que sea una busqueda rapida
###Vista 2: El clima en la ciudad del usuario
    //Se pondra por tiempo/temperatura segun la hora del dia, idealmente
###Vista 3: Buscador de ciudades/viajes
    //buscar en cierto dia/hora,
    //en caso de que sea para un viaje se pondra el tiempo de estancia en la ciudad
    //si la ciudad no esta en la base de datos, se podria buscar la ciudad mas cercana o la ciudad de los alrededores con tiempo mas parecido
    //otras estadisticas
###Vista 4: resultados
    //ropa recomendada, tiempo usual en la epoca, link a amazon/zara/etc para comprar ropa
    //guardar resultados, y/o actualizarlos segun pase el tiempo (cada 4 horas por ejemplo)

###Flow tipico de usuario:
    -Cliente se registra -> se confirma su correo -> login
    -Clente elige la ciudad de residencia -> en su perfil aparecera el tiempo esperado
    -Cuando cliente busque el tiempo en otra ciudad le aparecera de manera similar a la de su propia ciudad;
    -Si el cliente busca para hacer un viaje se le dira segun los dias que eliga, actualizandose cada X tiempo (por ejemplo 24 horas)


####Tecnologias aplicadas: HTML, CSS, JavaScript, NodeJS, Angular, MongoDB