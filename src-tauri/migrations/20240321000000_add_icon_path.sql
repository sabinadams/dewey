-- Add icon_path column to projects table
ALTER TABLE projects ADD COLUMN icon_path TEXT;

-- Update existing rows to have NULL icon_path
UPDATE projects SET icon_path = NULL WHERE icon_path IS NOT NULL; 