class User < ApplicationRecord
  # :confirmable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :lockable, :timeoutable

  validates :name, presence: true, length: { maximum: 20 }

  mount_uploader :user_image, UserImageUploader

  # 1.ユーザーvsイイネ (1vs多) = 1人のユーザーは複数のイイネをしている。
  has_many :favorites, dependent: :destroy
  # 2.ユーザーvs知識 (1vs多) = 1人のユーザーは複数の知識を投稿している。
  has_many :knowledges, dependent: :destroy
  # 5.ユーザーvsコメント (1vs多) = 1人のユーザーは複数のコメントを投稿している。
  has_many :comments, dependent: :destroy
  # 7.イイネしている知識を取得。
  has_many :favorite_knowledges, through: :favorites, source: :knowledge

  # パスワード無しでユーザー情報(パスワード除く)を更新
  # controllerから呼び出し
  def update_without_current_password(params, *options)
    params.delete(:current_password)

    if params[:password].blank? && params[:password_confirmation].blank?
      params.delete(:password)
      params.delete(:password_confirmation)
    end

    result = update_attributes(params, *options)
    clean_up_passwords
    result
  end
end
