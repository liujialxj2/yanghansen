#!/bin/bash

# 找出所有使用import语法的文件
FILES=$(find ./modules -name "*.js" -not -path "*node_modules*" -exec grep -l "import " {} \;)

# 遍历所有文件并转换
for file in $FILES; do
  echo "Converting imports in $file..."
  # 备份文件
  cp $file $file.bak
  
  # 读取文件内容
  content=$(cat $file)
  
  # 使用临时文件
  temp_file="${file}.temp"
  
  # 处理import语句 - 简单情况：import x from 'y' -> const x = require('y')
  content=$(echo "$content" | sed 's/import \([^ ]*\) from \(.*\);/const \1 = require(\2);/g')
  
  # 将修改后的内容写回文件
  echo "$content" > $file
done

echo "Import conversion complete!" 