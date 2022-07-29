import psycopg2
import operator

def serieVista(con, idSerie, nombreSerie):
    cursor = con.cursor()
    query = "UPDATE series SET finish_date = %s, last_ep = %s, num_last_ep = %s, last_seen_ep = %s WHERE id = %s"
    texto = "Ingrese la fecha en la que finalizó " + nombreSerie + " (dd-mm-yyyy): "
    fecha = input(texto)
    stringCap = input("Ingrese la temporada y capitulo del último episodio que vio (Ej: 5x12): ")
    numCap = int(input("Ingrese el número de capítulo total al que corresponde (Ej: 46): "))

    cursor.execute(query, (fecha, stringCap, numCap, stringCap, idSerie))
    con.commit()

    print("\n" + nombreSerie + " marcada como finalizada el " + fecha)


def eliminarPersonaje(con, idSerie):
    cursor = con.cursor()
    query = "SELECT id, name FROM characters WHERE series_id = %s ORDER BY id"
    cursor.execute(query, (idSerie, ))
    personajes = {}
    
    for id, nombre in cursor.fetchall():
        personajes[id] = nombre
        print(str(id) + "." + " " + nombre)

    idPersonaje = int(input("Seleccione el id del personaje a eliminar: "))
    texto = "Está seguro que desea eliminar " + personajes[idPersonaje] + "? s/n: "
    i = input(texto)
    if i == "s":
        query = "DELETE FROM characters WHERE id = %s"
        cursor.execute(query, (idPersonaje, ))
        print("\nPersonaje eliminado con éxito")
        con.commit()
    else:
        print("\nPersonaje no eliminado")


def eliminarSerie(con):
    cursor = con.cursor()
    cursor.execute("SELECT id, name FROM series ORDER BY id")
    series = {}

    for id, nombre in cursor.fetchall():
        series[id] = nombre
        print(str(id) + "." + " " + nombre)

    idSerie = int(input("Seleccione el id de la serie a eliminar: "))
    texto = "Está seguro que desea eliminar " + series[idSerie] + "? s/n: "
    i = input(texto)
    if i == "s":
        query = "DELETE FROM series WHERE id = %s"
        cursor.execute(query, (idSerie, ))
        con.commit()
        print("\nSerie eliminada con éxito")
    else:
        print("\nSerie no eliminada")
    
    
def votosPersonajes(con, idSerie, nombreSerie):

    cursor = con.cursor()
    query = "SELECT p.name, p.votes FROM series s INNER JOIN characters p on s.id = p.series_id WHERE p.series_id = %s ORDER BY p.votes DESC"
    cursor.execute(query, (idSerie, ))
    total = 0
    print("\nVotos de " + nombreSerie)
    for nombre, votos in cursor.fetchall():
        print(nombre + ": " + str(votos))
        total += votos

    print("Total de votos: " + str(total) + "\n")

def annadirVoto(con, idSerie):

    cursor = con.cursor()
    query = "SELECT id, name FROM characters WHERE series_id = %s ORDER BY id"
    cursor.execute(query, (idSerie, ))
    personajes = {}
    contador = 1
    for id, nombre in cursor.fetchall():
        personajes[contador] = [id, nombre]
        print(str(contador) + "." + " " + nombre)
        contador += 1

    eleccion = int(input("Seleccione el id del personaje a elegir: "))
    idPersonaje = personajes[eleccion][0]
    nombrePersonaje = personajes[eleccion][1]
    print("\nPersonaje seleccionado: " + nombrePersonaje)
    cantidadVotos = int(input("\nIngrese la cantidad de votos a agregar: "))
    cursor.execute("UPDATE characters SET votes = votes+ %s WHERE id = %s", (cantidadVotos, idPersonaje))
    con.commit()
    
def annadirSerie(con):
    nombre = input("Ingrese el nombre de la serie a añadir, ingrese 0 para cancelar: ")
    if nombre == "0":
        return 0
    fechaInicio = input("Ingrese la fecha en la que inicia a verla (dd-mm-yyyy), 0 si no sabe: ")
    cursor = con.cursor()
    
    if fechaInicio != "0":    
        query = "INSERT INTO series (name, start_date) VALUES (%s,%s)"
        cursor.execute(query, (nombre, fechaInicio))
        con.commit()
    else:
        query = "INSERT INTO series (name) VALUES (%s)"
        cursor.execute(query, (nombre, ))
        con.commit()
    print("\nSe añadió la serie con éxito\n")

