import React, { ComponentProps, FC, Fragment } from 'react';

import type { IChildren } from 'src/types';

export const combineComponents = (
  ...components: FC<IChildren>[]
): FC<IChildren> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC<IChildren>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <Fragment>{children}</Fragment>
  );
};
