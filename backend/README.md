Backend para challenge técnico; Spring boot: V3.3.0;

Base de datos hecha en MySQL. Cree dos entidades utilizando Spring Data Jpa, las cuales fueron: Admin y Plantas; Configuré Spring Security, e implementé el manejo de JWT para la parte de seguridad del sistema. Solo agregué un rol, al cual le asigne el endpoint correspondiente, ya que no se solicitó agregar más roles;

Los endpoints públicos son:

-> http://localhost:8080/app/auth/login: el cual recibe un objeto JSON de tipo LoginRequest y devuelve el JWT con el token, el nombre, el acceso, y el rol del usuario; -> http://localhost:8080/app/auth/register: el cual recibe un objeto JSON de tipo RegisterRequest y devuelve un mensaje de error o confirmación para luego iniciar sesión;

Los endpoints privados son:

-> http://localhost:8080/app/admin/addPlant: recibe un objeto JSON de tipo PlantRequest y devuelve mensaje de confirmación o error;

-> http://localhost:8080/app/admin/{plant_id}/editPlant: recibe un objeto JSON de tipo Plant + el ID de la planta, lo busca en la base de datos, lo modifica, los actualiza y devuelve mensaje de confirmación o error;

-> http://localhost:8080/app/admin/{plant_id}/delPlant: recibe el ID de la planta, lo busca en la base de datos, si existe lo elimina y devuelve mensaje de confirmación o error;

-> http://localhost:8080/app/admin/plants: devuelve la lista de plantas en la base de datos en formato JSON;

-> http://localhost:8080/app/admin/{plant_id}/infoPlant: busca la planta por ID en la base de datos y devuelve los datos en formato JSON;
