#!/usr/bin/env ruby
#encoding: utf-8
require 'cgi'
require 'sqlite3'
require 'cgi/session'


cgi = CGI.new
session = CGI::Session.new(cgi)
db = SQLite3::Database.new("game_progress.db")

begin
  player_name = session['player_name']

  # 如果有 Session 記錄，則刪除資料庫中對應的玩家存檔
  if player_name && !player_name.empty?
    db.execute("DELETE FROM saves WHERE player_name = ?", [player_name])
    session.delete # 清除當前 Session
  end

  # 回傳成功響應
  puts cgi.header("type" => "text/plain", "charset" => "utf-8")
  puts "Progress reset"
rescue => e
  # 捕捉例外並回傳錯誤信息
  puts cgi.header("type" => "text/plain", "charset" => "utf-8", "status" => "500 Internal Server Error")
  puts "Error: #{e.message}"
ensure
  db.close if db
end