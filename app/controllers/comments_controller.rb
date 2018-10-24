class CommentsController < ApplicationController
  def index
    @knowledge = Knowledge.find(params[:post_id])
    @comments = @knowledge.comments
    respond_to do |format|
      format.js { render :comments_reload }
    end
  end

  def create
    @knowledge = Knowledge.find(params[:post_id])
    @comment = @knowledge.comments.build(comment_params)
    @comment.user_id = current_user.id
    respond_to do |format|
      if @comment.save
        format.js { render :comments_reload }
      else
        format.js { render :comment_error }
      end
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    respond_to do |format|
      format.js { render :comments_reload }
    end
  end

  def edit
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.js { render :comment_edit }
    end
  end

  def update
    @comment = Comment.find(params[:id])
    respond_to do |format|
      if @comment.update(comment_params)
        format.js { render :comments_reload }
      else
        format.js { render :comment_error }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :knowledge_id, :user_id)
  end
end
