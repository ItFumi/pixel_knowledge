class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  # デフォルト値 CSRF対策のため
  # protect_from_forgery with: :exception
  # 下記追記 CSRF無効
  protect_from_forgery with: :null_session

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :user_image, :remove_user_image])
  end
end
