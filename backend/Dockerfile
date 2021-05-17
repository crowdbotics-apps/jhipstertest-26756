FROM openjdk:11
ADD . /code/
RUN cd /code/ && \
    ./mvnw package -Pprod -DskipTests && \
    mv target/*.jar app.jar

FROM adoptopenjdk/openjdk11:jre-11.0.6_10-alpine
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""
EXPOSE 8080

RUN adduser -D -s /bin/sh jhipster
USER jhipster

CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar app.jar
COPY --from=0 /code/app.jar .