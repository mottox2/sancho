/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Text } from "./Text";
import color from "color";

const KeyCodes = {
  ArrowUp: 38,
  ArrowDown: 40,
  Home: 36,
  End: 35
};

type ChildrenType = React.ReactElement<MenuItemProps>;

interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: Array<ChildrenType>;
  focusableChildren?: React.ComponentType<any>[];
}

export const MenuList = ({
  children,
  focusableChildren = [],
  ...other
}: MenuListProps) => {
  const disabled = new Map();
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null);
  const kids = React.Children.toArray(children);

  const focusComponents = [MenuItem, ...focusableChildren];
  const focusableItems = kids.filter(
    kid => focusComponents.indexOf(kid.type as React.ComponentType) > -1
  );

  const lastIndex = focusableItems.length - 1;
  const firstIndex = 0;

  return (
    <div
      role="menu"
      tabIndex={-1}
      css={{
        minWidth: "200px",
        display: "block",
        padding: `${theme.spaces.sm} 0`
      }}
      {...other}
    >
      {kids.map((kid: ChildrenType) => {
        const i = focusableItems.indexOf(kid);

        if (i < 0) {
          return kid;
        }

        disabled.set(i, kid.props.disabled);

        function focusDown(current: number) {
          const next = current + 1 > lastIndex ? firstIndex : current + 1;
          if (disabled.get(next)) {
            focusDown(next);
          } else {
            setFocusIndex(next);
          }
        }

        function focusUp(current: number) {
          const next = current - 1 < firstIndex ? lastIndex : current - 1;
          if (disabled.get(next)) {
            focusUp(next);
          } else {
            setFocusIndex(next);
          }
        }

        const index = focusIndex || 0;

        return React.cloneElement(kid, {
          focus: i === focusIndex,
          onMouseEnter: () => {
            if (i !== focusIndex) {
              setFocusIndex(i);
            }
          },
          onFocus: () => {
            if (i !== focusIndex) {
              setFocusIndex(i);
            }
          },
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.keyCode === KeyCodes.ArrowDown) {
              e.preventDefault();
              focusDown(index);
            } else if (e.keyCode === KeyCodes.ArrowUp) {
              e.preventDefault();
              focusUp(index);
            } else if (e.keyCode === KeyCodes.Home) {
              e.preventDefault();
              setFocusIndex(firstIndex);
            } else if (e.keyCode === KeyCodes.End) {
              e.preventDefault();
              setFocusIndex(lastIndex);
            }
          }
        });
      })}
    </div>
  );
};

export interface MenuRenderProps extends React.HTMLAttributes<Element> {
  ref: React.RefObject<HTMLDivElement>;
}

interface MenuItemProps extends Partial<MenuItemPropsCloned> {}

interface MenuItemPropsCloned extends React.HTMLAttributes<Element> {
  focus: boolean;
  onFocus: () => void;
  onSelect: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.RefObject<HTMLDivElement>;
  component?: React.ReactType<any>;
  [key: string]: any;
}

export const MenuItem = ({
  focus,
  onFocus,
  onKeyDown,
  onSelect,
  onClick,
  component: Component = "div",
  role = "menuitem",
  children,
  disabled,
  ...other
}: MenuItemProps) => {
  const localRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (focus && localRef.current) {
      localRef.current.focus();
    }
  }, [focus, localRef]);

  const isLink = Component === "a" || other.href || other.to;

  return (
    <Component
      css={{
        cursor: "pointer",
        padding: `${theme.spaces.xs} ${theme.spaces.md}`,
        opacity: disabled ? 0.3 : 1,
        display: "block",
        textDecoration: "none",
        color: theme.colors.text.default,
        pointerEvents: disabled ? "none" : "initial",
        ":focus": {
          backgroundColor: theme.colors.background.tint2,
          outline: "none"
        },
        ":active": {
          backgroundColor: color(theme.colors.background.tint2)
            .darken(0.1)
            .string()
        }
      }}
      onFocus={onFocus}
      role={role}
      tabIndex={0}
      data-trigger-close={true}
      onClick={(e: React.MouseEvent) => {
        if (onClick) onClick(e);
        if (onSelect) onSelect();
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (onKeyDown) onKeyDown(e);
        if (e.key === "Enter") {
          if (!isLink) {
            e.preventDefault();
          }
          if (onSelect) onSelect();
        }
      }}
      ref={localRef}
      {...other}
    >
      {typeof children === "string" ? (
        <Text css={{ color: "inherit" }}>{children}</Text>
      ) : (
        children
      )}
    </Component>
  );
};

interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MenuDivider(props: MenuDividerProps) {
  return (
    <div
      css={{
        height: 0,
        margin: `${theme.spaces.sm} 0`,
        overflow: "hidden",
        borderTop: "1px solid",
        borderColor: theme.colors.border.muted
      }}
      {...props}
    />
  );
}
