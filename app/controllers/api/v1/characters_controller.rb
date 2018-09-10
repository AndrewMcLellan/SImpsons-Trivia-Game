class Api::V1::CharactersController < ApplicationController

  def index
    @characters = Character.all.sample(4)

    render json: @characters
  end
end
