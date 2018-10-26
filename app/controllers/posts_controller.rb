class PostsController < ApplicationController
  include CarrierwaveBase64Uploader
  before_action :authenticate_user!, except: [:show]
  before_action :set_knowledge, only: [:show, :edit, :update, :destroy]

  def new
    @knowledge = Knowledge.new
    @knowledge.steps.build
    gon.steps = ""
  end

  def create
    @knowledge = Knowledge.new(knowledge_params)
    if params["knowledge"]["title"] == ""
      @knowledge.title = "無題"
    end
    @knowledge.user_id = current_user.id
    step_count = params["step"].to_i
    for i in 0..step_count-1 do
      @knowledge.steps_attributes = {i:{picture: base64_conversion(params["picture"+i.to_s],"step"+i.to_s+Time.now.strftime("%Y%m%d%H%M%S").to_s), comment: params["comment"+i.to_s], canvas_obj: params["canvas"+i.to_s]}}
    end
    respond_to do |format|
      if @knowledge.save
        flash[:notice] = "知識を投稿しました。"
        format.js { render js: "window.location.replace('#{root_path}');"}
      end
    end
  end

  def show
    @comments = @knowledge.comments
    if user_signed_in?
      @favorite = current_user.favorites.find_by(knowledge_id: @knowledge.id)
      @comment = Comment.new
    end
  end

  def edit
    gon.steps = @knowledge.steps.order("id DESC")
  end

  def update
    if params["knowledge"]["title"] == ""
      @knowledge.title = "無題"
    end
    step_count = params["step"].to_i
    for i in 0..step_count-1 do
      @knowledge.steps_attributes = {i:{id: params["id"+i.to_s], picture: base64_conversion(params["picture"+i.to_s],"step"+i.to_s+Time.now.strftime("%Y%m%d%H%M%S").to_s), comment: params["comment"+i.to_s], canvas_obj: params["canvas"+i.to_s]}}
    end
    respond_to do |format|
      if @knowledge.update(knowledge_params)
        flash[:notice] = "知識を更新しました。"
        format.js { render js: "window.location.replace('#{root_path}');"}
      end
    end
  end

  def destroy
    @knowledge.destroy
    redirect_to root_path, notice: "知識を削除しました。"
  end

  private

  def set_knowledge
    @knowledge = Knowledge.find(params[:id])
  end

  def knowledge_params
    params.require(:knowledge).permit(:title, :content, :user_id, steps_attributes: [:id, :picture, :comment])
  end
end
