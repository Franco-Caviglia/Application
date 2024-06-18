FROM openjdk:21-slim
ARG JAR_FILE=target/plants-0.0.1.jar
COPY ${JAR_FILE} plants.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "plants.jar"]
