# NodeExpressgatewayKafkaNx

## Start the application

Run `npm run start:<app-name>` to start the development server. Happy coding!

## Start all applications at once

Run `npm start` to start the development server. Happy coding!

## Build for production

Run `npm run build:<app-name>` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Build all applications for production

Run `npm run build` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Cleaning up

1. To remove an app / library from workspace, run `nx g @nx/workspace:remove <your-app/lib-name>`
2. To add an app, run `nx g @nx/nest:app <your-app-name> --skip-tests`

## Install kafka

### Without docker

- download kafka tar file from [official site](https://kafka.apache.org/documentation/#quickstart)
- extract the downloaded tar file and `cd` to that location
- run zookeeper through `bin/zookeeper-server-start.sh config/zookeeper.properties`
- once zookeeper is up and running, in another terminal execute `bin/kafka-server-start.sh config/server.properties` to start kafka
- once kafka is up and running, it need to have one topic before consuming it to emit and read events. for this in a new terminal execute `bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092`

  > this is a one-time action.

- this will create a topic named `quickstart-events`
- to list out all the topics, execute `bin/kafka-topics.sh --bootstrap-server localhost:9092 --list`

### With docker

- run `docker compose up` in root folder. this will pull latest `zookeeper` & `kafka` packages and run them on their respective ports.

## Install mongodb

### With homebrew

- https://medium.com/create-a-clocking-in-system-on-react/creating-a-local-mongodb-database-and-insert-a-document-c6a4a2102a22

- run below commands:

```bash
brew tap mongodb/brew
```

```bash
brew install mongodb-community
```

- after installation, to start mongodb, run `brew services start mongodb-community`.
- to check this: install mongodb vscode extension and add a connection with connection string: `mongodb://localhost`.
- to stop mongodb, run `brew services stop mongodb-community`.

### With docker

- install docker and start it
- run `docker run --name mymongodb -d -p 27017:27017 mongo`
- this will pull the latest `mongo` image and run a container named `mymongodb` on external port 27017 and internal port 27017 in detached and published mode
- to start using local mongodb, install mongodb vscode extension and add a connection with connection string: `mongodb://localhost:27017`.

## Start application

Folder structure:

```
root/
├── nx.json
├── package.json
└── apps/
    ├── api-gateway (express endpoint)
    ├── billing (kafka MS)
    ├── users (kafka MS)
    └── logs (kafka MS)
```

- once kafka is up and running, start all micro-services parallelly
- send a post request with below data in postman:

```bash
url:
http://localhost:3020/create-invoice

method:
POST

payload:
{
    "userId": "uid-123",
    "orderId": "oid-123",
    "price": 123.45
}
```

once the request is made, check consoles of all the micro-services. each should log the data as per.

- all the kafka events will be logged into mongodb database by logs microservice through `mongoose`.
- logs table contains `id (primary key auto-generated)`, `serviceName (type String)`, `kafkaTopic (type String)` and `kafkaData (type Object)`

## kafka UI

https://medium.com/@penkov.vladimir/kafka-cluster-with-ui-and-metrics-easy-setup-d12d1b94eccf

## Create docker image

1. To create docker image, run `docker build . -t <your-image-name>`
2. To view the created image in the images list, run `docker image list`. this should list the created image
3. Once completed, to verify the contents of the image, run `docker run -ti <your-image-name> sh`
