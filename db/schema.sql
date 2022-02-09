CREATE TABLE webinfo (
    id SERIES PRIMARY KEY,
    name VARCHAR(200),
    url VARCHAR(100)
    meta VARCHAR(500),
    created_at TIMESTAMP
);

insert into webinfo (name, url, meta, created_at) values ("Home | VIZION API", "https://www.vizionapi.com/", "Vizion is an API-based solution for ocean freight visibility. The company’s API helps logistics service providers, cargo owners, and other stakeholders act on their digital ambitions by integrating essential data and insights into existing enterprise systems and delivering a stronger customer experience. Vizion’s products include visibility APIs, data benchmarking, and enriched, accessible datasets built on fundamentally sound information technology infrastructures.","2022-02-09T01:14:14.878Z");
