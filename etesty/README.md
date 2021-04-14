## Konfiguracja MongoDB w projekcie

W przypadku błędów z odpowiedzią DNS lub niedostępnym backendem należy:

1. Zapewnić werjsę `django-2.2.20`
1. Zapewnić wersję `djongo-1.3.0`
1. Zapewnić wersję `pymongo-3.11.3`
1. **Ustawić DNS karty sieciowej na googlowski**: `8.8.8.8, 8.8.4.4`

Jeśli nadal nie działa:

1. Odinstaluj `django`, `djongo` i `pymongo`
1. Zainstaluj najnowszego `django` (`pip install django`)
1. Zainstaluj właściwą wersję `djongo` (`pip install djongo==1.3.0`)

**Ostatnio zadziałało C:**

Serwer z konsoli uruchamiamy:

```bash
python -m manage runserver
```

w foderze z plikiem `manage.py`.

> PLS FIX
