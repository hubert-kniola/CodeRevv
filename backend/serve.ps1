$path = $MyInvocation.MyCommand.Path

$path = Split-Path $path -Parent
cd $path 
./venv/Scripts/Activate.ps1

Start-Process -NoNewWindow python -ArgumentList "authservice/manage.py","runserver"
cd testservice
Start-Process -NoNewWindow python -ArgumentList "-m","src.main"
