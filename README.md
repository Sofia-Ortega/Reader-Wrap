# ReaderWrap

## Backend Setup (Linux)

1. Go to backend folder

   - `cd backend`

2. Create + Acticate python env

   - `python3 -m venv venv`
   - `.\venv\Scripts\activate`

3. `pip install -r requirements.txt`

5. `sudo service postgresql start 18`

   ` sudo service postgresql status`

   ` sudo -i -u postgres`


4. `flask --app app run --debug`
