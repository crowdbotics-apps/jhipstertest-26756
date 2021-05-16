FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""

ADD . /code/

RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
    rm -Rf /target /node_modules && \
    cd /code/ && \
    ./mvnw package -Pprod -DskipTests && \
    mv target/*.jar app.jar

EXPOSE 80

CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /code/app.jar