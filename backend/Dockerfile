FROM openjdk:8-jre-alpine
ADD . /code/
RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
    rm -Rf /target /node_modules && \
    cd /code/ && \
    ./mvnw clean package -Pprod -DskipTests && \
    mv target/*.jar app.jar

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""
EXPOSE 80

CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar app.war