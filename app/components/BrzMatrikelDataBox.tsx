import { useState } from 'react';
import { Form } from 'remix';

import { Fetcher } from '~/types/generalTypes';
import { DuplicateIcon, CheckIcon } from '@heroicons/react/outline';
import { LbsLoader } from '~/components/shared/LbsLoader';
import { BRZ_MatrikelStudent } from '~/types/studentTypes';

export default function BrzMatrikelDataBox({ data, type }: Fetcher<BRZ_MatrikelStudent>) {
  const [textIsCopied, setTextIsCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(`${data?.matrikelStudentData?.matrikelnummer._text}`);
    setTextIsCopied(true);
  }

  function NoDataFound() {
    return (
      <div className="flex justify-between items-center">
        <p>{data?.matrikelStatusText}</p>
        <Form method="post">
          <button
            type="submit"
            className=" justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reservieren
          </button>
        </Form>
      </div>
    );
  }

  return (
    <LbsLoader type={type} hasData={Boolean(data?.matrikelStudentData)} noDataFound={<NoDataFound />}>
      <div className="grid grid-cols-4">
        <div>
          <p className="text-slate-500">Matrikelnummer</p>
          <div className="block text-2xl font-medium text-sky-600">
            {data?.matrikelStudentData?.matrikelnummer._text}
          </div>
          {textIsCopied ? (
            <div className=" text-slate-500 flex">
              <CheckIcon className="w-5 h-5" data-tooltip-target="tooltip-default" />
              <span>copied</span>
            </div>
          ) : (
            <DuplicateIcon
              onClick={handleCopy}
              className="w-5 h-5 text-slate-500 hover:text-slate-700 cursor-pointer"
            />
          )}
        </div>
        <div>
          <p className="text-slate-500">Semester</p>
          <div className="block text-2xl font-medium text-sky-600">
            {data?.matrikelStudentData?.semester?._text || '-'}
          </div>
        </div>
        <div>
          <p className="text-slate-500">Bildungseinrichtung</p>
          <div className="block text-2xl font-medium text-sky-600">{data?.matrikelStudentData?.be?._text || '-'}</div>
        </div>
        <div>
          <p className="text-slate-500">Matrikelstatus</p>
          <div className="block text-2xl font-medium text-sky-600">
            {data?.matrikelStudentData?.matrikelstatus._text}
          </div>
        </div>
      </div>
    </LbsLoader>
  );
}
