## Use Sass
```
  npm i node-sass -S
```

## Add system color
add colors into style/_variables.scss

!default 是sass提供的特性，表示用户可以over write这个变量的值

## Styles
- 基础色彩系统
- 字体系统： 字体，行距，大小
- Form
- 边框
- 按钮

## Compatibility
- Use normalize.css
  
  copy content to _reboot.scss

```
npx node-sass styles/_variableds.scss  vaer.css      # complie parital file start with "_" will create empty file
```
_reboot.scss and _variables.scss are **partial scss**, 只可以import， 不能编译成css

## Procsss class
```
  npm i classnames @types/classnames -S
```