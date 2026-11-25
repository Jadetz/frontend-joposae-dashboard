import { Component } from "react";
import CrashScreen from "./CrashScreen.jsx";

// Catches errors thrown while a page renders, so the sidebar stays usable.
// Error boundaries have no hook version in React 19, so this one is a class.
// AppLayout gives it key={location.key}: every navigation mounts a fresh
// boundary, which clears the error. React itself logs the caught error to the console.
class PageErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <CrashScreen error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default PageErrorBoundary;
