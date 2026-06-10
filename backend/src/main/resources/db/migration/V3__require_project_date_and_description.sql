UPDATE projects SET description = 'No description' WHERE description IS NULL;
UPDATE projects SET date = CURRENT_DATE WHERE date IS NULL;

ALTER TABLE projects ALTER COLUMN date SET NOT NULL;
ALTER TABLE projects ALTER COLUMN description SET NOT NULL;