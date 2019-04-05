/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";
import { IconProps } from "../IconTypes";
import { useTheme } from "../../Theme/Providers";

export const IconCloudSnow: React.FunctionComponent<IconProps> = ({
  size = "md",
  color = "currentColor",
  ...otherProps
}) => {
  const theme = useTheme();
  const width = typeof size == "string" ? theme.iconSizes[size] : size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="8" y1="20" x2="8" y2="20" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="12" y1="22" x2="12" y2="22" />
      <line x1="16" y1="16" x2="16" y2="16" />
      <line x1="16" y1="20" x2="16" y2="20" />
    </svg>
  );
};

IconCloudSnow.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};