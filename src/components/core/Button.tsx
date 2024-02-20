import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "../../styles/Button.module.css";
import Link, { LinkProps } from "next/link";

type TLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type TBaseAttributes = TLinkProps | TButtonProps;

interface IProps {
  variant?: "filled" | "outlined";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "critical";
}

const Button = forwardRef<HTMLButtonElement, IProps & TBaseAttributes>(
  (
    {
      className,
      size = "medium",
      color = "primary",
      variant = "filled",
      ...props
    },
    ref
  ) => {
    if ("href" in props && props.href) {
      return (
        <Link
          {...props}
          className={`${className} ${styles.button} ${
            styles[`button__${color}`]
          } ${styles[`button__${size}`]} ${styles[`button__${variant}`]}`}
        />
      );
    }

    return (
      <button
        {...(props as TButtonProps)}
        ref={ref}
        className={`${className} ${styles.button} ${
          styles[`button__${color}`]
        } ${styles[`button__${size}`]} ${styles[`button__${variant}`]}`}
      />
    );
  }
);

export default Button;
