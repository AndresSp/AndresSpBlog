FROM node:12

RUN useradd -d /home/testuser -m -s /bin/bash testuser

RUN apt-get update && apt-get -y upgrade

RUN curl "https://install.meteor.com/" | sh

# Set environment variables
ENV appDir /app
ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

# Set the work directory
RUN mkdir -p ${appDir}
WORKDIR ${appDir}

COPY package*.json ./


#install dev Dependencies
RUN if [ "$MODE" = "DEV" ]; \
	then meteor npm install;  \
	else meteor npm ci --only=production; \
	fi

COPY . .

#RUN chmod -R 700 .meteor/local
#RUN chown -R testuser:testuser .meteor/local

#Expose the port
EXPOSE 3000
EXPOSE 9229

#Start
ENTRYPOINT npm start