#!/bin/bash

# 找出lib目录下所有使用import语法的文件
FILES=$(find ./lib -name "*.js" -exec grep -l "import " {} \;)

# 遍历所有文件并转换
for file in $FILES; do
  echo "Converting imports in $file..."
  # 备份文件
  cp $file $file.bak
  
  # 读取文件内容
  content=$(cat $file)
  
  # 处理import语句 - 简单情况：import x from 'y' -> const x = require('y')
  content=$(echo "$content" | sed 's/import \([^ ]*\) from \(.*\);/const \1 = require(\2);/g')
  
  # 将修改后的内容写回文件
  echo "$content" > $file
done

echo "Lib imports conversion complete!" 