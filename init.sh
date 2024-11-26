#!/bin/bash

# Target Directory
TARGET_DIRECTORY="./" # root 

mkdir -p "./assets"

curl -o "./assets/script.js" "https://raw.githubusercontent.com/Xinrui-Fang/aspire-mwi/main/assets/script.js"
curl -o "./assets/style.css" "https://raw.githubusercontent.com/Xinrui-Fang/aspire-mwi/main/assets/style.css"

# Replace .css file for index.html in root
find "$TARGET_DIRECTORY" -type f -name "*.html" -exec sed -i '' -E 's|href="\./_static/[^"]*"|href="\./assets/style.css"|g' {} +
# Replace .css file for index.html in route folders
find "$TARGET_DIRECTORY" -type f -name "*.html" -exec sed -i '' -E 's|href="\./\.\./_static/[^"]*"|href="\./\.\./assets/style.css"|g' {} +
# Replace .js for index.html in root
find "$TARGET_DIRECTORY" -type f -name "*.html" -exec sed -i '' -E 's|src="\./_static/[^"]*"|src="\./assets/script.js"|g' {} +
# Replace interactivity module path
find "$TARGET_DIRECTORY" -type f -name "*.js" -exec sed -i '' -E 's|import \* as e from "@wordpress/interactivity"|import * as e from "./../../interactivity/index.min.js"|g' {} +

echo "DONE"
