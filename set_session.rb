#!/usr/bin/env ruby
#encoding: utf-8
require 'cgi'
require 'cgi/session'
require 'json'

cgi = CGI.new
session = CGI::Session.new(cgi)

begin
    # 確保有傳入 player_name
    request_body = cgi.params.keys.first
    data = JSON.parse(request_body)
  
    player_name = data['playerName']
    if player_name.nil? || player_name.strip.empty?
      raise "Player name is missing or invalid"
    end
  
    # 設置 session
    session['player_name'] = player_name.strip
    session.close
  
    puts cgi.header('type' => 'application/json')
    puts({ success: true, message: "Session set for player: #{player_name}" }.to_json)
  rescue => e
    puts cgi.header('type' => 'application/json', 'status' => '400 Bad Request')
    puts({ success: false, message: e.message }.to_json)
  end
