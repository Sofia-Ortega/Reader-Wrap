echo "Have you built your docker image? (y/n)"

read -r answer

case "$answer" in
    y|Y|yes|YES)
        echo "Continuing..."
        ;;
    n|N|no|NO)
        echo "Okay — build it first and rerun the script."
        exit 1
        ;;
    *)
        echo "Invalid response. Please enter y/n."
        exit 1
        ;;
esac


SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../../backend"

docker save flask-app:latest -o $BACKEND_DIR/flask-app.tar

scp -i ~/.ssh/readerwrap $BACKEND_DIR/flask-app.tar ubuntu@3.143.127.195:~/

scp -i ~/.ssh/readerwrap $BACKEND_DIR/.env.prod ubuntu@3.143.127.195:~/

ssh -i ~/.ssh/readerwrap ubuntu@3.143.127.195 << 'EOF'
docker load -i flask-app.tar
docker stop $(docker ps -q)
docker rm $(docker ps -q)
docker run --env-file .env.prod -d -p 5000:5000 flask-app:latest
EOF
