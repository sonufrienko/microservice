![](microservice.png)

# Ready to use Node.js microservice


## Built with
- Node.js
- Fastify
- DotEnv
- MongoDB (native driver)
- Sequelize + Sequelize CLI + PosttgreSQL
- ESLinter + Prettier + Husky


## Todo
- [ ] Debuging
- [ ] Testing
- [ ] Logging
- [ ] Compress
- [ ] JWT


## Getting Started
```shell
git clone https://github.com/sonufrienko/microservice api
cd api
mv .env.example .env
npm install
npm start
```


## Running SQL database migrations
```shell
npx sequelize db:migrate
```

## Environment variables

Name | Value
------------ | -------------
PORT|4000
LOG_LEVEL|info
DEBUG|*
MONGO_HOST|127.0.0.1
MONGO_PORT|27017
MONGO_DB|test
MONGO_USER|
MONGO_PASS|
MONGO_URL|
SQL_HOST|127.0.0.1
SQL_HOST_READ|127.0.0.1
SQL_HOST_WRITE|127.0.0.1
SQL_PORT|5432
SQL_DB|test
SQL_USER|postgres
SQL_PASS|
SQL_DIALECT|postgres
SQL_POOL_LIMIT|100

## Structure

```
.
├── config                  # App configuration files
│   ├── sequelize.js        # sequelize config
│   ├── serviceOne.js       # ServiceOne config
│   └── ...                 # Other configurations
├── db                      # Data access stuff
│   ├── migrations          # Migrations
│   ├── models              # Models
│   ├── seeds               # Seeds
│   └── mongo.js            # MongoDB instantiation
│   └── sequelize.js        # Sequelize (PostgresSQL/MySQL) instantiation
├── docs                    # Documentation
├── routes                  
│   ├── controllers         # Request managers
│   ├── middlewares         # Request middlewares
│   └── routes.js           # Define routes and middlewares here
├── scripts                 # Standalone scripts for dev uses
├── services                # External services implementation   
│   ├── serviceOne
│   └── serviceTwo
├── tests                   # Testing
├── utils                   # Util libs (formats, validation, etc)
├── .env                    # Environment variables
├── .sequelizerc            # Sequelize CLI config
├── app.js                  # App starting point
├── Dockerfile              # Dockerfile
├── process.json            # pm2 init
├── package.json           
└── README.md         
```