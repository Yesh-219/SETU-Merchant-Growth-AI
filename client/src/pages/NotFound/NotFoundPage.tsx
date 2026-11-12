import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/common/EmptyState';
import { AlertCircle, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16">
      <EmptyState
        icon={<AlertCircle className="w-8 h-8 text-rose-500" />}
        title="Page Not Found"
        description="The requested page could not be located. Check the navigation menu or return to your main dashboard."
        actionLabel="Go to Dashboard"
        onAction={() => {
          window.location.href = '/';
        }}
      />
      <div className="text-center mt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-paytm-blue hover:underline font-semibold"
        >
          <Home className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

