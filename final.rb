#!/usr/bin/env ruby
#encoding: utf-8
#https://cgi.u.tsukuba.ac.jp/~s2455403/local_only/wp/assets/final.rb

require 'sinatra'

# 設定靜態檔案的路徑
set :public_folder, File.dirname(__FILE__) + '/assets'
set :views, File.dirname(__FILE__) + '/views'

# 設定首頁路由
get '/' do
  erb :index
end

post '/reset_save' do
  # 這裡撰寫重置遊戲進度的邏輯
  # 假設你在資料庫中清除存檔
  # db.execute("DELETE FROM save_data WHERE player_name = ?", [player_name])
  content_type :json
  { message: 'Progress reset' }.to_json
end

get '/check_session' do
  # 假設 session[:player_name] 存儲玩家名稱
  content_type :json
  if session[:player_name]
    { success: true, playerName: session[:player_name] }.to_json
  else
    { success: false, message: 'No session found' }.to_json
  end
end

post '/set_session' do
  data = JSON.parse(request.body.read)
  session[:player_name] = data['playerName'] # 設置玩家名稱到 session
  content_type :json
  { success: true }.to_json
end

post '/save_game' do
  data = JSON.parse(request.body.read)
  player_name = data['player_name']
  game_state = data['game_state']

  # 在資料庫中儲存遊戲進度
  # db.execute("INSERT INTO save_data (player_name, game_state) VALUES (?, ?) ON CONFLICT(player_name) DO UPDATE SET game_state = ?", [player_name, game_state, game_state])

  content_type :json
  { success: true, message: 'Game saved' }.to_json
end

get '/load_game' do
  player_name = params['player_name']

  # 從資料庫中獲取遊戲進度
  # result = db.execute("SELECT game_state FROM save_data WHERE player_name = ?", [player_name]).first

  if result
    content_type :json
    { success: true, game_state: result['game_state'] }.to_json
  else
    content_type :json
    { success: false, message: 'Save data not found' }.to_json
  end
end




# 捕捉例外情況
error do
  env['sinatra.error'].message
end
