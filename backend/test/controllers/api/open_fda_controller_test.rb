require "test_helper"

class Api::OpenFdaControllerTest < ActionDispatch::IntegrationTest
  test "should get drug_recalls" do
    get api_open_fda_drug_recalls_url
    assert_response :success
  end
end
