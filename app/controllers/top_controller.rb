class TopController < ApplicationController
  def index
    if params[:q]
      @search = Knowledge.ransack(params[:q])
      @knowledge = @search.result.order("updated_at DESC").page(params[:page]).per(6)
    else
      @search = Knowledge.ransack
      @knowledge = Knowledge.order("updated_at DESC").page(params[:page]).per(6)
    end
  end
end