def annadirPersonaje(con, idSerie):
    nombre = input("Ingrese el nombre del personaje a añadir, 0 para cancelar: ")
    if nombre == "0":
        return 0
    
    cursor = con.cursor()
    query = "INSERT INTO characters (series_id, name, votes) VALUES (%s, %s, %s)"
    cursor.execute(query, (idSerie, nombre, 0))
    con.commit()
    print("Se añadió el personaje con éxito")

def actualizarUltimoCapituloVisto(con, idSerie):
    ultimoCapituloVisto = input("Ingrese el último capítulo que vio, 0 para cancelar (Ej: 5x12): ")
    if ultimoCapituloVisto == "0":
        return

    cursor = con.cursor()
    query = "UPDATE series SET last_seen_ep = %s where id = %s"
    cursor.execute(query, (ultimoCapituloVisto, idSerie))
    query = "UPDATE series SET last_ep = %s where id = %s and finish_date is null"
    cursor.execute(query, (ultimoCapituloVisto, idSerie))
    con.commit()
    print("Se actualizó el último capítulo visto al " + ultimoCapituloVisto)

def ultimoCapVisto(con, idSerie):
    cursor = con.cursor()
    query = "SELECT last_seen_ep FROM series WHERE id = %s"
    cursor.execute(query, (idSerie, ))
    print(cursor.fetchone()[0])
    """
    for capFinal in cursor.fetchall():
        print("\nÚltimo capítulo visto: " + capFinal)"""
    
def menuSerie(con):

    print("\n1. Todas las series")
    print("2. Series que está viendo")
    print("0. Salir")
    eleccion = int(input("Seleccione la opción: "))
    cursor = con.cursor()
    if eleccion == 1:
        cursor.execute("SELECT id, name FROM series ORDER BY name")
    elif eleccion == 2:
        cursor.execute("SELECT id, name FROM series WHERE finish_date is null and start_date is not null ORDER BY name")
    else:
        return
    
    series = {}
    contador = 1
    print("")
    for id, nombre in cursor.fetchall():
        series[contador] = [id, nombre]
        print(str(contador) + "." + " " + nombre)
        contador += 1

    eleccion = int(input("Seleccione el id de la serie a elegir: "))
    idSerie = series[eleccion][0]
    nombreSerie = series[eleccion][1]
    i = 1

    while i!=0:
        print("\n" + nombreSerie)
        print("1. Añadir personaje")
        print("2. Añadir voto")
        print("3. Ver TOP Votos de personaje")
        print("4. Eliminar personaje")
        print("5. Último capítulo visto?")
        print("6. Actualizar último capítulo visto")
        print("7. Marcar serie como vista")
        print("0. Salir")
        i = int(input("Ingrese una elección: "))
        
        if i == 1:
            annadirPersonaje(con, idSerie)

        elif i == 2:
            annadirVoto(con, idSerie)

        elif i == 3:
            votosPersonajes(con, idSerie, nombreSerie)
        
        elif i == 4:
            eliminarPersonaje(con, idSerie)

        elif i == 5:
            ultimoCapVisto(con, idSerie)
        
        elif i == 6:
            actualizarUltimoCapituloVisto(con, idSerie)

        elif i == 7:
            serieVista(con, idSerie, nombreSerie)

def topCapitulosVistos(con):
    cursor = con.cursor()
    query = "select s.name, sum(p.votes) capitulos_vistos, s.num_last_ep \
	from series s \
		left join characters p on s.id = p.series_id \
		group by s.name, s.num_last_ep order by capitulos_vistos desc"
    cursor.execute(query)
    dicSeries = {}
    for nombre, capitulos, capFinal in cursor.fetchall():
        if capitulos is not None and capFinal is not None:
            if capitulos > capFinal:
                dicSeries[nombre] = capitulos
                continue
            dicSeries[nombre] = capFinal
            continue
        if capitulos is None:
            dicSeries[nombre] = capFinal
        else:
            dicSeries[nombre] = capitulos
    seriesOrdenadas = sorted(dicSeries.items(), key=operator.itemgetter(1), reverse=True)
    print("\nSeries con más capítulos vistos")
    for nombre, capitulos in seriesOrdenadas:
        print(nombre + ": " + str(capitulos))

