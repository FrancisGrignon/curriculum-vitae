# curriculum-vitae
CV / Personal Portfolio
http://grignon.azurewebsites.net/

A simple prove of concept, featuring my curriculum vitae, on how to build a static web site, store it in a docker container and run it.

To build the site.

1. Install [NodeJS](http://www.nodejs.org)
2. Download the reporitory, https://github.com/FrancisGrignon/curriculum-vitae.git
3. Open a command line and cd to the root of the repository.
4. `npm install` - Install the required packages.
5. `gulp` - To built the project and start a live server.

To build the docker image and run it.

1. Install [Docker](https://docs.docker.com/engine/installation/)
2. Open a command line and cd to the root of the repository.
3. `docker build -t grignon/curriculum-vitae .` - Built the image
4. `docker run -p 80:80 --rm -it grignon/curriculum-vitae` - Run the container
5. Open your web browser on http://localhost/
