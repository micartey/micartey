#!/usr/bin/env sh

pull() {
    echo "Pulling new changes..."
    git reset --hard
    git pull --force
}

rebuild() {
    npm run build -- --props="./input-props.json"
    rm -rf ./prod/video2.gif
    npm run gif
}

push() {
    git add prod
    git commit -m "build: new banner"
    git push
}

loop() {
    while true; do
        pull
        rebuild
        push 
        sleep 24h
    done
}

loop &