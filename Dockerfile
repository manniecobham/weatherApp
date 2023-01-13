FROM node:15.14.0-alpine as Base
LABEL maintainer="manniecobham@yahoo.com"

#Timezone
 RUN ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime && \
 apk add curl#

WORKDIR /app

COPY ./ /app/

RUN npm install

#execute build in package.json to compile the typescript files to server
RUN npm run build

VOLUME "/data"

#RUN ls -a

#copy the compiled files
#COPY ./dist .

#Healthcheck
HEALTHCHECK --interval=30s --timeout=30s  --retries=3 CMD curl -f http://localhost:8080/test/ || exit 1

#Port the docker will be running on
EXPOSE 8012

#Set up a default command
CMD [ "npm", "start" ]