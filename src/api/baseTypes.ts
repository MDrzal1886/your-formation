import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type TResponseData = {
  message?: string;
};

export type ApiRouteHandler<
  TRequest extends NextApiRequest,
  TResponse = TResponseData
> = (
  req: TRequest,
  res: NextApiResponse<TResponse>
) => ReturnType<NextApiHandler>;
