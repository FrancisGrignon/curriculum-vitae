FROM debian:jessie
MAINTAINER Francis Grignon <contact@ncis.ca>

WORKDIR /tmp

# Install apache and php
RUN apt-get update && apt-get install -y \
    apache2 \
	php5 \
	libapache2-mod-php5 \
	git \
	&& rm -rf /var/lib/apt/lists/*
RUN a2enmod php5

# Clone the web site content
RUN rm /var/www/html/* -f \
    && git clone https://github.com/FrancisGrignon/curriculum-vitae.git \
	&& cp -R /tmp/curriculum-vitae/src/* /var/www/html/ \
	&& rm -rf /var/tmp/*

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]