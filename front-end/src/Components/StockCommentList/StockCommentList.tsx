import React from 'react';
import type { CommentGet } from '../../Models/Comment';
import StockCommentListItem from '../StockCommentListItem/StockCommentListItem';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  comments: CommentGet[];
}

const StockCommentList = ({ comments }: Props) => {
  return (
    <>
      {comments
        ? comments.map((comment) => {
            return <StockCommentListItem comment={comment} key={uuidv4()} />;
          })
        : ''}
    </>
  );
};

export default StockCommentList;
