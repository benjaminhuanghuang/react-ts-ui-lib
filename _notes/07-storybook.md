## Story book
- 同时展示各个组件不同属性下的状态
- Debug
- Create document


## Install
```
  npx -p @storybook/cli sb init
```

## Start storybook
```
  npm run storybook
```
Storybook will create folder
```
  /src/stories
```

## Support TS
https://storybook.js.org/docs/configurations/typescript-config/

Setting up TypeScript with babel-loader

## Add story for components
Modify ./storybook/main.js
```
  stories: ['../src/**/*.stories.tsx'],
```