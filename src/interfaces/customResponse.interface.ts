import { Response } from 'express';
export interface IPaginateResponse extends Response {
  paginatedResults?: Array<{}>;
  totalDocument?: number;
}
