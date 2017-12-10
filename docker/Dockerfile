FROM debian:jessie
MAINTAINER Francis Grignon <sysadmin@ncis.ca>

RUN apt-get update && apt-get install -y apache2 php5 libapache2-mod-php5
RUN a2enmod php5
RUN rm /var/www/html/* -f
COPY ./dist /var/www/html
CMD /usr/sbin/apache2ctl -D FOREGROUND

EXPOSE 80