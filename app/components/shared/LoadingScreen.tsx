
import { ReactChild, ReactNode } from 'react';
import { FetcherTypes } from "~/types/generalTypes";
import LoadingIcon from "~/components/shared/LoadingIcon";

interface Props {
  type?: FetcherTypes,
  hasData: boolean,
  noData?: ReactNode,
  children: ReactChild
}

export function LoadingScreen({ type, hasData = false, noData, children }: Props) {
  function Container({ children }: { children: ReactChild }) {
    return <div className="bg-white py-6 px-6 shadow border-slate-200 rounded-lg text-sm ">{children}</div>
  }

  if (type === "loaderSubmission") {
    return (
      <Container>
        <LoadingIcon />
      </Container>
    )
  }

  if (type === "init") {
    return (
      <Container>
        <div className="text-slate-600">
          Ergebnisse werden nach überprüfung der Daten geladen.
        </div>
      </Container>
    );
  }

  if (type === "done" && !hasData) {
    return (
      <Container>
        <>{noData || <div>Keine Daten gefunden</div>}</>
      </Container>
    )
  }

  return <Container>{children}</Container>;
}