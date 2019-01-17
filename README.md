# Code Challenge

### 1. Foreword

I built the Web Application using the following technologies:
* React (Frontend components)
* Redux (Frontend skeleton & interactions)
* Django (Backend)
* Django Rest Framework (API Interface)
* SQLITE (Database)

> There're several **Screenshots** available in the `screenshots` folder!

Please notice that in order to run it you will have to execute a few commands first. We'll see them in the
next section.


### 2. Installation

> For the purpose of this section, we assume that `python3`, `pip` and `npm` are already installed.

2.0 Clone the repository and get inside
```bash
git clone https://github.com/javidgon/alpaca-code-challenge.git && cd alpaca-code-challenge
```

2.1 Install pip dependencies
```bash
pip install -r requirements.txt
```

2.2 Install npm dependencies
```bash
npm install
```

2.3 Compile Frontend
```bash
npm run dev
```

2.4 Run migrations
```bash
python manage.py migrate
```

2.5 Run server
```bash
python manage.py runserver
```

2.6 After this, the application should be visible in http://127.0.0.1:8000

### 3. Tests

```python
python manage.py test
```

### 4. Final words

If there's any problem, please let me know and I will be happy to help out! :)