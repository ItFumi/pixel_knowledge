class FavoritesController < ApplicationController
  def index
    if params[:q]
      @search = current_user.favorite_knowledges.ransack(params[:q])
      @knowledge = @search.result.order("updated_at DESC").page(params[:page]).per(6)
    else
      @search = Knowledge.ransack
      @knowledge = current_user.favorite_knowledges.order("updated_at DESC").page(params[:page]).per(6)
    end
  end

  def create
    @knowledge = Knowledge.find(params[:post_id])
    @favorite = @knowledge.favorites.build
    @favorite.user_id = current_user.id
    @favorite.save
    respond_to do |format|
      format.js { render :favorites_view }
    end
  end

  def destroy
    @knowledge = Knowledge.find(params[:post_id])
    @favorite = Favorite.find(params[:id])
    @favorite.destroy
    respond_to do |format|
      format.js { render :favorites_view }
    end
  end
end
