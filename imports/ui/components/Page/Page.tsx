import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  children: JSX.Element;
  header: {
    actions?: Array<JSX.Element>;
    title: string;
  };
};

export function Page({
  children,
  header: { actions, title },
}: Props): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title} - Bidou</title>
      </Helmet>

      <div className="flex flex-col space-y-4 md:space-y-8">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="flex items-center justify-between px-4 py-6 max-w-5xl mx-auto">
            <div className="text-2xl font-bold leading-7 text-gray-900">
              {title}
            </div>
            {actions?.map((action) => action)}
          </div>
        </div>

        {/* Content */}
        <section className="h-full">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-8 md:px-4 pb-8">
            {children}
          </div>
        </section>
      </div>
    </>
  );
}
