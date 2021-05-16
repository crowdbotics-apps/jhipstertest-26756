FROM openjdk:8-jre-alpine
ADD /jarfile/ .

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""
EXPOSE 80

RUN adduser -D -s /bin/sh jhipster
USER jhipster

CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar app.jar
