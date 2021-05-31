$path = $MyInvocation.MyCommand.Path

$path = Split-Path $path -Parent
cd $path 
./venv/Scripts/Activate.ps1

Start-Process -NoNewWindow python -ArgumentList "authservice/manage.py","runserver"
Start-Process -NoNewWindow python -ArgumentList "authservice/manage.py","process_tasks"
cd testservice
Start-Process -NoNewWindow python -ArgumentList "-m","src.main"
cd ..
