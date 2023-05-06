class SessionsController < ApplicationController
  # Sign in
  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { id: user.id, username: user.username, channels: user.channels}
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
        render json: user
    else
        render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  # Sign out
  def destroy
    session.delete(:user_id)
    render json: { message: 'Logged out successfully' }
  end
end
