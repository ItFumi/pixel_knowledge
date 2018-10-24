class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def new
    redirect_to root_path
  end

  def create
    build_resource(sign_up_params)
    resource.save
    yield resource if block_given?

    if resource.persisted?
      if resource.active_for_authentication?
        message = find_message(:signed_up)
        flash[:notice] = message
        sign_up(resource_name, resource)
        if request.xhr?
          return render :json => {:success => true, :messages => message}
        else
          respond_with resource, location: after_sign_up_path_for(resource)
        end
      else
        messages = find_message(:"signed_up_but_#{resource.inactive_message}" )
        expire_data_after_sign_in!
        if request.xhr?
         return render :json => {:success => true, :messages => message}
        else
          respond_with resource, location: after_inactive_sign_up_path_for(resource)
        end
      end
    else
      clean_up_passwords resource
      messages = resource.errors.messages
      if request.xhr?
       return render :json => {:success => false, :messages => messages}
      else
        respond_with resource
      end
    end
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :user_image)
  end

  protected

  # パスワード無しでユーザー情報(パスワード除く)を更新
  def update_resource(resource, params)
    resource.update_without_current_password(params)
  end

  def after_update_path_for(resource)
    edit_user_registration_path
  end
end
