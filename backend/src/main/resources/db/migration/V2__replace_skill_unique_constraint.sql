ALTER TABLE skills DROP CONSTRAINT skills_name_key;
ALTER TABLE skills ADD CONSTRAINT uq_skills_name_type UNIQUE (name, type);
