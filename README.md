![](microservice.png)

# Ready to use Node.js microservice

## Features
- **Framework**: Express
- **Authentication**: JWT with public/private key file
- **Database**: MongoDB (Native), PostgreSQL (Sequelize)
- **Code**: ESLint, Prettier, Husky
- **Debuging**: Debug, VS Code configurations
- **Logging**: Winston
- **Testing**: Jest, SuperTest, AutoCannon
- **Continuous Integration**: GitHub Actions + Docker Compose
- **Other**: PM2, DotEnv
- Well structured
- API versioning
- Request Validation

## Getting Started
```shell
git clone https://github.com/sonufrienko/microservice
cd microservice

# Create environment variables from example
mv .env.example .env

# Generate JWT keys
ssh-keygen -t rsa -b 2048 -q -N '' -m PEM -f private.key \
&& rm private.key.pub \
&& openssl rsa -in private.key -pubout -outform PEM -out public.key

# Install all dependencies
npm install

# Run on port 4000
npm start
```


## Running SQL database migrations
```shell
npx sequelize db:migrate
```

## Start with PM2
```shell
pm2 start process.json
```

## Start with Docker
```shell
# Generate JWT keys
ssh-keygen -t rsa -b 2048 -q -N '' -m PEM -f private.key \
&& rm private.key.pub \
&& openssl rsa -in private.key -pubout -outform PEM -out public.key

# Build image
docker build -t app/microservice:v1 .

# Run on port 4000
docker run -p 4000:4000 -d --name microservice app/microservice:v1

# Run on host network
docker run -d --name microservice --network=host app/microservice:v1
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
│   └── ...                 # Other configurations
├── db                      # Data access stuff
│   ├── migrations          # Migrations
│   ├── models              # Models
│   ├── seeds               # Seeds
│   └── mongo.js            # MongoDB instantiation
│   └── sequelize.js        # Sequelize (PostgresSQL/MySQL) instantiation
├── docs                    # Documentation
├── helpers                 # Helpers (formats, validation, etc)
├── routes                  
│   ├── controllers         # Request managers
│   ├── middlewares         # Request middlewares
│   └── routes.js           # Define routes and middlewares here
├── scripts                 # Standalone scripts for dev uses
├── services                # External services implementation   
│   ├── serviceOne
│   └── serviceTwo
├── tests                   # Testing
├── .env                    # Environment variables
├── .sequelizerc            # Sequelize CLI config
├── app.js                  # App starting point
├── Dockerfile              # Dockerfile
├── process.json            # pm2 init
├── package.json
├── private.key             # Sign tokens
├── public.key              # Validate tokens
└── README.md         
```