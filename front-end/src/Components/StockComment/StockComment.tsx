import React, { useEffect, useState } from 'react';
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import type { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockCommentList from '../StockCommentList/StockCommentList';

interface Props {
  stockSymbol: string;
}

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComment] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = async (e: CommentFormInputs) => {
    try {
      const response = await commentPostAPI(stockSymbol, e.title, e.content);

      if (response) {
        toast.success('Comment created successfully!');
        await getComments();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
      }
    }
  };

  const getComments = async () => {
    try {
      setLoading(true);
      const response = await commentGetAPI(stockSymbol);

      if (response) {
        const { data } = response;
        setLoading(false);
        setComment(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
      }
    }
  };
  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};
export default StockComment;
