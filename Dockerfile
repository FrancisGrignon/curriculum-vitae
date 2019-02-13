# Build environment
FROM node AS build-env

WORKDIR /src

COPY . .
RUN npm install
RUN npm install -g gulp
RUN gulp --production

# Publish environment
FROM debian:jessie
LABEL maintainer Francis Grignon <contact@ncis.ca>

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