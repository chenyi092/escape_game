#!/usr/bin/env ruby
#encoding: utf-8
require 'cgi'
require 'cgi/session'
require 'json'
require 'sqlite3'

begin
  cgi = CGI.new
  session = CGI::Session.new(cgi)


  player_name = session['player_name']

  if player_name
    puts cgi.header('application/json')
    puts({ playerName: player_name }.to_json)
  else
    puts cgi.header('application/json')
    puts({ playerName: nil }.to_json)
  end

rescue SQLite3::Exception => e
  # 資料庫相關錯誤處理
  puts cgi.header('application/json; charset=utf-8')
  puts({ error: "Database error: #{e.message}" }.to_json)
rescue => e
  # 通用錯誤處理
  puts cgi.header('application/json; charset=utf-8')
  puts({ error: "An error occurred: #{e.message}" }.to_json)
ensure
  # 確保Session正常關閉
  session.close if session
end
