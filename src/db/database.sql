CREATE DATABASE content_manager;
USE content_manager;

CREATE TABLE categories(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) UNIQUE,
    Type ENUM("URL_VIDEO", "IMAGE", "TEXT")
);

CREATE TABLE topics (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) UNIQUE
);

CREATE TABLE categories_per_topic (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    IDTopic INT NOT NULL,
    IDCategory INT NOT NULL,
    FOREIGN KEY (IDCategory) REFERENCES categories(ID),
    FOREIGN KEY (IDTopic) REFERENCES topics(ID)
);



CREATE TABLE roles (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) UNIQUE,
    CanCreate DECIMAL(1) DEFAULT 0,
    CanRead DECIMAL(1) DEFAULT 0,
    CanUpdate DECIMAL(1) DEFAULT 0,
    CanDelete DECIMAL(1) DEFAULT 0
);

CREATE TABLE users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    IDRole INT,
    PasswordHash VARCHAR(255),
    Salt VARCHAR(255),
    FOREIGN KEY (IDRole) REFERENCES roles(ID)
);

CREATE TABLE content (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) UNIQUE NOT NULL,
    IDTopic INT NOT NULL,
    IDCategory INT NOT NULL,
    Content VARCHAR(225) NOT NULL,
    UserID INT,
    FOREIGN KEY (IDCategory) REFERENCES categories(ID),
    FOREIGN KEY (IDTopic) REFERENCES topics(ID),
    FOREIGN KEY (UserID) REFERENCES users(ID)
);

-- Default values
INSERT INTO roles (Name, CanCreate, CanRead, CanUpdate, CanDelete) VALUES ("Administrator", true, true, true, true);
INSERT INTO roles (Name, CanCreate, CanRead, CanUpdate, CanDelete) VALUES ("Reader", true, false, false, false);
INSERT INTO roles (Name, CanCreate, CanRead, CanUpdate, CanDelete) VALUES ("Creator", true, false, false, false);

SET @salt = SHA2(RAND(), 256);
SET @hashedPassword = SHA2(CONCAT('p@ssw0rd', @salt), 256);
INSERT INTO users (Username, Email, IDRole, PasswordHash, Salt) VALUES ("admin", "admin@domain.com", 1, @hashedPassword, @salt);

INSERT INTO categories (Name, Type) VALUES ("Images", "IMAGE");
INSERT INTO categories (Name, Type) VALUES ("Youtube videos", "URL_VIDEO");
INSERT INTO categories (Name, Type) VALUES ("Documents txt", "TEXT");

INSERT INTO topics (Name) VALUES ("Science");
INSERT INTO topics (Name) VALUES ("Mathematics");
INSERT INTO topics (Name) VALUES ("Sports");

INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (1, 1);
INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (1, 2);
INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (1, 3);

INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (2, 1);
INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (2, 2);
INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (2, 3);

INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (3, 1);
INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (3, 2);
INSERT INTO categories_per_topic (IDTopic, IDCategory) VALUES (3, 3);
