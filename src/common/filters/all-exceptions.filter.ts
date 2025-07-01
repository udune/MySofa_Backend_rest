import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '서버 오류가 발생했습니다.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : Array.isArray((exceptionResponse as any).message)
            ? (exceptionResponse as any).message.join(', ')
            : (exceptionResponse as any).message || message;
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error('Internal Server Error', exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      timeStamp: new Date().toISOString(),
    });
  }
}
