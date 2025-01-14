require 'sqlite3'

# 建立 SQLite3 資料庫
db = SQLite3::Database.new "game_progress.db"

# 建立存檔資料表
db.execute <<-SQL
  CREATE TABLE IF NOT EXISTS saves (
    id INTEGER PRIMARY KEY,
    player_name TEXT NOT NULL,
    game_state TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
SQL

puts "Database and table created successfully."
