-- uuid-ossp: primary key generation for UUID values using uuid_generate_v4().
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- postgis: geospatial columns and GIST indexing for location/centroid data.
CREATE EXTENSION IF NOT EXISTS "postgis";

-- vector: pgvector support for description_embedding similarity search.
CREATE EXTENSION IF NOT EXISTS "vector";
