import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  // children: React.ReactNode;
  href?: string;
}
// Intersection types
// Provide native properties, like OnClick 
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// make all fields optional because some property exist on anchor but not on button
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<BaseButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href, ...restProps } = props;

  // btn, add btn-lg when size was passed , add btn-primary when type was passed
  // link buttong disable 需要特殊处理, 因为 <a> 本身没有disabled 属性
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
