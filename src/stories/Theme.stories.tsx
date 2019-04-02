/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useTheme, DarkMode, LightMode } from "../Theme/Providers";
import { Theme } from "../Theme";

function Example({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <div
      css={{
        background: theme.colors.background.default
      }}
    >
      <span
        css={{
          color: theme.colors.text.default
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Basic() {
  const theme = useTheme();
  return (
    <div>
      <span
        css={{
          color: theme.colors.text.selected
        }}
      >
        Hello world, this is the default theme. You can compose modes:
      </span>
      <DarkMode>
        <div css={{ border: "1px solid", padding: "1rem" }}>
          <Example>
            <div>
              <LightMode>
                {(theme: Theme) => (
                  <div
                    css={{
                      background: theme.colors.background.default,
                      color: theme.colors.text.default
                    }}
                  >
                    Using render callback, LightMode mode
                  </div>
                )}
              </LightMode>
              This will be in DarkMode mode
              <LightMode>
                <Example>
                  <div>But this will be in LightMode mode!</div>
                </Example>
              </LightMode>
            </div>
          </Example>
        </div>
      </DarkMode>
    </div>
  );
}

export const ThemeExamples = storiesOf("Theme", module).add(
  "Basic usage",
  () => <Basic />
);