# sudanIatiDatastoreAnalice

Analisis de datos de iatidatastore.iatistandard.org enfocado en sudan

El proyecto esta desplegado en Cloud Functions con nodejs

Se ha habilitado el endpoint en ... https://...

para el cual se puede usar los siguientes parametros de consulta
con x-www-form-urlencoded por POST por ejemplo con PostMan
https://www.postman.com/

usa type en 'year' lo cual especifica que la accion que quieres hacer es analizar los datos por año

```
type:string "year"
```

usa "save" en 'true' si quieres obtener los datos guardados en la base de datos y usalo en 'false' si quieres obtenerlos de la api de iatidatastore

```
save:boolean true
```

usa "year" para especificar el año del cual quieres la informacion

```
year:number 2020
```

usa "showBudgets" si quieres mostrar todos los datos individuales en la respuesta

```
showBudgets:boolean true
```

usa "update" en true si quieres actualizar la basede datos con los nuevos datos obtenidos desde el Api de iatidatastore

```
update:booleantrue
```
