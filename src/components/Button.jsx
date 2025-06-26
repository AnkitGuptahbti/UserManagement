import { Button as AntButton } from "antd";

export default function Button({
  children,
  htmlType = "button",      // "submit", "button", etc.
  type = "primary",          // "primary", "default", "dashed", etc.
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <AntButton
      type={type}             // AntD style type
      htmlType={htmlType}     // actual button behavior
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </AntButton>
  );
}
