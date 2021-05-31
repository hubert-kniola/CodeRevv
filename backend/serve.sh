#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $SCRIPT_DIR
source ./venv/bin/activate
python authservice/manage.py runserver&
cd testservice
python -m src.main&
cd ..
