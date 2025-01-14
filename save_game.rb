#!/usr/bin/env ruby
# encoding: utf-8
require 'cgi'
require 'sqlite3'
require 'cgi/session'
require 'json'

cgi = CGI.new
session = CGI::Session.new(cgi)

begin
  # 檢查並解析請求數據
  request_body = cgi.params.keys.first
  data = JSON.parse(request_body) rescue nil
  raise "Invalid request data" if data.nil? || !data.is_a?(Hash)

  # 從請求中獲取 game_state
  game_state = data['game_state']
  raise "Game state is missing" if game_state.nil? || !game_state.is_a?(Hash)

  # 從 Session 獲取 player_name
  player_name = session['player_name']
  raise "Player name is missing in session" if player_name.nil? || player_name.strip.empty?

  # 初始化資料庫
  db = SQLite3::Database.new("game_progress.db")
  db.execute("CREATE TABLE IF NOT EXISTS saves (
    id INTEGER PRIMARY KEY,
    player_name TEXT UNIQUE,
    game_state TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )")

  # 檢查玩家是否已存在
  existing_save = db.get_first_row("SELECT * FROM saves WHERE player_name = ?", [player_name])

  if existing_save
    # 玩家存在，更新遊戲進度
    db.execute("UPDATE saves SET game_state = ?, updated_at = CURRENT_TIMESTAMP WHERE player_name = ?",
               [game_state.to_json, player_name])
  else
    # 玩家不存在，插入新紀錄
    db.execute("INSERT INTO saves (player_name, game_state) VALUES (?, ?)",
               [player_name, game_state.to_json])
  end

  # 回應成功消息
  puts cgi.header('type' => 'application/json')
  puts({ success: true, message: "Game saved successfully" }.to_json)

rescue => e
  # 捕獲錯誤並返回錯誤信息
  puts cgi.header('type' => 'application/json', 'status' => '400 Bad Request')
  puts({ success: false, message: e.message }.to_json)
end
