import React, { FC, useState, createContext, CSSProperties } from "react";
import classNames from "classnames";

//
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string; // index of active item
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: SelectCallback;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

// Shape of menu context
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// Create context
export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;

  // set active menu item
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // context object
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",   // type of currentActive is string | undefined
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  // Filter the children of the Menu and add 'index' property to MenuItem
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(), // create index
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    });
  };

  return (
    // data-testid="test-menu"  for testing 
    <ul className={classes} style={style} data-testid="test-menu">
      {/* Pass context object to children */}
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
