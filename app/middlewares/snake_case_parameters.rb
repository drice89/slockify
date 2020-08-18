A middleware that underscores the keys of any incoming (to the rails server) params
class SnakeCaseParameters
  # def initialize(app)
  #   @app = app
  # end

  # def call(env)
  #   request = ActionDispatch::Request.new(env)
  #   request.request_parameters.deep_transform_keys!(&:underscore) if request.request_parameters
  #   request.query_parameters.deep_transform_keys!(&:underscore) if request.query_parameters
  
  #   @app.call(env)
  # end
end