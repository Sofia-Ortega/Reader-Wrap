
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


scp -i ~/.ssh/readerwrap $BACKEND_DIR/startupTables.sql ubuntu@3.143.127.195:~/

ssh -i ~/.ssh/readerwrap ubuntu@3.143.127.195 << 'EOF'
psql -h reader-wrap.cto6go8kcmwm.us-east-2.rds.amazonaws.com -U postgres -d postgres -f startupTables.sql
EOF
