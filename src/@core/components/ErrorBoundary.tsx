/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import React, { ErrorInfo } from 'react';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';

type ErrorBoundaryProps = {
    children?: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

// TODO: class component should be reworked to function component and add hook useTranslation
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('REACT ERROR BOUNDARY:', error, errorInfo);
    }

    public backToDashboard = () => {
        window.location.href = '/home';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <FallbackContent
                    icon={<VectorIcons.Cone />}
                    firstText="pages:app.fallback.first_text"
                    secondText="pages:app.fallback.second_text"
                    onClick={this.backToDashboard}
                    buttonText="pages:app.fallback.button_text"
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
