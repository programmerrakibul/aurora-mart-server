CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  uid UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') UNIQUE,
  gender VARCHAR(8) CHECK (gender IN ('Male', 'Female')) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(8) CHECK (role IN ('CUSTOMER', 'SELLER', 'MANAGER')) DEFAULT 'CUSTOMER' NOT NULL,
  photoURL VARCHAR(255) CHECK (photoURL ~* '^(https?://)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(/[\w\-._~:/?#[\]@!$&''()*+,;=]*)?$') DEFAULT 'https://example.com/default-profile.png',
  createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);


