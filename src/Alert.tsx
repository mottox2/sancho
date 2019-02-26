/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import ReachAlert from "@reach/alert";
import { Text } from "./Text";
import theme from "./Theme";
import { Icon } from "./Icons";
import { IconName } from "@blueprintjs/icons";
import { CloseButton } from "./IconButton";
import { LayerElevations } from "./Layer";

const alertIntentions = {
  info: theme.colors.palette.neutral.base,
  success: theme.colors.palette.green.base,
  question: theme.colors.palette.blue.base,
  danger: theme.colors.palette.red.base,
  warning: theme.colors.palette.yellow.base
};

export type AlertIntentions = keyof typeof alertIntentions;

const icons: { [key in AlertIntentions]: IconName } = {
  info: "info-sign",
  success: "tick-circle",
  warning: "warning-sign",
  danger: "error",
  question: "help"
};

export interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  onRequestClose?: () => void;
  title?: string;
  subtitle?: string;
  id?: string;
  elevation?: LayerElevations;
  children?: React.ReactNode;
  intent?: AlertIntentions;
  component?: React.ReactType<any>;
  type?: "polite" | "assertive";
}

export const Alert = ({
  children,
  title,
  id,
  subtitle,
  component,
  elevation = "xs",
  onRequestClose,
  intent = "info",
  ...other
}: AlertProps) => {
  const contents = title ? (
    <div css={{ display: "flex", alignItems: "flex-start" }}>
      <div css={{ flex: "0 0 auto", marginTop: "4px" }}>
        <Icon color={alertIntentions[intent]} icon={icons[intent]} />
      </div>
      <div css={{ marginLeft: theme.spaces.md }}>
        <Text id={id} variant="h6">
          {title}
        </Text>
        {subtitle && (
          <Text
            variant="subtitle2"
            css={{ color: theme.colors.text.muted, display: "block" }}
          >
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  ) : (
    children
  );

  const Component = component || ReachAlert;

  return (
    <Component
      css={{
        backgroundColor: "white",
        overflow: "hidden",
        maxWidth: "650px",
        position: "relative",
        boxShadow: theme.shadows[elevation],
        borderRadius: theme.radii.md
      }}
      {...other}
    >
      <div>
        <div
          css={{
            width: theme.radii.md,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: alertIntentions[intent]
          }}
        />
        <div
          css={{
            display: "flex",
            alignItems: "flex-start",
            padding: `${theme.spaces.md} ${theme.spaces.md}`
          }}
        >
          {contents}
          {onRequestClose && (
            <CloseButton
              css={{ marginTop: "-0.5rem", marginRight: "-0.5rem" }}
              onClick={onRequestClose}
            />
          )}
        </div>
      </div>
    </Component>
  );
};
