import axios from 'axios';
import { axiosInstance } from '@/lib/apis/axios/axios-instance';
import { AxiosError } from 'axios';

// ─── Types ───
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestConfig<TBody = unknown> = {
  endpoint: string;
  method?: HttpMethod;
  body?: TBody;
  params?: Record<string, string | number>;
  searchParams?: Record<string, string | number>;
};

// ─── Type Guard ───
function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof (data as ErrorResponse).error === 'string'
  );
}

// ─── API Request ───
export async function apiRequest<TResponse>(
  config: RequestConfig,
): Promise<SuccessfullResponse<TResponse>> {
  const { endpoint, method = 'GET', body, params, searchParams } = config;

  // replace path params — e.g. /users/:id → /users/123
  const resolvedEndpoint = params
    ? Object.entries(params).reduce(
        (path, [key, value]) => path.replace(`:${key}`, String(value)),
        endpoint,
      )
    : endpoint;

  const isAbsoluteEndpoint = /^https?:\/\//i.test(resolvedEndpoint);
  const requestClient = isAbsoluteEndpoint ? axios : axiosInstance;

  try {
    const response = await requestClient.request<APIResponse<TResponse>>({
      url: resolvedEndpoint,
      method,
      data: body,
      params: searchParams,
    });

    //check payload for error
    if (isErrorResponse(response.data)) {
      throw new Error(response.data.error);
    }

    return response.data as SuccessfullResponse<TResponse>;
  } catch (err) {
    if (err instanceof Error && !(err instanceof AxiosError)) {
      throw err;
    }

    const error = err as AxiosError<ErrorResponse>;
    const message =
      error.response?.data?.error ?? error.message ?? 'Something went wrong';

    throw new Error(message);
  }
}
