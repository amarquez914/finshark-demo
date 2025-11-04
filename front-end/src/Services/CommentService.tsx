import axios from 'axios';
import type { CommentGet, CommentPost } from '../Models/Comment';
import { handleError } from '../Helpers/ErrorHandler';

const api = 'http://localhost:5088/api/comment/';

export const commentPostAPI = async (
  symbol: string,
  title: string,
  content: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title,
      content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
