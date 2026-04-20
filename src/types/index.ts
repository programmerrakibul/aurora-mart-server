export type TSuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data?: T;
  total?: number;
};

export type TErrorResponse = {
  success: false;
  message: string;
  details?: unknown;
};

export type TApiResponse<T = unknown> = TSuccessResponse<T> | TErrorResponse;
