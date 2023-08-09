class Api::OpenFdaController < ApplicationController
  def drug_recalls
    render json: OpenFdaService.get_drug_recalls(params[:drug_name])
  end
end
