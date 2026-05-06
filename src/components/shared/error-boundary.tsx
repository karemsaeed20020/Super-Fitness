import { Component } from "react";
import type { ReactNode } from "react";
import { DefaultError } from "./default-error";

type Props = {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      return fallback ? (
        fallback(error, this.reset)
      ) : (
        <DefaultError message={error.message} reset={this.reset} />
      );
    }

    return children;
  }
}
