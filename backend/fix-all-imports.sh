#!/bin/bash

# 找到所有仍然使用import语法的文件
FILES=$(find ./modules -name "*.js" -exec grep -l "import " {} \;)

# 遍历修复所有文件
for file in $FILES; do
  echo "Fixing $file..."
  
  # 读取文件内容
  content=$(cat $file)
  
  # 替换import语句 - 改为require语句
  content=$(echo "$content" | sed 's/import { \(.*\) } from \(.*\);/const { \1 } = require(\2);/g')
  
  # 将修改后的内容写回文件
  echo "$content" > $file
done

echo "All imports fixed!" 