def topPromedioActuales(con):
    cursor = con.cursor()
    query = "select s.name, s.last_seen_ep, to_char(s.start_date, 'dd-mm-yyyy') start_date, \
        to_char((select last_modification from stats), 'dd-mm-yyyy') fecha_actual, sum(c.votes) capitulos_vistos, \
        ((select last_modification from stats)-start_date)+1 as dias_totales,  \
        TRUNC(sum(c.votes)::decimal/(((select last_modification from stats)-s.start_date)+1), 2) promedio_dia \
        from series s inner join characters c on s.id = c.series_id where s.finish_date is null and s.start_date is not null group by s.id order by promedio_dia desc"
    cursor.execute(query)
    print("\nPromedio de capitulos vistos al día\n")
    for nombre, last_seen_ep, fechaInicio, fechaActual, capitulosVistos, diasTotales, promedio in cursor.fetchall():
        print(nombre)
        print("Fecha de inicio: " + str(fechaInicio))
        print("Al día " + str(fechaActual) + " se han visto " + str(capitulosVistos) + " capítulos en " + str(diasTotales) + " dias; Promedio al día: " + str(promedio) + " capítulos")
        print("Último capítulo visto: " + last_seen_ep + "\n")

def topPromedio(listaSeries):
    print("\nPromedio de capítulos vistos al día\n")

    for serie, inicio, final, capVistos, diasViendo, promedio, serieVista, diasDesdeInicio, diasDesdeFinal, capFinalString in listaSeries:
        print(serie)
        print("Fecha de inicio: " + str(inicio))
        if serieVista:
            print("Fecha de finalización: " + str(final))
            print("Se vieron " + str(capVistos) + " capítulos en " + str(diasViendo) + " dias; Promedio al día: " + str(promedio) + " capítulos\n")
        else:
            print("Fecha actual: " + str(final))
            print("Se han visto " + str(capVistos) + " capítulos en " + str(diasViendo) + " dias; Promedio al día: " + str(promedio) + " capítulos")
            print("Serie no terminada aún\n")

def topDiasTotales(listaSeries):
    print("\nDías viendo la serie\n")
    for serie, inicio, final, capVistos, diasViendo, promedio, serieVista, diasDesdeInicio, diasDesdeFinal, capFinalString in listaSeries:
        print(serie)
        if serieVista:
            print(f'Se vio durante {str(diasViendo)} días, desde el {str(inicio)} hasta el {str(final)}\n')
        else:
            print(f'Se ha visto durante {str(diasViendo)} días, desde el {str(inicio)} hasta el {str(final)}')
            print("Serie no terminada aún\n")

def topDiasInicio(listaSeries):
    print("\nDias pasados desde que se vio el primer capitulo de una serie\n")

    for serie, inicio, final, capVistos, diasViendo, promedio, serieVista, diasDesdeInicio, diasDesdeFinal, capFinalString in listaSeries:
        print(serie)
        print(f'Han pasado {str(diasDesdeInicio-1)} días desde que vio el primer capítulo, el día {str(inicio)}\n')

def topDiasFinal(listaSeries):
    print("\nDias pasados desde que se vio el último capitulo de una serie\n")

    for serie, inicio, final, capVistos, diasViendo, promedio, serieVista, diasDesdeInicio, diasDesdeFinal, capFinalString in listaSeries:
        if diasDesdeFinal != -1:
            print(serie)
            print(f'Han pasado {str(diasDesdeFinal-1)} días desde que vio el último capítulo disponible en ese entonces, el {capFinalString} el día {str(final)}\n')

