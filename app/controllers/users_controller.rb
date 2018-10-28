class UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def show
    if user_signed_in?
      if params[:q]
        @search = @user.knowledges.ransack(params[:q])
        @knowledge = @search.result.order("updated_at DESC").page(params[:page]).per(6)
      else
        @search = Knowledge.ransack
        @knowledge = @user.knowledges.order("updated_at DESC").page(params[:page]).per(6)
      end
    else
      redirect_back(fallback_location: root_path)
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
