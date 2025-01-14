#!/usr/bin/env ruby
# encoding: utf-8

require 'cgi'
require 'sqlite3'
require 'json'

cgi = CGI.new

begin
  # 獲取玩家名稱
  player_name = cgi['player_name']
  raise "Player name is missing" if player_name.nil? || player_name.strip.empty?

  # 初始化資料庫
  db = SQLite3::Database.new("game_progress.db")

  # 查詢遊戲進度
  result = db.execute("SELECT game_state FROM saves WHERE player_name = ?", [player_name])
  raise "No save data found for player #{player_name}" if result.empty?

  # 返回遊戲進度
  game_state = JSON.parse(result[0][0]) # 第 0 行的第 0 列
  puts cgi.header('type' => 'application/json')
  puts({ success: true, game_state: game_state }.to_json)

rescue => e
  # 捕獲錯誤並返回
  puts cgi.header('type' => 'application/json', 'status' => '400 Bad Request')
  puts({ success: false, message: e.message }.to_json)
end
