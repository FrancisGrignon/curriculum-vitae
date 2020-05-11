# Build environment
FROM node AS build-env

WORKDIR /src

COPY . .
RUN npm install
RUN npm install -g gulp
RUN gulp --production

# Publish environment
FROM debian:buster-slim

ARG BUILD_DATE
ARG BUILD_VERSION

LABEL org.label-schema.build-date = $BUILD_DATE \
      org.label-schema.name = "grignon/curriculum-vitae" \
      org.label-schema.description = "A simple prove of concept, featuring my curriculum vitae, on how to build a static web site, store it in a docker container and run it." \
 	  org.label-schema.url = "http://grignon.azurewebsites.net/" \
	  org.label-schema.vcs-url = "https://github.com/francisgrignon/curriculum-vitae" \
	  org.label-schema.schema-version = $BUILD_VERSION \
	  org.label-schema.docker.cmd = "docker run -d -p 80:80 grignon/curriculum-vitae"

WORKDIR /tmp

# Install apache and php
RUN apt-get update && apt-get install -y \
    apache2 \
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/tmp/* \
	&& echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Clone the web site content
RUN rm /var/www/html/* -f

WORKDIR /var/www/html/
COPY --from=build-env /src/dist .

EXPOSE 80

ADD start.sh /start.sh
RUN chmod -v +x /start.sh

CMD ["/bin/bash","/start.sh"]