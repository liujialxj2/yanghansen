#!/bin/bash

# 找出所有使用ES模块语法的文件
FILES=$(find ./modules -name "*.js" -not -path "*node_modules*" -exec grep -l "export default" {} \;)

# 遍历所有文件并转换
for file in $FILES; do
  echo "Converting $file..."
  # 使用sed替换 export default 为 module.exports =
  sed -i '' 's/export default/module.exports =/' $file
done

echo "Conversion complete!" 