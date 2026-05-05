$services = @("auth-service", "product-service", "order-service", "admin-service")
$groupId = "com.flowersonline"
$version = "0.0.1-SNAPSHOT"

New-Item -ItemType Directory -Force -Path "backend"

$parentPom = @"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.3.0</version>
		<relativePath/>
	</parent>
	<groupId>$groupId</groupId>
	<artifactId>flowers-online-backend</artifactId>
	<version>$version</version>
	<packaging>pom</packaging>
	<name>flowers-online-backend</name>

	<properties>
		<java.version>17</java.version>
		<spring-cloud.version>2023.0.2</spring-cloud.version>
	</properties>

	<modules>
		<module>model-library</module>
		<module>persistence-library</module>
		<module>auth-service</module>
		<module>product-service</module>
		<module>order-service</module>
		<module>admin-service</module>
	</modules>

	<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>`${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>
</project>
"@

Set-Content -Path "backend\pom.xml" -Value $parentPom

# Create Libraries
$libraries = @("model-library", "persistence-library")
foreach ($lib in $libraries) {
    New-Item -ItemType Directory -Force -Path "backend\$lib\src\main\java\com\flowersonline\model" | Out-Null
    
    $libPom = @"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>$groupId</groupId>
		<artifactId>flowers-online-backend</artifactId>
		<version>$version</version>
	</parent>
	<artifactId>$lib</artifactId>
    <packaging>jar</packaging>
	<dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
	</dependencies>
</project>
"@
    Set-Content -Path "backend\$lib\pom.xml" -Value $libPom
}

# Create Microservices
foreach ($service in $services) {
    $pkg = $service.Replace("-service", "")
    New-Item -ItemType Directory -Force -Path "backend\$service\src\main\java\com\flowersonline\$pkg" | Out-Null
    New-Item -ItemType Directory -Force -Path "backend\$service\src\main\resources" | Out-Null
    
    $extraDeps = ""
    if ($service -eq "auth-service") {
        $extraDeps = @"
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
"@
    }

    $servicePom = @"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>$groupId</groupId>
		<artifactId>flowers-online-backend</artifactId>
		<version>$version</version>
	</parent>
	<artifactId>$service</artifactId>

	<dependencies>
        <dependency>
            <groupId>$groupId</groupId>
            <artifactId>model-library</artifactId>
            <version>$version</version>
        </dependency>
        <dependency>
            <groupId>$groupId</groupId>
            <artifactId>persistence-library</artifactId>
            <version>$version</version>
        </dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<scope>runtime</scope>
		</dependency>
$extraDeps
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
"@
    Set-Content -Path "backend\$service\pom.xml" -Value $servicePom

    $className = (Get-Culture).TextInfo.ToTitleCase($pkg) + "ServiceApplication"
    $mainClass = @"
package com.flowersonline.$pkg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class $className {
    public static void main(String[] args) {
        SpringApplication.run($className.class, args);
    }
}
"@
    Set-Content -Path "backend\$service\src\main\java\com\flowersonline\$pkg\$className.java" -Value $mainClass
    
    $props = "server.port=0`nspring.application.name=$service"
    Set-Content -Path "backend\$service\src\main\resources\application.properties" -Value $props
}
