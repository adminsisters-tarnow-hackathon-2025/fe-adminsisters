import React from "react";
import { toast } from "sonner";

export const useNotify = () => {
  const success = (message: string) => {
    toast.custom(
      () =>
        React.createElement(
          "div",
          {
            className:
              "flex items-center gap-3 p-4 bg-green-500 text-white rounded-lg shadow-lg",
          },
          [
            React.createElement(
              "div",
              { key: "icon", className: "flex-shrink-0" },
              React.createElement(
                "svg",
                {
                  className: "w-5 h-5",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                },
                React.createElement("path", {
                  fillRule: "evenodd",
                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                  clipRule: "evenodd",
                })
              )
            ),
            React.createElement(
              "div",
              { key: "content", className: "flex-1" },
              React.createElement("p", { className: "font-medium" }, message)
            ),
          ]
        ),
      { duration: 3000 }
    );
  };

  const error = (message: string) => {
    toast.custom(
      () =>
        React.createElement(
          "div",
          {
            className:
              "flex items-center gap-3 p-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg",
          },
          [
            React.createElement(
              "div",
              { key: "icon", className: "flex-shrink-0" },
              React.createElement(
                "svg",
                {
                  className: "w-5 h-5",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                },
                React.createElement("path", {
                  fillRule: "evenodd",
                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                  clipRule: "evenodd",
                })
              )
            ),
            React.createElement(
              "div",
              { key: "content", className: "flex-1" },
              React.createElement("p", { className: "font-medium" }, message)
            ),
          ]
        ),
      { duration: 4000 }
    );
  };

  return { success, error };
};
