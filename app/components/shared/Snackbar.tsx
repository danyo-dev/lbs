import React, { useState, useEffect } from "react";

interface Props {
  hasData: boolean;
  children: React.ReactChild;
}

export default function Snackbar({ hasData, children }: Props) {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (hasData) {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 5000);
    }
  }, [hasData]);
  return (
    <>
      {showSnackbar && (
        <div
          className="fixed bottom-0 left-1/4 right-1/4 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          {children}
        </div>
      )}
    </>
  );
}
