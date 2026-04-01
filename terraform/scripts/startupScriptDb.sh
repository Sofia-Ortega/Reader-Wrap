
echo "Do you want to wipe your db and start fresh? (y/n)"

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


scp -i ~/.ssh/readerwrap $BACKEND_DIR/startupTables.sql ubuntu@3.151.72.0:~/

ssh -i ~/.ssh/readerwrap ubuntu@3.151.72.0 << 'EOF'
export PGPASSWORD='...'
psql -h 10.0.0.9 -U postgres -d postgres -f startupTables.sql
EOF
