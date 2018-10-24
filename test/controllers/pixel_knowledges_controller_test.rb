require 'test_helper'

class PixelKnowledgesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pixel_knowledges_index_url
    assert_response :success
  end

end
