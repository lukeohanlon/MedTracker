class DrugsController < ApplicationController
    before_action :set_drug, only: %i[ show edit update destroy ]
  
    # GET /drugs or /drugs.json
    def index
      @drugs = Drug.all
      render json: fetched_drugs
    end
  
    private
  
    def fetched_drugs
      # Your logic to fetch drug suggestions from OpenFDA or any other source
    end
  end
  