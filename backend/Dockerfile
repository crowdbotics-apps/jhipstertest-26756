FROM openjdk:8-jre-alpine

ADD . /code/

RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
    rm -Rf /target /node_modules && \
    cd /code/ && \
    ./mvnw package -Pprod -DskipTests && \
    mv target/*.jar app.jar

EXPOSE 80

CMD java -Djava.security.egd=file:/dev/./urandom -jar /code/app.jar