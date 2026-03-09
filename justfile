# Squash all history into a single commit, keeping only the latest state
squash-history:
    rm -rf .git
    git init
    git add -A
    git commit -m "squash commit history"
    git remote add origin git@github.com:micartey/micartey.git
    git push --force origin master
