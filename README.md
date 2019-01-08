# microservice
REST API build with Node.js


## Getting Started
```shell
git clone https://github.com/sonufrienko/microservice api
cd api
mv .env.example .env
npm install
npm start
```


## Structure

```
.
├── config                  # App configuration files
│   ├── sequalize.json      # Sequalize config
│   ├── serviceOne.json     # ServiceOne config
│   └── ...                 # Other configurations
├── routes                  
│   ├── controllers         # Request managers
│   ├── middlewares         # Request middlewares
│   └── routes.js           # Define routes and middlewares here
├── services                # External services implementation   
│   ├── serviceOne
│   └── serviceTwo
├── db                      # Data access stuff  (Sequalize mostly)
│   ├── models              # Models
│   ├── migrations          # Migrations
│   ├── seeds               # Seeds
│   └── index.js            # Sequalize instantiation
├── utils                   # Util libs (formats, validation, etc)
├── tests                   # Testing
├── scripts                 # Standalone scripts for dev uses
├── Dockerfile              # Dockerfile
├── pm2.js                  # pm2 init
├── package.json           
├── README.md         
└── app.js                  # App starting point
```