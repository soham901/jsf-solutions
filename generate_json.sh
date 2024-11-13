#!/bin/bash

# Get all HTML files in the repository
html_files=$(find . -type f -name "*.html" -not -path "./index.html" -printf '%P\n')

# Create the JSON data structure
json_data='['

for file in $html_files; do
  # Extract lab and practical numbers from the file path
  lab_num=$(echo $file | cut -d'/' -f1)
  practical_num=$(echo $file | cut -d'/' -f2 | cut -d'.' -f1)

  # Append the data to the JSON string
  json_data+='{"lab":"'"$lab_num"'","practical":"'"$practical_num"'","path":"'"$file"'"},'
done

# Remove the trailing comma and close the JSON array
json_data="${json_data%,}]"

# Write the JSON data to a file
echo "$json_data" > practicals.json