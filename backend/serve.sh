#!/bin/bash

cd /home/bk/inz/backend
source ./venv/bin/activate
python authservice/manage.py runserver&
cd testservice
python -m src.main&
