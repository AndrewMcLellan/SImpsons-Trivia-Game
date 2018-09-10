class Api::V1::RoundsController < ApplicationController

  def index
    render json: Round.all
  end
  
  def new
    render json: Round.create!
  end

  def create
    binding.pry
  end
end
