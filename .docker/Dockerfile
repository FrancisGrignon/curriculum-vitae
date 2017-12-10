FROM debian:jessie
MAINTAINER Francis Grignon <contact@ncis.ca>

WORKDIR /tmp

# Install apache and php
RUN apt-get update && apt-get install -y apache2 php5 libapache2-mod-php5 git
RUN a2enmod php5

# Clone the web site content
RUN git clone https://github.com/FrancisGrignon/curriculum-vitae.git
RUN rm /var/www/html/* -f
RUN cp -R /tmp/curriculum-vitae/src/* /var/www/html/

# Clean-up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]