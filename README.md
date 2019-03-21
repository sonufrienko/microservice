# microservice
REST API build with Node.js


## Built with
- Node.js
- Fastify
- DotEnv
- MongoDB (native drive)
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