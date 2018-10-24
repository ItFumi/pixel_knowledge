class PasswordsController < Devise::PasswordsController
  respond_to :json

  def new
    redirect_to root_path
  end
  
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      messages = resource.errors.messages
      if request.xhr?
        return render :json => {:success => false, :messages => messages}
      else
        respond_with resource
      end
    end
  end
end