def menuTopSeries(con):
    eleccion = 1
    query = "select s.name, to_char(s.start_date, 'dd-mm-yyyy') inicio, to_char(s.finish_date, 'dd-mm-yyyy') final, \
            to_char((select last_modification from stats), 'dd-mm-yyyy') fecha_actual, s.num_last_ep, \
            sum(c.votes) capitulos_vistos, (s.finish_date-s.start_date)+1 as dias_viendola, \
            ((select last_modification from stats)-s.start_date)+1 as dias_desde_inicio, \
            TRUNC(s.num_last_ep::decimal/((s.finish_date-s.start_date)+1), 2) promedio_dia, \
            TRUNC(sum(c.votes)::decimal/(((select last_modification from stats)-s.start_date)+1), 2) promedio_dia_actual, \
            ((select last_modification from stats)-s.finish_date)+1 as dias_desde_final, \
            s.last_ep \
            from series s left join characters c on s.id = c.series_id where s.start_date is not null \
            group by s.id"
    cursor = con.cursor()
    cursor.execute(query)
    listaSeries = []

    for serie, inicio, final, fechaActual, capFinal, capVistos, diasViendo, diasInicio, promedioDiaFinal, promedioDiaActual, diasDesdeFinal, capFinalString in cursor.fetchall():
        if final is not None:
            listaSeries.append((serie, inicio, final, capFinal, diasViendo, promedioDiaFinal, True, diasInicio, diasDesdeFinal, capFinalString))
        else:
            listaSeries.append((serie, inicio, fechaActual, capVistos, diasInicio, promedioDiaActual, False, diasInicio, -1, capFinalString))
            print(serie)

    while eleccion != 0:
        print("\nElija por que dato quiere ordenar todas las series")
        print("1. Promedio de capítulos vistos al día")
        print("2. Días totales viendo la serie")
        print("3. Días desde que inició la serie")
        print("4. Días desde que finalizó la serie")
        print("0. Salir")
        eleccion = int(input("Ingrese su elección: "))
        
        if eleccion == 1:
            topPromedio(sorted(listaSeries, key=operator.itemgetter(5), reverse=True))
        
        elif eleccion == 2:
            topDiasTotales(sorted(listaSeries, key=operator.itemgetter(4), reverse=True))
        
        elif eleccion == 3:
            topDiasInicio(sorted(listaSeries, key=operator.itemgetter(7), reverse=True))
        
        elif eleccion == 4:
            topDiasFinal(sorted(listaSeries, key=operator.itemgetter(8), reverse=True))
        

def topVotosPersonajes(con):
    cursor = con.cursor()
    query = "select s.name, p.name, p.votes from characters p inner join series s on p.series_id = s.id order by p.votes desc"
    cursor.execute(query)
    print("\nTop personajes más votados\n")
    i = 1
    for nombreSerie, nombrePersonaje, votos in cursor.fetchall():
        print(str(i) + ": " + str(votos) + " votos; " + nombrePersonaje + " de " + nombreSerie + "\n")
        i += 1

def topVotosPersonajesXSerie(con):
    cursor = con.cursor()
    query = "select s.name, p.name, p.votes from \
	series s inner join characters p on s.id = p.series_id \
	inner join (select s.id idSe, MAX(p.votes) maximo from \
	series s inner join characters p on s.id = p.series_id \
	group by s.id) as sd on s.id = sd.idSe and p.votes = maximo \
	order by votes desc"
    cursor.execute(query)
    print("\nTop personajes más votados por serie\n")
    i = 1
    for nombreSerie, nombrePersonaje, votos in cursor.fetchall():
        print(str(i) + ": " + str(votos) + " votos; " + nombrePersonaje + " de " + nombreSerie + "\n")
        i += 1

def menuEstadisticas(con):
    i = 1

    while i!=0:
        print("\nEstadísticas")
        print("1. Series con más capítulos vistos")
        print("2. Ordenar series por datos")
        print("3. Capitulos promedio al día de las series que se están viendo")
        print("4. Top personajes con más votos de todas las series")
        print("5. Top personajes con más votos por serie")
        print("0. Salir")
        i = int(input("Ingrese una elección: "))
        
        if i == 1:
            topCapitulosVistos(con)

        elif i == 2:
            menuTopSeries(con)
        
        elif i == 3:
            topPromedioActuales(con)

        elif i == 4:
            topVotosPersonajes(con)

        elif i == 5:
            topVotosPersonajesXSerie(con)

def actualizarFecha(con):
    cursor = con.cursor()
    query = "UPDATE stats set last_modification = %s"
    fecha = input("Ingrese la fecha: ")
    cursor.execute(query, (fecha, ))
    con.commit()

def main():
    # Set your connection
    conexion = psycopg2.connect("host=localhost dbname=reactSERIES user=? password=?")

    i = 1

    while i!=0:
        print("\nMenu Principal")
        print("1. Añadir serie")
        print("2. Seleccionar serie")
        print("3. Eliminar serie")
        print("4. Estadisticas de series")
        print("5. Actualizar última fecha de visualización")
        print("0. Salir")
        i = int(input("Ingrese una elección: "))
        
        if i == 1:
            annadirSerie(conexion)

        elif i == 2:
            menuSerie(conexion)

        elif i == 3:
            eliminarSerie(conexion)
        
        elif i == 4:
            menuEstadisticas(conexion)

        elif i == 5:
            actualizarFecha(conexion)

    conexion.close()

main()

