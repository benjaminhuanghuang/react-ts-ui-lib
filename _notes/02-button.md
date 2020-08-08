1. Button Design
- Button type

- Button size

- Enable / Disable
  
- Has html conent

- Support html props

2. 实现基本属性
用enum实现button type， button size

link buttong disable 需要特殊处理, 因为 <a> 本身没有disabled 属性

需要动态处理 css， 使用 classnames

children: React.ReactNode;


3. 添加css
Create Button/_style.scss

Include Button/_style.scss into styles/index.scss
```
@import "../components/Button/style";
```

4. Support native properties
```
  // Intersection types
  // Provide native properties, like OnClick 
  type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
  type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

  // make all fields optional because some property exist on anchor but not on button
  export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
```