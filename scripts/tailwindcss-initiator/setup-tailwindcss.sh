#!/bin/bash

# Check if project name is provided
if [ -z "$1" ]; then
  echo "Error: Project name is required."
  echo "Usage: ./scripts/tailwindcss-initiator/setup-tailwindcss.sh <project-name>"
  exit 1
fi

PROJECT_PATH="/Users/shhan/Workspace/superhan/portfolio/apps/web/$1"

# Check if the provided project path exists
if [ ! -d "$PROJECT_PATH" ]; then
  echo "Error: Project '$PROJECT_PATH' does not exist."
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_PATH" || exit

# Install Tailwind CSS and dependencies
echo "Installing Tailwind CSS and dependencies in '$PROJECT_PATH'..."
pnpm add -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS configuration
echo "Initializing Tailwind CSS configuration..."
npx tailwindcss init -p

# Update tailwind.config.js content paths
echo "Updating tailwind.config.js content paths..."
sed -i '' 's/content: \[\]/content: \[".\/index.html", ".\/src\/\*\/*\.\{js,ts,jsx,tsx\}\"]/g' tailwind.config.js

# Create src/index.css file with Tailwind directives
echo "Creating src/index.css with Tailwind directives..."
mkdir -p src
echo '@tailwind base;' > src/index.css
echo '@tailwind components;' >> src/index.css
echo '@tailwind utilities;' >> src/index.css

# Import index.css in main.tsx
echo "Importing src/index.css in main.tsx..."
if grep -q "import './index.css';" src/main.tsx; then
  echo "src/index.css is already imported in main.tsx."
else
  sed -i '' "1i\\
import './index.css';" src/main.tsx
  echo "Added import './index.css'; in main.tsx."
fi

echo "Tailwind CSS setup is complete for '$PROJECT_PATH'!"
