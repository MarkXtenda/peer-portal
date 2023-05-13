class ApplicationController < ActionController::API
    include ActionController::Cookies
    # Application method that sets current user
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
  
    helper_method :current_user
  end
  