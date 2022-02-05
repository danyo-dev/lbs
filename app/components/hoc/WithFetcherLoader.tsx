import React from "react";
import { BrzGeneralData, BrzMatrikelStudent } from "~/types/brzTypes";
import { Fetcher, FetcherTypes } from "~/types/generalTypes";

export function WithFetcherLoader(
  WrappedComponent: React.ElementType,
  type: FetcherTypes
) {
  return function ({ data }: Fetcher<BrzMatrikelStudent | BrzGeneralData>) {
    return (
      <div className="bg-white py-6 px-6 shadow border-slate-200 rounded-lg text-sm ">
        {
          <>
            {type === "loaderSubmission" && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {type === "init" && (
              <div className="text-slate-600">
                Ergebnisse werden nach überprüfung der Daten geladen.
              </div>
            )}
          </>
        }

        {type === "done" && (
          <>
            <WrappedComponent data={data} />
          </>
        )}
      </div>
    );
  };
}
