:: Buildi scripti joka buildaa frontendin, kopio dist kansion frontendistä ja siirtää sen
:: backendin kansioon


@ECHO OFF
:start
SET choice=
SET /p choice=Haluatko buildata frontendin ja siirtaa sen? [y/n]: 
IF NOT '%choice%'=='' SET choice=%choice:~0,1%
IF '%choice%'=='Y' GOTO yes
IF '%choice%'=='y' GOTO yes
IF '%choice%'=='N' GOTO no
IF '%choice%'=='n' GOTO no
IF '%choice%'=='' GOTO no
ECHO "%choice%" is not valid
ECHO.
GOTO start

:no
ECHO ***** Frontendia ei buildattu! *****
PAUSE
EXIT

:yes
ECHO ***** Frontend buildataan! *****
call npm run build
ECHO ***** Frontend buildattu! *****
PAUSE
ECHO ***** Frontend siirretaan! *****
robocopy C:\Selainohjelmointi\selainohjelmointi-frontend\dist C:\Selainohjelmointi\selainohjelmointi-backend-harkka\dist /E

ECHO ***** Frontend siirretty! *****
PAUSE
EXIT

