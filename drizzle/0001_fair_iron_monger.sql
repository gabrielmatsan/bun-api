CREATE TYPE "public"."restaurants_role" AS ENUM('manager', 'customer');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
