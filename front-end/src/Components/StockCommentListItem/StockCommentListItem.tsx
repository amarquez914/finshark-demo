import React from 'react';
import type { CommentGet } from '../../Models/Comment';

interface Props {
  comment: CommentGet;
}

const StockCommentListItem = ({ comment }: Props) => {
  return (
    <div className="relative mb-8 ml-4 grid w-full grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-lg">
      <div className="relative flex gap-4">
        <div className="flex w-full flex-col">
          <div className="flex flex-row justify-between">
            <p className="relative truncate overflow-hidden text-xl whitespace-nowrap">
              {comment.title}
            </p>
          </div>
          <p className="text-dark text-sm">@{comment.createdBy}</p>
        </div>
      </div>
      <p className="-mt-4 text-gray-500">{comment.content}</p>
    </div>
  );
};

export default StockCommentListItem;
