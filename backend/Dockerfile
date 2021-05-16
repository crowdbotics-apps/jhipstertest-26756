
FROM azul/zulu-openjdk-alpine:11 as zulu

RUN export ZULU_FOLDER=`ls /usr/lib/jvm/` \
    && jlink --compress=1 --strip-debug --no-header-files --no-man-pages \
    --module-path /usr/lib/jvm/$ZULU_FOLDER/jmods \
    --add-modules java.desktop,java.logging,java.sql,java.management,java.naming,jdk.unsupported,jdk.management,jdk.crypto.ec,java.net.http \
    --output /jlinked

FROM alpine:latest

COPY --from=zulu /jlinked /opt/jdk/

RUN apk update
RUN rm -rf /var/cache/apk/*

ENV CFP_JAVA_OPTS="-Xmx512m"
ENV CFP_PERFORMANCE_OPTS="-Dspring.jmx.enabled=false -Dlog4j2.disableJmx=true"

CMD /opt/jdk/bin/java $CFP_JAVA_OPTS $CFP_PERFORMANCE_OPTS -XX:+UseContainerSupport \
                           -noverify -XX:+AlwaysPreTouch -Djava.security.egd=file:/dev/./urandom -jar /app.jar

ADD target/*.jar /app.jar

EXPOSE 80