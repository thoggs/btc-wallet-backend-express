export type ResponseDTO<T> = {
  data: T;
  success: boolean;
  metadata: {
    message: ErrorResponseDto[];
  };
}

export type ErrorResponseDto = {
  errorCode: string;
  errorMessage: string;
  field?: string;
};