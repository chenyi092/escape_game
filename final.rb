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

# 捕捉例外情況
error do
  env['sinatra.error'].message
end
