CREATE TABLE "rsvp" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"message" varchar(255),
	"attending" boolean DEFAULT true NOT NULL,
	"guest" boolean DEFAULT false NOT NULL,
	"guestName" varchar(255)
);
