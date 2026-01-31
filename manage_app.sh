#!/bin/bash

# 5 Spice Market & Cafe - Management Script
# This script helps you easily manage the application development lifecycle.

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   5 Spice Market & Cafe - Manager       ${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

PS3='Please select an option: '
options=("Start Dev Mode (Servers & Client)" "Install Dependencies" "Build Project" "Stop All Node Processes" "Quit")

select opt in "${options[@]}"
do
    case $opt in
        "Start Dev Mode (Servers & Client)")
            echo -e "${GREEN}Starting Development Environment...${NC}"
            
            # Start Server in a new tab
            echo "Launching Backend Server..."
            osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'/server\" && node index.js"'
            
            # Start Client in a new tab
            echo "Launching Frontend Client..."
            osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'/client\" && npm run dev"'
            
            echo -e "${GREEN}Servers launched in new Terminal windows!${NC}"
            echo "Backend: http://localhost:5000"
            echo "Frontend: http://localhost:5173 (or 5174)"
            break
            ;;
            
        "Install Dependencies")
            echo -e "${BLUE}Installing Server Dependencies...${NC}"
            cd server && npm install
            cd ..
            
            echo -e "${BLUE}Installing Client Dependencies...${NC}"
            cd client && npm install
            cd ..
            
            echo -e "${GREEN}All dependencies installed successfully!${NC}"
            ;;
            
        "Build Project")
            echo -e "${BLUE}Building Frontend for Production...${NC}"
            cd client && npm run build
            cd ..
            echo -e "${GREEN}Build complete! Output is in client/dist${NC}"
            ;;
            
        "Stop All Node Processes")
            echo -e "${RED}Stopping all node/nodemon/vite processes...${NC}"
            pkill -f "node index.js"
            pkill -f "vite"
            echo -e "${GREEN}Stopped.${NC}"
            ;;
            
        "Quit")
            break
            ;;
            
        *) echo "Invalid option $REPLY";;
    esac
done
