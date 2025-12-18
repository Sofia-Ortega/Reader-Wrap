
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../../backend"


echo "Building docker image to test locally"

docker build -t flask-app "$BACKEND_DIR"

docker run -d -p 8000:8000 flask-app:latest

echo "Docker image running on port 8000"


### Test API ###
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/test)

if [ "$STATUS" -eq 200 ]; then
  echo "API is healthy (200 OK)"
else
  echo "API returned status: $STATUS"
fi



echo "Run script deployBackendDocker.sh if satisfied to upload to docker image"



