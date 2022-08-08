CREATE TABLE public.feed (
	id serial4 NOT NULL,
	nama text NOT NULL,
	awardtype text NOT NULL,
	poin int4 NOT NULL,
	createddate timestamptz NULL,
	updateddate timestamptz NULL,
	CONSTRAINT feed_pkey PRIMARY KEY (id)
);

CREATE TABLE public.master_award_type (
	id serial4 NOT NULL,
	kode text NOT NULL,
	nama text NOT NULL,
	createddate timestamptz NULL,
	updateddate timestamptz NULL,
	CONSTRAINT master_award_type_pkey PRIMARY KEY (id)
);

CREATE TABLE public.user (
	id text NOT NULL,
	email text NOT NULL,
	createddate timestamptz NULL,
	updateddate timestamptz NULL,
	CONSTRAINT user_pkey PRIMARY KEY (email, id)
);
