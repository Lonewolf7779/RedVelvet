"use client";

import React, { Component, type ReactNode } from "react";
import { Button } from "@red-velvet/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(
    error: Error,
    errorInfo: React.ErrorInfo,
  ): void {
    // Structured error logging
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[Red Velvet ErrorBoundary caught an error]:",
        error,
        errorInfo,
      );
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      if (this.fallback) {
        return this.fallback;
      }
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-[300px] flex-col items-center justify-center border border-border-subtle bg-surface-card p-8 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-wine-light">
            System Notice
          </p>
          <h2 className="mt-2 font-serif text-2xl font-light text-monochrome-pureWhite">
            Unable to render interface module
          </h2>
          <p className="mt-2 max-w-md font-sans text-xs text-monochrome-concrete-dark">
            {this.state.error?.message ||
              "An unexpected error occurred while executing this component."}
          </p>
          <div className="mt-6">
            <Button variant="outline" size="sm" onClick={this.handleReset}>
              Retry Execution
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

  private get fallback(): ReactNode {
    return this.props.fallback;
  }
}
