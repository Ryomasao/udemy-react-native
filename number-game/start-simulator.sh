#!/bin/bash
# yarn or npm startでexpot起動後に、iPhone Simlatorにアタッチする
# iPhoneSEとiPhone8 plusを起動する
# 起動したいデバイスのリストは xcrun simctl list で調べることができる
declare -a simulators=("1627D8C6-7882-4FB2-A5B0-82B2F5B57876" "F3EAA255-4813-4E9B-AF95-83954076EAAB" )

for i in "${simulators[@]}"
do
    xcrun instruments -w $i
    # expoのコンポーネントのバージョンが上がったらExponentのバージョン確認したほうがいいかも
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.14.0.tar.app
    xcrun simctl openurl $i exp://127.0.0.1:19000      
done
