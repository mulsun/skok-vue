#!/bin/bash
# rename with number incrementally
i=1
find . -type f -name "*.jpg" | while read filename; do
  dir=$(dirname "${filename}")
  mv "${filename}" "${dir}/${i}.jpg"
  let i++
done

# rename with number per folder
# find . -type d | while read dir; do
#   i=1
#   find "${dir}" -maxdepth 1 -type f -name "*.jpg" | while read filename; 
#   do
#     mv "${filename}" "${dir}/${i}.jpg"
#     let i++
#   done
# done
