require 'rails_helper'

RSpec.describe "Candidates", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/candidates/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/candidates/create"
      expect(response).to have_http_status(:success)
    end
  end

end
