1. Menu Design
- Menu mode: vertical, horizontal

- Button size

- Enable / Disable
  
- Has html conent

- Support html props

2. 实现基本属性
- menu mode 
Use string literal type
```
type MenuMode = 'horizontal' | 'vertical'
```

- Use context pass menu state to menuItem

3. Add style
use flex box for layout


4. menu UT
```
 async () => {
  await wait(() => {
    expect(wrapper.queryByText('drop1')).toBeVisible()
  })
```