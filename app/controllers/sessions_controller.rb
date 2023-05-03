class SessionsController < ApplicationController
  # Sign in
  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { user_id: user.id, token: session[:token] }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # Sign out
  def destroy
    session.delete(:user_id)
    render json: { message: 'Logged out successfully' }
  end
end
