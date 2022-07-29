-- First create a database 'reactSERIES' and connect to it

CREATE TABLE public.characters (
    id integer NOT NULL,
    series_id integer,
    actor_id integer,
    name character varying,
    gender integer,
    actor character varying,
    profile_path character varying,
    character_path character varying,
    votes integer,
    api_data integer
);


ALTER TABLE public.characters OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16782)
-- Name: character_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.character_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.character_id_seq OWNER TO postgres;

--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 209
-- Name: character_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.character_id_seq OWNED BY public.characters.id;

--
-- TOC entry 208 (class 1259 OID 16773)
-- Name: series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    year integer,
    start_date date,
    finish_date date,
    last_ep character varying(10),
    num_last_ep integer,
    last_seen_ep character varying(10),
    poster_path character varying,
    wallpaper_path character varying,
    tvmaze_id integer,
    seasons integer,
    num_last_seen_ep integer,
    finale_year integer
);


ALTER TABLE public.series OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16771)
-- Name: series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_id_seq OWNER TO postgres;

--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 207
-- Name: series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.series_id_seq OWNED BY public.series.id;


--
-- TOC entry 206 (class 1259 OID 16761)
-- Name: stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stats (
    last_modification date
);


ALTER TABLE public.stats OWNER TO postgres;

--
-- TOC entry 2716 (class 2604 OID 16787)
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters ALTER COLUMN id SET DEFAULT nextval('public.character_id_seq'::regclass);


--
-- TOC entry 2715 (class 2604 OID 16776)
-- Name: series id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN id SET DEFAULT nextval('public.series_id_seq'::regclass);


--
-- TOC entry 2724 (class 2606 OID 16792)
-- Name: characters character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT character_pkey PRIMARY KEY (id);


--
-- TOC entry 2722 (class 2606 OID 16781)
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- TOC entry 2725 (class 2606 OID 16793)
-- Name: characters character_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT character_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(id);


-- Completed on 2022-07-25 22:13:17

--
-- PostgreSQL database dump complete
--

