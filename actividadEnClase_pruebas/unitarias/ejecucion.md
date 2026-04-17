Ejecución de pruebas

** Pruebas Unitarias

En carpeta backend:
> pytest
Resultado esperado:
pytest        
tests\test_api_health.py .                                                                      [  9%]
tests\test_trip_service_unit.py .                                                               [ 18%]
tests\test_trips_api.py ...                                                                     [ 45%]
tests\test_users_api.py ......                                                                  [100%]

---------- coverage: platform win32, python 3.12.10-final-0 ----------
Name                        Stmts   Miss  Cover   Missing
---------------------------------------------------------
app\api\trips.py               51     12    76%   54-55, 60-68, 79-80, 91-92, 97-98, 116
app\api\users.py               14      0   100%
app\core\config.py             10      0   100%
app\core\database.py           12      4    67%   14-18
app\main.py                    39     16    59%   19-21, 25-43, 48-50
app\models\domain.py           69      0   100%
app\repositories\trips.py      37     10    73%   41-42, 49-50, 53-58
app\repositories\users.py      13      0   100%
app\schemas\trips.py           55      3    95%   77-79
app\schemas\users.py           22      0   100%
app\services\trips.py         139     57    59%   52, 55-57, 60-65, 70, 116-133, 139, 142, 151-167, 185-187, 196-205, 208-211
app\services\users.py          41      2    95%   41, 55
---------------------------------------------------------
TOTAL                         502    104    79%

Required test coverage of 50% reached. Total coverage: 79.28%
================================================== 11 passed, 23 warnings in 3.39s ===================================================

Preguntas:
* ¿Cómo se mide la cobertura de código en un proyecto de Python o su lenguaje con pytest o la herramienta escogida?
- Para el caso de pytest se mide con la cantidad de líneas que se ejecutaron al correr las pruebas. En el informe se muestran las filas de código por archivo que no se ejecutaron.
* ¿Qué porcentaje de su código está cubierto por las pruebas? ¿Hay líneas o ramas de código que no se están probando?
- El porcentaje global de cobertura es 79%. Tenemos 5 archivos con cobertura del 100%. La cobertura más baja es 59% y aplica para los archivos de viajes (trips.py) pues son los que más funcionalidad tienen.

** Pruebas de aceptación.
- Si su aplicación funciona cuando un usuario hace clic en los botones. ¿Cómo podemos automatizar eso?
R/ Usamos herramientas de automatizacion web como Selenium, playwright o powerautomate.

> cd .\frontend\  
> npm install -D @playwright/test

Se crea el archivo de configuración para los test
> playwright.config.js

Se crea un test de página inicial:
> \frontend\tests\e2e\home.spec.js

Se ejecuta con (luego de agregar el comando en package.json del front)
> npm run test:e2e

Salida esperada:
> movilidad-frontend@1.0.0 test:e2e
> playwright test

Running 1 test using 1 worker
  ✓  1 tests\e2e\home.spec.js:3:1 › homepage loads (731ms)

  1 passed (4.2s)