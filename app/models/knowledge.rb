class Knowledge < ApplicationRecord
  # 2.知識vsユーザー (多vs1) = 複数の知識は1人のユーザーが投稿している。
  belongs_to :user
  # 3.知識vsステップ (1vs多) = 1つの知識は複数のステップを持っている。
  has_many :steps, dependent: :destroy
  # 4.知識vsイイネ (1vs多) = 1つの知識は複数のイイネを持っている。
  has_many :favorites, dependent: :destroy
  # 6.知識vsコメント (1vs多) = 1つの知識は複数のコメントを持っている。
  has_many :comments, dependent: :destroy

  accepts_nested_attributes_for :steps
end
