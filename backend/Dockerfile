FROM openjdk:8

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""

ADD . /code/
RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
    rm -Rf /target /node_modules && \
    cd /code/ && \
    ./mvnw clean package -Pprod -DskipTests && \
    mv target/*.jar app.jar

EXPOSE 8080

RUN adduser -D -s /bin/sh jhipster
USER jhipster

CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /code/app.jar