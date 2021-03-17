
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR (256) NOT NULL,
    "lastname" VARCHAR (256) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "team" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (256) NOT NULL
);

CREATE TABLE "user_team" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"team_id" INT REFERENCES "team",
	"authlevel" VARCHAR(64) DEFAULT 'USER'
);

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE,
	"task" VARCHAR (256),
	"completed" BOOLEAN,
	"user_id" INT REFERENCES "user",
	"team_id" INT REFERENCES "team"
);