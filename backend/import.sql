USE [DMA-CSD-S212_10407505];

DROP TABLE fp_Company, fp_Employee, fp_Domain, fp_Cookie, fp_UserConsent, fp_User;
go

CREATE TABLE fp_Company(
  id INT IDENTITY(1,1) NOT NULL,
  name VARCHAR(50) NOT NULL,

  CONSTRAINT PK_company PRIMARY KEY (id)
);

CREATE TABLE fp_Employee(
  id INT IDENTITY(1,1) NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  passwordHash nCHAR(60),
  companyID INT NOT NULL,

  CONSTRAINT FK_Employee_Company FOREIGN KEY (companyID) REFERENCES fp_Company(id) ON DELETE CASCADE,
  CONSTRAINT PK_Employee PRIMARY KEY (id)
);

CREATE TABLE fp_Domain(
  url VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  companyID INT NOT NULL,

  CONSTRAINT FK_Domain_Company FOREIGN KEY (companyID) REFERENCES fp_Company(id) ON DELETE CASCADE,
  CONSTRAINT PK_Domain PRIMARY KEY (url)
);

CREATE TABLE fp_Cookie(
  id INT IDENTITY(1,1) NOT NULL,
  name VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  expirationDate DATETIME NOT NULL,
  domainID INT NOT NULL,
  category VARCHAR(50) NOT NULL,

  CONSTRAINT FK_Cookie_Domain FOREIGN KEY (domainID) REFERENCES fp_Domain(id) ON DELETE CASCADE,
  CONSTRAINT PK_Cookie PRIMARY KEY (id)
);

CREATE TABLE fp_UserConsent(
  date DATETIME NOT NULL,
  cookieID INT NOT NULL,
  userID INT NOT NULL,

  CONSTRAINT FK_UserConsent_Cookie FOREIGN KEY (cookieID) REFERENCES fp_Cookie(id) ON DELETE CASCADE,
  CONSTRAINT FK_UserConsent_User FOREIGN KEY (userID) REFERENCES fp_User(id) ON DELETE CASCADE,
  CONSTRAINT PK_UserConsent PRIMARY KEY (userID, cookieID)
);

CREATE TABLE fp_User(
  id VARCHAR(50) NOT NULL,
);

