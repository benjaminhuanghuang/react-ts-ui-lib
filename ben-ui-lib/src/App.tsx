import React from "react";

// Test
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"


function App() {
  return (
    <div className="App">
       <Menu defaultIndex='0' onSelect={(index)=>{alert(index)}} mode='vertical' defaultOpenSubMenus={['2']}>
        <MenuItem index="0">Cool link</MenuItem>
        <MenuItem disabled index="1">Cool link 2</MenuItem>
        {/* <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu> */}
        <MenuItem index="2">Cool link 3</MenuItem>
      </Menu>

      <Button disabled >Default</Button>
      <Button btnType='primary' size="lg">Primary</Button>
      <Button btnType='danger' size="sm">Primary</Button>
      <Button btnType='link' href="http://google.com">Link</Button>
      <Button btnType='link' href="http://google.com" disabled>DisabledLink</Button>

    </div>
  );
}

export default App;
