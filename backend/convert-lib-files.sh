#!/bin/bash

# 找出lib目录下所有使用export语句的文件
FILES=$(find ./lib -name "*.js" -exec grep -l "export " {} \;)

# 遍历所有文件并转换
for file in $FILES; do
  echo "Converting $file..."
  # 备份文件
  cp $file $file.bak
  
  # 使用sed替换 export default 为 module.exports =
  sed -i '' 's/export default/module.exports =/' $file
  
  # 使用sed替换 export const 为 const
  sed -i '' 's/export const/const/' $file
  
  # 对于任何 export { x, y } 这样的情况，我们需要在文件末尾添加 module.exports = { x, y }
  if grep -q "export {" $file; then
    # 提取export语句中的内容
    exports=$(grep "export {" $file | sed 's/export {//g' | sed 's/};//g')
    # 删除export {..} 语句
    sed -i '' '/export {/d' $file
    # 添加module.exports语句
    echo "module.exports = {$exports};" >> $file
  fi
done

echo "Lib files conversion complete!" 