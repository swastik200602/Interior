import { Component } from "react";
import Button from "../ui/Button";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
          <div>
            <p className="text-sm font-semibold text-primary uppercase">
              Something went wrong
            </p>
            <h1 className="mt-3 font-display text-5xl">
              We couldn’t display this page.
            </h1>
            <p className="mt-4 text-muted">
              Please refresh the page and try again.
            </p>
            <Button className="mt-7" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
